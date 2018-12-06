import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Row, Container, Label,
} from 'reactstrap';
import changeCakeSize from '../../../Actions/cakeActions/changeCakeSize';
import changeCakeAmount from '../../../Actions/cakeActions/changeCakeAmount';

import '../../../Assets/Styles/CakeSizeSelection.css';

const CakeSizeSelection = (props) => {
  const { selectCakeSize, selectQuantity } = props;
  return (
    <Container style={{ minWidth: '100%' }}>
      <Label className="labels-perso mt-3">Choisissez la taille de vos cookies</Label>
      <Row>
        <Button onClick={() => selectCakeSize('S')}>Petit</Button>
        <Button onClick={() => selectCakeSize('M')}>Moyen</Button>
        <Button onClick={() => selectCakeSize('L')}>Gros</Button>
      </Row>
      <Row>
        <Label className="labels-perso mt-3">Choisissez le nombre de cookies que vous voulez </Label>
        <input placeholder="Quantité de cookies" onChange={event => selectQuantity(parseInt(event.target.value, 10))} />
      </Row>
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  selectCakeSize: size => dispatch(changeCakeSize(size)),
  selectQuantity: amount => dispatch(changeCakeAmount(amount)),
});

export default connect(null, mapDispatchToProps)(CakeSizeSelection);
