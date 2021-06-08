module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/api/auth', require('./auth.routes.js'))
    app.use('/api', require('./trading.routes.js'))
    app.use((req, res) => res.sendFile(__dirname + "/public/index.html"));

}
