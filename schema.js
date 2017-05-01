var mongoose = require('mongoose');

var kittySchema = mongoose.Schema({
    name: { type: String,required: true},
});

var Kitten = mongoose.model('Kitten', kittySchema);


var silence = new Kitten({ name: '' });
console.log(silence.name); // 'Silence'

exports.silence = silence;
exports.Kitten = Kitten;