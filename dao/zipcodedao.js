/**
 * Created by saurabh on 12/7/14.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gda');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var zipcodemodel = mongoose.Schema({
    zip: String,
    city: String,
    state: String,
    latitude: String,
    longitude: String,
    timezone: String,
    dst: String
});

var zipcode = mongoose.model('zipcode', zipcodemodel);

var savezipcode = function(zipcodes) {
    var mzips = new zipcode(zipcodes);
    mzips.save(function(err){
        if(err) {console.log(err);}
    });
}

var getAllStates = function(fn){
    var collection = db.collection('zipcodes');
    zipcode.find().distinct('state',function(err, states){
       fn(err,{states:states});
    });


}

module.exports.save = savezipcode;
module.exports.getAllStates = getAllStates;
