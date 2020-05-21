import React from 'react'
import styled from 'styled-components'
import { TextField } from '@material-ui/core'

const StyledTextField = styled(TextField) `
  width: 28vw; 
  background: snow; 
`

const SymbolTextField = props => {
  const { storeSymbols, inputValue } = props
  return (
    <>
      <StyledTextField 
        label="Enter Stock Symbols" 
        value={ inputValue } 
        variant="filled" 
        onChange={(e) => storeSymbols(e.target.value)}
      />
    </>
  )
}

export default SymbolTextField