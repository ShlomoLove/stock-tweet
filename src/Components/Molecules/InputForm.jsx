import React from 'react'
import styled from 'styled-components'
import SymbolTextField from '../Atoms/SymbolTextField'
import SubmitButton from '../Atoms/SubmitButton'

const StyledForm = styled.form`

`

const InputForm = props => {
  const { onClickEvent, storeSymbols, inputValue } = props
  return (
    <>
    <StyledForm>
      <SymbolTextField storeSymbols={storeSymbols} inputValue={inputValue} />
      <SubmitButton onClickEvent={onClickEvent}/>
    </StyledForm>
    </>
  )
}

export default InputForm