import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import './Navbar.scss';

const Navbar = () => {
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
      <Menu.Item
        as={Link}
        to="/faq"
        name="Faq"
        active={activeItem === 'Faq'}
        onClick={handleClick}
      >
        Faq
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
