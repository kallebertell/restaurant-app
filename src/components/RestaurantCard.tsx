import * as React from 'react';
import styled from 'styled-components';

import { Address } from 'api';
import * as styles from 'styles';

const RestaurantCard = styled.div`
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
  name: string;
  logoUri: string;
  rating: number;
  address: Address;
  categories: string[];
}

export default ({ name, logoUri, rating, address, categories }: Props) => (
  <RestaurantCard>
    <RestaurantLogo src={logoUri}/>
    <RestaurantInfo>
      <div>
        <RestaurantHeader>
          <RestaurantName>{name}</RestaurantName>
          <Rating>{rating}</Rating>
        </RestaurantHeader>
        <RestaurantLocation {...address} />
      </div>
      <Categories>
        {categories.map(category => (
          <Category key={category}>{category}</Category>
        ))}
      </Categories>
    </RestaurantInfo>
  </RestaurantCard>
);
