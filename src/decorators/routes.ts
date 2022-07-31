import 'reflect-metadata';
import { NextFunction, RequestHandler, Request, Response } from 'express';
import { MetadataKeys } from './MetadataKeys';
import { Methods } from './Methods';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);

      const fn = desc.value;

      if (typeof fn === 'function') {
        desc.value = function (
          req: Request,
          res: Response,
          next: NextFunction
        ) {
          Promise.resolve(fn(req, res, next)).catch(next);
        };
      }
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const patch = routeBinder(Methods.patch);
export const del = routeBinder(Methods.del);
