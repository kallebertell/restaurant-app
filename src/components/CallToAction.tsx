import { Link } from 'react-router-dom';
import styled from 'styled-components';

import * as styles from 'styles';

export default styled(Link)`
  font-size: ${styles.FONT_SIZE_VERY_BIG};
  font-weight: 300;
  color: ${styles.COLOR_BRAND_PRIMARY};
  border: 2px solid ${styles.COLOR_BRAND_PRIMARY};
  border-radius: ${styles.BORDER_RADIUS};
  text-decoration: none;
  padding: ${styles.PAD_BIG}
`;
