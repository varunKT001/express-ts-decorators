# ⌨ Express-Typescript Decorators

Simple Typescript decorators for Express.

## 📈 Installation

```sh
npm i @varuntiwari/express-ts-decorators
```

## 🧪 Usage

- Initialize `Express`:

```ts
import express from 'express';

const app = express();
```

- The library uses a single router to handle all the incoming requests. Use the `AppRouter` provided by library to setup Routing:

```diff
import express from 'express';
+ import { AppRouter } from '@varuntiwari/express-ts-decorators';

const app = express();

+ app.use(AppRouter.getInstance());
```

- Now use the `ErrorMiddleware` provided by the library to setup Error Handling:

```diff
import express from 'express';
+ import { AppRouter, ErrorMiddleware } from '@varuntiwari/express-ts-decorators';

const app = express();

app.use(AppRouter.getInstance());
+ app.use(ErrorMiddleware);
```

(_Use the middleware after using the AppRouter_)

- Create a new file containing your controller class and use the decorators provided by the library:

```ts
import {
  controller,
  get,
  post,
  bodyValidator,
} from '@varuntiwari/express-ts-decorators';

@controller('/product')
class ProductController {
  @get('/product/:id') /* Register a get method */
  @use(auth) /* Use one or multiple middlewares */
  getProducts(req: Request, res: Response) {
    //
  }

  @post('/product')
  @use(auth)
  @use(admin)
  createProduct(req: Request, res: Response) {
    //
  }
}

@controller('/auth')
export class AuthController {
  @post('/login')
  @bodyValidator('email', 'password') /* Validate request body */
  login(req: Request, res: Response): void {
    //
  }

  @get('/logout')
  logout(req: Request, res: Response): void {
    //
  }
}
```

- Import the controller to the `index.ts` file:

```diff
import express from 'express';
import { AppRouter, ErrorMiddleware } from '@varuntiwari/express-ts-decorators';

+ import './controllers.ts';

const app = express();

app.use(AppRouter.getInstance());
app.use(ErrorMiddleware);
```

- Start the server and you are ready to go 🚀

## 😎 Team Members

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/83509023?v=4" width="150px" alt="GSSoC'22" />
      <br/>
      Varun Kumar Tiwari
      <br/>
      <a href="https://www.linkedin.com/in/varun-tiwari-454591178/">LinkedIn</a>
      <a href="https://github.com/varunKT001">Github</a>
    </td> 
  </tr>
</table>

## ⚖ License

[GPL-3.0](./LICENSE.md)

<br>
<br>
<br>

<p align='center'>
(If you liked the project, give it star 😃)
</p>
