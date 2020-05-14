import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

class MainPage extends Component {
  constructor () {
    super ()
    this.state = {

    }
  }

  getSymbol = (symbol) => {
    let filteredSymbol = symbol.replace(/,/g, '')
    let symbolArray = filteredSymbol.split(' ')
    this.setState({ symbolLookup: symbolArray})
  }

  render () {
    console.log (this.state)
    return (
      <form>
        <TextField id="filled-basic" label="Filled" variant="filled" onChange={(e) => this.getSymbol(e.target.value)} />
      </form>
    )
  }
}

export default MainPage