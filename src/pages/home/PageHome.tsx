import * as React from 'react';
import styled from 'styled-components';

import CallToAction from 'components/CallToAction';
import * as styles from 'styles';
import { RESTAURANT_LISTING_PATH } from '../routePaths';

const WelcomeMessage = styled.h1`
  text-align: center;
  font-size: ${styles.FONT_SIZE_BIG};
  margin-top: 6rem;
  margin-bottom: 10rem;
`;

const OFFICE_RESTAURANTS_PATH =
  RESTAURANT_LISTING_PATH
    .replace(':city', 'Berlin')
    .replace(':postCode', '10117');

export default class PageHome extends React.Component {
  public render() {
    return (
      <section>
        <WelcomeMessage>Welcome to pizza</WelcomeMessage>
        <CallToAction to={OFFICE_RESTAURANTS_PATH}>Find a restaurant</CallToAction>
      </section>
    );
  }
}
