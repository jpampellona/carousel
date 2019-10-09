/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useRef } from 'react'

function CurrentPlayer({ setPlayer, name }) {
  const _onClick = e => {
    setPlayer('')
  }
  return (
    <div className="current-player">
      <span className="greeting">Hi</span>
      <div className="tags has-addons are-medium">
        <span className="tag is-warning is-capitalized">{name}</span>
        <button className="tag is-delete is-danger" onClick={_onClick}></button>
      </div>
    </div>
  )
}
export default CurrentPlayer
