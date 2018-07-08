import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Action, ActionCreator } from 'redux';
import styled from 'styled-components';

import { Address, RestaurantSummary } from 'api';
import { fetchRestaurantListingRequest, setRestaurantFilter, SetRestaurantFilterAction } from 'store/restaurantListing/restaurantListingActions';
import { getFilter, getFilteredListing, getRestaurantListingLoading } from 'store/restaurantListing/restaurantListingSelectors';
import { AppState } from 'store/rootReducer';

import { RESTAURANT_DETAILS_PATH } from '../routePaths';

import * as styles from 'styles';

const RestaurantCardLink = styled(Link)`
  display: flex;
  flex-direction: row;

  color: ${styles.COLOR_TEXT}
  text-align: left;
  text-decoration: none;

  border-radius: ${styles.BORDER_RADIUS};

  border: 1px solid ${styles.COLOR_BORDER};
  padding: ${styles.PAD_BIG};
  margin-bottom: ${styles.PAD};

  &:hover {
    border: 1px solid ${styles.COLOR_BRAND_PRIMARY};
  }
`;

const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0 ${styles.PAD_BIG}
`;

const RestaurantHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

const RestaurantLogo = styled.img`
  width: 12rem;
  height: 12rem;
`;

const RestaurantName = styled.div`
  padding-right: ${styles.PAD_BIG}
  font-size: ${styles.FONT_SIZE_BIG};
`;

const Rating = styled.div`
  font-size: ${styles.FONT_SIZE_BIG};
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
`;

const Category = styled.div`
  font-size: ${styles.FONT_SIZE_NORMAL};
  color: ${styles.COLOR_TEXT_INVERSE};
  background-color: ${styles.COLOR_BRAND_PRIMARY};
  margin-right: ${styles.PAD_SMALL};
  padding: ${styles.PAD_SMALL};
  border-radius: ${styles.BORDER_RADIUS};
`;

const RestaurantLocation = styled(({ street_name, street_number, zipcode, city }: Address) => (
  <span>${street_name} ${street_number}, ${zipcode} ${city}</span>
))`
  font-size: ${styles.FONT_SIZE_SMALL};
  color: ${styles.COLOR_TEXT_MUTED};
`;

interface Props {
  restaurants?: RestaurantSummary[];
  loading: boolean;
  filter?: string;
  fetchRestaurantListingRequest: ActionCreator<Action>;
  setRestaurantFilter: (filter: string) => SetRestaurantFilterAction;
}

export class PageRestaurantListing extends React.Component<any> {
  public componentDidMount() {
    this.props.fetchRestaurantListingRequest();
  }

  public handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.setRestaurantFilter(event.currentTarget.value);
  }

  public render() {
    const { restaurants, loading, filter } = this.props as Props;
    return (
      <section>
        {loading && <div>Loading..</div>}
        <div>
          <select value={filter} onChange={this.handleFilterChange}>
            <option value="none">Filter by category..</option>
            <option value="indisch">indisch</option>
            <option value="baguette">baguette</option>
            <option value="pizza-pasta">pizza-pasta</option>
            <option value="amerikanish">amerikanish</option>
          </select>
        </div>
        {restaurants && restaurants.map(restaurant => (
          <RestaurantCardLink key={restaurant.id} to={RESTAURANT_DETAILS_PATH.replace(':id', restaurant.id)}>
            <RestaurantLogo src={restaurant.general.logo_uri}/>
            <RestaurantInfo>
              <div>
                <RestaurantHeader>
                  <RestaurantName>{restaurant.general.name}</RestaurantName>
                  <Rating>{restaurant.rating.average}</Rating>
                </RestaurantHeader>
                <RestaurantLocation {...restaurant.address} />
              </div>
              <Categories>
                {restaurant.general.categories.map(category => (
                  <Category key={category}>{category}</Category>
                ))}
              </Categories>
            </RestaurantInfo>
          </RestaurantCardLink>
        ))}
      </section>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  restaurants: getFilteredListing(state),
  loading: getRestaurantListingLoading(state),
  filter: getFilter(state)
});

export default connect(
  mapStateToProps,
  { fetchRestaurantListingRequest, setRestaurantFilter }
)(PageRestaurantListing);
