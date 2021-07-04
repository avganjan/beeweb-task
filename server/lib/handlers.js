const passport = require('passport')
const bcrypt = require('bcryptjs')
// models
const User = require('../models/user')
const Post = require('../models/post')

exports.signUp = async (req, res)=>{
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.json({status: "There is not such user or such user already exists"});
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await new User({
        username: req.body.username,
        password: hashedPassword,
      }).save()

      res.json({status: "User Created"});
    }
  })
}

exports.logIn = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.json({status: "No User Exists"});
    else {
      req.logIn(user, (err) => {
        if (err) throw err;

        console.log(req.user);
        res.json({status: "Successfully Authenticated"});
      });
    }
  })(req, res, next);
}

exports.getSubDomains = async (req, res)=> {

  console.log(req.body)
  const arr = ['https://beeweb1.collecthoney.net', 'https://beeweb2.collecthoney.net']

  let status = ''
  status = await req.body.str === 'beeweb' ? arr : false

  res.json({status})
}


exports.getUser = (req, res) => {
  console.log(req.user)
  if (req.user) return res.json(req.user); // The req.user stores the entire user that has been authenticated inside of it.
}

exports.getAuthors = async (req, res)=>{
  console.log(req.body)
  // Because ID is harmlessly complaining, i added a await to non-await action

  const data = await ([
    { id: '0', name: 'BeeWeb' },
    { id: '1', name: 'Hayk Hovhannisyan' },
    { id: '2', name: 'Nikol Pashinyan' },
    { id: '3', name: 'Robert Kocharyan' },
    { id: 'd', name: 'No one of them!' },
  ])

  res.json(data)
}

exports.getPosts = async (req, res)=> {
  console.log(req.body)
  const arr = await Post.find({}, {"_id": 0, "__v": 0})
  console.log(arr)
  res.json(arr)
}

exports.storePost = async (req, res) => {
  console.log(req.body.obj)
  // save post to DB
  try {
    await new Post({...req.body.obj}).save()
    res.json({status: true})

  } catch (e) {
    res.json({status: false})
    console.log(e)
  }
}

exports.updatePost = async (req, res)=> {
  console.log(req.body)
  const {id, title, content} = req.body
  try {
    const post = await Post.updateOne({id},
        {$set: {title ,content}}
    )
    console.log(post)

  }catch (e) {
    console.log(e)
  }
  res.json({status: true})
}

exports.deletePost = async (req, res)=> {
  console.log(req.body.id)
  try {
    const resp = await Post.deleteOne({id: req.body.id})
    if (resp){
      console.log(resp)
      console.log('Deleted successfully!')
    }
  } catch (e) {
    console.log(e)
  }

  res.json({status: true})
}