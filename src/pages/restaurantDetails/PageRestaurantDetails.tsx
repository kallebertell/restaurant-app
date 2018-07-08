import * as React from 'react';
import { connect } from 'react-redux';

import { RestaurantDetails } from 'api';
import { fetchRestaurantDetailsRequest } from 'store/restaurantDetails/restaurantDetailsActions';
import { getRestaurantDetails, getRestaurantDetailsLoading } from 'store/restaurantDetails/restaurantDetailsSelectors';
import { AppState } from 'store/rootReducer';

interface Props {
  restaurant?: RestaurantDetails;
  loading: boolean;
  fetchRestaurantDetailsRequest: (id: number) => any;
  match: any;
}

export class PageRestaurantDetails extends React.Component<Props> {
  public componentDidMount() {
    if (!this.props.restaurant) {
      this.props.fetchRestaurantDetailsRequest(this.props.match.params.id);
    }
  }

  public render() {
    const { restaurant, loading } = this.props;
    return (
      <section>
        {loading && <div>Loading..</div>}
        {restaurant && (
          <div>
            {JSON.stringify(restaurant, null, 2)}
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  restaurant: getRestaurantDetails(state),
  loading: getRestaurantDetailsLoading(state)
});

export default connect(
  mapStateToProps,
  { fetchRestaurantDetailsRequest }
)(PageRestaurantDetails);
