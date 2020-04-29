import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'


class List extends Component {
    
    render() {

        const { books, onUpdate } = this.props

        return (
            <div className='list-books'>
                <div className='list-books-title'>
                    <h1>MyReads</h1>
                </div>
                <div className='list-books-content'>
                    <div>
                        <Shelf title='Currently Reading' books={books.filter(book => book.shelf === 'currentlyReading')} onUpdate={onUpdate} />
                        <Shelf title='Want to Read' books={books.filter(book => book.shelf === 'wantToRead')} onUpdate={onUpdate} />
                        <Shelf title='Read' books={books.filter(book => book.shelf === 'read')} onUpdate={onUpdate} />
                    </div>
                </div>
                <div className='open-search'>
                    <Link to='/search' title='Add a book'><button>Add a book</button></Link>
                </div>
            </div>
        )
    }
}

export default List;