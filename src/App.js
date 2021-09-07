import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import SearchLibrary from './SearchLibrary'
import ShowLibrary from './ShowLibrary'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class BooksApp extends React.Component {
  state = {
    crBooks: [],
    wtrBooks: [],
    frBooks: []
  }

  render() {
    return (
      <div className="app">

        {/* Route: is home page? */}
        <Route exact path='/' render={() => (
            <ShowLibrary>
            </ShowLibrary>
          )} />

        {/* Route: is search page? */}
        <Route path='/search' render={() => (
            <SearchLibrary>
              Add a book
            </SearchLibrary>
          )} />

      </div>
    )
  }
}

export default BooksApp
