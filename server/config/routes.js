console.log("module routes loaded...")
var texts = require('../controllers/texts.js')
var animations = require('../controllers/animations.js')
var works = require('../controllers/works.js')
var admins = require('../controllers/admins.js')

module.exports = function(app){

//GET WORKS

    //to pull all text pieces from the database
    app.get('/texts', texts.index)

    //to pull all animations pieces from the database
    app.get('/animations', animations.index);
    //to pull one animation pieces from the database
    app.get('/animation/:id', animations.show);

    //to pull all magnet pieces from the database
    // app.get('/magnets', magnets.index)

    //to pull all gauge pieces from the database
    // app.get('/gauges', gauges.index)

    //to pull all animation pieces from the database
    // app.get('/animations', animations.index)


//ADMIN LEVEL
    app.post('/login', admins.login);
    app.post('/register', admins.register);
    app.get('/logout', admins.logout);

    //PROTECTED API
    app.use(adminAuth);
    //from admin to add new pieces of work
    app.get('/works', works.index);
    app.post('/works', works.create);
    app.delete('/works/:id', works.delete);
}

function adminAuth(req,res,next){
    if(req.session.admin){
        next();
    }else{
        res.sendStatus(401);
    }
}
