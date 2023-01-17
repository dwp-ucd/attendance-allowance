const express = require('express');
const nunjucks = require('nunjucks');
const filePath = require('path');

const app = express();

const port = process.env.PORT || 3002;
const contextPath = process.env.CONTEXT_PATH || '/';
const bodyParser = require('body-parser');
const packageMeta = require('./package.json');

const authenticationMiddleware = require('./middleware/authentication');
const setVersionMiddleware = require('./middleware/versionPassthrough');
const autoStoreDataMiddleware = require('./middleware/autoStoreData');
const sessionMiddleware = require('./middleware/session');
const { handleGetRequest } = require('./middleware/handleGetRequest');

const actuatorRoutes = require('./routes/actuator');
const notFoundRoutes = require('./routes/errors/404');

app.set('view engine', 'njk');
app.set('views', `${__dirname}/views`);
const nunjucksEnv = nunjucks.configure([
  `${__dirname}/node_modules/govuk-frontend`,
  `${__dirname}/views/`,
], {
  autoescape: true,
  express: app,
});

nunjucksEnv.addFilter('makeArray', (value) => {
  if (!Array.isArray(value)) {
    return [value];
  }
  return value;
});

app.use(authenticationMiddleware);
app.use(contextPath, express.static(filePath.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(sessionMiddleware());
app.use(autoStoreDataMiddleware);

// [Journey routes] (do not edit this comment, it is used in automation)
app.use('/sprint-53/', setVersionMiddleware('/sprint-53/'), require('./routes/sprint-53'));
app.use('/sprint-48/', setVersionMiddleware('/sprint-48/'), require('./routes/sprint-48'));
app.use('/sprint-47/', setVersionMiddleware('/sprint-47/'), require('./routes/sprint-47'));
app.use('/v2-1-0/', setVersionMiddleware('/v2-1-0/'), require('./routes/v2-1-0'));
app.use('/v2-0-0/', setVersionMiddleware('/v2-0-0/'), require('./routes/v2-0-0'));
app.use('/v1-1-0/', setVersionMiddleware('/v1-1-0/'), require('./routes/v1-1-0'));
app.use('/', require('./routes/v1-0-0'));

// Request middleware - renders views for GET requests without controller
app.get(/^([^.]+)$/, (req, res, next) => {
  const { path } = req;
  if (path) {
    handleGetRequest(path.substring(1))(req, res, next);
  } else {
    next();
  }
});

// Actuator routes
app.use(actuatorRoutes(packageMeta));

// Error handling routes
app.use(notFoundRoutes);

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`App listening at http://localhost:${port}`);
});
