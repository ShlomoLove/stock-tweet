import React from 'react'
import styled from 'styled-components'
import SymbolRadioGroup from './SymbolRadioGroup'
import { FormControl, FormLabel } from '@material-ui/core'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  justify-content: center;
  align-items: center;      
`

const StyledFormLabel = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1.75vw;
  color: #191970; 
  font-weight: 400;
  text-align: center;   

  @media(max-width: 700px) {
    font-size: 16px;
  }

  @media(min-width: 1100px) {
    font-size: 22px;  
  }
`

const FeedOptions = props => {
  const { subscribedSymbols, setFeaturedFeed, featuredFeed, deleteSymbol, lengthObj, mainLength } = props
  return (
    <>
      <FormContainer>
        <FormControl>
          <StyledFormLabel>Stock Twit Subscriptions</StyledFormLabel>
            <SymbolRadioGroup
              mainLength={mainLength}
              lengthObj={lengthObj}
              deleteSymbol={deleteSymbol}
              featuredFeed={featuredFeed}
              setFeaturedFeed={setFeaturedFeed}
              subscribedSymbols={subscribedSymbols}
            />
        </FormControl>
      </FormContainer>
    </>
  )
}

export default FeedOptions