import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      playerName: '',
      rankIcon: '',
      playerIcon: '',
      playerLevel: '',
      casualWins: '',
      casualLoses: '',
      casualDeaths: '',
      casualWinRate: '',
      casualKills: '',
      casualDeaths: '',
      casualKD: '',
      rankedWins: '',
      rankedLoses: '',
      rankedDeaths: '',
      rankedWinRate: '',
      rankedKills: '',
      rankedDeaths: '',
      rankedKD: ''
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
      var userId = response.data[0].id;
      var playerLevel = Number(response.data[0].level);

      this.setState({
        playerIcon: 'https://uplay-avatars.s3.amazonaws.com/' + userId + '/default_146_146.png',
        userLevel: playerLevel
      })

      console.log(response)

      let rankAccess = Number(response.data[0].ranks["ncsa"].rank);
      var userRankIcon;
      var notPlaced;
      for (var i = 1; i <= rankAccess; i++) {
        if (Number(i) === rankAccess) {
          userRankIcon = require('./rank_images/icon_rank' + i + '.png');
          this.setState({
            rankIcon: userRankIcon
          })
        } else {
          notPlaced = require('./rank_images/not_placed.png');
          this.setState({
            rankIcon: notPlaced
          })
        }
      }
      axios.get('https://r6db.com/api/v2/players/' + userId, {
        headers: { "x-app-id": "web-dev_test" }
      }).then((response) => {
        console.log(response);
        var casualWins = Number(response.data.stats.casual.won)
        var casualLoses;
        var casualDeaths;
        var casualWinRate; 
        var casualKills;
        var casualDeaths;
        var casualKD;
        var rankedWins;
        var rankedLoses;
        var rankedDeaths;
        var rankedWinRate; 
        var rankedKills;
        var rankedDeaths;
        var rankedKD;   
        })
      this.setState({
        casualWins: this.casualWins
      })
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

          <div className="content_container">
            <div className="player_container">

              <div className="content_header">
                <h1>Player Information</h1>
              </div>
              <div className="player_icon_container">
                <img src={(this.state.playerIcon)} alt='' />
              </div>

            </div>
            <div className="rank_container">

              <div className="content_header">
                <h1>Current Rank</h1>
              </div>
              <div className="rank_icon_container">
                <img src={(this.state.rankIcon)} alt='' />
                </div>

            </div>

            <div className="casual_stats_container">
              <div className="content_header">
                <h1>Casual Statistics</h1>

              </div>
              <div className="casual_stats">
                <h4>Wins: {this.state.casualWins}</h4>
                <h4>Loses</h4>
                <h4>Win Rate</h4>
                <h4>Kills</h4>
                <h4>Deaths</h4>
                <h4>K/D Ratio</h4>
                </div>

            </div>

            <div className="ranked_stats_container">
              <div className="content_header">
                <h1>Ranked Statistics</h1>

              </div>
              <div className="ranked_stats">
                <h4>Wins</h4>
                <h4>Loses</h4>
                <h4>Win Rate</h4>
                <h4>Kills</h4>
                <h4>Deaths</h4>
                <h4>K/D Ratio</h4>
                </div>

            </div>

          </div>
        </div>
      </section>

    )
  }
}

export default App;
