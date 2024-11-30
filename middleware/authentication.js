const basicAuth = require('basic-auth');
const compare = require('tsscmp');

// Basic function to validate credentials for example
const check = (name, pass, envVars) => {
  let valid = true;

  // Simple method to prevent short-circuit and use timing-safe compare
  valid = compare(name, envVars.USERNAME) && valid;
  valid = (compare(pass, envVars.PASSWORD) || compare(pass, envVars.INTERNAL_PASSWORD)) && valid;

  return valid;
};

module.exports = (req, res, next) => {
  // Local Variables
  const env = process.env.NODE_ENV || 'development';
  const useAuth = process.env.USE_AUTH;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const internalPassword = process.env.INTERNAL_PASSWORD

  if (env === 'production' && useAuth === 'true') {
    if (!username || (!password && !internalPassword)) {
      return res.send('<h1>Error:</h1><p>Username or password not set. <a href="https://govuk-prototype-kit.herokuapp.com/docs/publishing-on-heroku#6-set-a-username-and-password">See guidance for setting these</a>.</p>');
    }

    const user = basicAuth(req);

    if (!user || !check(user.name, user.pass, process.env)) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }
  }
  return next();
};
