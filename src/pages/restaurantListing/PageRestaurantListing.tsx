import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Action } from 'redux';
import styled from 'styled-components';

import { RestaurantSummary } from 'api';
import { Logo, RestaurantCard } from 'components';
import { fetchRestaurantListingRequest, setRestaurantFilter, SetRestaurantFilterAction, setRestaurantSort, SetRestaurantSortAction, SortMethod } from 'store/restaurantListing/restaurantListingActions';
import { getAvailableCategories, getFilter, getFilteredListing, getRestaurantListingLoading, getSort } from 'store/restaurantListing/restaurantListingSelectors';
import { AppState } from 'store/rootReducer';

import { RESTAURANT_DETAILS_PATH } from '../routePaths';

import * as styles from 'styles';

const RestaurantLink = styled(Link)`
  text-decoration: none;
  display: block;
  margin-bottom: ${styles.PAD};

  &:hover {
    box-shadow: 0 0 3px ${styles.COLOR_BRAND_PRIMARY};
  }
`;

const ToolBar = styled.div`
  margin: ${styles.PAD} 0;
  text-align: right;
  select {
    margin-left: ${styles.PAD};
  }
`;

interface StateProps {
  restaurants: RestaurantSummary[];
  loading: boolean;
  filter?: string;
  sort?: SortMethod;
  availableCategories: string[];
}

interface ActionProps {
  fetchRestaurantListingRequest: () => Action<string>;
  setRestaurantFilter: (filter: string) => SetRestaurantFilterAction;
  setRestaurantSort: (sort: SortMethod) => SetRestaurantSortAction;
}

export class PageRestaurantListing extends React.Component<StateProps & ActionProps> {
  public componentDidMount() {
    this.props.fetchRestaurantListingRequest();
  }

  public handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.setRestaurantFilter(event.currentTarget.value);
  }

  public handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.setRestaurantSort(event.currentTarget.value as SortMethod);
  }

  public render() {
    const { restaurants, loading, filter, sort, availableCategories } = this.props;
    return (
      <section>
        <Logo />

        {loading && <div>Loading..</div>}

        <ToolBar>
          <select value={filter} onChange={this.handleFilterChange}>
            <option value="none">Filter by category..</option>
            {availableCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select value={sort} onChange={this.handleSortChange}>
            <option value="none">Sort by..</option>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
          </select>
        </ToolBar>

        <div>
          {restaurants.map(restaurant => (
            <RestaurantLink key={restaurant.id} to={RESTAURANT_DETAILS_PATH.replace(':id', restaurant.id)}>
              <RestaurantCard
                name={restaurant.general.name}
                logoUri={restaurant.general.logo_uri}
                rating={restaurant.rating.average}
                address={restaurant.address}
                categories={restaurant.general.categories}
              />
            </RestaurantLink>
          ))}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  restaurants: getFilteredListing(state),
  loading: getRestaurantListingLoading(state),
  filter: getFilter(state),
  sort: getSort(state),
  availableCategories: getAvailableCategories(state)
});

const actionProps: ActionProps =
  { fetchRestaurantListingRequest, setRestaurantFilter, setRestaurantSort };

export default connect(
  mapStateToProps,
  actionProps,
)(PageRestaurantListing);
