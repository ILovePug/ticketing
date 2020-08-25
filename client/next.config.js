module.exports = {
    webpackDevMiddleware: config => {
        // instead of hot reload, nextjs will poll every 300 millseconds
        config.watchOptions.poll = 300;
        return config;
    }
}