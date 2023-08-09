import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function AllTrains() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('https://api.myjson.com/bins/16g78n')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <h1>All Trains</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Departure Time</th>
          </tr>
        </thead>
        <tbody>
          {trains.map(train => (
            <tr key={train.train_name}>
              <td><Link to={`/train/${train.train_name}`}>{train.train_name}</Link></td>
              <td>{train.source}</td>
              <td>{train.destination}</td>
              <td>{train.departure_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SingleTrain({ match }) {
  const [train, setTrain] = useState({});

  useEffect(() => {
    const trainName = match.params.trainName;
    axios.get('https://api.myjson.com/bins/16g78n')
      .then(response => {
        const trains = response.data;
        const selectedTrain = trains.find(train => train.train_name === trainName);
        if (selectedTrain) {
          setTrain(selectedTrain);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [match.params.trainName]);

  return (
    <div className="container">
      <h1>Train Schedule</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Departure Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{train.train_name}</td>
            <td>{train.source}</td>
            <td>{train.destination}</td>
            <td>{train.departure_time}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={AllTrains} />
          <Route path="/train/:trainName" component={SingleTrain} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
