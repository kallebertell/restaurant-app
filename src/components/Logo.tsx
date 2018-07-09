import * as React from 'react';
import styled from 'styled-components';

import svg from './logo.svg';

const Logo = styled.img`
  width: 20rem;
`;

export default () => (
  <Logo src={svg} />
);
