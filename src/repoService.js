import axiosService from './axiosService';

const repoService = {
  endpoint: '/repositories',

  getByName: (name, setRepos, currentPage, setResultsCount, setStatus) => {
    const param = `?q=${name}&sort=stars&order=desc&page=${currentPage}&per_page=9`;
    const path = repoService.endpoint + param;

    const callback = (e) => {
      setRepos(e.items);
      setResultsCount(e.total_count);
    };

    axiosService.getAll(path, callback, setStatus);
  },

  isMoreResultsButonDisplayed: (resultsCount, reposDisplayed, setDisplayMoreResultsButton) => {
    if ((resultsCount - reposDisplayed) > 0) {
      setDisplayMoreResultsButton(true);
    }
    else {
      setDisplayMoreResultsButton(false);
    }
  },

};

export default repoService;
