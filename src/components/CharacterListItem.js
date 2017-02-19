import React from 'react';
import { db } from '../App.js';
import { Card, CardBlock, CardTitle, CardSubtitle, CardText, Col } from 'reactstrap';

export default class CharacterListItem extends React.Component {
  state = {}

  constructor(props) {
    super(props);

    this.getRecord();
  }

  render() {
    let name = this.state.record ? this.state.record.name : 'No Name Available';

    return (
      <Col lg='2' sm="3" xs="12" className="character-list-item">
        <Card>
          <CardBlock>
            <CardTitle>{this.props.character}</CardTitle>
            <CardSubtitle>{name}</CardSubtitle>
            <CardText tag='div'>
              <dl>
                <dt>Codepoint</dt>
                <dd><code>{this.getCharCode()}</code></dd>
                <dt>Hex</dt>
                <dd><code>{this.getCharHex()}</code></dd>
              </dl>
            </CardText>
          </CardBlock>
        </Card>
      </Col>
    );
  }

  /**
   * Get the integer representation of the character.
   *
   * @return int
   */
  getCharCode() {
    return this.props.character.codePointAt(0);
  }

  /**
   * Get the hex representation of the character.
   *
   * @return String
   */
  getCharHex() {
    return this.getCharCode().toString(16);
  }

  /**
   * Fetch the character's information from the database and trigger it's
   * setting of state.
   *
   * @return Promise
   */
  getRecord() {
    return db.characters
      .get(this.getCharCode())
      .then((data) => {
        this.setState({
          record: data,
        });
      });
  }
}
