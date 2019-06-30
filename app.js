const Koa = require('koa')
const app = new Koa();
/*
app.use(async (ctx, next)=>{
    console.log(`${ctx.request.method} ${ctx.request.url}`)
    await next()
})

app.use(async (ctx, next)=>{
    const start = new Date().getTime();
    await next()
    const ms = new Date().getTime()-start;
    console.log(`Time :${ms}ms`)
})

app.use(asyncgit(ctx, next)=>{
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body='<h1>hello, koa2</h1>'
})
*/

app.use(async (ctx, next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next()
})

const router = require('koa-router')()
router.get('/hello/:name',async(ctx, next)=>{
    var name = ctx.params.name
    ctx.response.body = `<h1>Hello, ${name}</h1>`
})


const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

router.get('/',async(ctx,next)=>{
    ctx.response.body=`<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
});
router.post('/signin', async(ctx, next)=>{
    var name = ctx.request.body.name||'',
    password = ctx.request.body.password||''
    console.log(`${name}: ${password}`)
    if (name === 'koa' && password ==='12345'){
        ctx.response.body=`<h1>Welocome,${name}!</h1>`
    }else{
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
})

app.use(router.routes())

app.listen(3000)
console.log('app started at port 3000......')
