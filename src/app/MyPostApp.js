import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

import { Navbar } from './Navbar'

import { PostsList } from '../features/posts/PostsList'
import { AddPostForm } from '../features/posts/AddPostForm'
import { EditPostForm } from '../features/posts/EditPostForm'
import { SinglePostPage } from '../features/posts/SinglePostPage'


const MyPostApp = ()=>{
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/account"
                        render={() => (
                            <>
                                <AddPostForm />
                                <PostsList />
                            </>
                        )}
                    />
                    <Route exact path="/posts/:postId" component={SinglePostPage} />
                    <Route exact path="/editPost/:postId" component={EditPostForm} />
                    <Redirect to="/account" />
                </Switch>
            </div>
        </Router>
    )
}

export default MyPostApp