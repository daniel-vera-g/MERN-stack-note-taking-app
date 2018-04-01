/**
 * @author Daniel V.G.
 * @email danielveragi@gmail.com
 * @create date 2018-04-01 11:15:52
 * @modify date 2018-04-01 11:15:52
 * @desc React Index File to generate App
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import Routes from "./routes"

ReactDOM.render() {
    // TODO check HashRouter understanding
  <HashRouter>
      <Routes />
  </HashRouter>, document.getElementById('root');
};