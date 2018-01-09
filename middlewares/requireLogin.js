// 'next' parameter gets called when this middleware finishes running
module.exports = (req, res, next) => {
    if(!req.user){
        return res.status(401).send({error: 'Unautharized user'});
    }
    next();
}