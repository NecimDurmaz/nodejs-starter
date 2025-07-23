import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { requestHandler } from './lib/request-handler';
import {
  getFacebookPostEndpoint,
  FacebookPostParams,
} from './endpoints/get-facebook-post-endpoint';
import { facebookPostMiddleware } from './middlewares/facebook-post-middleware';

export const createServer = () => {
  const app = express();

  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  app.use(bodyParser.json({ limit: '2mb' }));
  app.use(function (req, res, next) {
    try {
      const originURL = new URL(
        req.headers.origin ?? `https://${req.hostname}`
      );
      res.header(
        'Access-Control-Allow-Origin',
        originURL.protocol + '//' + originURL.host
      );
      res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      res.header('Access-Control-Max-Age', '600');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header(
        'Access-Control-Allow-Headers',
        'DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization'
      );
    } catch (e) {}
    next();
  });

  app.get('/', (req, res): Promise<void> => {
    res.send(`ready`);
    return;
  });
  app.post('/test', (req, res): Promise<void> => {
    res.send(`ready`);
    return;
  });
  app.post(
    '/facebook-post/:id',
    requestHandler(getFacebookPostEndpoint, [facebookPostMiddleware])
  );
  app.get(
    '/facebook-post/:id',
    requestHandler(getFacebookPostEndpoint, [facebookPostMiddleware])
  );

  return app;
};
