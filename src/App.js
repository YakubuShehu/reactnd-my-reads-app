import React from 'react'
import './App.css'
import SearchLibrary from './SearchLibrary'
import ShowLibrary from './ShowLibrary'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  
  state = {
    allBooks: [],
    searchedBooks: []
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
    BooksAPI.update(book, newShelf).then(books => {
      console.log(books);
    });
  }
  

  render() {
    return (
      <div className="app">

        {/* Route: is home page? */}
        <Route exact path='/' render={() => (
            <ShowLibrary
          	  books={this.state.allBooks} 
			  onChangeStatus={this.updateBookLocation}
			  >
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
