import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Pages
import Home from '../src/pages/Home';
import Project from '../src/pages/Project';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/new" component={Project} />
            </Switch>
        </BrowserRouter>
    )
}