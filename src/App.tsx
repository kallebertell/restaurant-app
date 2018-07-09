import * as React from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';

import PageHome from 'pages/home/PageHome';
import PageNotFound from 'pages/notFound/PageNotFound';
import PageRestaurantDetails from 'pages/restaurantDetails/PageRestaurantDetails';
import PageRestaurantListing from 'pages/restaurantListing/PageRestaurantListing';
import * as routePaths from 'pages/routePaths';
import * as styles from 'styles';

const Container = styled.div`
  margin: ${styles.PAD_VERY_BIG};
`;

export default class App extends React.Component {
  public render() {
    return (
      <Container>
        <Switch>
          <Route exact={true} path={routePaths.HOME_PATH} component={PageHome}/>
          <Route exact={true} path={routePaths.RESTAURANT_LISTING_PATH} component={PageRestaurantListing}/>
          <Route exact={true} path={routePaths.RESTAURANT_DETAILS_PATH} component={PageRestaurantDetails}/>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Container>
    );
  }
}
