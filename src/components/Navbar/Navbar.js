import React, { useContext, useState } from 'react';

import { AuthContext } from 'src/context/AuthContext';
import { Link } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';

import './Navbar.scss';

const Navbar = () => {
  const authValue = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState();
  const handleClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu>
      <Menu.Item
        as={Link}
        to="/"
        name="Recherche"
        active={activeItem === '/'}
        onClick={handleClick}
      >
        Recherche
      </Menu.Item>

      {(authValue.userState) && (
        <Menu.Item
          as={Link}
          to="/favoritesRepos"
          name="favoritesRepos"
          active={activeItem === 'favoritesRepos'}
          onClick={handleClick}
        >
          Favoris
        </Menu.Item>
      )}
      <Menu.Item
        position="right"
        as={Link}
        to="/faq"
        name="Faq"
        active={activeItem === 'Faq'}
        onClick={handleClick}
      >
        Faq
      </Menu.Item>
      {authValue.userState ? (
        <>
          <Dropdown item icon="wrench" simple position="right">
            <Dropdown.Menu>
              <Dropdown.Item>{authValue.userState.email}</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={authValue.signOut}
                name="signout"
              >
                Se déconnecter
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <Menu.Item
          position="right"
          color="green"
          as={Link}
          to="/login"
          name="login"
          active={activeItem === 'login'}
        >
          Se connecter
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navbar;
