/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useRef } from 'react'

function AddPlayerForm({ setPlayer, playersMap, setPlayersMap }) {
  // console.log('props: ', props)
  const [name, setName] = useState('')
  const inputEl = useRef(null)
  const _onChange = e => {
    setName(e.target.value)
  }
  const _onSubmit = e => {
    e.preventDefault()
    if (!name.trim()) {
      inputEl.current.focus()
    } else {
      const playerName = name.toLowerCase()
      setPlayer(playerName)
      if (!playersMap[playerName]) {
        setPlayersMap({
          ...playersMap,
          [playerName]: {
            money: 0,
            ready: false,
            finished: false,
          }
        })
      }
    }
  }
  return (
    <form action="#" onSubmit={_onSubmit}>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            ref={inputEl}
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={_onChange}
          />
        </div>
        <div className="control">
          <button type="submit" className="button is-success">
            Add Player
          </button>
        </div>
      </div>
    </form>
  )
}
export default AddPlayerForm
