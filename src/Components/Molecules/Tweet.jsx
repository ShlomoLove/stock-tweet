import React from 'react'
import styled from 'styled-components'
import Moment from 'react-moment';
import 'moment-timezone';

const TweetContainer = styled.div`
  background: white;
  border: .5px solid grey;
  border-radius: 3px; 
  margin: 10px;
  display: flex; 
  flex-direction: row;
  overflow-wrap: break-word;
  min-height: 100px; 
`

const StyledIcon = styled.img`
  margin-top: 3px;
  border-radius: 50%; 
`

const TextContainer = styled.div`
  width: 90%; 
`

const IconContaier = styled.div`
  width: 10%; 
  display: flex;
  align-items: start;
  justify-content: center; 

`

const TweetText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 200;
  margin: 5px;  
`

const FollowerSpan = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 200;
  margin: 5px;
  color: black;   
`

const UserName = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 400;
  margin: 5px;
  color: #00008B;
`

const TimePast = styled(Moment)`
  font-family: 'Roboto', sans-serif; 
  font-size: 16px; 
  font-weight: 400; 
  margin: 5px;  
`


const SymbolSpan = styled.span`
font-family: 'Roboto', sans-serif;
font-size: 16px;
font-weight: 400;
`

const Tweet = props => {
  const { message, time, tweetSymbols, user, id } = props
  return (
    <>
      <TweetContainer>
        <IconContaier>
          <StyledIcon src={user.avatar_url}/>
        </IconContaier>
        <TextContainer>
  <UserName>{user.username} <FollowerSpan>followers: {user.followers}</FollowerSpan></UserName>
          <TimePast fromNow>{time}</TimePast>
          <TweetText>Symbols:{tweetSymbols.map(symbol => (<SymbolSpan> {symbol.symbol} </SymbolSpan> ))} </TweetText>
          <TweetText>{message}</TweetText>
        </TextContainer>
      </TweetContainer>
    </>
  )
}

export default Tweet