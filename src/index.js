import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import store from './redux/stora/stora'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider
    autoDismiss
    autoDismissTimeout={10000}
    >
    <App />
    </ToastProvider>
    </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
