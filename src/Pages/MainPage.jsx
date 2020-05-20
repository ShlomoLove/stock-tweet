import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import InputForm from '../Components/Molecules/InputForm'
import TweetFeed from '../Components/Organisms/TweetFeed'
import FeedOptions from '../Components/Organisms/FeedOptions'

class MainPage extends Component {
  constructor () {
    super ()
    this.state = {
      inputValue: '',
      subscribedSymbols: [],
      mainMessages: [],
      featuredFeed: '',
      initiatedCall: false, 
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
      this.setState({ initiatedCall: true, inputValue: '', symbolSearch: []})
      setTimeout(this.intervalSymbolCall, 60000)
    } else {
      this.setState({inputValue: '', symbolSearch: []})
    }
  }

  intervalSymbolCall = () => {
    const { subscribedSymbols } = this.state
    this.getSymbols(subscribedSymbols)
    setTimeout(this.intervalSymbolCall, 90000)
  }

  getSymbols = (symbols) => {
    const { subscribedSymbols, mainMessages } = this.state
    const newStateObj = { }
    newStateObj.subscribedSymbols = subscribedSymbols.length > 0 ? subscribedSymbols : []
    const updatedMainMessages = [mainMessages]
    axios
    // API call routed through the server to bypass CORS issue.
      .all(symbols.map(symbol => axios.get(`/tweets/${symbol}`)))
      .then(responses => {
        responses.map(response => {
          let stockSymbol = response.data.symbol.symbol
          if (!this.state[stockSymbol]) {
            newStateObj[stockSymbol] = response.data.messages
            updatedMainMessages.push(response.data.messages)
            newStateObj.subscribedSymbols.push(stockSymbol)
          } else {
            let original = this.state[stockSymbol]
            let newMessages = response.data.messages
            let combinedMessages = this.combineMessages(original, newMessages)
            newStateObj[stockSymbol] = combinedMessages.combinedMessages
            if (combinedMessages.filteredNew) updatedMainMessages.push(combinedMessages.filteredNew)
        }
      })
      const sortedMessages = this.sortMessages(updatedMainMessages)
      newStateObj.mainMessages = sortedMessages 
      this.setState(newStateObj)
    })
      .catch(error => console.log('error in api call', error))
  }

  sortMessages = (messages) => {
    if (messages.length < 1) return
    if (messages.length === 1) return messages[0]
    let mergedMessages = messages[0]
    for (let i = 1; i < messages.length; i++) {
      mergedMessages = this.sortArrays(mergedMessages, messages[i])
    }
    return mergedMessages
  }  

  sortArrays = (arrayA, arrayB) => {
    let mergedArray = []
    let indexA = 0, indexB = 0, current = 0
    while (current < (arrayA.length + arrayB.length)) {
      let isArrayAEmpty = indexA >= arrayA.length
      let isArrayBEmpty = indexB >= arrayB.length
      if (!isArrayBEmpty && (isArrayAEmpty || arrayB[indexB].created_at >= arrayA[indexA].created_at)) {
        mergedArray[current] = arrayB[indexB]
        indexB += 1
      } else {
        mergedArray[current] = arrayA[indexA]
        indexA += 1
      }
      current += 1
    }
    return mergedArray
  }

  combineMessages = (original, newMessages) => {
    let filteredNew = []
    if (original.length > 0) {
      // initiate a loop to merge the two sets of messages
      // the loop determines which messages are new and unique
      for (let tweet of newMessages) {
        if (tweet.id !== original[0].id) {
          filteredNew.push(tweet)
        } else {
          break
        }
      }
    }
    // concat the two arrays
    if (filteredNew.length !== undefined) {
      const combinedMessages = [...filteredNew, ...original]
      return {filteredNew, combinedMessages}
    } else {
      return { filteredNew: null, combinedMessages: original }
    }
  }

  setFeaturedFeed = (e) => {
    this.setState({ featuredFeed: e.target.value})
  }
  
  render () {
    const { inputValue, featuredFeed, subscribedSymbols, mainMessages } = this.state
    const messageFeed = featuredFeed ? this.state[featuredFeed] : null
    console.log (this.state)
    return (
      <>
        <InputForm 
          inputValue={inputValue} 
          storeSymbols={this.storeSymbols} 
          onClickEvent={this.onClickEvent} 
        />
        <FeedOptions
          subscribedSymbols={subscribedSymbols}
          setFeaturedFeed={this.setFeaturedFeed }
          featuredFeed={featuredFeed}
        />
        {messageFeed && (
          <TweetFeed messageFeed={messageFeed}/>
        )}
      </>
    )
  }
}

export default MainPage