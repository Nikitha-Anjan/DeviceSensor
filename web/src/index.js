import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot if using React 18
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store'; // Import the Redux store
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);