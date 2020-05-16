import React from 'react'
import styled from 'styled-components'

const TweetContainer = styled.div`

`

const Tweet = props => {
  const { message, time } = props
  return (
    <>
      <TweetContainer>{message}</TweetContainer>
    </>
  )
}

export default Tweet