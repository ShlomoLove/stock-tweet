import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import StyledMainContainer from '../Components/Atoms/StyledMainContainer'
import StyledTitle from '../Components/Atoms/StyledTitle'
import TrendingFeeds from '../Components/Organisms/TrendingFeeds'
import TopInstructions from '../Components/Organisms/TopInstructions'
import ControlPanel from '../Components/Organisms/ControlPanel'
import TweetFeed from '../Components/Organisms/TweetFeed'

const StyledPrompt = styled.h4`
  font-family: 'Roboto', sans-serif;
  font-size: 1.8vw; 
  font-weight: 700;
  color: tomato; 
`

class MainPage extends Component {
  constructor () {
    super ()
    this.state = {
      inputValue: '',
      subscribedSymbols: [],
      mainMessages: [],
      featuredFeed: '',
      initiatedCall: false, 
      startPrompt: true,
      maxSymbols: false,
      APIError: false, 
    }
  }

  componentDidMount() {
    axios
    .get('/trending/')
    .then(({data}) => {
      this.setState({trending: data.symbols})
    })
    .catch(error => console.log('error in trending call', error))
  }

  storeSymbols = (symbol) => {
    const { subscribedSymbols } = this.state
    //initiate function on each change to decrease potential latency in onclick
    //remove the commas from each symbol to anticipate different user styles 
    let filteredSymbols = symbol.replace(/,/g, ' ')
    //create an array to accomodate multiple symbols and remove empty strings
    let symbolArray = filteredSymbols.toUpperCase().split(' ').filter(str => str.length > 0)
    const maxCheck = (symbolArray.length + subscribedSymbols.length > 5) ? true : false
    //update the state on each change
    this.setState({ symbolSearch: symbolArray, inputValue: symbol, startPrompt: false, maxSymbols: maxCheck, APIError: false })
  }

  onClickEvent = () => {
    const { symbolSearch, initiatedCall, subscribedSymbols, maxSymbols } = this.state
    if (maxSymbols === true) return
    this.getSymbols ( symbolSearch )
    if (!initiatedCall || subscribedSymbols.length < 1) {
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
    const { subscribedSymbols, mainMessages, featuredFeed } = this.state
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
      const newFeaturedFeed = featuredFeed ? featuredFeed : 'mainMessages'
      console.log (newFeaturedFeed, 'newFeaturedFeed')
      const sortedMessages = this.sortMessages(updatedMainMessages)
      newStateObj.featuredFeed = newFeaturedFeed
      newStateObj.mainMessages = sortedMessages 
      this.setState(newStateObj)
    })
      .catch(error => {
        this.setState({APIError: true})
      })
  }

  sortMessages = (messages) => {
    if (messages.length < 1) return
    if (messages.length === 1) return messages[0]
    let mergedMessages = messages[0]
    for (let i = 1; i < messages.length; i++) {
      mergedMessages = this.sortArrays(mergedMessages, messages[i])
    }
    let duplicateCheckObj = {}
    console.log (mergedMessages, 'before Check')
    for (let i = 0; i < mergedMessages.length; i++) {
      if (duplicateCheckObj[mergedMessages[i].id]) {
        mergedMessages.splice(i, 1)
        i -= 1
      } else {
        duplicateCheckObj[mergedMessages[i].id] = true
      }
    }
    console.log (mergedMessages, 'after Check')
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
      console.log (combinedMessages, 'combinedMessages in CombinedMessages')
      return {filteredNew, combinedMessages}
    } else {
      return { filteredNew: null, combinedMessages: original }
    }
  }

  setFeaturedFeed = (e) => {
    this.setState({ featuredFeed: e.target.value})
  }

  deleteSymbol = (symbol) => {
    const { subscribedSymbols, mainMessages } = this.state
    const filteredSubscribedArray = subscribedSymbols.filter(stock => stock !== symbol)
    const checkId = {}
    for (let tweet of this.state[symbol]) {
      checkId[tweet.id] = true
    }
    const filteredMainMessages = mainMessages.filter(tweet => !checkId[tweet.id])
    const updatedFeaturedFeed = filteredSubscribedArray.length > 0 ? 'mainMessages' : ''
    if (filteredSubscribedArray.length < 1) clearTimeout(this.intervalSymbolCall)
    const maxCheck = filteredSubscribedArray <= 5 ? false : true
    this.setState({featuredFeed: updatedFeaturedFeed, 
      subscribedSymbols:filteredSubscribedArray, 
      mainMessages: filteredMainMessages,
      maxSymbols: maxCheck,
      [symbol]: null,
      initiatedCall: (filteredSubscribedArray.length > 0)
    })  
  }
  
  componentWillUnmount() {
    clearTimeout(this.intervalSymbolCall)
  }

  render () {
    const { inputValue,
        featuredFeed,
        subscribedSymbols, 
        mainMessages, 
        trending,
        startPrompt,
        maxSymbols, 
        APIError 
      } = this.state
    const messageFeed = featuredFeed ? this.state[featuredFeed] : null
    let lengthObj = {}
    for (let symbol of subscribedSymbols) {
      lengthObj[symbol] = this.state[symbol].length
    }
    console.log (this.state)
    return (
      <>
        <StyledMainContainer>
          <TopInstructions/>
          <StyledTitle/>
          <TrendingFeeds trending={trending}/>
          {startPrompt ? <StyledPrompt>Enter Symbols to Get Started: use commas and/or spaces to separate Symbols</StyledPrompt> : null}
          {maxSymbols ? <StyledPrompt>You may only subscribe to Five Symbols at a Time</StyledPrompt> : null}
          {APIError ? <StyledPrompt>Stock Twits does not recognize symbol, please try again</StyledPrompt> : null}
          <ControlPanel
            inputValue={inputValue} 
            storeSymbols={this.storeSymbols} 
            onClickEvent={this.onClickEvent}
            subscribedSymbols={subscribedSymbols}
            setFeaturedFeed={this.setFeaturedFeed }
            featuredFeed={featuredFeed}
            deleteSymbol={this.deleteSymbol}
            mainLength={mainMessages.length}
            lengthObj={lengthObj}
          />
          {messageFeed && (
            <TweetFeed messageFeed={messageFeed}/>
            )} 
        </StyledMainContainer>
      </>
    )
  }
}

export default MainPage