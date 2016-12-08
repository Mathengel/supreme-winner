console.log("works controller loaded...")
var mongoose = require('mongoose');
var TextWork = mongoose.model('TextWork');
var AnimationWork = mongoose.model('AnimationWork');
// var MagnetWork = mongoose.model('MagnetWork');
// var GaugeWork = mongoose.model('GaugeWork');


module.exports = {

    index: function(req, res){
        console.log('getting from /works')
        TextWork.find({}, function(err, textWorks){
            if(err){
                console.log(err)
                res.status(400).json(err);
            }
            res.json(textWorks);
        })
    },
    
    delete: function(req, res){
        console.log('deleting from works', req.params.id)
        TextWork.remove({_id: req.params.id}, function(err, work){
          if(err){
            res.status(400).json(err);
          }
            res.json(work);
        })
    },


    create: function(req, res){
        console.log('posting to /works', req.body)
        if(req.body.type == "text"){
            var newTextWork = new TextWork({
                    title: req.body.title,
                    date_created: req.body.date_created,
                    small: "https://s3-us-west-2.amazonaws.com/lewisengelart.com/small/" + req.body.image + "Small.jpg",
                    large: "https://s3-us-west-2.amazonaws.com/lewisengelart.com/large/" + req.body.image + "Large.jpg",
                    detail: "https://s3-us-west-2.amazonaws.com/lewisengelart.com/detail/" + req.body.image + "Detail.jpg",
                    phrase: req.body.phrase,
                    description: req.body.description,
                    colors: req.body.colors,
                    shapes: req.body.shpes
            })
            newTextWork.save(function(err){
                console.log("textwork save")
                if(err){
                    res.status(400).json(err);
                }else{
                    console.log("textwork save success")
                    res.sendStatus(200)
                }
            })

            // TextWork.create(req.body, function(err, textWork){
            //     if(err){
            //         res.status(400).json(err);
            //     }
            //     //maybe change this to just give a status?
            //     res.json(textWork);
            // })
        } else if(req.body.type == "magnet") {
            MagnetWork.create(req.body, function(err, magnetWork){
                if(err){
                    res.status(400).json(err);
                }
                //maybe change this to just give a status?
                res.json(magnetWork);
            })
        } else if(req.body.type == "animation") {

              var newAnimation = new AnimationWork({
                      title: req.body.title,
                      date_created: req.body.date_created,
                      source: "https://s3-us-west-2.amazonaws.com/lengeltextures/animations/" + req.body.image + ".gif",
                      thumbnail: "https://s3-us-west-2.amazonaws.com/lengeltextures/animations/" + req.body.image + "Small.gif",
                      phrase: req.body.phrase,
                      description: req.body.description,
                      colors: req.body.colors,
                      shapes: req.body.shapes
              })
              newAnimation.save(function(err){
                  console.log("animation save")
                  if(err){
                      res.status(400).json(err);
                  }else{
                      console.log("animaiton save success")
                      res.sendStatus(200)
                  }
              })
        } else if (req.body.type == "gauge") {
            GaugeWork.create(req.body, function(err, gaugeWork){
                if(err){
                    res.status(400).json(err);
                }
                //maybe change this to just give a status?
                res.json(gaugeWork);
            })
        }

    }
}
