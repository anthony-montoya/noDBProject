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
      roundedCasualKD: '',
      rankedWins: '',
      rankedLoses: '',
      rankedDeaths: '',
      rankedWinRate: '',
      rankedKills: '',
      rankedDeaths: '',
      rankedKD: '',
      roundedRankedKD: '',
      submitted: false
    }
    this.getPlayerName = this.getPlayerName.bind(this);
    this.onClick = this.onClick.bind(this);
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
      var userId = response.data[0].id;
      var playerLevel = Number(response.data[0].level);

      this.setState({
        playerIcon: 'https://uplay-avatars.s3.amazonaws.com/' + userId + '/default_146_146.png',
        userLevel: playerLevel,
        submitted: true
      })

      let rankAccess = Number(response.data[0].ranks["ncsa"].rank);
      var userRankIcon;
      var notPlaced;
      for (var i = 0; i <= rankAccess; i++) {
        if (Number(i) === rankAccess) {
          userRankIcon = require('./rank_images/icon_rank' + i + '.png');
          this.setState({
            rankIcon: userRankIcon
          })
        } else {
          rankIcon: "Not Yet Placed"
        }
      }
      axios.get('https://r6db.com/api/v2/players/' + userId, {
        headers: { "x-app-id": "web-dev_test" }
      }).then((response) => {
        var casualWins = response.data.stats.casual.won;
        var casualLoses = response.data.stats.casual.lost
        var casualDeaths = response.data.stats.casual.deaths;
        var casualWinLossTotal = casualWins + casualLoses;
        var casualWinRate = casualWins / casualWinLossTotal * 100;
        var casualTotalWinRate = casualWinRate.toFixed(2) + '%';
        var casualKills = response.data.stats.casual.kills;
        var casualDeaths = response.data.stats.casual.deaths;
        var casualKD = casualKills / casualDeaths;
        var roundedCasualKD = casualKD.toFixed(2);

        var rankedWins = response.data.stats.ranked.won;
        var rankedLoses = response.data.stats.ranked.lost;
        var rankedDeaths = response.data.stats.ranked.deaths;
        var rankedWinLossTotal = rankedWins + rankedLoses;
        var rankedWinRate = rankedWins / rankedWinLossTotal * 100;
        var rankedTotalWinRate = rankedWinRate.toFixed(2) + '%';
        var rankedKills = response.data.stats.ranked.kills;
        var rankedDeaths = response.data.stats.ranked.deaths;
        var rankedKD = rankedKills / rankedDeaths;
        var roundedRankedKD = rankedKD.toFixed(2);

        this.setState({
          casualWins: casualWins,
          casualLoses: casualLoses,
          casualDeaths: casualDeaths,
          casualWinRate: casualTotalWinRate,
          casualKills: casualKills,
          casualDeaths: casualDeaths,
          casualKD: casualKD,
          roundedCasualKD: roundedCasualKD,
          rankedWins: rankedWins,
          rankedLoses: rankedLoses,
          rankedDeaths: rankedDeaths,
          rankedWinRate: rankedTotalWinRate,
          rankedKills: rankedKills,
          rankedDeaths: rankedDeaths,
          rankedKD: rankedKD,
          roundedRankedKD: roundedRankedKD
        })
      })
    })
  }

  render() {
    return (
      <section>
        <link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/datalegreya" type="text/css"/>
        <div className="background_container">
          <div className="title_wrapper">
            <h4>Rainbow Six Stats Lookup</h4>

            <div className="search_container">
              <input className="search_bar" placeholder="search for a player" onChange={(event) => this.getPlayerName(event.target.value)} />
              <button className="search_button" onClick={() => this.onClick(this.state.playerName)}>Search </button>
            </div>
          </div>
          <br />

          {
            this.state.submitted
              ?
              <div className="content_container">
                <div className="player_container">
                  <div className="content_header">
                    <h1>Player Profile</h1>
                  </div>
                  <div className="player_icon_container">
                    <img src={(this.state.playerIcon)} alt='' />
                    <div className="player_icon_level_container">
                      <h3>Level {this.state.userLevel}</h3>
                      </div>
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
                    <h4>Wins: {this.state.casualWins} </h4>
                    <h4>Losses: {this.state.casualLoses} </h4>
                    <h4>Win Rate: {this.state.casualWinRate} </h4>
                    <h4>Kills: {this.state.casualKills} </h4>
                    <h4>Deaths: {this.state.casualDeaths} </h4>
                    <h4>K/D Ratio: {this.state.roundedCasualKD} </h4>
                  </div>
                </div>

                <div className="ranked_stats_container">
                  <div className="content_header">
                    <h1>Ranked Statistics</h1>
                  </div>
                  <div className="ranked_stats">
                    <h4>Wins: {this.state.rankedWins} </h4>
                    <h4>Losses: {this.state.rankedLoses} </h4>
                    <h4>Win Rate: {this.state.rankedWinRate} </h4>
                    <h4>Kills: {this.state.rankedKills} </h4>
                    <h4>Deaths: {this.state.rankedDeaths} </h4>
                    <h4>K/D Ratio: {this.state.roundedRankedKD} </h4>
                  </div>
                </div>

              </div>
              :
              null
          }
          </div>
      </section>

    )
  }
}

export default App;
