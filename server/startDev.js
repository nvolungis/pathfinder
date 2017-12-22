/*
  Called during development only. Allows us to use ES6 and JSX in our server code.
*/

process.env.NODE_ENV='development';

require('babel-core/register')({
  presets: ['es2015', 'react']
});

require("./src/index");
