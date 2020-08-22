import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const axios = require('axios');

const FriendList = (props) => {
  const friends = props.friends
  return (
    <ul>
      {friends.map(friend => {
      return (
      <li key={friend.id} data-id={friend.id}>
        <h2>{ friend.name }</h2>
        <span>{ friend.rating }</span>
        <button data-id={friend.id} onClick={ async ()=> {
          friend.rating = friend.rating + 1
          console.log(friend.rating)
          this.setState({
            friends: friends
          })

//         await axios.put(`/api/friends/${friend.id}`, { rating: friend.rating });           
        }}>+</button>
        <button data-id={friend.id}>-</button>
        <button data-id={friend.id}>x</button>
      </li>
      )})}
    </ul>
  )
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      friends: []
    }
  }

  async componentDidMount () {
    const response = await axios.get('api/friends')
    const data = response.data
    this.setState({
      friends: data
    })
  }

  render() {
    return (
      <div>
      <h1>Friends (The List)</h1>
      <form>
        <button>Create</button>
      </form>
      <FriendList friends={this.state.friends}/>
      <div id='error'></div>
      <ul></ul>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
) 
// const render = (friends)=> {
//   const ul = document.querySelector('ul');
//   const error = document.querySelector('#error');
//   error.innerText = '';
//   friends.sort((a, b)=> b.rating - a.rating);
//   const html = friends.map( friend => {
//     return `
//       <li data-id='${friend.id}'>
//         <h2>${ friend.name }</h2>
//         <span>${ friend.rating }</span>
//         <button data-id='${friend.id}'>+</button><button data-id='${friend.id}'>-</button><button data-id='${friend.id}'>x</button>
//       </li>
//     `;
//   }).join('');
//   ul.innerHTML = html;
// };

// const init = async()=> {
//   const response = await axios.get('/api/friends');
//   let friends = response.data;
//   render(friends);
//   const ul = document.querySelector('ul');
//   const form = document.querySelector('form');
//   const error = document.querySelector('#error');

//   ul.addEventListener('click', async(ev)=> {
//     if(ev.target.tagName === 'BUTTON'){
//       if(ev.target.innerHTML === 'x'){
//         const id = ev.target.getAttribute('data-id')*1;
//         await axios.delete(`/api/friends/${id}`); 
//         friends = friends.filter(friend => friend.id !== id); 
//         render(friends);
//       }
//       else {
//         const id = ev.target.getAttribute('data-id')*1;
//         const friend = friends.find(item => item.id === id);
//         const increase = ev.target.innerHTML === '+';
//         friend.rating = increase ? ++friend.rating : --friend.rating;
//         await axios.put(`/api/friends/${friend.id}`, { rating: friend.rating }); 
//         render(friends);
//       }
//     }
//   });

//   form.addEventListener('submit', async(ev)=> {
//     ev.preventDefault();
//     try {
//       const response = await axios.post('/api/friends');
//       friends.push(response.data);
//       render(friends);
//     }
//     catch(ex){
//       error.innerText = ex.response.data.error;
//     }
//   });
// };

// init();
