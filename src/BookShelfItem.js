import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookshelfSwitcher from './BookshelfSwitcher'


class BookShelfItem extends Component {

  // assign prop types
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfID: PropTypes.string.isRequired,
    iconClass: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    onSwitch: PropTypes.func.isRequired,
  }


render() {

  // define constants from props
  const { books, shelfID, iconClass, shelfTitle, onSwitch } = this.props
  const booksToReturn = books.filter((b) => {
    return b.shelf === shelfID;
  })


  return(
    <div
      className='bookshelf'
      id={shelfID}>
      <h2 className='bookshelf-title'><FontAwesomeIcon icon={iconClass[0]} color={iconClass[1]} /> {shelfTitle} ({booksToReturn.length})</h2>
      <div className='bookshelf-books'>

        {/* check if the list of books has any books belonging in this specific shelf */}
        {booksToReturn.length === 0 ?
          (
          <p className='card card-text'>
            No books found in this shelf. Try&nbsp;
            <Link to='/search'>
              <span><button>searching</button></span>
            </Link>
            &nbsp;for one to add to the list
          </p>
        ) : (
          <ol className='books-grid'>
            {booksToReturn.map((book) => (
              <li key={book.id}>
                <div className='book'>
                  <div className='book-top'>
                    <div
                      className='book-cover'
                      style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}
                      />
                    <BookshelfSwitcher
                      book={book}
                      shelfID={shelfID}
                      onSwitch={onSwitch}>
                    </BookshelfSwitcher>
                  </div>
                  <div className='book-title'>{book.title}</div>
                  <div className='book-authors'>{book.title}</div>
                </div>
              </li>
            ))}
          </ol>
        )
        }
      </div>
    </div>

  )

}

}


export default BookShelfItem