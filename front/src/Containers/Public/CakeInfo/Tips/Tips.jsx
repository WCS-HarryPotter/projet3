import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TipsCake from './TipsCake';
import TipsCheesecake from './TipsCheesecake';
import TipsCookie from './TipsCookie';
import TipsMacaron from './TipsMacaron';
import TipsBrownie from './TipsBrownie';
import '../../../../Assets/Styles/Public.css';


const Tips = (props) => {
  const renderTips = (cakeType) => {
    switch (cakeType) {
      case 'cake': return <TipsCake />;
      case 'cheesecake': return <TipsCheesecake />;
      case 'cookie': return <TipsCookie />;
      case 'macaron': return <TipsMacaron />;
      case 'brownie': return <TipsBrownie />;
      default: return (
        <div style={{ fontSize: '17px' }}>
          <p className="mt-3">
          Retrouvez ici les informations pour vous aider à faire votre choix.
          </p>
          <br />
          <p>Commencez par choisir votre type de pâtisserie </p>
        </div>
      );
    }
  };

  const { cake } = props;

  return (
    <div className="body-tips">
      <div className="title-tips">astuce(s)</div>
      {renderTips(cake.type)}
    </div>
  );
};

Tips.propTypes = {
  cake: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  cake: state.cakeCharacteristics,
});

export default connect(mapStateToProps, null)(Tips);
