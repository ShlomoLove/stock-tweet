import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const StyledButton = styled(Button) `
  width: 120px;
  @media(max-width: 700px){
    width: 12vw;  
  }
`
const StyledButtonContainer = styled.div`
  margin-left: 1vw; 
`

const SubmitButton = props => {
  const { onClickEvent } = props
  return (
    <>
      <StyledButtonContainer>
        <StyledButton 
          color={'primary'} 
          variant="contained" 
          onClick={() => onClickEvent()}>
          Get Tweets
        </StyledButton> 
      </StyledButtonContainer>
    </>
  )
}

export default SubmitButton