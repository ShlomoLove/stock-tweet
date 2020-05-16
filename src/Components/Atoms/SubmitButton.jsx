import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const StyledButton = styled(Button) `

`

const SubmitButton = props => {
  const { onClickEvent } = props
  return (
    <>
      <StyledButton color={'primary'} variant="contained" onClick={() => onClickEvent()}>Submit</StyledButton>
    </>
  )
}

export default SubmitButton