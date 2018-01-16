
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Survey = mongoose.model('Survey');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Mailer = require('../services/Mailer');
const _ = require('lodash');
const Path = require('path-parser');
const {URL} = require('url');

module.exports = (app) => {

    app.get('/api/surveys/feedback', (req, res)=> {
        res.send('Thanks for giving your feedback!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        
        const p = new Path('/api/surveys/:surveyId/:choice');
        const events = _.map(req.body, (event) => {
            const pathname = new URL(event.url).pathname;
            const match = p.test(pathname);

            if(match){
                return {email: event.email, surveyId: match.surveyId, choice: match.choice}
            }
        });

        const compactEvents = _.compact(events);
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

        console.log(uniqueEvents);

        res.status(200).send({});

    });

    app.post('/api/surveys', requireLogin, async (req, res) => {
        console.log(req.body);
        if(req.user.credits < 1){
            return res.status(403).status({error: 'Not enough credits'});
        }

        // ES6 syntax for pulling specific properties off the req.body object
        const {title, subject, body, recipients} = req.body;

        const survey = new Survey({
            title: title,
            subject: subject,
            body: body,
            recipients: recipients.split(',').map(email => ({email: email.trim()})),
            _user: req.user.id,
            dateSent: Date.now()
        });

        try{
            const mailer  = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();
            await survey.save();
    
            req.user.credits -= 1;
    
            const user = await req.user.save();
            console.log('User: ');
            console.log(user);
            res.send(user);
        }catch(err){
            console.log(err);
            res.status(422).send(err);
        }

    });
}