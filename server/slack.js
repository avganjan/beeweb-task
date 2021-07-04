const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const credentials = require('./credentials')

require('./db')

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', cors())

app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
        resave: false,
        saveUninitialized: false,
        secret: credentials.cookieSecret
})
)

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

const handler = require('./lib/handlers')

// Routes

// register user to db if yet he is not
app.post("/api/sign/up", handler.signUp)

// If such a user exist in db, put him to the session
app.post("/api/login", handler.logIn);

//extract the user out of session, if there is some and send to the client
app.post("/api/user", handler.getUser);
// debouncing
app.post('/api/get/beewebs', handler.getSubDomains)

//getting authors
app.post('/api/users/names', handler.getAuthors)
//getting saved posts
app.post('/api/users/post/getting', handler.getPosts)
//store posts
app.post('/api/users/post/added', handler.storePost)
//update post
app.put('/api/users/post/updated', handler.updatePost)
//delete post
app.delete('/api/users/post/delete', handler.deletePost)

app.listen(4000, () => {
    console.log("Server Has Started");
});