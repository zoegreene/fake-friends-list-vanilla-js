import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');


class App extends Component {
  constructor () {
    super()
    this.state = {
      friends: []
    }
    this.increaseRating = this.increaseRating.bind(this);
    this.decreaseRating = this.decreaseRating.bind(this);
    this.destroy = this.destroy.bind(this);
    this.createFriend = this.createFriend.bind(this);
  }

  async componentDidMount () {
    this.setState({ friends: (await axios.get('api/friends')).data });
  }

  render() {
    const friends = this.state.friends;
    const { increaseRating, decreaseRating, destroy, createFriend } = this;

    return (
      <div>
        <h1>Friends (The List)</h1>
        <form onSubmit={ createFriend }>
          <button>Create</button>
        </form>
        <div id='error'></div>
        <ul>
          { friends.map(friend => {
            return (
              <li key={ friend.id }>
                <h2>{ friend.name }</h2>
                <span>{ friend.rating }</span>
                <button data-id={ friend.id } onClick={ ()=> increaseRating(friend)}>+</button>
                <button data-id={ friend.id } onClick={ () => decreaseRating(friend)}>-</button>
                <button data-id={ friend.id } onClick={ () => destroy(friend)}>x</button>
              </li>
            )
          })
          }
        </ul>
      </div>
    )
  }

  async increaseRating(friend) {
    friend = (await axios.put(`/api/friends/${friend.id}`, { rating: friend.rating + 1 })).data;
    const friends = this.state.friends
      .map(f => f.id === friend.id ? friend : f)
      .sort((a, b) => b.rating - a.rating);
    this.setState({ friends });
  }

  async decreaseRating(friend) {
    friend = (await axios.put(`api/friends/${friend.id}`, { rating: friend.rating - 1})).data;
    const friends = this.state.friends
      .map(f => f.id === friend.id ? friend : f)
      .sort((a, b) => b.rating - a.rating)
    this.setState({ friends });
  }

  async destroy(friend) {
    await axios.delete(`api/friends/${friend.id}`);
    const friends = this.state.friends.filter(f => f.id !== friend.id);
    this.setState({ friends });
  }

  async createFriend(ev) {
    ev.preventDefault();
    const friend = (await axios.post('/api/friends')).data;
    const friends = this.state.friends;
    friends.push(friend);
    friends.sort((a, b) =>  b.rating - a.rating);
    this.setState({ friends });
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
