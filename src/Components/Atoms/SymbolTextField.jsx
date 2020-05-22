import React from 'react'
import styled from 'styled-components'
import { TextField } from '@material-ui/core'

const StyledTextField = styled(TextField) `
  width: 28vw; 
  background: snow;

  @media(max-width: 500px) {
    width: 220px  ; 
  }
`

const SymbolTextField = props => {
  const { storeSymbols, inputValue } = props
  return (
    <>
      <StyledTextField 
        label="Enter Stock Symbols" 
        value={ inputValue } 
        variant="filled"
        onKeyDown={(e)=> storeSymbols(e)}
      />
    </>
  )
}

export default SymbolTextField