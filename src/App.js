/* eslint-disable react-hooks/exhaustive-deps */
import cx from 'classnames'
import React, { Fragment, useEffect, useState } from 'react'
import logo10 from './10.png'
import logo100 from './100.png'
import logo1000 from './1000.png'
import logo20 from './20.png'
import logo200 from './200.png'
import logo50 from './50.png'
import logo500 from './500.png'
import './App.sass'
import AddPlayerForm from './components/AddPlayerForm'
import CurrentPlayer from './components/CurrentPlayer'
import ModeDropdown from './components/ModeDropdown'
import Players from './components/Players'
import COLORS from './constants/COLORS'
import getMinDuration from './helpers/getMinDuration'
import shuffle from './helpers/shuffle'
import useInterval from './hooks/useInterval'

const logos = { logo10, logo20, logo50, logo100, logo200, logo500, logo1000 }

const MAX_PRIZE = {
  kids: 1000,
  kiddos: 500,
  adults: 200,
}

const kids = {
  0: [1000, 1000, 500, 500, 500, 200, 200, 200, 200, 200, 200, 200],
  500: [200, 200, 200, 200, 100, 100, 100, 100, 100, 100, 100, 100],
  200: [500, 500, 200, 200, 200, 200, 200, 200, 100, 100, 100, 100],
  700: [100, 100, 100, 100, 50, 50, 50, 50, 50, 50, 50, 50],
  600: [200, 200, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100],
  400: [200, 200, 200, 200, 200, 200, 100, 100, 100, 100, 100, 100],
  300: [200, 200, 200, 200, 200, 200, 200, 200, 100, 100, 100, 100],
}

const kiddos = {
  0: [500, 500, 200, 200, 200, 200, 200, 100, 100, 100, 100, 100],
  200: [100, 100, 50, 50, 50, 50, 50, 50, 20, 20, 20, 20],
  220: [50, 50, 50, 50, 50, 50, 20, 20, 20, 20, 20, 20],
  250: [50, 50, 50, 20, 20, 20, 20, 20, 20, 20, 20, 20],
  300: [50, 50, 50, 20, 20, 20, 20, 20, 20, 20, 20, 20],
  100: [100, 100, 100, 100, 100, 100, 50, 50, 50, 50, 50, 50],
  150: [100, 100, 100, 50, 50, 50, 50, 50, 50, 50, 50, 50],
}

const adults = {
  0: [200, 200, 100, 100, 100, 50, 50, 50, 50, 50, 50, 50],
  100: [50, 50, 50, 50, 20, 20, 20, 20, 20, 20, 20, 20],
  50: [20, 20, 50, 50, 50, 50, 50, 50, 20, 20, 20, 20],
  150: [20, 20, 20, 20, 10, 10, 10, 10, 10, 10, 10, 10],
  120: [50, 50, 50, 20, 20, 20, 20, 20, 20, 20, 20, 20],
  70: [50, 50, 50, 50, 50, 50, 50, 50, 20, 20, 20, 20],
}

const rounds = { kids, adults, kiddos }

const initialPlayer = localStorage.getItem('__PLAYER__')
const initialMode = localStorage.getItem('__MODE__')
const initialPlayersMap = JSON.parse(localStorage.getItem('__PLAYERS_MAP__'))
const initialCardsScale = JSON.parse(localStorage.getItem('__CARDS_SCALE__')) || 1
const initialCarouselScale = JSON.parse(localStorage.getItem('__CAROUSEL_SCALE__')) || 1

