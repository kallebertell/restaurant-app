import axios from 'axios';
import { BASE_URL } from './apiConfig';
import restaurantDetailsResponse from './restaurantDetailsResponse.json';

// Api returns 403 for the cors pre-flight request.
// Probably an oversight on the backend
const API_SUPPORTS_CORS = false;

export interface RestaurantDetails {
  info: RestaurantInfo;
  sections: MenuSection[];
}

export interface RestaurantInfo {
  name: string;
  logo_uri: string;
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

  if (!API_SUPPORTS_CORS) {
    return new Promise(resolve => {
      setTimeout(() => resolve({
        data: restaurantDetailsResponse
      }), 1000);
    });
  }

  return axios.get(
    BASE_URL + '/restaurant/' + id,
    {
      headers: {
        token
      }
    }
  )
}
