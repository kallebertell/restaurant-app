import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Action, ActionCreator } from 'redux';
import styled from 'styled-components';

import { fetchAuthRequest } from 'store/auth/authActions';
import { getAuthToken } from 'store/auth/authSelectors';
import { AppState } from 'store/rootReducer';

const PageHome = () => <div>Welcome to pizza</div>
const PageRestaurantListing = () => <div>Here we have restaurants</div>
const PageRestaurantDetails = () => <div>Here's a specific restaurant</div>
const PageNotFound = () => <div>Page not Found</div>;

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
          <Route exact={true} path="/" component={PageHome}/>
          <Route exact={true} path="/restaurants/:city/:postCode" component={PageRestaurantListing}/>
          <Route exact={true} path="/restaurant/:id" component={PageRestaurantDetails}/>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </AppWrapper>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  token: getAuthToken(state)
});

export default connect(
  mapStateToProps,
  { fetchAuthRequest }
)(App);
