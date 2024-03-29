/* import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import passport from 'passport';
import MongoStore from 'connect-mongo'
import sessions from 'express-session'


import indexViewRouter from './routers/views/index.router.js';
import productViewRouter from './routers/views/products.router.js';
import cartsApiRouter from './routers/api/carts.router.js';
import productsApiRouter from './routers/api/products.router.js';
import usersRouter from './routers/api/users.router.js';
import userViewRouter from './routers/views/users.router.js';
import sessionsRouter from './routers/api/sessions.router.js';

import { __dirname } from './utils.js';
import { URI } from './db/mongodb.js'
import { init as initPassport } from './config/passport.config.js';

const app = express();

// Crear una instancia de Handlebars con helpers personalizados
const hbs = handlebars.create({
  helpers: {
    lessorequal: function (lvalue, rvalue, options) {
      if (lvalue <= rvalue) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
    truncate: function (str, len) {
      if (str.length > len) {
        return str.substring(0, len) + '...';
      }
      return str;
    },
    eq: function (a, b) {
      return a === b;
    }
  }
});

const SESSION_SECRET = '!.g`2ur(J[@2({{X.k9cS94VWU7Fva?~';


app.use(sessions({
  store: MongoStore.create({
    mongoUrl: URI,
    mongoOptions: {},
    ttl: 60 * 30,
  }),
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

initPassport();
app.use(passport.initialize());
app.use(passport.session());



app.use('/', indexViewRouter, productViewRouter, userViewRouter);
app.use('/api', productsApiRouter, cartsApiRouter, sessionsRouter, usersRouter);

app.use((error, req, res, next) => {
  const message = `Ha ocurrido un error desconocido: ${error.message}`;
  console.error(message);
  res.status(500).json({ message });
});

export default app;
// Arreglar lo de passport, no funciona para quedar logueado correctamente en las vistas. */

import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import sessions from 'express-session';

// Importación de routers
import indexViewRouter from './routers/views/index.router.js';
import productViewRouter from './routers/views/products.router.js'; // Asegúrate de que este router esté actualizado
import cartsApiRouter from './routers/api/carts.router.js'; // Verifica que este router utilice los nuevos controladores y DAOs
import productsApiRouter from './routers/api/products.router.js'; // Igual que arriba
import usersRouter from './routers/api/users.router.js'; // Asegúrate de que este router esté actualizado
import userViewRouter from './routers/views/users.router.js';
import sessionsRouter from './routers/api/sessions.router.js';

import { __dirname } from './utils.js';
import './db/mongodb.js';
import { init as initPassport } from './config/passport.config.js';

import config from './config/db.config.js';


const app = express();

// Configuración de Handlebars
const hbs = handlebars.create({
  helpers: {
    lessorequal: function (lvalue, rvalue, options) {
      if (lvalue <= rvalue) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
    truncate: function (str, len) {
      if (str.length > len) {
        return str.substring(0, len) + '...';
      }
      return str;
    },
    eq: function (a, b) {
      return a === b;
    }
  }
});

const SESSION_SECRET = config.secret;

app.use(sessions({
  store: MongoStore.create({
    mongoUrl: config.db.uri,
    mongoOptions: {},
    ttl: 60 * 30,
  }),
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));


app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

initPassport();
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    console.log(req.user);
  }
  next();
});


// Rutas
app.use('/', indexViewRouter, productViewRouter, userViewRouter);
app.use('/api', productsApiRouter, cartsApiRouter, sessionsRouter, usersRouter);

// Manejador de errores
app.use((error, req, res, next) => {
  console.error(`Error: ${error.message}`);
  res.status(500).json({ message: `Ha ocurrido un error: ${error.message}` });
});

export default app;
