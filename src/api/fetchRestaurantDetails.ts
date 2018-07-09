import axios from 'axios';
import { BASE_URL } from './apiConfig';
import { Address } from './fetchRestaurantListing';
import restaurantDetailsResponse from './restaurantDetailsResponse.json';

export interface RestaurantDetails {
  info: RestaurantInfo;
  rating: {
    average: number;
  },
  address: Address,
  categories: string[],
  sections: MenuSection[];
}

export interface RestaurantInfo {
  name: string;
  logoUri: string;
  tags: string[];
  categories: string[];
}

export interface MenuSection {
  id: number;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function fetchRestaurantDetails(token: string, id: number) {
  return axios.get(
    BASE_URL + '/restaurant/' + id,
    {
      headers: {
        token
      }
    }
  ).catch(reason => {
    const isProbablyCorsError = reason.toString().indexOf('Error: Network Error') !== -1;
    if (isProbablyCorsError) {
      /* tslint:disable-next-line */
      console.warn('Fetching restaurant details failed. Assuming CORS config is incorrect in api, for demo purposes we return a dummy restaurant');
      return { data: restaurantDetailsResponse };
    }
    throw reason;
  })
}
