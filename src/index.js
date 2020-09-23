
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import store from "./store";
import zhCN from "antd/es/locale/zh_CN";
import "animate.css";
import { isDev } from "utils/config";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

// const Router = isDev ? BrowserRouter : HashRouter
const Router = BrowserRouter;

ReactDOM.render(<Provider store={store}>
  <Router>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Router>
</Provider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (isDev) {
  serviceWorker.unregister();
} else {
  serviceWorker.register();

  //   let BUCKET_CURRENT = 'cache-v2'
  // // 请求拦截
  // self.addEventListener('fetch', function (event) {
  //   console.log('[EVENT_FETCH]', event)
  //   event.respondWith(
  //     caches.match(event.request).then(function (resp) {
  //       // console.log('[REQUEST]:', event.request)
  //       var reqToCache = event.request.clone()

  //       return resp || fetch(event.request).then(function (response) {
  //         console.log('[EVENT_FETCH] lose cache')
  //         var respToCache = response.clone();
  //         // console.log('[RESPONSE]:', response)
  //         caches.open(BUCKET_CURRENT).then(function (cache) {
  //           cache.put(reqToCache, respToCache);
  //         });
  //         return response
  //       });
  //     }).catch(function (e) {
  //       console.log('[EVENT_FETCH] fetch error', e)
  //     })
  //   );
  // });
  // // ===============
}
