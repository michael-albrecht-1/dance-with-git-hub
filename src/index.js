// == Import : npm
import React from 'react';
import { render } from 'react-dom';
import { AuthProvider } from 'src/context/AuthContext';

// == Import : local
// Composants
import App from 'src/components/App';

const rootReactElement = (
  <AuthProvider>
    <App />
  </AuthProvider>
);
const target = document.getElementById('root');

render(rootReactElement, target);
