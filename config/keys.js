module.exports = {
    googleClientID: process.env.NODE_ENV === 'production' ? process.env.googleClientID : process.env.googleClientID-dev,
    googleClientSecret: process.env.NODE_ENV === 'production' ? process.env.googleClientSecret : process.env.googleClientSecret-dev,
    dbHost: process.env.NODE_ENV === 'production' ? process.env.DB_URL : process.env.DB_URL-dev
}