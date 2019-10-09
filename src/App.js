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
  0: [1000, 1000, 500, 500, 500, 500, 200, 200, 200, 200, 200, 200],
}

const initialMoney = 0
const initalRound = shuffle(rounds[initialMoney])
const initialPlayer = localStorage.getItem('__PLAYER__')

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
  const [prize, setPrize] = useState(0)
  const [player, setPlayer] = useState(initialPlayer || '')
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
    if (deltaX >= 100) {
      setPrize(_prize || 0)
    } else {
      // swipe faster
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
    localStorage.setItem('__PLAYER__', player)
  }, [player])
  useInterval(
    () => {
      setSwipeStart(currentPageX)
    },
    swipeStart ? ALLOWED_TIME : null
  )
  return (
    <Fragment>
      <nav className="navbar is-info" role="navigation" aria-label="main navigation">
        <div className="is-pulled-left">
          <div className="navbar-brand">
            <span className="navbar-item image has-text-weight-bold">X-mas Carousel</span>
          </div>
        </div>
        <div className="container is-fluid">
          <div className="navbar-item">
            {!player && <AddPlayerForm setPlayer={setPlayer} />}
            {!!player && <CurrentPlayer name={player} setPlayer={setPlayer} />}
          </div>
        </div>
      </nav>
      <div
        className="app"
        onTouchStart={_onTouchStart}
        onTouchMove={_onTouchMove}
        onTouchEnd={_onTouchEnd}
        onMouseDown={_onMouseDown}
        onMouseMove={_onMouseMove}
        onMouseUp={_onMouseUp}
      >
        <div className="carousel-container">
          <div
            className="carousel"
            style={{
              transform: 'rotateY(' + degree + 'deg)',
              transitionDuration: `${transitionDuration}s`,
            }}
            onTransitionEnd={_onTransitionEnd}
          >
            {round.map((item, index) => {
              return (
                <div
                  className="item"
                  key={`item-${item}-${index}`}
                  style={{
                    backgroundColor: `${COLORS[item]}`,
                    transform: `rotateY(${index * ANGLE}deg) translateZ(${round.length * 20}px)`,
                  }}
                >
                  {item}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App
