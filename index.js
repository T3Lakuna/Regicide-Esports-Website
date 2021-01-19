// Koa.js application.
const app = new (require('koa'))();

// HTML rendering engine middleware - using Pug rendering engine.
app.use(require('koa-views')(`${__dirname}/views`, { extension: 'pug' }));

// Router.
const router = new (require('@koa/router'))();
app.use(router.routes());
app.use(router.allowedMethods());

// Routes.
router.get('/', (ctx, next) => ctx.render('index'));
router.get('/test', (ctx, next) => ctx.render('test'));

// Error handling.
app.on('error', (err) => console.error(`Server error: ${err}`));

// Host on both HTTP and HTTPS. Same functionality as "app.listen(PORT);"
require('http').createServer(app.callback()).listen(80, () => console.log('HTTP listening on port 80.'));
require('https').createServer(app.callback()).listen(443, () => console.log('HTTPS listening on port 443.'));
