import React from 'react'
import styled from 'styled-components'

const MainTitle = styled.div`
  display: flex; 
  flex-direction: row; 
  font-family: 'Roboto', sans-serif; 
  font-size: 10vw; 
  font-weight: 200;
  width: 100%;
  max-width: 1100px;
  justify-content: center;
  align-items: center;
  color: white;
  background: rgba(176, 196, 222, .8);
  
  @media(min-width: 1100px) {
    font-size: 90px; 
  }

  @media(max-width: 500px) {
    font-size: 45px; 
  }
`

const StyledTitle = () => {
  return (
    <>
      <MainTitle>Stock Twits</MainTitle>
    </>
  )
}

export default StyledTitle