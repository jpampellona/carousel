/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react'
import useInterval from './hooks/useInterval'
import cx from 'classnames'
import shuffle from './helpers/shuffle'
import getMinDuration from './helpers/getMinDuration'
import COLORS from './constants/COLORS'
import AddPlayerForm from './components/AddPlayerForm'
import CurrentPlayer from './components/CurrentPlayer'

import './App.sass'

const rounds = {
  0: [1000, 1000, 500, 500, 500, 200, 200, 200, 200, 200, 200, 200],
  // first round results
  500: [200, 200, 200, 200, 100, 100, 100, 100, 100, 100, 100, 100],
  200: [500, 500, 200, 200, 200, 200, 200, 200, 100, 100, 100, 100],

  // if 500
  700: [100, 100, 100, 100, 50, 50, 50, 50, 50, 50, 50, 50],
  600: [200, 200, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100],

  // if 200
  400: [200, 200, 200, 200, 200, 200, 100, 100, 100, 100, 100, 100],
  300: [200, 200, 200, 200, 200, 200, 200, 200, 100, 100, 100, 100],
}

const initialPlayer = localStorage.getItem('__PLAYER__')
const initialPlayersMap = JSON.parse(localStorage.getItem('__PLAYERS_MAP__'))

function App() {
  const [degree, setDegree] = useState(0)
  const [transitionDuration, setTransitionDuration] = useState(1)
  const [playersMap, setPlayersMap] = useState(initialPlayersMap || {})
  const [player, setPlayer] = useState(initialPlayer || '')
  const playerStats = playersMap[player]
  const initalRound = shuffle(rounds[!!playerStats ? playerStats.money : 0])
  const [round, setRound] = useState(initalRound)
  const [touchStartX, settouchStartX] = useState(0)
  const [currentPageX, setCurrentPageX] = useState(0)
  const [prevPageX, setPrevPageX] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState('')
  const [swipeStart, setSwipeStart] = useState(0)
  const [isSwappingCards, setSwappingCards] = useState(false)
  const [isPlayerReady, setPlayerReady] = useState(false)
  const [prize, setPrize] = useState(0)
  const [prizeWon, setPrizeWon] = useState(0)
  const ANGLE = 360 / round.length
  // const _onNext = () => {
  //   const newDegree = degree + ANGLE
  //   setDegree(newDegree)
  // }
  // const _onPrev = () => {
  //   const newDegree = degree - ANGLE
  //   setDegree(newDegree)
  // }
  const ALLOWED_TIME = 500
  const _onTouchStart = e => {
    if (e.touches.length === 1) {
      _onPress(e.touches[0])
    }
  }
  const _onMouseDown = e => {
    _onPress(e)
  }
  const _onPress = data => {
    if (prize) {
      return
    }
    settouchStartX(data.pageX)
    setSwipeStart(data.pageX)
    setCurrentPageX(data.pageX)
    setTransitionDuration(0)
  }
  const _onTouchMove = e => {
    if (e.touches.length === 1) {
      _onMove(e.touches[0])
    }
  }
  const _onMouseMove = e => {
    if (touchStartX) {
      _onMove(e)
    }
  }
  const _onMove = data => {
    if (prize) {
      return
    }
    setDegree(data.pageX - touchStartX)
    setPrevPageX(currentPageX)
    setCurrentPageX(data.pageX)
  }
  const _onTouchEnd = e => {
    if (e.touches.length === 0) {
      _onRelease()
    }
  }
  const _onMouseUp = () => {
    if (touchStartX) {
      _onRelease()
    }
  }
  const _onRelease = () => {
    if (prize) {
      return
    }
    const deltaX = Math.abs(currentPageX - swipeStart)
    const duration = Math.round(deltaX / 100) + getMinDuration(deltaX)
    setTransitionDuration(duration)
    settouchStartX(0)
    setSwipeStart(0)
    setCurrentPageX(0)
    const targetDeg = swipeDirection === 'left' ? degree - deltaX * duration : degree + deltaX * duration
    const remainder = targetDeg % ANGLE
    let newDegree = swipeDirection === 'left' ? targetDeg - remainder : targetDeg + (ANGLE - remainder)
    if (deltaX === 0) {
      newDegree = degree
    }
    const index = Math.round((newDegree / ANGLE) % round.length)
    let _prize = 0
    if (index <= 0) {
      _prize = round[Math.abs(index)]
    } else {
      _prize = round[round.length - index]
    }
    setDegree(newDegree)
    if (player && isPlayerReady) {
      if (deltaX >= 100) {
        setPrize(_prize || 0)
      } else {
        // swipe faster
      }
    } else {
      // trial spin
    }
  }
  const _onTransitionEnd = e => {
    if (e.propertyName === 'transform' && prize) {
      const money = playerStats.money + prize
      setPlayersMap({
        ...playersMap,
        [player]: {
          ...playerStats,
          money: money,
          spinsLeft: prize === 1000 ? 0 : playerStats.spinsLeft - 1,
        },
      })
      setPrizeWon(prize)
      setRound(shuffle(rounds[money]))
    }
  }
  useEffect(() => {
    const direction = currentPageX > prevPageX ? 'right' : 'left'
    if (currentPageX && swipeDirection !== direction) {
      setSwipeDirection(direction)
      setSwipeStart(currentPageX)
    }
  }, [currentPageX])
  useEffect(() => {
    localStorage.setItem('__PLAYERS_MAP__', JSON.stringify(playersMap))
  }, [playersMap])
  useEffect(() => {
    localStorage.setItem('__PLAYER__', player)
    if (player) {
      setTransitionDuration(0)
      setDegree(0)
    } else {
      setSwappingCards(false)
    }
  }, [player])
  useInterval(
    () => {
      setSwipeStart(currentPageX)
    },
    swipeStart ? ALLOWED_TIME : null
  )
  return (
    <Fragment>
      <nav className={cx('nav has-background-info', { spinning: !!prize })}>
        <span className="background has-text-white-bis has-text-weight-bold">Carousel</span>
        <div className="player-info">
          {!!playerStats && <CurrentPlayer name={player} setPlayer={setPlayer} money={playerStats.money} />}
        </div>
        <div className={cx('goodluck', { ready: !!isPlayerReady })}>
          <p className="has-text-grey-dark is-capitalized is-size-4">Goodluck {player}!</p>
        </div>
      </nav>
      <main className="main">
        <div className="screen active">
          <div className="screen-content">
            <p className="has-text-grey-dark is-size-5">Please enter you name to start</p>
            <AddPlayerForm setPlayer={setPlayer} playersMap={playersMap} setPlayersMap={setPlayersMap} />
          </div>
        </div>
        {!!playerStats && (
          <div className={cx('screen', { active: !playerStats.spinsLeft })}>
            <div className="screen-content">
              <p className="has-text-grey-dark is-size-3">Congratulations!!!</p>
              <p className="has-text-grey-dark is-size-6">on winning a total of</p>
              <p className="has-text-dark-grey is-size-1">{playerStats.money}</p>
            </div>
          </div>
        )}

        <div className={cx('screen', { active: !!playerStats && !!playerStats.spinsLeft })}>
          <div className="screen-content">
            <p className="has-text-grey-dark is-size-6">Here's how your cards are arranged right now.</p>
            <div className="card-arrangements">
              {round.map((item, index) => {
                return (
                  <div className="card" key={`item-${item}-${index}`} style={{ backgroundColor: `${COLORS[item]}` }}>
                    {String(item)
                      .split('')
                      .map((letter, i) => (
                        <span key={letter + i}>{letter}</span>
                      ))}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="screen-controls">
            <div className="field is-grouped">
              <p className="control">
                <button
                  className="button is-fullwidth"
                  onClick={() => {
                    setRound(shuffle(round))
                  }}
                >
                  Re-arrange Cards
                </button>
              </p>
              <p className="control">
                <button
                  className="button is-fullwidth is-link"
                  onClick={() => {
                    setPlayerReady(true)
                    setDegree(0)
                    setTransitionDuration(0)
                  }}
                >
                  I'm Ready to Spin!
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className={cx('screen', { active: !!isPlayerReady })}>
          <div className="screen-content">
            <div className={cx('spin-instructions', { spinning: !!prize })}>
              Spin the cards fast to claim your prize!
            </div>
            <div
              className={`carousel-swipe-container ${isSwappingCards ? 'swapping' : ''}`}
              onTouchStart={isSwappingCards ? undefined : _onTouchStart}
              onTouchMove={isSwappingCards ? undefined : _onTouchMove}
              onTouchEnd={isSwappingCards ? undefined : _onTouchEnd}
              onMouseDown={isSwappingCards ? undefined : _onMouseDown}
              onMouseMove={isSwappingCards ? undefined : _onMouseMove}
              onMouseUp={isSwappingCards ? undefined : _onMouseUp}
            >
              <div className={`carousel-container`}>
                <div
                  className="carousel"
                  style={{
                    transform: 'rotateY(' + degree + 'deg)',
                    transitionDuration: `${transitionDuration}s`,
                  }}
                  onTransitionEnd={_onTransitionEnd}
                >
                  {round.map((item, index) => {
                    const style = isSwappingCards ? {} : { transform: `rotateY(${index * ANGLE}deg) translateZ(160px)` }
                    return (
                      <div
                        className="item"
                        key={`item-${item}-${index}`}
                        style={{ backgroundColor: `${COLORS[item]}`, ...style }}
                      >
                        {item}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={cx('screen-controls', { spinning: !!prize })}>
            <button
              className="button is-fullwidth"
              onClick={() => {
                setPlayerReady(false)
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
      <div className={cx('s-modal', { active: !!prizeWon })}>
        <div className="s-modal-content">
          <div className="is-size-4">Congratulations!!!</div>
          <div className="subtitle is-size-5">You won</div>
          <div className="title is-size-1">{prize}</div>
          <div className="s-modal-controls">
            <div className="field is-grouped">
              <p className="control">
                <button
                  className="button is-fullwidth is-link"
                  onClick={() => {
                    setPrize(0)
                    setPrizeWon(0)
                    setPlayerReady(false)
                  }}
                >
                  Awesome
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App
