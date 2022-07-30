import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    let middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

    middlewares.push(middleware);

    Reflect.defineMetadata(MetadataKeys.middleware, middlewares, target, key);
  };
}
