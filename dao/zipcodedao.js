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
    latitude: Number,
    longitude: Number,
    timezone: String,
    dst: String
});

var zipcode = mongoose.model('zipcode', zipcodemodel);
/**
 * Function saves zipcode to database
 * @param zipcodes
 */
var savezipcode = function(zipcodes) {
    var mzips = new zipcode(zipcodes);
    mzips.save(function(err){
        if(err) {console.log(err);}
    });
}
/**
 *  Function pull different states from the database.
 * @param fn
 */
var getAllStates = function(fn){
        zipcode.find().distinct('state', function (err, states) {
            fn(err, {states: states});
        });
}

/**
 * Function pulls all the listed cities for a states from the database.
 * @param state
 * @param fn
 */
var getCityForStates = function(state,fn){
    zipcode.find().distinct({state:state},'city',function(err, city){
       fn(err,{city:city});
    });
}
/**
 * Function pulls all the listed zipcodes for city from the database.
 * @param city
 * @param fn
 */
var getZipCodesForCity = function(city,state,fn){
    zipcode.find({state:state,city:city},{zip:1,latitude:1,longitude:1},function(err, zip){
       fn(err,zip);
    });
}

/**
 * Function pulls coordinates from database.
 * @param state
 * @param city
 * @param zip
 * @param fn
 */
var getCoordinates = function(state,city,zip,fn){

    if(zip) {
        zipcode.find({zip:zip},{latitude:1,longitude:1}).limit(1).exec(function(err,cords){
            if(err) {console.log(err);}
            fn(err,cords);
        });
    }
    else if(city && state) {
        zipcode.find({state:state,city:city},{latitude:1,longitude:1}).limit(1).exec(function(err,cords){
            if(err) {console.log(err);}
            fn(err, cords);
        });
    }
    else if(state) {
        zipcode.find({state:state},{latitude:1,longitude:1}).limit(1).exec(function(err,cords){
            if(err) {console.log(err);}
            fn(err,cords);
        });
    }
}

/*Exposing module functions*/
module.exports.save = savezipcode;
module.exports.getAllStates = getAllStates;
module.exports.getCityForStates = getCityForStates;
module.exports.getZipCodesForCity = getZipCodesForCity;
module.exports.getCoordinates = getCoordinates;
