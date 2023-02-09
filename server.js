// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
router.render = (req, res) => {
    res.status(500).jsonp({
        error: "error message here"
    })
}
server.listen(3001, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
