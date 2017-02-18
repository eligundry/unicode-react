import React, { Component } from 'react';
import CharacterList from './components/CharacterList';

// Import stylesheets
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {
  render() {
    return (
      <CharacterList />
    );
  }
}
