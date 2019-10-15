/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import cx from 'classnames'

function ModeDropdown({ player, mode, setMode }) {
  const [active, setActive] = useState(false)
  const _onClick = e => {
    e.preventDefault()
    setActive(!active)
  }
  const _changeMode = (data, e) => {
    e.preventDefault()
    setMode(data)
    setActive(false)
  }
  return (
    <div className={cx('dropdown is-right', { 'is-active': active })}>
      <div className="dropdown-trigger">
        <button
          className="button"
          disabled={!!player}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={_onClick}
        >
          <span className="is-capitalized">{mode}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <a href="#" className="dropdown-item" onClick={_changeMode.bind(null, 'kids')}>
            Kids
          </a>
          <a href="#" className="dropdown-item" onClick={_changeMode.bind(null, 'adults')}>
            Adults
          </a>
        </div>
      </div>
    </div>
  )
}
export default ModeDropdown
