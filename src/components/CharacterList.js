import React from 'react';
import { Row } from 'reactstrap';
import CharacterListItem from './CharacterListItem';

const UNICODE = require('lazy-unicode');

export default class CharacterList extends React.Component {
  state = {
    // @TODO The below state will allow for all characters to be rendered by
    // default. It is erroring out because, for some reason, it attempts to
    // access an invalid code point.
    // blocks: props.blocks || Object.keys(UNICODE),
    blocks: ['MAHJONG_TILES'],
  };

  render() {
    return (
      <Row className="character-list">
        {this.createCharacterList()}
      </Row>
    );
  }

  /**
   * Create all the CharacterListItem elements for the blocks specified in this
   * component's state.
   *
   * @return array[CharacterListItem]
   */
  createCharacterList() {
    return this.state.blocks.map((block) => {
      let characterList = [];
      // This is the best way and only way to split a unicode string on it's
      // characters and not it's codepoints in ES6.
      const characters = [...UNICODE[block]];

      // IMPORTANT: This has to be a traditional for loop because of how
      // JavaScript deals with unicode string iteration.
      for (let i = 0, len = characters.length; i < len; i++) {
        let character = characters[i];
        let key_name = `${block}-${character}`;

        characterList.push(
          <CharacterListItem
            key={key_name}
            block={block}
            character={character} />
        );
      }

      return characterList;
    });
  }
}
