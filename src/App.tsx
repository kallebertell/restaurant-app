import * as React from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';

import PageHome from 'pages/home/PageHome';
import PageNotFound from 'pages/notFound/PageNotFound';
import PageRestaurantDetails from 'pages/restaurantDetails/PageRestaurantDetails';
import PageRestaurantListing from 'pages/restaurantListing/PageRestaurantListing';
import * as routePaths from 'pages/routePaths';

const AppWrapper = styled.div`
  text-align: center;
`
const Header = styled.header`
  background: black;
  color: white;
  padding: 1rem;
`
const Title = styled.h1`
  text-transform: uppercase;
  margin: 0;
`;

export default class App extends React.Component {
  public render() {
    return (
      <AppWrapper>
        <Header>
          <Title>Eat Pizza</Title>
        </Header>
        <Switch>
          <Route exact={true} path={routePaths.HOME_PATH} component={PageHome}/>
          <Route exact={true} path={routePaths.RESTAURANT_LISTING_PATH} component={PageRestaurantListing}/>
          <Route exact={true} path={routePaths.RESTAURANT_DETAILS_PATH} component={PageRestaurantDetails}/>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </AppWrapper>
    );
  }
}
