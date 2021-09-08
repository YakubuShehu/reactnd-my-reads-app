import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookItem from './BookItem'
// import serializeForm from 'form-serialize'

class SearchLibrary extends Component {

  // assign prop types
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
  }
  
  // add a state object to store search query
  state = {
    searchQuery: '',
  }
  
  //function to reset the query string (make it blank)
  clearSearchQuery = () => {
    this.updateQuery('')
  }
  
  // function to update state
  updateQuery = (newQuery) => {
    this.setState(() => ({
      searchQuery: newQuery
    }));
    this.props.onSearch(newQuery);
  }
  
  
  
  render() {
    
    // define constants from props and state
    const { searchQuery } = this.state
    const { books, booksSearchedFor, onShelfSwitch } = this.props
    
    
    // Match shelves on searched books, with status of existing books
    const syncedBooks = booksSearchedFor.map(book => {
      books.map((b) => {
        // updating shelf status for matching book
        if (b.id === book.id) book.shelf = b.shelf
        return b
      })
      return book
    });

    return(
        <div className='search-books'>
          <div className='search-books-bar'>
      		<Link
      		  to='/'>
      			<button
      			  className='close-search'
      			  onClick={this.clearSearchQuery}>
      				Close
      			</button>
      		</Link>
            <div className='search-books-input-wrapper'>
              <input
                className='search-contacts'
                type='text'
                placeholder='Search by title or author...'
                value={searchQuery}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className='search-books-results'>

			{/* default when no books have been searched for or found */}
            {syncedBooks.length === 0 ?
              (
                <p className='card card-text'>
                  No books found for this search. Try searching for something else maybe?
                </p>
              )
			  :
			  (
                <ol className='books-grid'>
                    {syncedBooks.map((book) => (
                      <BookItem
                        key={book.id}
                        book={book}
                        shelfID={book.shelf ? book.shelf : 'none' } // cater for books not in any shelf
                        onShelfSwitch={onShelfSwitch}
                      />
                    ))}
                </ol>
			  )}
          </div>
        </div>
    )
  }
}

export default SearchLibrary