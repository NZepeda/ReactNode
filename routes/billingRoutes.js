require('dotenv').config();
const stripe = require('stripe')(process.env.stripeSecretKey);
const bodyParser = require('body-parser');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin,  (req, res) => {
        
        stripe.charges.create({
            amount: 77 * 100, 
            currency: 'usd',
            description: 'user credits',
            source: req.body.id
        }).then((charge) => {

            req.user.credits += charge.amount / 100;

            req.user.save().then((user) => {
                res.send(user);
            });

        });
    });
}