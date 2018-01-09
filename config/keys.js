require('dotenv').config();

module.exports = {
    googleClientID: process.env.NODE_ENV === 'production' ? process.env.googleClientID : process.env.googleClientIdDev,
    googleClientSecret: process.env.NODE_ENV === 'production' ? process.env.googleClientSecret : process.env.googleClientSecretDev,
    dbHost: process.env.NODE_ENV === 'production' ? process.env.DB_URL : process.env.DB_URL_dev,
    stripePublishsableKey: process.env.stripePublishsableKey, 
    stripeSecretKey: process.env.stripeSecretKey
}