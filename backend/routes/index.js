module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/api/auth', require('./auth.routes.js'))
    app.use('/api', require('./trading.routes.js'))
}