import React from 'react'
import {Switch, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './components/Search'
import List from './components/List'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {
    return (
      <div className='app'>
        <Switch>
          <Route exact path={'/'} render={() => (
            <List books={this.state.books} onUpdate={this.getBooks} />
          )} />
          <Route exact path={'/search'} render={({ history }) => (
            <Search
              books={this.state.books}
              onUpdate={() => {
                this.getBooks()
                history.push('/')
              }}
            />
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp