// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { Toaster } from 'react-hot-toast';
// import { Provider } from 'react-redux';
// import store from './redux/Store'; // Ensure this path is correct

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}> {/* Pass the store here */}
//       <App />
//       <Toaster />
//     </Provider>
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './redux/Store'; // Ensure this path is correct
import { SocketProvider } from './Contexts/SocketContext'; // Adjust the import path as needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <App />
        <Toaster />
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);
