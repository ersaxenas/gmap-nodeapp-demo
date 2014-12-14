/**
 * Created by saurabh on 12/14/14.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gda');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var bonsaiurlmodel = mongoose.Schema({
    orgurl: String,
    enckey: String,
    _id: String
});

var bonsaiurl = mongoose.model('bonsai', bonsaiurlmodel);

var saveurl = function(bonsaiurls,fn) {
    var id=mongoose.Types.ObjectId();
    bonsaiurls._id=id;
    var burls = new bonsaiurl(bonsaiurls);
    burls.save(function(err){
        if(err) {console.log(err);}
        fn(err,id);
    });
}

var findurl = function(id,fn) {
    bonsaiurl.find({_id:id},function(err,bonsai) {
        if(err) {console.log(err);}
        fn(err,bonsai);
    })
}

/*Exposing module functions*/
module.exports.saveurl = saveurl;
module.exports.findurl = findurl;