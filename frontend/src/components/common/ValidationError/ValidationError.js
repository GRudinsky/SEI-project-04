import React from 'react'

export default function ValidationError({ validationCondition }) {
  return ( 
    <>
      {validationCondition && <p className="small-text danger">{validationCondition}</p>}
    </> )
}