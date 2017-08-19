import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      playerName: '',
      rankIcon: ''
    }
    this.getPlayerName = this.getPlayerName.bind(this);
  }

  getPlayerName(event) {
    this.setState({
      playerName: event
    })
  }

  onClick(playerName) {

    axios.get('https://r6db.com/api/v2/players?name=' + playerName, {
      headers: { "x-app-id": "web-dev_test" }
    }).then((response) => {
      console.log(response)

      let rankAccess = Number(response.data[0].ranks["ncsa"].rank);
      var userRankIcon;

      for (var i = 0; i <= rankAccess; i++) {
        if (Number(i) === rankAccess) {
          userRankIcon = require('./rank_images/icon_rank' + i + '.png');
          this.setState({
            rankIcon: userRankIcon
          })
        } if(rankAccess === 0) {
          return 
        }
      }
    })
      // more code here
          axios.get('https://r6dc.com/api/v2/player/0eef8878-2db8-42b5-9123-65fca53b4c62', {
      headers: { "x-app-id": "web-dev_test" }
    }).then((response) => {
      console.log(response)
    })
  }

  render() {
    return (
      <section>
        <div className="background_container">
          <div className="title_wrapper">
            <h4>Rainbow Six Stats Lookup</h4>
          </div>
          <div className="search_container">
            <input className="search_bar" placeholder="search for a player" onChange={(event) => this.getPlayerName(event.target.value)} />
            <button className="search_button" onClick={() => this.onClick(this.state.playerName)}>Search </button>
          </div>
          <br />
          <div className="rank_container">
            <div className="rank_nav_header">
              <div className="rank_title">
                <h2>Current Ranking</h2>
              </div>
            </div>
            <div className="rank_image_container">
              <img src={(this.state.rankIcon)} alt='' />
            </div>
          </div>
          <div className="rank_container">
            <div className="rank_nav_header">
              <div className="rank_title">
                <h2>Ranked Stats</h2>
              </div>
              <div></div>
            </div>
            <div className="rank_image_container">
              <img src={(this.state.rankIcon)} alt='' />
            </div>
          </div>
        </div>
      </section>

    )
  }
}

export default App;
