import React from 'react'
import styled from 'styled-components'
import FeedOptions from '../Molecules/FeedOptions'
import InputForm from '../Molecules/InputForm'

const ControlPanelContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: solid green;
  width: 100%; 
  max-width: 1100px; 
`

const ControlPanel = props => {
  const { inputValue, 
        storeSymbols,
        onClickEvent, 
        subscribedSymbols, 
        setFeaturedFeed,
        featuredFeed,
        deleteSymbol,
        mainLength,
        lengthObj,
      } = props
  
  return (
    <ControlPanelContainer>
      <InputForm
        inputValue={inputValue} 
        storeSymbols={storeSymbols} 
        onClickEvent={onClickEvent}
      />
      <FeedOptions
        subscribedSymbols={subscribedSymbols}
        setFeaturedFeed={setFeaturedFeed }
        featuredFeed={featuredFeed} 
        deleteSymbol={deleteSymbol}
        mainLength={mainLength}
        lengthObj={lengthObj}
      />
    </ControlPanelContainer>
  )
}

export default ControlPanel