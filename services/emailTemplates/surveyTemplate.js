require('dotenv').config();

module.exports = (survey) => {
    return(
        `<html>
            <body>
                <div style="text-align: center;">
                    <h3>Give me your feedback</h3>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${process.env.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="${process.env.redirectDomain}/api/surveys/${survey.id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>`
    );
}