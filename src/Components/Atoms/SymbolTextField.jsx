import React from 'react'
import styled from 'styled-components'
import { TextField } from '@material-ui/core'

const StyledTextField = styled(TextField) `

`

const SymbolTextField = props => {
  const { storeSymbols, inputValue } = props
  return (
    <>
      <StyledTextField id="filled-basic" label="Filled" value={ inputValue } variant="filled" onChange={(e) => storeSymbols(e.target.value)}/>
    </>
  )
}

export default SymbolTextField