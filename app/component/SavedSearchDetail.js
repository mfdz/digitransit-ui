import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Loading from './Loading';
import LoginButton from './LoginButton';

export default class SavedSearchDetail extends Component {
  static propTypes = {
    toList: PropTypes.func.isRequired,
    currentSearch: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formState: 'initial',
      time: props.currentSearch.time,
      date: props.currentSearch.date,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.finishForm = this.finishForm.bind(this);
  }

  finishForm = e => {
    e.preventDefault();

    const savedSearch = {
      id: this.props.currentSearch.id,
      from: this.props.currentSearch.from,
      to: this.props.currentSearch.to,
      date: this.state.date,
      time: this.state.time,
    };

    this.setState({ formState: 'sending' });

    // TODO: change api url
    fetch(
      `http://a70bf5914cdc.ngrok.io/itineraries/${this.props.currentSearch.id}`,
      {
        method: 'PUT',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(savedSearch),
      },
    ).then(response => {
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
      currentSearch: { from, to },
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
