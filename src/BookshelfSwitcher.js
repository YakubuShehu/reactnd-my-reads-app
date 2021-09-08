import React, { Component } from 'react';


class BookshelfSwitcher extends Component {

  // declare state variables
  state = {
    formSelectValue: this.props.shelfID
  };
  
  

  // Trigger a shelf transfer based on updated select value
  triggerShelfUpdate = (event) => {
    this.setState({
      formSelectValue: event.target.value
    });
    this.props.onShelfSwitch(this.props.book, event.target.value);
  };

  
  render() {
    

    return(

      <div className='book-shelf-changer'>
        <select value={this.state.formSelectValue} onChange={this.triggerShelfUpdate}>
          <option value='move' disabled>Move to...</option>
          <option value='currentlyReading'>Currently Reading</option>
          <option value='wantToRead'>Want to Read</option>
          <option value='read'>Read</option>
          <option value='none'>None</option>
        </select>
      </div>

    )

  }

}

export default BookshelfSwitcher