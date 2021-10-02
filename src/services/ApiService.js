import _axios from 'axios';

export class ApiService {
  static axios = _axios.create({
    baseURL: 'https://shop.3dassociates.pk/wp-json/wc/v3/',
    params: {
      consumer_key: 'ck_eae55b428917649345f163ae70a490f4da5cd090',
      consumer_secret: 'cs_48280fa37373391243dbaf5faae25ac799afaa28',
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
