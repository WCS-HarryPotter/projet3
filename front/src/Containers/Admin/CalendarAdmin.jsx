import React, { Component } from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';
import { Button, ButtonGroup, Row, Col, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fetchDatesInDB } from '../../Actions/calendar_admin_actions';
import { getDateID, checkDateMatch } from './CheckDateMatch';
import '../../Assets/Styles/CalendarAdmin.css';
import CustomerViewCalendar from '../Public/OrderConfirmation/OrderCalendar';

class CalendarAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orangeDate: false,
      redDate: false,
      lastClicked: '',
    };
  }

  componentWillMount() {
    const { getDatesInDB } = this.props;
    getDatesInDB();
  }

  chooseButton = (color) => {
    const { redDate, orangeDate } = this.state;
    this.setState({ lastClicked: color });
    if (!redDate && !orangeDate) this.setState(prevState => ({ [color]: !prevState[color] }));
    else if (this.state[color]) return null;
    else {
      this.setState(prevState => ({
        orangeDate: !prevState.orangeDate,
        redDate: !prevState.redDate,
      }));
    }
  }

  addDate = (date, color) => {
    const { getDatesInDB } = this.props;
    axios.post('/calendar/adddate', { date, color })
      .then(function (response) {
        response.data === 'OK' && getDatesInDB();
      })
    // .catch(function (error) {
    //   console.log(error);
    // });
    // alert(`Police "${name}" ajoutée`)
    // } else alert('Vous avez déjà ajouté cette police');
  }

  removeDate = (id) => {
    const { getDatesInDB } = this.props;
    axios.delete(`/calendar/deletedate/${id}`)
      .then(function (response) {
        console.log(response);
        response.data === 'OK' && getDatesInDB();
      })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  setDateAvailability = (date, activeColor) => {
    const { calendar } = this.props;
    const { lastClicked } = this.state;
    const id = getDateID(calendar, date);
    if (checkDateMatch(calendar.map(c => c.date), date)) this.removeDate(id);
    else if (lastClicked === '') alert('Veuillez d’abord choisir une couleur');
    else this.addDate(date, [activeColor]);
  }

  setTileClasses = (tiles) => {
    const { calendar } = this.props;
    const classes = [];
    calendar.filter(am => (moment(tiles.date).isSame(am.date)))
      .map(aj => aj === classes.push(aj.color));
    return classes;
  };

  disableTile = (date) => {
    if (date.date.getDay() === 0) return true;
    return false;
  }

  render() {
    const { redDate, orangeDate, lastClicked } = this.state;
    return (
      <div style={{ marginLeft: '-10vh' }}>
        <h3>Vos disponibilités</h3>
        <Row className="calendar-row">
          <Col xs="5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h5>Gestion de vos dates</h5>
            <Calendar
              onClickDay={date => this.setDateAvailability(date, lastClicked)}
              tileClassName={date => this.setTileClasses(date)}
              tileDisabled={date => this.disableTile(date)}
              minDate={new Date()}
            />
            <ButtonGroup>
              <Button className={orangeDate && 'activeButton'} onClick={() => this.chooseButton('orangeDate')} color="warning">Dates oranges</Button>
              <Button className={redDate && 'activeButton'} onClick={() => this.chooseButton('redDate')} color="danger">Dates rouges</Button>
            </ButtonGroup>
          </Col>
          <Col style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
            <p style={{ fontSize: '20vh', textAlign: 'center', marginTop: '20%' }}>→</p><b></b>

          </Col>
          <Col xs="5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h5>Vue côté client</h5>
            <CustomerViewCalendar />
          </Col>
        </Row>
        <Row>
          <b>Cliquer sur un bouton coloré puis sur une ou plusieurs dates du calendrier pour renseigner vos disponibilités:</b> <br />
          <ul>
            <li stlye={{ listStyleType: 'circle' }}><Badge color="danger">Dates rouges</Badge> les clients ne peuvent pas commander à ces dates</li>
            <li stlye={{ listStyleType: 'circle' }}><Badge color="warning">Dates oranges</Badge> vous ne garantissez pas pouvoir honorer la commande mais donnez la possibilité au client de réserver cette date.</li>
          </ul>
        </Row>
        <Row>
          Par défaut, vous êtes disponibles aux dates non colorées et votre disponibilité est limitée les samedis<br></br>
          Pour supprimer une date colorée, cliquez dessus.
        </Row>
      </div>
    );
  }
}

CalendarAdmin.propTypes = {
  getDatesInDB: PropTypes.func.isRequired,
  calendar: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  calendar: state.calendarAdmin.masterCalendar,
});

const mapDispatchToProps = dispatch => ({
  getDatesInDB: () => dispatch(fetchDatesInDB()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarAdmin);
