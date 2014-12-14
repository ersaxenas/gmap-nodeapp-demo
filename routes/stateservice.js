/**
 * Created by saurabh on 12/12/14.
 */
var zipcodedao = require('../dao/zipcodedao');

var getAllStates = function(req,res) {
    zipcodedao.getAllStates(function(err,states){
        if(err) {console.log(err);}
        var lstate = [];
        states.states.sort();
        for (var cnt in states.states)
        {
            lstate.push({name:states.states[cnt]});
        }
        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(JSON.stringify(lstate));
    });
}

var getCityForStates = function(req,res) {
    zipcodedao.getCityForStates(req.query.state,function(err,city){
        if(err) {console.log(err);}
        city.city.sort();
        var lcity = [];
        for (var cnt in city.city)
        {
            lcity.push({name:city.city[cnt]});
        }
        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(JSON.stringify(lcity));
    });
}


var getZipCodesForCity = function(req,res) {
    zipcodedao.getZipCodesForCity(req.query.city,req.query.state,function(err,zip){
        if(err) {
            console.log(err);
            res.writeHead(500, {"Content-Type": "text/json"});
            res.end();
            return;
        }
        zip.sort();
        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(JSON.stringify(zip));
    });
}

var getCoordinates = function(req,res) {

     if(req.query.state && req.query.city) {
        zipcodedao.getCoordinates(req.query.state,req.query.city,null,function(err,cords){
            if(err) {
                console.log(err);
                res.writeHead(500, {"Content-Type": "text/json"});
                res.end();
                return;
            }
            res.writeHead(200, {"Content-Type": "text/json"});
            res.end(JSON.stringify(cords));
        })
    }
     else if(req.query.state) {
         zipcodedao.getCoordinates(req.query.state,null,null,function(err,cords){
             if(err) {
                 console.log(err);
                 res.writeHead(500, {"Content-Type": "text/json"});
                 res.end();
                 return;
             }
             res.writeHead(200, {"Content-Type": "text/json"});
             res.end(JSON.stringify(cords));
         })
     }
    else {
        console.log(req.query);
        res.writeHead(500, {"Content-Type": "text/json"});
        res.end();
        return;
    }
}


/*Exposing module functions*/
module.exports.getAllStates = getAllStates;
module.exports.getCoordinates = getCoordinates;
module.exports.getCityForStates = getCityForStates;
module.exports.getZipCodesForCity = getZipCodesForCity;
