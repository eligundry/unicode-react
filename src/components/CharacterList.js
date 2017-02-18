import React from 'react';
import { Row } from 'reactstrap';
import CharacterListItem from './CharacterListItem';
const unicode_map = require('lazy-unicode');

export default class CharacterList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // @TODO The below state will allow for all characters to be rendered by
      // default. It is erroring out because, for some reason, it attempts to
      // access an invalid code point.
      // blocks: props.blocks || Object.keys(unicode_map),
      blocks: props.blocks || ['MAHJONG_TILES'],
    };
  }

  createCharacterList() {
    let charactersList = [];

    this.state.blocks.forEach((block) => {
      const characters = [...unicode_map[block]];

      for (let i = 0, len = characters.length; i < len; i++) {
        let character = characters[i];
        let key_name = `${block}-${character}`;

        charactersList.push(
          <CharacterListItem
            key={key_name}
            block='MAHJONG_TILES'
            character={character} />
        );
      }
    });

    return charactersList;
  }

  render() {
    return (
      <Row className="character-list">
        {this.createCharacterList()}
      </Row>
    );
  }
}
