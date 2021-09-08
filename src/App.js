import React from 'react'
import './App.css'
import SearchLibrary from './SearchLibrary'
import ShowLibrary from './ShowLibrary'
import { debounce } from 'throttle-debounce';
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  
  state = {
    allBooks: [],
    booksSearchedFor: []
  }
  
  
  // On Initial Load: retrieve all books from server
  // EDIT: Make use of Promises
  async componentDidMount() {
  	//window.localStorage.clear(); // I used this to reset local DB in the event of missing books.
    const books = await BooksAPI.getAll()
    this.setState({ allBooks: books })
  }
  
  
  // Method that handles transfer of books between shelf - using state
  updateBookLocation = (book , newShelf) => {
   
    // move the current book to the new shelf using API
    BooksAPI.update(book, newShelf)
    
    // move the book into its new shelf, at new shelf selection
    if (newShelf !== 'none') {
      
      // update the book's shelf value and re-add it to the list
      book.shelf = newShelf
      this.setState(prevState => ({
      	allBooks: prevState.allBooks.filter((b) => {
          return b.id !== book.id
        }).concat(book)
      }))
    }
    
    // move the book out of all shelves, at "none" selection
    else {
        this.setState(prevState => ({
          allBooks: prevState.allBooks.filter((b) => {
            return b.id !== book.id
          })
      }))
    }
  }
  
  // Perform seach using BooksAPI
  // EDIT: Using debounce to delay search function until user is done typing
  searchForBooks = debounce(500, false,
    searchQuery => {
    if (searchQuery.length > 0) {
      BooksAPI.search(searchQuery).then(books => {
        if (books.error) { // catch "books not found" from search
          this.setState({ booksSearchedFor: [] });
        } else {
          this.setState({ booksSearchedFor: books });
        }
      })
    } else {
      this.setState({ booksSearchedFor: [] })
    }
  });
  

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
              booksSearchedFor={this.state.booksSearchedFor}
              onSearch={this.searchForBooks}
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
