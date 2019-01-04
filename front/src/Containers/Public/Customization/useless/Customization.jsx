import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  FormGroup,
} from 'reactstrap';
import CustomMessage from './CustomMessage';
<<<<<<< HEAD:front/src/Containers/Public/Customization/useless/Customization.jsx
import CustomMessageInput from '../CustomMessageInput';
import ColorPicker from '../ColorPicker';
import Price from '../../Price';
import FontPicker from '../FontPicker';
import CustomWish from '../CustomWish';
import Decoration from '../Decoration';
import DecorationExamples from './DecorationExamples';
import NavArrowsLayout from '../../Navigation/NavArrowsLayout';
import Progressbar from '../../Progressbar';
import '../../../Assets/Styles/Personalisation.css';
=======
import CustomMessageInput from './CustomMessageInput';
import ColorPicker from './ColorPicker';
import Price from '../Price';
import Decoration from './Decoration';
import DecorationExamples from './DecorationExamples';
import NavArrowsLayout from '../Navigation/NavArrowsLayout';
import Progressbar from '../Progressbar';
import '../../../Assets/Styles/Customization.css';
>>>>>>> ae42df98767b1deeb1f6f6b2a8bbcf62dc15c16e:front/src/Containers/Public/Customization/Customization.jsx

const Customization = (props) => {
  const { pastryType, wantsCustomMessage } = props;
  return (
    <div>
      <Container className="content-zone">
        <Row className="text-center">
          <Progressbar />
        </Row>
        <Row className="title">
          <h1>Personnalisation</h1>
        </Row>
        <Row>
          <Col sm={!pastryType.includes('cake') ? '12' : '6'} className="column">
            <FormGroup>
              {(() => {
                if (pastryType.includes('cake')) {
                  return (
                    <div>
                      <CustomMessage />
                      <div className={!wantsCustomMessage && 'greyScale'}>
                        <CustomMessageInput />
                        <ColorPicker />
                        {/* <FontPicker /> */}
                      </div>
                    </div>
                  );
                }
                return <div />;
              })()}
            </FormGroup>
            {/* <CustomWish /> */}
          </Col>
          <Col sm={!pastryType.includes('cake') ? '12' : '6'} className="column">
            <Decoration />
            <DecorationExamples />
          </Col>
        </Row>
      </Container>
      <Row className="back-btn">
        <NavArrowsLayout />
        <Price />
      </Row>
    </div>
  );
};

Customization.propTypes = {
  pastryType: PropTypes.string.isRequired,
  wantsCustomMessage: PropTypes.bool.isRequired,
};

const mapStatetoProps = state => ({
  wantsCustomMessage: state.customizationAdmin.wantsCustomMessage,
  pastryType: state.cakeCharacteristics.type,
});

export default connect(mapStatetoProps, null)(Customization);
