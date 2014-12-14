/**
 * Created by saurabh on 12/7/14.
 */
var path = require('path');
var xlsx = require('xlsx');
var zipcodedao = require('../dao/zipcodedao');

var uploadfile = function(req,res) {
    var filepath =  path.join(approotpath, '/public/data/zipcodes.xlsx');
    var workbook = xlsx.readFile(filepath,{cellNF:true});
    var result = {};
    try {
        workbook.SheetNames.forEach(function (sheetName) {
            var sheetdata = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            if (sheetdata.length > 0) {
                sheetdata.forEach(function(zipcode){
                    zipcodedao.save(zipcode);
                });
            }
        });
        res.writeHead(200, {"Content-Type": "text/json"});
        res.end('success');
    }
    catch (exp) {
         console.log(exp);
    }
}


module.exports.uploadfile = uploadfile;