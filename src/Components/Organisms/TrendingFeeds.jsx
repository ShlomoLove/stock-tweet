import React from 'react'
import styled from 'styled-components' 

const TrendingContainer = styled.div `
  display: grid; 
  width: 96%;
  max-width: 1100px;
  background: #F0F8FF;
  grid-template-columns: 1fr 1fr 1fr;
  border: solid .25px grey;
  margin: 5px; 
`

const StyledSymbols = styled.div`
  font-family: 'Roboto', sans-serif; 
  font-size: 1.25vw;
  font-weight: 600; 
  color: #00008B;
`

const StyledName = styled.span `
  font-family: 'Roboto', sans-serif; 
  font-size: 1.15vw;
  font-weight: 200; 
  color: #00008B;
`

const TrendingTitle = styled.h4 `
  font-family: 'Roboto', sans-serif;
  font-size: 4vw;
  font-weight: 400;
  color: #00008B;
  margin-top: 1vw; 
  margin-bottom: 1vw;
`

const TrendingFeeds = props => {
  const { trending } = props
  return (
    <>
      <TrendingTitle>30 Trending Stock Twits Symbols</TrendingTitle>
      <TrendingContainer>
        {trending && (
          trending.map(symbol=> (
          <StyledSymbols>{symbol.symbol} <StyledName>{symbol.title}</StyledName></StyledSymbols>
          ))
        )}
      </TrendingContainer>
    </>
  )
}

export default TrendingFeeds