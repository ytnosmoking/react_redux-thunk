import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import store from './store'
import zhCN from 'antd/es/locale/zh_CN';
import 'animate.css'
// import { isDev } from 'utils/config'

import App from './App';
import * as serviceWorker from './serviceWorker';




// const Router = isDev ? BrowserRouter : HashRouter
const Router = BrowserRouter

ReactDOM.render(<Provider store={store}>
  <Router>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Router>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
