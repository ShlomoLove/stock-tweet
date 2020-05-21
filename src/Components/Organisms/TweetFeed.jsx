import React from 'react'
import styled from 'styled-components'
import Tweet from '../Molecules/Tweet'

const MainContainer = styled.div `
  width: 100%;
  max-width: 1100px;
  background: rgba(176, 196, 222, .8); 
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
            tweetSymbols={tweet.symbols}
            user={tweet.user}
            id={tweet.id}
          />
        ))}
      </MainContainer>
    </>
  )
}

export default TweetFeed