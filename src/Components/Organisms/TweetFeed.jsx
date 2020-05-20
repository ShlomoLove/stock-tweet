import React from 'react'
import styled from 'styled-components'
import Tweet from '../Molecules/Tweet'

const MainContainer = styled.div `
  border: solid blue; 
  width: 100%; 
`

const TweetFeed = props => {
  const { messageFeed } = props
  return (
    <>
      <MainContainer>
        
        {messageFeed.map((tweet, index) => (
          <Tweet 
            message={tweet.body} 
            key={tweet.id} 
            time={tweet.created_at} 
          />
        ))}
      </MainContainer>
    </>
  )
}

export default TweetFeed