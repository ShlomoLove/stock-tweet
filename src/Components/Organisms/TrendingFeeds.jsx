import React from 'react'
import styled from 'styled-components' 

const TrendingContainer = styled.div `
  display: grid; 
  width: 98%;
  max-width: 1100px;
  background: #F0F8FF;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: solid .25px grey;
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
  font-size: 2.5vw;
  font-weight: 400;
  color: #00008B;
  margin-top: 1vw; 
  margin-bottom: 1vw;

  @media(min-width: 1100px) {
    font-size: 25px;
  }
`
const TrendingFeeds = props => {
  const { trending } = props
  return (
    <>
      <TrendingTitle>Some Trending Stock Symbols</TrendingTitle>
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