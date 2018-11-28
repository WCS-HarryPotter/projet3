import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import IngredientsDisplay from './IngredientsDisplay';

class CakeIngredientsStructure extends Component {

  // Choix des ingrédients des cakes et cheesecakes
  renderStructure = (cake, bases, icings, fillings, toppings, perfumes, index) => {
    let render;
    let elementToDisplay;

    // Premier écran : Choix de la base du cake, ou du parfum du cheesecake
    if (index === 2) {
      if (cake.type === 'cheesecake') elementToDisplay = perfumes;
      else elementToDisplay = bases;

      render = (
        <Row className="displayIngredient" style={{ overflowY: 'scroll', backgroundColor: 'red' }}>
          <Row>
            <h1>{bases[0].type}</h1>
          </Row>
          <Row>
            <IngredientsDisplay elementToDisplay={elementToDisplay} />
          </Row>
        </Row>
      );
    }
    // Deuxième écran : Choix du glaçage et filling du cake, choix du glaçage du cheesecake
    else if (index === 3) {
      if (cake.type === 'cake') {
        render = (
          <Row className="displayIngredient" style={{ overflowY: 'scroll', backgroundColor: 'red' }}>
            <Col sm="6" style={{ overflowY: 'scroll' }}>
              <Row>
                <h1>{icings[0].type}</h1>
              </Row>
              <Row>
                <IngredientsDisplay elementToDisplay={icings} />
              </Row>
            </Col>
            <Col sm="6" style={{ overflowY: 'scroll' }}>
              <Row>
                <h1>{fillings[0].type}</h1>
              </Row>
              <Row>
                <IngredientsDisplay elementToDisplay={fillings} />
              </Row>
            </Col>
          </Row>
        );
      }
      // Troisième écran : Choix des toppings
      else {
        render = (
          <Row className="displayIngredient" style={{ height: '80vh', overflowY: 'scroll', backgroundColor: 'red' }}>
            <Row>
              <h1>{icings[0].type}</h1>
            </Row>
            <Row>
              <IngredientsDisplay elementToDisplay={icings} />
            </Row>
          </Row>
        );
      }
    } else if (index === 4) {
      render = (
        <Row className="displayIngredient" style={{ height: '80vh', overflowY: 'scroll', backgroundColor: 'red' }}>
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
    return (
      this.renderStructure(this.props.cake, this.props.bases, this.props.icings, this.props.fillings, this.props.toppings, this.props.perfumes, this.props.index)
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    cake: state.cakeCharacteristics,
    bases: state.cakeBases,
    fillings: state.cakeFillings,
    icings: state.cakeIcings,
    perfumes: state.cheesecakePerfumes,
    toppings: state.cakeToppings,
    index: state.pageIndex,
  });
};

export default connect(mapStateToProps)(CakeIngredientsStructure);
