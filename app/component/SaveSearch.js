import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import Moment from 'moment';
import { routerShape } from 'react-router';
import Icon from './Icon';
import Loading from './Loading';
import LoginButton from './LoginButton';
import SavedSearchesPanel from './SavedSearchesPanel';

export default class SaveSearch extends React.Component {
  static contextTypes = {
    intl: intlShape.isRequired,
    config: PropTypes.object.isRequired,
    router: routerShape,
  };

  static propTypes = {
    onToggleClick: PropTypes.func.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formState: 'initial',
      time: new Moment(props.start).format('HH:MM'),
      date: new Moment(props.start).format('YYYY-MM-DD'),
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.finishForm = this.finishForm.bind(this);
    this.close = this.close.bind(this);
  }

  finishForm = e => {
    e.preventDefault();

    const savedSearch = {
      from: this.props.from,
      to: this.props.to,
      date: this.state.date,
      time: this.state.time,
    };

    this.setState({ formState: 'sending' });

    fetch('/rides/save_search.php', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(savedSearch),
      // eslint-disable-next-line func-names
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

  close() {
    this.context.router.goBack();
    this.setState({
      formState: 'initial',
    });
  }

  renderSuccessMessage() {
    return (
      <div className="sidePanelText">
        <h2>
          <FormattedMessage
            id="asd"
            defaultMessage="Your search was saved successfully!"
          />
        </h2>
        <div className="padding-vertical-normal">
          <h3>Your already saved searches:</h3>
          <SavedSearchesPanel />
        </div>
        <div>
          <button type="submit" className="sidePanel-btn" onClick={this.close}>
            <FormattedMessage id="close" defaultMessage="Close" />
          </button>
        </div>
      </div>
    );
  }

  renderForm(origin, destination) {
    return (
      <form onSubmit={this.finishForm} className="sidePanelText">
        <h2>
          <FormattedMessage id="your-search" defaultMessage="Your search" />
        </h2>
        <p>
          <b>
            <FormattedMessage id="origin" defaultMessage="Origin" />
          </b>
          : {origin}
          <br />
          <label htmlFor="departure-date">
            <FormattedMessage
              id="asd"
              defaultMessage="Choose date other than {date}"
              values={{ date: this.state.date }}
            />
            <input
              type="date"
              name="departure-date"
              onChange={this.handleInputChange}
            />
          </label>
          <label htmlFor="departure-time">
            <FormattedMessage
              id="asd"
              defaultMessage="Choose time other than {time}"
              values={{ time: this.state.time }}
            />
            <input
              type="time"
              name="departure-time"
              // TODO add: onChange={}
            />
          </label>
          <br />
          <b>
            <FormattedMessage id="destination" defaultMessage="Destination" />
          </b>
          : {destination}
        </p>
        <button className="standalone-btn" type="submit">
          <FormattedMessage id="save-search" defaultMessage="Save search" />
        </button>
      </form>
    );
  }

  renderLogin = (origin, destination, departure) => {
    return (
      <div className="sidePanelText">
        <h2>
          <FormattedMessage id="your-search" defaultMessage="Your search" />
        </h2>
        <p>
          <b>
            <FormattedMessage id="origin" defaultMessage="Origin" />
          </b>
          : {origin} <FormattedMessage id="at-time" defaultMessage="at" />{' '}
          {departure} <FormattedMessage id="time-oclock" defaultMessage=" " />
          <br />
          <b>
            <FormattedMessage id="destination" defaultMessage="Destination" />
          </b>
          : {destination}
        </p>
        Please log in to save.
        <LoginButton className="sidePanel-btn login-icon" isMobile />
      </div>
    );
  };

  renderBody() {
    const userLoggedIn = true;
    const { formState } = this.state;
    const origin = this.props.from.name || this.props.from.split('::')[0];
    const destination = this.props.to.name || this.props.to.split('::')[0];
    const departure = new Moment(this.props.start).format('LT');

    if (!userLoggedIn) {
      return this.renderLogin(origin, destination, departure);
    }
    if (formState === 'initial') {
      return this.renderForm(origin, destination);
    }
    if (formState === 'sending') {
      return <Loading />;
    }
    if (formState === 'success') {
      return this.renderSuccessMessage();
    }
    return null;
  }

  render() {
    const { onToggleClick } = this.props;

    const stopPropagation = ev => {
      ev.stopPropagation();
    };

    return (
      // disabled because this thing only prevents events from propagating
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className="customize-search carpool-offer"
        onClick={stopPropagation}
        onKeyPress={stopPropagation}
      >
        <button className="close-offcanvas" onClick={onToggleClick}>
          <Icon className="close-icon" img="icon-icon_close" />
        </button>
        <Icon img="icon-icon_save" height={8} width={8} />
        {this.renderBody()}
      </div>
    );
  }
}
