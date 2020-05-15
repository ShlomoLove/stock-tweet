import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

class MainPage extends Component {
  constructor () {
    super ()
    this.state = {

    }
  }

  storeSymbols = (symbol) => {
    //remove the commas from each symbol to anticipate different user styles 
    let filteredSymbols = symbol.replace(/,/g, ' ')
    //create an array to accomodate multiple symbols and remove empty strings
    let symbolArray = filteredSymbols.toUpperCase().split(' ').filter(str => str.length > 0)
    //update the state with on each change
    this.setState({ storedSymbols: symbolArray })
  }

  symbolAPICall = (stock) => {
    axios
    .get(`/tweets/${stock}`)
    .then(({data}) => {
      console.log (data)
    })
    .catch (error => console.log('error', error)) 
  }

  getSymbols = () => {
    const { storedSymbols } = this.state
    storedSymbols.map(stock => {
      this.symbolAPICall(stock)
    })
  }

  render () {
    console.log (this.state)
    return (
      <form>
        <TextField id="filled-basic" label="Filled" variant="filled" onChange={(e) => this.storeSymbols(e.target.value)} />
        <Button color={'primary'} variant="contained" onClick={() => this.getSymbols()}>Submit</Button>
      </form>
    )
  }
}

export default MainPage