const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');

const Survey = mongoose.model('Survey');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Mailer = require('../services/Mailer');

module.exports = (app) => {

    app.get('/api/surveys/feedback', (req, res)=> {
        res.send('Thanks for giving your feedback!');
    });

    app.post('/api/surveys', requireLogin, async (req, res) => {
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

        const mailer  = new Mailer(survey, surveyTemplate(survey));

        try{
            await mailer.send();
            await survey.save();
    
            req.user.credits -= 1;
    
            const user = await req.user.save();
    
            res.send(user);
        }catch(err){
            res.status(422).send(err);
        }

    });
}