function App() {
  const [degree, setDegree] = useState(0)
  const [transitionDuration, setTransitionDuration] = useState(1)
  const [playersMap, setPlayersMap] = useState(initialPlayersMap || {})
  const [mode, setMode] = useState(initialMode || 'kids')
  const [player, setPlayer] = useState(initialPlayer || '')
  const playerStats = playersMap[player]
  const initalRound = shuffle(rounds[mode][!!playerStats ? playerStats.money : 0])
  const [round, setRound] = useState(initalRound)
  const [isSettingActive, setSettings] = useState(false)
  const [touchStartX, settouchStartX] = useState(0)
  const [currentPageX, setCurrentPageX] = useState(0)
  const [prevPageX, setPrevPageX] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState('')
  const [swipeStart, setSwipeStart] = useState(0)
  const [isSwappingCards, setSwappingCards] = useState(false)
  const [isPlayerReady, setPlayerReady] = useState(false)
  const [prize, setPrize] = useState(0)
  const [prizeWon, setPrizeWon] = useState(0)
  const [cardScale, setCardScale] = useState(initialCardsScale)
  const [carouselScale, setCarouselScale] = useState(initialCarouselScale)
  const ANGLE = 360 / round.length
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
      const maxPrize = MAX_PRIZE[mode]
      setPlayersMap({
        ...playersMap,
        [player]: {
          ...playerStats,
          money: money,
          spinsLeft: prize >= maxPrize ? 0 : playerStats.spinsLeft - 1,
        },
      })
      setPrizeWon(prize)
      setRound(shuffle(rounds[mode][money]))
    }
  }
  const _handleZoom = e => {
    const action = e.target.dataset['action']
    switch (action) {
      case 'CARDS_ZOOM_IN':
        setCardScale(cardScale + 0.1)
        break
      case 'CARDS_ZOOM_OUT':
        setCardScale(cardScale - 0.1)
        break
      case 'CAROUSEL_ZOOM_IN':
        setCarouselScale(carouselScale + 0.1)
        break
      case 'CAROUSEL_ZOOM_OUT':
        setCarouselScale(carouselScale - 0.1)
        break
      default:
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
    localStorage.setItem('__CARDS_SCALE__', JSON.stringify(cardScale))
  }, [cardScale])
  useEffect(() => {
    localStorage.setItem('__CAROUSEL_SCALE__', JSON.stringify(carouselScale))
  }, [carouselScale])
  useEffect(() => {
    localStorage.setItem('__PLAYER__', player)
    if (player) {
      setTransitionDuration(0)
      setDegree(0)
    } else {
      setSwappingCards(false)
    }
  }, [player])
  useEffect(() => {
    localStorage.setItem('__MODE__', mode)
    setRound(shuffle(rounds[mode][0]))
  }, [mode])
  useInterval(
    () => {
      setSwipeStart(currentPageX)
    },
    swipeStart ? ALLOWED_TIME : null
  )
  return (
    <Fragment>
      <nav className={cx('nav has-background-info', { spinning: !!prize })}>
        <span
          className="background has-text-white-bis has-text-weight-bold"
          onClick={() => {
            setSettings(!isSettingActive)
          }}
        >
          {isSettingActive ? 'Back' : 'Carousel'}
        </span>
        {!!playerStats && !!playerStats.spinsLeft && !isSettingActive && (
          <div className="text-center">
            <div>
              zoom content{' '}
              <button data-action="CARDS_ZOOM_OUT" onClick={_handleZoom}>
                -
              </button>
              <span className="w-8 text-center inline-block">{cardScale.toFixed(1)}</span>
              <button data-action="CARDS_ZOOM_IN" onClick={_handleZoom}>
                +
              </button>
            </div>
          </div>
        )}
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
              <button
                className="btn-logout button is-info is-medium"
                onClick={() => {
                  setPlayer('')
                  setRound(shuffle(rounds[mode][0]))
                }}
              >
                Thank You!
              </button>
            </div>
          </div>
        )}

        <div className={cx('screen', { active: !!playerStats && !!playerStats.spinsLeft })}>
          <div className="screen-content">
            <div style={{ transform: `scale(${cardScale})` }}>
              <p className="has-text-grey-dark is-size-6">Here's how your cards are arranged right now.</p>
              <div className="card-arrangements">
                {round.map((item, index) => {
                  return (
                    <div className="card" key={`item-${item}-${index}`}>
                      <div>
                        <img src={logos[`logo${item}`]} alt={item} />
                      </div>
                    </div>
                  )
                })}
              </div>
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
            {!prize && (
              <div className="text-center">
                <div>
                  zoom content{' '}
                  <button data-action="CAROUSEL_ZOOM_OUT" onClick={_handleZoom}>
                    -
                  </button>
                  <span className="w-8 text-center inline-block">{carouselScale.toFixed(1)}</span>
                  <button data-action="CAROUSEL_ZOOM_IN" onClick={_handleZoom}>
                    +
                  </button>
                </div>
              </div>
            )}
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
              <div className={`carousel-container`} style={{ transform: `scale(${carouselScale})` }}>
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
                        <img src={logos[`logo${item}`]} alt={item} />
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
        <div className={cx('screen settings', { active: isSettingActive })}>
          <div className="screen-content">
            <div className="mode">
              <div>Mode</div>
              <div>
                <ModeDropdown mode={mode} setMode={setMode} player={player} />
              </div>
            </div>
            <Players
              active={isSettingActive}
              playersMap={playersMap}
              player={player}
              setPlayersMap={setPlayersMap}
              setPlayer={setPlayer}
            />
          </div>
        </div>
      </main>
      <div className={cx('s-modal', { active: !!prizeWon })}>
        <div className="s-modal-content">
          <div className="is-size-4">Congratulations!!!</div>
          <div className="subtitle is-size-5">You won</div>
          <div className="title is-size-1">
            <img src={logos[`logo${prize}`]} alt={prize} />
          </div>
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
