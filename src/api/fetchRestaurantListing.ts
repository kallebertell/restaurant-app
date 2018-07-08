import axios from 'axios';
import { BASE_URL } from './apiConfig';

export interface FetchRestaurantListingResponse {
  pagination: Pagination;
  data: RestaurantSummary[];
}

export interface Pagination {
  total_items: number;
  total_pages: number;
  limit: number;
  page: number;
  offset: number;
}

export interface RestaurantSummary {
  id: string;
  general: {
    name: string;
    categories: string[];
    tags: string[];
    logo_uri: string;
  },
  rating: {
    average: number;
  },
  address: {
    city: string;
    zipcode: string;
    street_name: string,
    street_number: string
  }
}

export default function fetchRestaurantListing(token: string) {
  return axios.get(
    BASE_URL + '/restaurants',
    {
      headers: {
        token
      }
    }
  )
}
