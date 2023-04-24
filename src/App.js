// import { useEffect, useContext } from 'react';
import { useEffect } from 'react';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './reset.css';

import { routes } from './routes';
import { socket } from './services/socket';
import store from './store/store';

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      // console.log('connected');
    });
  });
  return (
    <Provider store={store}>
      <RouterProvider router={routes}></RouterProvider>
    </Provider>
  );
}

export default App;
