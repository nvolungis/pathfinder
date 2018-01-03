import mongoose from "mongoose"
import passport from "passport"
import User from "../models/user"

// -------------------------------------------

exports.login = function(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate("local", function(err, user, info) {    

    if(err) return next(err)
    if(!user) {
      res.status(401)
      return res.json({error: info.message });
    }
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************    
    // Passport exposes a login() function on req (also aliased as logIn())
    // that can be used to establish a login session    
    req.logIn(user, loginErr => {
      if(loginErr) {
        res.status(401);
        return res.json({ error: loginErr })
      }
      return res.json({ user });
    })
  })(req, res, next)
}

// -------------------------------------------

exports.logout = function(req, res, next) {
  // the logout method is added to the request object automatically by Passport
  req.logout()
  return res.json({ success: true })
}

// -------------------------------------------

exports.register = function(req, res, next) {
  const newUser = new User(req.body);
  const errors  = newUser.validateSync();

  if (errors) {
    res.status(400);
    res.json(errors);
    return;
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    // is email address already in use?
    if (user) {
      res.status(403);
      res.send({errors: [{email: "This email is taken" }]});
      return;
    }

    // go ahead and create the new user
    newUser.save((err, user) => {
      if (err) {
        res.status(400);
        res.json({ err })
        return;
      }
      res.status(201);
      res.json({ user })
      return;
    });
  })

}
