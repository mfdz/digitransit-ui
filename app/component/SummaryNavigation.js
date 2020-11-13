import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { routerShape } from 'react-router';

import { FormattedMessage } from 'react-intl';
import LazilyLoad, { importLazy } from './LazilyLoad';
import OriginDestinationBar from './OriginDestinationBar';
import QuickSettingsPanel from './QuickSettingsPanel';
import StreetModeSelectorPanel from './StreetModeSelectorPanel';
import { getDrawerWidth, isBrowser } from '../util/browser';
import * as ModeUtils from '../util/modeUtils';
import { parseLocation, PREFIX_ITINERARY_SUMMARY } from '../util/path';
import withBreakpoint from '../util/withBreakpoint';
import { addAnalyticsEvent } from '../util/analyticsUtils';
import { MapMode, StreetMode } from '../constants';
import Icon from './Icon';

class SummaryNavigation extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
    }).isRequired,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    breakpoint: PropTypes.string.isRequired,
    serviceTimeRange: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    startTime: null,
    endTime: null,
  };

  static contextTypes = {
    config: PropTypes.object.isRequired,
    router: routerShape,
    location: PropTypes.object.isRequired,
    getStore: PropTypes.func.isRequired,
  };

  customizeSearchModules = {
    Drawer: () => importLazy(import('material-ui/Drawer')),
    CustomizeSearch: () => importLazy(import('./CustomizeSearchNew')),
  };

  componentDidMount() {
    this.unlisten = this.context.router.listen(location => {
      if (
        this.context.location.state &&
        this.context.location.state.customizeSearchOffcanvas &&
        (!location.state || !location.state.customizeSearchOffcanvas) &&
        !this.transitionDone &&
        location.pathname.startsWith(`/${PREFIX_ITINERARY_SUMMARY}/`)
      ) {
        this.transitionDone = true;
        const newLocation = {
          ...this.context.location,
          state: {
            ...this.context.location.state,
            customizeSearchOffcanvas: false,
          },
        };
        setTimeout(() => this.context.router.replace(newLocation), 0);
      } else {
        this.transitionDone = false;
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  onRequestChange = newState => {
    this.internalSetOffcanvas(newState);
  };

  getOffcanvasState = () =>
    (this.context.location.state &&
      this.context.location.state.customizeSearchOffcanvas) ||
    false;

  renderStreetModeSelector = (config, router) => (
    <div className="street-mode-selector-panel-container">
      <StreetModeSelectorPanel
        selectedStreetMode={ModeUtils.getStreetMode(router.location, config)}
        selectStreetMode={(streetMode, isExclusive) => {
          ModeUtils.setStreetMode(streetMode, config, router, isExclusive);
          addAnalyticsEvent({
            action: 'SelectTravelingModeFromQuickSettings',
            category: 'ItinerarySettings',
            name: streetMode,
          });
          const MapModeStore = this.context.getStore('MapModeStore');
          if (streetMode === StreetMode.Bicycle) {
            MapModeStore.setPrevMapMode(MapModeStore.getMapMode());
            MapModeStore.setMapMode(MapMode.Bicycle);
          }
          if (streetMode !== StreetMode.Bicycle) {
            MapModeStore.setMapMode(MapModeStore.getPrevMapMode());
          }
        }}
        streetModeConfigs={ModeUtils.getAvailableStreetModeConfigs(config)}
      />
    </div>
  );

  render() {
    const { config, router } = this.context;
    const className = cx({ 'bp-large': this.props.breakpoint === 'large' });
    const isOpen = this.getOffcanvasState();

    return (
      <div className="summary-navigation-container">
        <OriginDestinationBar
          className={className}
          origin={parseLocation(this.props.params.from)}
          destination={parseLocation(this.props.params.to)}
        />
        {isBrowser && (
          <React.Fragment>
            {this.renderStreetModeSelector(config, router)}
            <div className={cx('quicksettings-separator-line')} />
            <QuickSettingsPanel
              timeSelectorStartTime={this.props.startTime}
              timeSelectorEndTime={this.props.endTime}
              timeSelectorServiceTimeRange={this.props.serviceTimeRange}
            >
              <span className="offcanvas-buttons">
                {config.showCarpoolOffer && (
                  <a
                    href={`${config.URL.PHPCRUD_URL}/ride_offer.php?from=${
                      parseLocation(this.props.params.from).address
                    }&to=${parseLocation(this.props.params.to).address}&time=${
                      this.props.startTime
                    }`}
                  >
                    <button
                      className="standalone-btn carpool-offer-btn"
                      aria-label="offer-ride"
                    >
                      <FormattedMessage
                        id="offer-ride"
                        defaultMessage="Offer ride"
                      />
                    </button>
                  </a>
                )}
                {this.context.config.showSaveSearch && (
                  <a
                    href={`${config.URL.PHPCRUD_URL}/ride_search.php?from=${
                      parseLocation(this.props.params.from).address
                    }&to=${parseLocation(this.props.params.to).address}&time=${
                      this.props.startTime
                    }`}
                  >
                    <button
                      className="standalone-btn carpool-offer-btn"
                      aria-label="save-search"
                      style={{ border: 'none', fontSize: '0.9rem' }}
                    >
                      <Icon img="icon-icon_save" />
                    </button>
                  </a>
                )}
              </span>
            </QuickSettingsPanel>
          </React.Fragment>
        )}
        <LazilyLoad modules={this.customizeSearchModules}>
          {({ Drawer, CustomizeSearch }) => (
            <Drawer
              className="offcanvas"
              disableSwipeToOpen
              openSecondary
              docked={false}
              open={isOpen}
              onRequestChange={this.onRequestChange}
              // Needed for the closing arrow button that's left of the drawer.
              containerStyle={{
                background: 'transparent',
                boxShadow: 'none',
                overflow: 'visible',
              }}
              style={{
                // hide root element from screen reader in sync with drawer animation
                transition: 'visibility 450ms',
                visibility: isOpen ? 'visible' : 'hidden',
              }}
              width={getDrawerWidth(window)}
            >
              <CustomizeSearch
                params={this.props.params}
                onToggleClick={this.toggleCustomizeSearchOffcanvas}
              />
            </Drawer>
          )}
        </LazilyLoad>
      </div>
    );
  }
}

export default withBreakpoint(SummaryNavigation);
