import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import SignUp from "./app/SignUp";
import MyPostApp from "./app/MyPostApp";

import store from './app/store'
import { Provider } from 'react-redux'
import { fetchUsers } from "./features/users/usersSlice";
import { getPostsOutOfDB } from "./features/posts/postsSlice";

store.dispatch(fetchUsers())
store.dispatch(getPostsOutOfDB())
// Usage
export  default function App() {

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path={'/'} component={SignUp} />
                    <Route path={'/account'} render={()=>
                        <Provider store={store}>
                            <MyPostApp/>
                        </Provider>
                    }/>
                    <Redirect to="/" />
                </Switch>
            </Router>

        </div>
    );
}
