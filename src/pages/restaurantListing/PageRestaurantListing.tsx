import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Action, ActionCreator } from 'redux';

import { RestaurantSummary } from 'api';
import { fetchRestaurantListingRequest } from 'store/restaurantListing/restaurantListingActions';
import { getRestaurantListing, getRestaurantListingLoading } from 'store/restaurantListing/restaurantListingSelectors';
import { AppState } from 'store/rootReducer';

import { RESTAURANT_DETAILS_PATH } from '../routePaths';

interface Props {
  restaurants?: RestaurantSummary[];
  loading: boolean;
  fetchRestaurantListingRequest: ActionCreator<Action>;
}

const getRestaurantLocation = (restaurant: RestaurantSummary) => {
  const { street_name, street_number, zipcode, city } = restaurant.address;
  return `${street_name} ${street_number}, ${zipcode} ${city}`;
};

export class PageRestaurantListing extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchRestaurantListingRequest();
  }

  public render() {
    const { restaurants, loading } = this.props;
    return (
      <section>
        {loading && <div>Loading..</div>}
        {restaurants && restaurants.map(restaurant => (
          <Link key={restaurant.id} to={RESTAURANT_DETAILS_PATH.replace(':id', restaurant.id)}>
            <div>{restaurant.general.name}</div>
            <div>Rating: {restaurant.rating.average}</div>
            <div>{getRestaurantLocation(restaurant)}</div>
          </Link>
        ))}
      </section>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  restaurants: getRestaurantListing(state),
  loading: getRestaurantListingLoading(state)
});

export default connect(
  mapStateToProps,
  { fetchRestaurantListingRequest }
)(PageRestaurantListing);
