import {getBuildNumber, getVersion} from 'react-native-device-info';
import {API, BASE_URL} from './api';

export const APIClient = {
  async getToken(): Promise<string> {
    // const {getTokenData} = await useUser();

    return 'Bearer token';
  },

  async getHeaders(additionalHeaders?: any): Promise<any> {
    const appBuildNumber = await getBuildNumber();
    const appVersion = await getVersion();
    const token = await this.getToken();

    return {
      Authorization: token,
      'version-code': appBuildNumber,
      'version-name': appVersion,
      ...additionalHeaders,
    };
  },

  async get<Type>(resource: string, path?: string): Promise<Type> {
    try {
      console.info('GET', `${BASE_URL}/${resource}/${path}`);
      // const url = `${BASE_URL}/${resource}/${path}`; // some url here
      // const url = 'https://jsonplaceholder.typicode.com/posts'; // some url here
      let url = ''; // some url here

      if (path) {
        url = `${resource}/${path}`;
      } else {
        url = resource;
      }

      return await API.get(url, {
        headers: await this.getHeaders(),
      });
    } catch (err: any) {
      if (err?.response) {
        throw err?.response;
      }

      throw err;
    }
  },

  async post<Type>(
    resource: string,
    path?: string,
    body?: any,
    additionalHeaders?: any,
  ): Promise<Type> {
    try {
      let url = '';

      if (path) {
        url = `${resource}/${path}`;
      } else {
        url = resource;
      }

      console.info('POST', `${BASE_URL}/${url}`);

      return await API.post(url, body, additionalHeaders);
    } catch (err: any) {
      if (err?.response) {
        throw err?.response;
      }

      throw err;
    }
  },

  async patch<Type>(
    resource: string,
    path?: string,
    body?: any,
    additionalHeaders?: any,
  ): Promise<Type> {
    try {
      let url = '';

      if (path) {
        url = `${resource}/${path}`;
      } else {
        url = resource;
      }

      console.info('PATCH', `${BASE_URL}/${url}`);

      return await API.patch(url, body, additionalHeaders);
    } catch (err: any) {
      if (err?.response) {
        throw err?.response;
      }

      throw err;
    }
  },

  async put<Type>(
    resource: string,
    path?: string,
    body?: any,
    additionalHeaders?: any,
  ): Promise<Type> {
    try {
      let url = '';

      if (path) {
        url = `${resource}/${path}`;
      } else {
        url = resource;
      }

      console.info('PUT', `${BASE_URL}/${url}`);

      return await API.put(url, body, additionalHeaders);
    } catch (err: any) {
      if (err?.response) {
        throw err?.response;
      }

      throw err;
    }
  },
};
