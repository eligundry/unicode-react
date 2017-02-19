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
    let name = this.state.record ? this.state.record.name : '';

    return (
      <Col lg='1' sm="3" xs="12">
        <Card>
          <CardBlock>
            <CardTitle>{this.props.character}</CardTitle>
            <CardSubtitle>{name}</CardSubtitle>
            <CardText tag='div'>
              <dl>
                <dt>Codepoint</dt>
                <dd>{this.getCharCode()}</dd>
                <dt>Hex</dt>
                <dd>{this.getCharHex()}</dd>
              </dl>
            </CardText>
          </CardBlock>
        </Card>
      </Col>
    );
  }

  getCharCode() {
    return this.props.character.codePointAt(0);
  }

  getCharHex() {
    return this.getCharCode().toString(16);
  }

  /**
   * Fetch the character's information from the database and trigger it's
   * setting of state.
   */
  getRecord() {
    db.characters
      .get(this.getCharCode())
      .then((data) => {
        this.setState({
          record: data,
        });
      });
  }
}
