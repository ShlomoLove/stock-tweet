import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import InputForm from '../Components/Molecules/InputForm'
import TweetFeed from '../Components/Organisms/TweetFeed'

class MainPage extends Component {
  constructor () {
    super ()
    this.state = {
      inputValue: '',
      subscribedSymbols: [],
      featuredFeed: {},
      initiatedCall: false
    }
  }

  storeSymbols = (symbol) => {
    //initiate function on each change to decrease potential latency in onclick
    //remove the commas from each symbol to anticipate different user styles 
    let filteredSymbols = symbol.replace(/,/g, ' ')
    //create an array to accomodate multiple symbols and remove empty strings
    let symbolArray = filteredSymbols.toUpperCase().split(' ').filter(str => str.length > 0)
    //update the state on each change
    this.setState({ symbolSearch: symbolArray, inputValue: symbol })
  }

  onClickEvent = () => {
    const { symbolSearch, initiatedCall } = this.state
    this.getSymbols ( symbolSearch )
    this.setState({ inputValue: '' })
    if (!initiatedCall) {
      this.setState({ initiatedCall: true })
      setTimeout(this.intervalSymbolCall, 45000)
    }
  }

  intervalSymbolCall = () => {
    const { subscribedSymbols, calls } = this.state
    this.getSymbols(subscribedSymbols)
    setTimeout(this.intervalSymbolCall, 45000)
  }

  getSymbols = (symbols) => {
    symbols.map(stock => {
      this.symbolAPICall(stock)
    })
  }

  symbolAPICall = (stock) => {
    const { subscribedSymbols, featuredFeed } = this.state
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
      this.setState({
        [stock]: { symbol:data.symbol, messages:combinedMessages },
        subscribedSymbols,
        featuredFeed: { symbol:data.symbol, messages:combinedMessages }
      })
    })
    .catch (error => console.log('error', error)) 
  }

  render () {
    const { inputValue, featuredFeed} = this.state
    console.log (this.state)
    return (
      <>
        <InputForm 
          inputValue={inputValue} 
          storeSymbols={this.storeSymbols} 
          onClickEvent={this.onClickEvent} 
        />
        {featuredFeed.messages && (
          <TweetFeed featuredFeed={featuredFeed}/>
        )}
      </>
    )
  }
}

export default MainPage