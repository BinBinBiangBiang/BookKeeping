// app.ts
import Koa from 'koa';

const app = new Koa();

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
