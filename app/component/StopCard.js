import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import StopCardHeaderContainer from './StopCardHeaderContainer';
import Card from './Card';
import { PREFIX_STOPS, PREFIX_TERMINALS } from '../util/path';
import CarpoolDetails from './CarpoolDetails';

function StopCard(props) {
  if (!props.stop || !props.children || props.children.length === 0) {
    return false;
  }
  const prefix = props.isTerminal ? PREFIX_TERMINALS : PREFIX_STOPS;

  if (props.stop.gtfsId.indexOf('mfdz') !== -1) {
    return (
      <Card className={props.className}>
        <StopCardHeaderContainer
          stop={props.stop}
          icons={props.icons}
          distance={props.distance}
          isPopUp={props.isPopUp}
          headingStyle="header-primary"
        />
        <CarpoolDetails lat={props.stop.lat} lon={props.stop.lon} />
        {props.children}
      </Card>
    );
  }

  return (
    <Link
      to={`/${prefix}/${encodeURIComponent(props.stop.gtfsId)}`}
      className="no-decoration"
      onlyActiveOnIndex={false}
    >
      <Card className={props.className}>
        <StopCardHeaderContainer
          stop={props.stop}
          icons={props.icons}
          distance={props.distance}
          isPopUp={props.isPopUp}
          headingStyle="header-primary"
        />
        {props.children}
      </Card>
    </Link>
  );
}

StopCard.propTypes = {
  stop: PropTypes.shape({
    gtfsId: PropTypes.string.isRequired,
    lon: PropTypes.number,
    lat: PropTypes.number,
  }).isRequired,
  icons: PropTypes.arrayOf(PropTypes.node),
  distance: PropTypes.number,
  isPopUp: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  isTerminal: PropTypes.bool,
};

StopCard.defaultProps = {
  icons: [],
  isPopUp: false,
  className: '',
  isTerminal: false,
};

export default StopCard;
