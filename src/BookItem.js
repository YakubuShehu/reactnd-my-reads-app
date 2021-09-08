import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookshelfSwitcher from './BookshelfSwitcher'


class BookItem extends Component {

  // assign prop types
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelfID: PropTypes.string.isRequired,
    onShelfSwitch: PropTypes.func.isRequired,
  }



  render() {

  // define constants from props
  const { book, shelfID, onShelfSwitch } = this.props

    return(

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
              onShelfSwitch={onShelfSwitch}>
            </BookshelfSwitcher>
          </div>
          <div className='book-title'>{book.title}</div>
          <div className='book-authors'>{book.title}</div>
        </div>
      </li>

    )

  }

}


export default BookItem