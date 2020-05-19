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
      mainMessages: [],
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
    if (!initiatedCall) {
      this.setState({ initiatedCall: true, inputValue: '' })
      setTimeout(this.intervalSymbolCall, 45000)
    } else {
      this.setState({inputValue: ''})
    }
  }

  intervalSymbolCall = () => {
    const { subscribedSymbols } = this.state
    this.getSymbols(subscribedSymbols)
    setTimeout(this.intervalSymbolCall, 45000)
  }

  getSymbols = (symbols) => {
    const { subscribedSymbols, mainMessages } = this.state
    const newStateObj = { }
    const newMessages = [{messages: mainMessages}]
    axios
      .all(symbols.map(symbol => axios.get(`/tweets/${symbol}`)))
      .then(responses => {
        responses.map(response => {
          let stockSymbol = response.data.symbol.symbol
          if (!this.state[stockSymbol]) {
            newStateObj[stockSymbol] = {symbol: response.data.symbol, messages: response.data.messages}
            newMessages.push({messages: response.data.messages})
          }
      })
      const sortedMessages = this.sortMessages(newMessages)
      this.setState(newStateObj)
    })
      .catch(error => console.log('error in api call', error))
  }

  sortMessages = (messages) => {
    if (messages.length < 1) return
    let mergedMessages = messages[0]
    if (messages.length === 1) return mergedMessages

    for (let i = 1; i < messages.length; i++) {
    }


    if (main.length < 1) return newMessages
    let mergedArray = []
    let indexA = 0, indexB = 0, current = 0
  }
    

  sortArrays = (arrayA, arrayB) => {
    while (current < (main.length + newMessages.length)) {
      let isMainEmpty = indexA >= main.length
      let isNewMessagesEmpty = indexB >= newMessages.length
      if (!isNewMessagesEmpty && (isMainEmpty || newMessages[indexB].created_at >= main[indexA].created_at)) {
        mergedArray[current] = newMessages[indexB]
        indexB += 1
      } else {
        mergedArray[current] = main[indexA]
        indexA += 1
      }
      current += 1
    }
    return mergedArray
  }

  symbolAPICall = (stock) => {
    const { featuredFeed, mainMessages } = this.state
    // API call routed through the server to bypass CORS issue.
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
      // concat the two arrays
      let combinedMessages = [...newMessages, ...oldMessages]
      let symbolObject = { messages: combinedMessages, symbol: data.symbol }
      return symbolObject
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