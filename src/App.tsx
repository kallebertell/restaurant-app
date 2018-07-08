import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Action, ActionCreator } from 'redux';
import styled from 'styled-components';

import { fetchAuthRequest } from 'store/auth/authActions';
import { getAuthToken } from 'store/auth/authSelectors';
import { AppState } from 'store/rootReducer';
import { getLocation } from 'store/selectors';

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

interface Props {
  token?: string;
  // Location is included so the component will be re-rendered when location changes
  location: any;
  fetchAuthRequest: ActionCreator<Action>;
}

export class App extends React.Component<Props> {
  public componentDidMount() {
    if (!this.props.token) {
      this.props.fetchAuthRequest();
    }
  }

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

const mapStateToProps = (state: AppState) => ({
  token: getAuthToken(state),
  location: getLocation(state)
});

export default connect(
  mapStateToProps,
  { fetchAuthRequest }
)(App);
