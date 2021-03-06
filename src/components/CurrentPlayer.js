/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

function CurrentPlayer({ setPlayer, name, money }) {
  return (
    <div className="current-player">
      <div className="tags has-addons are-medium">
        <span className="tag is-success is-capitalized">{name}</span>
        <span className="tag">
          {money}
        </span>
      </div>
    </div>
  )
}
export default CurrentPlayer
