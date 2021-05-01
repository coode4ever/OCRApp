import React from 'react';
import AppRoute from './AppRoute';
import Context from './src/context';

const App = () => {
  return (
    <Context>
      <AppRoute />
    </Context>
  );
};

export default App;
