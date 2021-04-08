const axios = require('axios');

const axiosService = {
  baseUrl: 'https://api.github.com/search',

  getAll: (path, callback, status) => {
    const url = axiosService.baseUrl + path;
    axios
      .get(url)
      .then((res) => {
        status(axiosService.handleStatus(200));
        callback(res.data);
      })
      .catch((err) => status(axiosService.handleStatus(err)));
  },
  handleStatus: (error) => {
    if (error === 200) {
      return {
        label: 'succès !',
        class: 'success',
        code: 200,
      };
    }
    switch (error.response.status) {
      case 401:
        return {
          label: 'Erreur 401',
          class: 'error',
          code: 401,
        };
      case 404:
        return {
          label: 'Erreur 404!',
          class: 'error',
          code: 404,
        };
      default:
        return {
          label: 'Erreur 500!',
          class: 'error',
          code: 500,
        };
    }
  },
};

export default axiosService;
