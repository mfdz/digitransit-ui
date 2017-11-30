import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { intlShape } from 'react-intl';
import some from 'lodash/some';
import get from 'lodash/get';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { getHomeUrl, parseLocation } from '../util/path';
import { dtLocationShape } from '../util/shapes';
import meta from '../meta';
import AppBarContainer from './AppBarContainer';
import MobileView from './MobileView';
import DesktopView from './DesktopView';
import HSLAdformTrackingPixel from './HSLAdformTrackingPixel';
import ErrorBoundary from './ErrorBoundary';

class TopLevel extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.node,
    width: PropTypes.number,
    height: PropTypes.number,
    header: PropTypes.node,
    map: PropTypes.node,
    content: PropTypes.node,
    title: PropTypes.node,
    meta: PropTypes.node,
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        topBarOptions: PropTypes.object,
        disableMapOnMobile: PropTypes.bool,
      }).isRequired,
    ).isRequired,
    params: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
    }).isRequired,
    origin: dtLocationShape,
  };

  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    intl: intlShape,
    url: PropTypes.string.isRequired,
    headers: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  };

  static defaultProps = {
    origin: {
      set: false,
      ready: false,
    },
  };

  static childContextTypes = {
    location: PropTypes.object,
    breakpoint: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    const host =
      context.headers &&
      (context.headers['x-forwarded-host'] || context.headers.host);
    const url = context.url;

    const hasTrackingPixel = get(
      context,
      'config.showAdformTrackingPixel',
      false,
    );
    this.trackingPixel =
      host &&
      host.indexOf('127.0.0.1') === -1 &&
      host.indexOf('localhost') === -1 &&
      hasTrackingPixel ? (
        <HSLAdformTrackingPixel />
      ) : (
        undefined
      );

    this.metadata = meta(
      this.context.intl.locale,
      host,
      url,
      this.context.config,
    );
  }

  getChildContext() {
    return {
      location: this.props.location,
      breakpoint: this.getBreakpoint(),
    };
  }

  getBreakpoint = () =>
    (!this.props.width && 'none') ||
    (this.props.width < 400 && 'small') ||
    (this.props.width < 900 && 'medium') ||
    'large';

  render() {
    this.topBarOptions = Object.assign(
      {},
      ...this.props.routes.map(route => route.topBarOptions),
    );
    this.disableMapOnMobile = some(
      this.props.routes,
      route => route.disableMapOnMobile,
    );

    let content;

    const homeUrl = getHomeUrl(
      this.props.origin,
      parseLocation(this.props.params.to),
    );

    if (this.props.children || !(this.props.map || this.props.header)) {
      content = this.props.children || this.props.content;
    } else if (this.props.width < 900) {
      content = (
        <MobileView
          map={this.disableMapOnMobile || this.props.map}
          content={this.props.content}
          header={this.props.header}
        />
      );
    } else if (this.props.width >= 900) {
      content = (
        <DesktopView
          title={this.props.title}
          map={this.props.map}
          content={this.props.content}
          header={this.props.header}
          homeUrl={homeUrl}
        />
      );
    }

    const menuHeight = (this.getBreakpoint() === 'large' && '60px') || '40px';
    // Check which view we are on to decide wether to use flex or grid
    // Index page uses grid - flex for everything else
    const mainContentDisplay =
      this.props.location.pathname.indexOf('lahellasi') !== -1 ||
      this.props.location.pathname.indexOf('suosikit') !== -1
        ? {
            display: `grid`,
            flexDirection: `unset`,
            height: `calc(100% - ${menuHeight})`,
          }
        : { height: `calc(100% - ${menuHeight})` };

    return (
      <div className="fullscreen">
        {!this.topBarOptions.hidden && (
          <AppBarContainer
            title={this.props.title}
            {...this.topBarOptions}
            homeUrl={homeUrl}
          />
        )}
        <Helmet {...this.metadata} />
        <section
          id="mainContent"
          className="content"
          style={mainContentDisplay}
        >
          {this.props.meta}
          <ErrorBoundary>{content}</ErrorBoundary>
        </section>
        {this.trackingPixel}
      </div>
    );
  }
}

export default connectToStores(TopLevel, ['OriginStore'], ({ getStore }) => ({
  origin: getStore('OriginStore').getOrigin(),
}));
