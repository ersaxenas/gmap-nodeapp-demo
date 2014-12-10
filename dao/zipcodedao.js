/**
 * Created by saurabh on 12/7/14.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gda');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
/**
 * Schema for zipcodes model
 */
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
/**
 * Function saves zipcode to database.
 */
var savezipcode = function(zipcodes) {
    var mzips = new zipcode(zipcodes);
    mzips.save(function(err){
        if(err) {console.log(err);}
    });
}
/**
 * Function pull different states from the database.
 */
var getAllStates = function(fn){
    var collection = db.collection('zipcodes');
    zipcode.find().distinct('state',function(err, states){
       fn(err,{states:states});
    });
}

/**
 * Function pulls all the listed cities for a states from the database.
 */
var getCityForStates = function(state,fn){
    var collection = db.collection('zipcodes');
    zipcode.find().distinct({state:state},'city',function(err, city){
       fn(err,{city:city});
    });
}
/**
 * Function pulls all the listed zipcodes for city from the database.
 */
var getZipCodesForCity = function(city,fn){
    var collection = db.collection('zipcodes');
    zipcode.find({city:city},{zip:1},function(err, city){
       fn(err,{city:city});
    });
}

/*Exposing module functions*/
module.exports.save = savezipcode;
module.exports.getAllStates = getAllStates;
module.exports.getCityForStates = getCityForStates;
module.exports.getZipCodesForCity = getZipCodesForCity;
