module.exports = (req, res, next) =>{
    res.json({hello : 'hello'})
    next()
}