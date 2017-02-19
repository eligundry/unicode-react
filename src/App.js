import React, { Component } from 'react';
import Dexie from 'dexie';
import CharacterList from './components/CharacterList';

// Import stylesheets
import 'bootstrap/dist/css/bootstrap.css';

// Indexeddb for easy querying
export const db = window.db = new Dexie('unicode_database');

export default class App extends Component {
  constructor(props) {
    super(props)

    this.initDB()
  }

  render() {
    return (
      <CharacterList />
    );
  }

  initDB() {
    db.version(1).stores({
      characters: 'id,hex,name',
    });

    fetch('/unicode.txt', { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }

        throw new Error("Wasn't able to fetch Unicode info, names won't work.");
      })
      .then((data) => {
        // Split the file on it's newlines and map the individual characters
        // into a list of objects to be inserted into the database.
        const character_mappings = data.split('\n').map((line) => {
          let split = line.split('\t');

          return {
            id: parseInt(`0x${split[1]}`, 16),
            name: split[0],
            hex: split[1],
          }
        });

        // Add all the characters to the database.
        return db.characters.bulkPut(character_mappings);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
