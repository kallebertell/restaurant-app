import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { RestaurantDetails } from 'api';
import { RestaurantCard } from 'components';

import { fetchRestaurantDetailsRequest } from 'store/restaurantDetails/restaurantDetailsActions';
import { getRestaurantDetails, getRestaurantDetailsLoading } from 'store/restaurantDetails/restaurantDetailsSelectors';
import { AppState } from 'store/rootReducer';
import * as styles from 'styles';

interface Props {
  restaurant?: RestaurantDetails;
  loading: boolean;
  fetchRestaurantDetailsRequest: (id: number) => any;
  match: any;
}

interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  onAddToCart: (id: number) => void;
}

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding-bottom: ${styles.PAD};
`;

const Menu = styled.section`
  margin-top: ${styles.PAD_BIG};
  padding: ${styles.PAD_BIG};
  border: 1px solid ${styles.COLOR_BORDER};
  border-radius: ${styles.BORDER_RADIUS};
`;

class MenuItem extends React.Component<MenuItemProps> {
  public handleAddToCart = () => {
    this.props.onAddToCart(this.props.id)
  }

  public render() {
    const { name, price } = this.props;
    return (
      <Item>
        <div>{name} ${price}</div>
        <button onClick={this.handleAddToCart}>Add to cart</button>
      </Item>
    );
  }
}

export class PageRestaurantDetails extends React.Component<Props> {
  public componentDidMount() {
    if (!this.props.restaurant) {
      this.props.fetchRestaurantDetailsRequest(this.props.match.params.id);
    }
  }

  public handleAddToCart = (itemId: number) => {
   /* tslint:disable-next-line */
   console.log(`Added item ${itemId} to cart`);
  }

  public render() {
    const { restaurant, loading } = this.props;
    return (
      <section>
        {loading && <div>Loading..</div>}
        {restaurant &&
          <div>
            <RestaurantCard
              name={restaurant.info.name}
              logoUri={restaurant.info.logoUri}
              rating={restaurant.rating.average}
              address={restaurant.address}
              categories={restaurant.info.categories}
            />
            <Menu>
              {restaurant.sections.map(section => (
                <section key={section.id}>
                  <h2>{section.name}</h2>
                  <ul>
                    {section.items.map(item => (
                      <MenuItem key={item.id} id={item.id} name={item.name} price={item.price} onAddToCart={this.handleAddToCart}/>
                    ))}
                  </ul>
                </section>
              ))}
            </Menu>
          </div>
        }
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
