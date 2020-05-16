import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

class MainPage extends Component {
  constructor () {
    super ()
    this.state = {
      inputValue: '',
      subscribedSymbols: [],
      calls: 0,
    }
  }

  storeSymbols = (symbol) => {
    //initiate function on each change to decrease potential latency in onclick
    //remove the commas from each symbol to anticipate different user styles 
    let filteredSymbols = symbol.replace(/,/g, ' ')
    //create an array to accomodate multiple symbols and remove empty strings
    let symbolArray = filteredSymbols.toUpperCase().split(' ').filter(str => str.length > 0)
    //update the state with on each change
    this.setState({ symbolSearch: symbolArray, inputValue: symbol })
  }

  onClickEvent = () => {
    const { symbolSearch } = this.state
    this.getSymbols ( symbolSearch )
    this.setState({ inputValue: '' })
    setTimeout(this.intervalSymbolCall, 10000)
  }

  intervalSymbolCall = () => {
    const { subscribedSymbols, calls } = this.state
    console.log (calls)
    this.getSymbols(subscribedSymbols)
    setTimeout(this.intervalSymbolCall, 30000)
  }

  getSymbols = (symbols) => {
    symbols.map(stock => {
      this.symbolAPICall(stock)
    })
  }

  symbolAPICall = (stock) => {
    const { subscribedSymbols, calls } = this.state
    // API call routed through the server to by-pass CORS issue.
    axios
    .get(`/tweets/${stock}`)
    .then(({data}) => {
      // create array of the previous messages if the symbol exists in state
      let oldMessages = this.state[stock] ? this.state[stock].messages : []
      // create array to place new messages
      // if symbol doesn't exist in state all messages are placed in array
      let newMessages = this.state[stock] ? [] : data.messages
      // initiate a loop to merge the two sets of messages
      // the loop determines which messages are new and unique
      if (oldMessages.length > 0) {
        for (let i of data.messages) {
          if (i.id !== oldMessages[0].id) {
            newMessages.push(i)
          } else {
            break
          }
        }
      }
      if (!this.state[stock]) subscribedSymbols.push(stock)
      // concat the two arrays and set state
      let combinedMessages = [...newMessages, ...oldMessages]
      let newCall = calls
      newCall += 1
      this.setState({
        [stock]: { symbol:data.symbol, messages: combinedMessages },
        subscribedSymbols,
        calls: newCall
      })
    })
    .catch (error => console.log('error', error)) 
  }

  render () {
    const { inputValue } = this.state
    console.log (this.state)
    return (
      <form>
        <TextField id="filled-basic" label="Filled" value={ inputValue } variant="filled" onChange={(e) => this.storeSymbols(e.target.value)} />
        <Button color={'primary'} variant="contained" onClick={() => this.onClickEvent()}>Submit</Button>
      </form>
    )
  }
}

export default MainPage