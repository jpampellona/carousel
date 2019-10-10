/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useRef } from 'react'

function CurrentPlayer({ setPlayer, name }) {
  const _onClick = e => {
    e.preventDefault()
    setPlayer('')
  }
  return (
    <div className="current-player">
      <div className="tags has-addons are-medium">
        <span className="tag">Hi!</span>
        <span className="tag is-success is-capitalized">
          {name}
          <button className="delete is-medium" onClick={_onClick}></button>
        </span>
      </div>
    </div>
  )
}
export default CurrentPlayer
