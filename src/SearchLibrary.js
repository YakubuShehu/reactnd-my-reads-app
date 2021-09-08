import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookItem from './BookItem'
// import serializeForm from 'form-serialize'

class SearchLibrary extends Component {

  // assign prop types
  static propTypes = {
    books: PropTypes.array.isRequired,
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
      searchQuery: newQuery.trim()
    }));
  }
  
  
  
  render() {
    
    // define constants from props and state
    const { searchQuery } = this.state
    const { books, onShelfSwitch } = this.props
    
    
    // filter contacts based on the query
    const filteredBooks = searchQuery === ''
      ? books
      : books.filter((b) => (
          b.title.toLowerCase().includes(searchQuery.toLowerCase())
        ))

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
            <ol className='books-grid'>
				{filteredBooks.map((book) => (
                  <BookItem
          	    	key={book.id}
                    book={book}
                    books={books}
                    shelfID={book.shelf}
                    onShelfSwitch={onShelfSwitch}
                  />
                ))}
			</ol>
          </div>
        </div>
    )
  }
}

export default SearchLibrary