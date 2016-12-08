console.log("TextWorks controller loaded...")
var mongoose = require('mongoose');
var TextWork = mongoose.model('TextWork');


module.exports = {

    index: function(req, res){
        console.log('getting from /TextWorks')
        TextWork.find({}, function(err, TextWorks){
            if(err){
                console.log(err)
                res.status(400).json(err);
            }
            res.json(TextWorks);
        })
    },

    // create: function(req, res){
    //     console.log('posting to /TextWorks', req.body)
    //     TextWork.create(req.body, function(err, TextWork){
    //         if(err){
    //             res.status(400).json(err);
    //         }
    //         res.json(TextWork);
    //     })
    // }
}
