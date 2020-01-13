import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import CurrencySelector from './CurrencySelector/CurrencySelector'

const refreshPage = () => window.location.reload(false)

const Header = ({ handleChange, currency, searches }) => (
  <header className="without-margin tenth-screen-high flex-row space-between">
    <div className="logo margin-width-1v" onClick={refreshPage}>
      <h5 className="without-margin bold-font italic-font">find_That_flight<FontAwesomeIcon icon={faPaperPlane} /></h5>
      {searches && (
        <p className="small-text without-margin">{searches.length} searches and counting</p>
      )}
    </div>
    <div className="flex-column centered margin-width-1v">
      <CurrencySelector
        handleChange={handleChange}
        currency={currency}
      />
    </div>
  </header>
)
export default Header