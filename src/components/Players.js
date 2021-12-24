/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

const TAGS_MODE_MAP = {
  kids: 'is-success',
  kiddos: 'is-info',
  adults: 'is-warning',
}

function CurrentPlayer({ playersMap, active, player, setPlayer, setPlayersMap }) {
  if (!active) {
    return null
  }
  const _onDeleteClick = (data, e) => {
    e.preventDefault()
    e.stopPropagation()
    const newPlayersMap = { ...playersMap }
    delete newPlayersMap[data]
    setPlayersMap({
      ...newPlayersMap,
    })
    if (data === player) {
      setPlayer('')
    }
  }
  const playersArray = Object.keys(playersMap)
    .filter(name => !playersMap[name].spinsLeft)
    .sort((a, b) => {
      return playersMap[b].money - playersMap[a].money
    })
  return (
    <div className="players">
      <p className="menu-label">Players</p>
      <ul className="menu-list">
        {playersArray.map(name => {
          const mode = playersMap[name].mode
          return (
            <li key={name} className="">
              <div className="menu-item">
                <div>
                  <span className={`tag ${TAGS_MODE_MAP[mode]}`}>{mode}</span>{' '}
                  <span className="is-capitalized">{name}</span>
                </div>
                <span className="tag is-success is-medium">
                  {playersMap[name].money} <span className="delete" onClick={_onDeleteClick.bind(null, name)}></span>
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default CurrentPlayer
