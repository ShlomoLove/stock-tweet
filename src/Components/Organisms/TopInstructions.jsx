import React from 'react'
import styled from 'styled-components'

const TopInstructionsContainer = styled.div `
  width: 100%; 
  max-width: 1100px;
  background: #FF6347;
  border: .25px solid grey;
`

const InstructionText = styled.p `
  font-family: 'Roboto', sans-serif;
  font-weight: 200; 
  font-size: 2.1vw;
  color: white;
  margin: .5vw;
  text-align: center; 

  @media(min-width: 1100px) {
    font-size: 22px; 
  }

  @media(max-width: 500px) {
    font-size: 14px; 
  }
`

const TopInstructions = () => {
  return (
    <TopInstructionsContainer>
      <InstructionText>
        Welcome to the Stock Twits App. 
        <br/>This application was completed as part of a coding challenge to call on the StockTwits API. 
        <br/>As the user you can enter the symbols of interested stocks and the app will then display the pertinent tweets. 
        <br/>Since the StockTwits API only allows 200 calls per hour, this app limits the user to 5 stock symbols in the subscription list. The app automatically checks the api every 90 seconds for new tweets. 
      </InstructionText>
    </TopInstructionsContainer>
  )
}

export default TopInstructions