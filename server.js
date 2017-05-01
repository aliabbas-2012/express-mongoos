const express = require('express');
const app = express();
const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function() {
  console.log('listening on 3000')
})



//db connection

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test_mongo1');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('--db--connected--');
});

const schema = require('./schema')
const kit = schema.silence;
const Kitten = schema.Kitten;

app.get('/', function(req, res) {
  console.log(kit);  
  kit.save(function(error, kit) {
    console.log(error.errors['name'].message)
    res.json({'error': error.errors['name'].message});
  })
 
})

app.get('/kittens', function(req, res) {
  
    Kitten.find({}, function(err, kit) {
        
        if (err) throw err;

        // object of all the users
        console.log(kit);
        res.json(kit);
    });

  
})


app.post('/kittens/:id', function(req, res)  {
  console.log(req.param('id'))

  
  Kitten.findById(req.param('id'), function (err, kit) {
        kit.name = "test"
        kit.save(function(err) {
            if (err) throw err;

            console.log('User successfully updated!');
        });
        res.json(kit);
    });
})

app.put('/kittens/:id', function(req, res)  {
    Kitten.findByIdAndUpdate(req.param('id'), { name: '' }, function(err, kit) {
        if (err) {
            console.log(err.errors['name']);
            throw err;
        }    
        //res.json({'error': err.errors['name'].message});
        
        // we have the updated user returned to us
        console.log(kit);
        res.json(kit);
    });

})

app.get('/update-test', function(req, res)  {
    var update = { name: 'Test dssdf' };
    var opts = { runValidators: true };

    Kitten.update({_id:"59079f71c1d76a2e247fe039"}, update, opts, function(error) {
       res.json(error);
    });

})

app.get('/update-promise', function(req, res)  {
    var update = { name: '' };
    var opts = { runValidators: true };

    Kitten.update({_id:"59079f71c1d76a2e247fe039"}, update, opts).then(function(resolve){
        res.json(resolve);
    }).catch(function(error){
         res.json(error);
    })

})
