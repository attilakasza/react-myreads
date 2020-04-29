import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'


class Search extends Component {

    state = {
        searchedBooks: 0,
        prevSearch: '',
        userSearch: '',
    };

    updateSearch = query => {
        this.setState(() => ({
            userSearch: query,
        }));
    };

    componentDidUpdate = () => {
        const { userSearch, prevSearch } = this.state;

        if (userSearch !== prevSearch) {
            if (userSearch !== '') {
                BooksAPI.search(userSearch)
                    .then(books => {
                        if (books !== undefined && books.length > 0) {
                            const searchedBooks = books.map(book => {
                                const sBook = this.props.books.filter(sBook => sBook.id === book.id);
                                return sBook.length > 0 ? sBook[0] : book;
                            });
                            this.setState(() => ({
                                prevSearch: userSearch,
                                searchedBooks: searchedBooks,
                            }));
                        } else {
                            this.setState(() => ({
                                prevSearch: userSearch,
                                searchedBooks: [],
                            }));
                        };
                    });
            } else {
                this.setState(() => ({
                    prevSearch: userSearch,
                    searchedBooks: [],
                }));
            };
        };
    };

    render() {
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link className='close-search' to='/' />
                    <div className='search-books-input-wrapper'>
                        <input type='text' placeholder='Search by title or author' value={this.state.userSearch} onChange={(e) => this.updateSearch(e.target.value)} />
                    </div>
                </div>
                <div className='search-books-results'>
                    {this.state.searchedBooks ? (
                        this.state.searchedBooks.length > 0 ? (
                            <ol className='books-grid'>
                                {this.state.searchedBooks.map((book) => (
                                    <li key={book.id}>
                                        <Book book={book} onUpdate={this.props.onUpdate} />
                                    </li>
                                ))}
                            </ol>
                        ) : (
                                <div className='books-grid'>
                                    <p>Sorry, but nothing matched your search terms</p>
                                </div>
                            )
                    ) : ''}
                </div>
            </div>
        )
    }
}

export default Search;