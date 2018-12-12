import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import IngredientsDisplay from './IngredientsDisplay';

class IngredientsCakeStructure extends Component {
  // Choix des ingrédients des cakes et cheesecakes
  renderStructure = (cake, bases, icings, fillings, toppings, flavor, index) => {
    let render;
    let elementToDisplay;

    // Premier écran : Choix de la base du cake, ou du parfum du cheesecake
    if (index === 2) {
      if (cake.type === 'cheesecake') elementToDisplay = flavor;
      else elementToDisplay = bases;

      render = (
        <Row className="displayIngredient">
          <Row>
            <h1>{elementToDisplay[0].type}</h1>
          </Row>
          <Row>
            <IngredientsDisplay elementToDisplay={elementToDisplay} />
          </Row>
        </Row>
      );
    } else if (index === 3) {
    // Deuxième écran : Choix du glaçage et filling du cake,
      if (cake.type === 'cake') {
        render = (
          <Row className="displayIngredient">
            <Col sm="6" style={{ overflowY: 'scroll' }}>
              <Row>
                <h1>{fillings[0].type}</h1>
              </Row>
              <Row>
                <IngredientsDisplay elementToDisplay={fillings} />
              </Row>
            </Col>
            <Col sm="6" style={{ overflowY: 'scroll' }}>
              <Row>
                <h1>{icings[0].type}</h1>
              </Row>
              <Row>
                <IngredientsDisplay elementToDisplay={icings} />
              </Row>
            </Col>
          </Row>
        );
      } else {
      // ou choix du glaçage du cheesecake
        render = (
          <Row className="displayIngredient">
            <Row>
              <h1>{icings[0].type}</h1>
            </Row>
            <Row>
              <IngredientsDisplay elementToDisplay={icings} />
            </Row>
          </Row>
        );
      }
    // Troisième écran : Choix des toppings
    } else if (index === 4) {
      render = (
        <Row className="displayIngredient">
          <Row>
            <h1>{toppings[0].type}</h1>
          </Row>
          <Row>
            <IngredientsDisplay elementToDisplay={toppings} />
          </Row>
        </Row>
      );
    }
    return render;
  }

  render() {
    const
      {
        cake,
        bases,
        icings,
        fillings,
        toppings,
        flavor,
        index,
      } = this.props;

    return (
      this.renderStructure(cake, bases, icings, fillings, toppings, flavor, index)
    );
  }
}

IngredientsCakeStructure.propTypes = {
  cake: PropTypes.shape({}).isRequired,
  bases: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  icings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fillings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toppings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  flavor: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  cake: state.cakeCharacteristics,
  bases: state.cakeBases,
  fillings: state.cakeFillings,
  icings: state.cakeIcings,
  flavor: state.cheesecakeFlavors,
  toppings: state.cakeToppings,
  index: state.pageIndex,
});

export default connect(mapStateToProps)(IngredientsCakeStructure);
