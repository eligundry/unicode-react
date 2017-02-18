import React from 'react';
import { Card, CardBlock, CardTitle, Col } from 'reactstrap';

export default class CharacterListItem extends React.Component {
  render() {
    return (
      <Col sm="3" xs="12">
        <Card>
          <CardBlock>
            <CardTitle>{this.props.character}</CardTitle>
          </CardBlock>
        </Card>
      </Col>
    );
  }
}
