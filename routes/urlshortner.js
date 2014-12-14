/**
 * Created by saurabh on 12/14/14.
 */
var urldocdoa = require('../dao/urldocdao');
var baseurl = 'http://bonsai.com/';
var nurl = require('url');

var encodeurl = function(req,res) {
    console.log(req.body);
    if(req.body.orgurl) {
       urldocdoa.saveurl({orgurl:req.body.orgurl},function(err,id){
         if(err) {
             handleErr(err,res);
             return;
         }
           res.writeHead(200, {"Content-Type": "text/json"});
           res.end(JSON.stringify({burl:baseurl+id}));

       });
    }
}

var decodeurl = function(req,res) {
    console.log(req.body);
    if(req.body.surl) {
        var surl = nurl.parse(req.body.surl).pathname;
        urldocdoa.findurl(surl.replace('/',''),function(err,bonsai){
            if(err) {
                handleErr(err,res);
                return;
            }
            res.writeHead(200, {"Content-Type": "text/json"});
            if(bonsai && bonsai.length > 0) {
                res.end(JSON.stringify({surl:bonsai[0].orgurl}));
            }
            else {
                res.end(JSON.stringify({surl:'Url not found in the database.'}));
            }

        });
    }

}

var handleErr = function(err, res){
    console.log(err);
    res.writeHead(500, {"Content-Type": "text/json"});
    res.end();
}

/*Exposing module functions*/
module.exports.ecnodeurl = encodeurl;
module.exports.decodeurl = decodeurl;