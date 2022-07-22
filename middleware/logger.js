// @desc        Logs requests to console
const logger =(req,res,next) => {
    console.log(`METHOD => ${req.method} :: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}
module.exports =logger;