import React from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom'
import history from './history'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SearchResultPage from './pages/SearchResultPage'
import CurrentUserRatingsPage from './pages/CurrentUserRatings'
import AppNav from './components/AppNav/AppNav'
import RatingForm from './components/RatingForm/RatingForm'
import RatingUpdateForm from './components/RatingUpdateForm/RatingUpdateForm'

function App() {
  const [games, setGames] = React.useState([])
  const [username, setUsername] = React.useState(null)
  const [token, setToken] = React.useState(null)
  const [loginError, setLoginError] = React.useState('')
  const [searchInput, setSearchInput] = React.useState('')

  return (
    <div className="App">
    {console.log(username, token)}
      <Router history={history}>
        <div>
          <AppNav username={username} setSearchInput={setSearchInput} />
          <Route 
            exact path="/"
            render={props => <HomePage {...props} setGames={setGames} games={games} />}
          />
          <Route 
            exact path="/search"
            render={props => <SearchResultPage {...props} setGames={setGames} games={games} searchInput={searchInput} />}
          />
          <Route 
            exact path="/games/:gameID"
            render={props => <GamePage {...props} setGames={setGames} games={games} token={token} />}
          />
          <Route 
            exact path="/rate-game/:gameID"
            render={props => <RatingForm {...props} username={username} token={token} />}
          />
          <Route 
            exact path="/edit-rating/:gameID/:ratingID"
            render={props => <RatingUpdateForm {...props} token={token} />}
          />
          <Route 
            exact path="/my-ratings"
            render={props => <CurrentUserRatingsPage {...props} token={token} />}
          />
          <Route 
            exact path="/login"
            render={props => <LoginPage {...props} token={token} setUsername={setUsername} setToken={setToken} loginError={loginError} setLoginError={setLoginError} />}
          />
          <Route 
            exact path="/signup"
            render={props => <SignupPage {...props} token={token} setUsername={setUsername} setToken={setToken} loginError={loginError} setLoginError={setLoginError} />}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;