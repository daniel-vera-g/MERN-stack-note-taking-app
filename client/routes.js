/**
 * @author Daniel V.G.
 * @email danielveragi@gmail.com
 * @create date 2018-04-01 06:21:34
 * @modify date 2018-04-01 06:21:34
 * @desc File to manage the client site routes
*/

import React from 'react';
import { Route, Switch } from "react-router-dom";
import App from "./components/app";

// TODO check for understanding
// Route with the Path '/' that renders 'App' component
export const Routes = () => {
    <Switch>
        <Route exact path='/' component={App} />
    </Switch>
}

export default Routes;