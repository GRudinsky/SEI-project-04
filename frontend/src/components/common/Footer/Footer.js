import React from 'react'
import './Footer.scss'

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer with-shadow tenth-screen-high flex-row flex-end">
        <div className="flex-column centered margin-width-1v small-text">
          <a className="black-text" href="http://grudinsky.com" target="_blank" rel="noopener noreferrer">GRudinsky 2019</a> 
        </div>
      </footer>
    )
  }
}