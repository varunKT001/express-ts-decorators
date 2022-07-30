import 'reflect-metadata';
import { NextFunction, RequestHandler, Request, Response } from 'express';
import { AppRouter } from '../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (keys.length !== 0 && !req.body) {
      res.status(400).json({ success: false, message: 'Invalid request' });
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res
          .status(400)
          .json({ success: false, message: `Missing field: ${key}` });

        return;
      }
    }

    next();
  };
}

export function controller(prefix: string) {
  return function (target: Function) {
    for (let key of Object.getOwnPropertyNames(target.prototype)) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        const router = AppRouter.getInstance();

        const routePrefix = prefix === '/' ? '' : prefix;

        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
