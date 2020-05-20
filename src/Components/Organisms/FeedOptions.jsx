import React from 'react'
import styled from 'styled-components' 
import { makeStyles } from '@material-ui/core/styles'
import { RadioGroup, Radio, FormControl, FormControlLabel, FormLabel } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'

const FeedContainer = styled.div`
 
`

const FeedOptions = props => {
  const { subscribedSymbols, setFeaturedFeed, featuredFeed } = props
  return (
    <>
    <FeedContainer>
      <FormControl component="fieldset">
        <FormLabel component="legend">Choose Feed</FormLabel>
        <RadioGroup 
          aria-label="symbols" 
          name="symbols" 
          value={featuredFeed} 
          onChange={setFeaturedFeed}
        >
          {subscribedSymbols.length > 0 && (
            <div>
          <FormControlLabel value="mainMessages" control={<Radio />} label="All Messages" />
            {subscribedSymbols.map(symbol => (
              <div>
                <FormControlLabel value={symbol} control={<Radio />} label={symbol}/> <DeleteForever color="secondary"/>
              </div>
            ))}
            </div>
            )}
        </RadioGroup>
      </FormControl>
    </FeedContainer>
    </>
  )
}

export default FeedOptions