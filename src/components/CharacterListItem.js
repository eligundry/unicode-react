import React from 'react';

export default class CharacterListItem extends React.Component {
  render() {
    return (
      <div className="character-list-item">
        {this.props.character}
      </div>
    );
  }
}
