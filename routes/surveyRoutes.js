
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Survey = mongoose.model('Survey');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Mailer = require('../services/Mailer');
const _ = require('lodash');
const Path = require('path-parser');
const {URL} = require('url');

module.exports = (app) => {

    app.get('/api/surveys/:surveyId/:choice', (req, res)=> {
        res.send('Thanks for giving your feedback!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        
        const p = new Path('/api/surveys/:surveyId/:choice');

       _.chain(req.body)
        .map(({email, url}) => {
            const match = p.test(new URL(url).pathname);

            if(match){ return { email, surveyId: match.surveyId, choice: match.choice}; }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each( ({email, choice, surveyId}) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: {email: email, responded: false}
                }
            }, {
                $inc: {[choice]: 1}, // increase the amount of votes for either yes or no
                $set: { 'recipients.$.responded': true }, // $ holds an a reference to the index of the document that is being modified
                lastResponded: new Date()
            }).exec();
        })
        .value();

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

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({_user: req.user.id})
            .select();

        res.send(surveys);
    });
}