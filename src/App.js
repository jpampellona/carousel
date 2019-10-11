/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react'
import useInterval from './hooks/useInterval'
import shuffle from './helpers/shuffle'
import getMinDuration from './helpers/getMinDuration'
import COLORS from './constants/COLORS'
import AddPlayerForm from './components/AddPlayerForm'
import CurrentPlayer from './components/CurrentPlayer'

import './App.scss'

const rounds = {
  0: [1000, 1000, 500, 500, 500, 200, 200, 200, 200, 200, 200, 200],
}

const initialMoney = 0
const initalRound = shuffle(rounds[initialMoney])
const initialPlayer = localStorage.getItem('__PLAYER__')
const initialPlayersMap = JSON.parse(localStorage.getItem('__PLAYERS_MAP__'))

function App() {
  const [degree, setDegree] = useState(0)
  const [money, setMoney] = useState(initialMoney)
  const [transitionDuration, setTransitionDuration] = useState(1)
  const [round, setRound] = useState(initalRound)
  const [touchStartX, settouchStartX] = useState(0)
  const [currentPageX, setCurrentPageX] = useState(0)
  const [prevPageX, setPrevPageX] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState('')
  const [swipeStart, setSwipeStart] = useState(0)
  const [isSwappingCards, setSwappingCards] = useState(false)
  const [isPlayerReady, setPlayerReady] = useState(false)
  const [prize, setPrize] = useState(0)
  const [player, setPlayer] = useState(initialPlayer || '')
  const [playersMap, setPlayersMap] = useState(initialPlayersMap || {})
  const playerStats = playersMap[player]
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
      setMoney(prize)
      setPrize(0)
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
      <nav
        className={`navbar is-info ${isPlayerReady ? 'is-ready' : ''}`}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="is-pulled-left">
          <div className="navbar-brand">
            <span className="navbar-item image has-text-weight-bold">Carousel</span>
          </div>
        </div>
        <div className="container is-fluid">
          <div className="navbar-item">
            {!player && <AddPlayerForm setPlayer={setPlayer} playersMap={playersMap} setPlayersMap={setPlayersMap} />}
            {!!player && <CurrentPlayer name={player} setPlayer={setPlayer} />}
          </div>
        </div>
      </nav>
      <div className="app">
        <div className="controls controls-upper">
          {!player && <h1 className="title is-3 has-text-grey">Enter your name to start</h1>}
          {!!playerStats && !isPlayerReady && !playerStats.finished && (
            <div className="container is-fluid mt-10">
              <div className="has-text-grey is-flex align-items-center justify-content-center">
                Press{' '}
                <button
                  className="button ml-5 mr-5"
                  onClick={() => {
                    if (isSwappingCards) {
                      setRound(shuffle(round))
                    } else {
                      setDegree(0)
                      setTransitionDuration(0)
                      setSwappingCards(true)
                    }
                  }}
                >
                  Swap Cards
                </button>{' '}
                to randomly swap cards.
              </div>
              {isSwappingCards && (
                <div className="has-text-grey is-flex align-items-center justify-content-center mt-5">
                  Press{' '}
                  <button
                    className="button is-primary ml-5 mr-5"
                    onClick={() => {
                      setSwappingCards(false)
                    }}
                  >
                    Finish
                  </button>{' '}
                  when you're done swapping cards.
                </div>
              )}
              {!isSwappingCards && (
                <div className="has-text-grey is-flex align-items-center justify-content-center mt-5">
                  Press{' '}
                  <button
                    className="button is-info ml-5 mr-5"
                    onClick={() => {
                      setDegree(0)
                      setTransitionDuration(0)
                      setPlayerReady(true)
                    }}
                  >
                    I'm Ready
                  </button>{' '}
                  when you're ready to spin.
                </div>
              )}
            </div>
          )}
          <div
            className={`goodluck is-flex align-items-center justify-content-center ${isPlayerReady ? 'is-ready' : ''}`}
          >
            <h1 className="title is-3 has-text-grey">
              Goodluck <span className="is-capitalized">{player}!!!</span>
            </h1>
            <h3 className="subtitle is-4 has-text-grey">Spin it fast!</h3>
          </div>
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
                const style = isSwappingCards
                  ? {}
                  : { transform: `rotateY(${index * ANGLE}deg) translateZ(${round.length * 20}px)` }
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
    </Fragment>
  )
}

export default App
