import React from 'react'
import styled from 'styled-components'
import SymbolTextField from '../Atoms/SymbolTextField'
import SubmitButton from '../Atoms/SubmitButton'

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row; 
  align-items: center;
  justify-content: center;
  margin-top: 10px;     
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