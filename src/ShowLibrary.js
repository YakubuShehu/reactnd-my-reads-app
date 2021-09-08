import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf, faHeart, faCheckCircle, faBookReader, faCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelfItem from './BookShelfItem'

class ShowLibrary extends Component {
  
  // assign prop types
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfSwitch: PropTypes.func.isRequired
  }

  
  render() {
    
    // define constants from props and state
    const { books, onShelfSwitch } = this.props
    
    return(
    <div>
      
      
      {/* Site Icon/Logo & Title */}
      <div className="list-books-title">
        <div className="fa-4x">
          <Link to='/'>
            <span className="fa-layers fa-fw">
              <FontAwesomeIcon icon={faCircle} color="#222222" />
              <FontAwesomeIcon icon={faBookReader} inverse transform="shrink-6"/>
            </span>
          </Link>
        </div>
    	<h1>MyReads</h1>
      </div>
      
      
      <div className='list-books-content'>
        <div>

		  {/* Bookshelf that stores books that are currently being read */}
		  <BookShelfItem
			books={books}
			shelfID='currentlyReading'
			iconClass={[faHourglassHalf, '#f2bf25']}
			shelfTitle='Currently Reading'
			onShelfSwitch={onShelfSwitch}
		  />


		  {/* Bookshelf that stores books that are on the reading wishlist */}
		  <BookShelfItem
			books={books}
			shelfID='wantToRead'
			iconClass={[faHeart, '#f22929']}
			shelfTitle='Want to Read'
			onShelfSwitch={onShelfSwitch}
		  />


		  {/* Bookshelf that stores books that have been read */}
		  <BookShelfItem
			books={books}
			shelfID='read'
			iconClass={[faCheckCircle, '#19a228']}
			shelfTitle='Read'
			onShelfSwitch={onShelfSwitch}
		  />

        </div>

		{/* Button: Trigger search page */}
		<Link
		  to='/search'
		  className='open-search'>
			Add a book
        </Link>
		</div>
      </div>
    )

  } 
}


export default ShowLibrary