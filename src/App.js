import React from 'react'
import './App.css'
import SearchLibrary from './SearchLibrary'
import ShowLibrary from './ShowLibrary'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  
  state = {
    allBooks: []
  }
  
  
  // On Initial Load: retrieve all books from server
  componentDidMount() {
    BooksAPI.getAll()
      .then((allBooks) => {
        this.setState(() => ({
          allBooks: allBooks
        }))
    })
  }
  
  
  // Method that handles transfer of books between shelf - using state
  updateBookLocation = (book , newShelf) => {
   
    // move the book into its new shelf, at new shelf selection
    if (newShelf !== 'none') {
      
      // update the book's shelf value and re-add it to the list
      book.shelf = newShelf
      this.setState(prevState => ({
      	myBooks: prevState.allBooks.filter((b) => {
          return b.id !== book.id
        }).concat(book)
      }))
    }
    
    // move the book out of all shelves, at "none" selection
    else {
      this.setState(prevState => ({
          allBooks: prevState.allBooks.filter((b) => {
            return b.id !== book.id;
          })
      }))
    }
    
    // move the current book to the new shelf using API
    BooksAPI.update(book, newShelf)
  }
  

  render() {
    return (
      <div className="app">

        {/* Route: is home page? */}
        <Route exact path='/' render={() => (
            <ShowLibrary
          	  books={this.state.allBooks} 
			  onShelfSwitch={this.updateBookLocation}
			  >
            </ShowLibrary>
          )} />

        {/* Route: is search page? */}
        <Route path='/search' render={() => (
            <SearchLibrary
              books={this.state.allBooks}
              onShelfSwitch={this.updateBookLocation}
			>
              Add a book
            </SearchLibrary>
          )} />

      </div>
    )
  }
}

export default BooksApp
