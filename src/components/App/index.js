// == Import npm
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

// == Import
import { AuthProvider } from 'src/context/AuthContext';
import logoGithub from 'src/assets/images/logo-github.png';
import repoService from 'src/repoService';
import Faq from '../Faq/Faq';
import Message from '../Message/Message';
import Navbar from '../Navbar/Navbar';
import NotFound from '../NotFound/NotFound';
import ReposResults from '../ReposResults/ReposResults';
import SearchBar from '../SearchBar/SearchBar';
import './styles.scss';
import Login from '../Login/Login';

const DEFAULT_STATUS = {
  label: '',
  class: '',
  code: 0,
};

// == Composant
const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [repos, setRepos] = useState([]);

  // #paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsCount, setResultsCount] = useState(0);

  const [displayMoreResultsButton, setDisplayMoreResultsButton] = useState(false);

  const [status, setStatus] = useState(DEFAULT_STATUS);
  const generateMessage = () => '';

  useEffect(() => {
    repoService.isMoreResultsButonDisplayed(
      resultsCount,
      repos.length,
      setDisplayMoreResultsButton,
    );
  });

  const updateRepos = (dataFromApi) => {
    const cloneRepos = repos;
    const newRepos = [...cloneRepos, ...dataFromApi];
    setRepos(newRepos);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setCurrentPage(1);
    repoService.getByName(search, setRepos, currentPage, setResultsCount, setStatus);
    generateMessage();
    setIsLoading(false);
  };

  const handleMoreResultsClick = () => {
    setIsLoading(true);
    setCurrentPage(currentPage + 1);
    repoService.getByName(search, updateRepos, currentPage + 1, setResultsCount, setStatus);
    generateMessage();
    setIsLoading(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <header className="header">
            <img src={logoGithub} alt="react logo" />
            <Navbar />
          </header>
          <Switch>
            <Route exact path="/">
              <SearchBar
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                search={search}
                setSearch={(e) => setSearch(e.target.value)}
              />
              <Message status={status} resultsCount={resultsCount} />
              <ReposResults
                repos={repos}
                displayMoreResultsButton={displayMoreResultsButton}
                handleMoreResultsClick={handleMoreResultsClick}
              />
            </Route>
            <Route exact path="/faq">
              <Faq />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

// == Export
export default App;
