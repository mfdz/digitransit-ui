import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Loading from './Loading';
import LoginButton from './LoginButton';

export default class OfferedRidesDetail extends Component {
  static propTypes = {
    toList: PropTypes.func.isRequired,
    currentRide: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formState: 'initial',
      time: props.currentRide.time,
      date: props.currentRide.date,
      seats: props.currentRide.seats,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.finishForm = this.finishForm.bind(this);
  }

  finishForm = e => {
    e.preventDefault();

    const offeredRide = {
      id: this.props.currentRide.id,
      from: this.props.currentRide.from,
      to: this.props.currentRide.to,
      date: this.state.date,
      time: this.state.time,
      seats: this.state.seats,
    };

    this.setState({ formState: 'sending' });

    // TODO: change api url
    fetch(`http://a70bf5914cdc.ngrok.io/rides/${this.props.currentRide.id}`, {
      method: 'PUT',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(offeredRide),
    }).then(response => {
      if (response.status === 200) {
        this.setState({ formState: 'success' });
      }
      return response.json();
    });
  };

  handleInputChange(event) {
    const {
      target: { name, value },
    } = event;

    this.setState({
      [name]: value,
    });
  }

  renderLogin = () => {
    return (
      <div className="sidePanelText">
        Please log in to see the details.
        <LoginButton className="sidePanel-btn login-icon" isMobile />
      </div>
    );
  };

  renderForm() {
    const {
      currentRide: { from, to },
      toList,
    } = this.props;

    return (
      <div>
        <form onSubmit={this.finishForm} className="sidePanelText">
          <h2>
            <FormattedMessage id="asd" defaultMessage="Edit your search" />
          </h2>
          <p>
            <b>
              <FormattedMessage id="origin" defaultMessage="Origin" />
            </b>
            : {from}
            <br />
            <b>
              <FormattedMessage id="destination" defaultMessage="Destination" />
            </b>
            : {to}
            <br />
            <label htmlFor="date">
              <FormattedMessage id="asd" defaultMessage="Selected date:" />
              <input
                type="date"
                name="date"
                onChange={this.handleInputChange}
                value={this.state.date}
              />
            </label>
            <label htmlFor="time">
              <FormattedMessage id="asd" defaultMessage="Selected time:" />
              <input
                type="time"
                name="time"
                onChange={this.handleInputChange}
                value={this.state.time}
              />
            </label>
            <label htmlFor="seats">
              <FormattedMessage id="asd" defaultMessage="Available seats:" />
              <input
                type="number"
                name="seats"
                onChange={this.handleInputChange}
                value={this.state.seats}
              />
            </label>
          </p>
          <button className="standalone-btn" type="submit">
            <FormattedMessage id="save-search" defaultMessage="Save search" />
          </button>
          <button className="standalone-btn" type="cancel" onClick={toList}>
            Cancel
          </button>
        </form>
      </div>
    );
  }

  render() {
    const userLoggedIn = true;
    const { formState } = this.state;

    if (!userLoggedIn) {
      return this.renderLogin();
    }
    if (formState === 'initial') {
      return this.renderForm();
    }
    if (formState === 'sending') {
      return <Loading />;
    }
    if (formState === 'success') {
      return (
        <div className="sidePanelText">
          <h2>
            <FormattedMessage
              id="asd"
              defaultMessage="Your search was updated successfully!"
            />
          </h2>
          <button
            className="standalone-btn"
            type="cancel"
            onClick={this.props.toList}
          >
            Back to the list
          </button>
        </div>
      );
    }
    return null;
  }
}
