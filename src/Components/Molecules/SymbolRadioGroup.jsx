import React from 'react'
import styled from 'styled-components'
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors'

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const FormEntryContainer = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center;
  color: #191970;
  font-family: 'Roboto', sans-serif; 
  font-weight: 400; 
  font-size: 17px;
`

const StyledRadio = withStyles({
  root: {
    color: indigo[400],
    '&$checked': {
      color: indigo[900],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />)

const IconDiv = styled.div ` 
  margin-left: .25vw;
  margin-right: 2vw;  
`

const StyledFormLabel = styled(FormControlLabel)`
  font-family: 'Roboto', sans-serif;
  color: #191970; 
  font-style: italic;
  width: 150px;   
`  

const SymbolRadioGroup = props => {
  const { subscribedSymbols,
    setFeaturedFeed,
    featuredFeed, 
    deleteSymbol, 
    lengthObj, 
    mainLength 
  } = props


  return (
    <>
      <RadioGroup 
        aria-label="symbols" 
        name="symbols" 
        value={featuredFeed} 
        onChange={setFeaturedFeed}
      >
        {subscribedSymbols.length > 0 && (
        <StyledDiv>
          <FormEntryContainer>
            <StyledFormLabel value="mainMessages" control={<StyledRadio />} label="All Messages"/> {mainLength} tweets           
          </FormEntryContainer>
          {subscribedSymbols.map(symbol => (
          <FormEntryContainer>
            <StyledFormLabel value={symbol} control={<StyledRadio />} label={symbol}/> {lengthObj[symbol]} tweets 
            <IconDiv>
              <DeleteForever onClick={()=> deleteSymbol(symbol)} color="secondary"/>
            </IconDiv>
          </FormEntryContainer>
          ))}
        </StyledDiv>
        )}
      </RadioGroup>
    </>
  )

}

export default SymbolRadioGroup