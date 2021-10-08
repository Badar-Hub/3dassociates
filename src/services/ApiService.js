import _axios from 'axios';

export class ApiService {
  static axios = _axios.create({
    baseURL: 'https://shop.3dassociates.pk/wp-json/wc/v3/',
    params: {
      consumer_key: 'ck_0de8c7c5eeebfffdbfed0778d1a3aab8811f8fc8',
      consumer_secret: 'cs_236a7298804877b0ea2da8d36191eba7723b63f9',
    },
  });

  static async get(url) {
    try {
      const res = await ApiService.axios.get(url);
      if (res) {
        return res.data;
      }
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static async post(url, body) {
    try {
      const res = await ApiService.axios.post(url, body);
      if (res) {
        return res.data;
      }
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static async put(url, body) {
    try {
      const res = await ApiService.axios.put(url, body);
      if (res) {
        return res.data;
      }
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static async delete(url) {
    try {
      const res = await ApiService.axios.delete(url);
      if (res) {
        return res.data;
      }
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static handleError(error) {
    console.log(error);
  }
}
