import axios from 'axios';
import { BASE_URL } from './apiConfig';

export default function fetchAuth() {
  return axios.get(BASE_URL + '/auth')
}

export interface FetchAuthResponse {
  token: string;
}
