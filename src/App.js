// import { useEffect, useContext } from 'react';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './app.css';

import { routes } from './routes';
import store from './store/store';
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes}></RouterProvider>
    </Provider>
  );
}

export default App;
