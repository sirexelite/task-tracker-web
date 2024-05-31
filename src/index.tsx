import React from 'react';
import ReactDOM from 'react-dom/client';
import './scheme.scss';
import './utils.scss';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Layout from "@components/Layout";
import Calendar from "@components/Calendar";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Layout>
      <Calendar/>
    </Layout>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
