/**
 * Created by saurabh on 12/7/14.
 */
var path = require('path');
var xlsx = require('xlsx');
var zipcodedao = require('../dao/zipcodedao');
/**
 *Function uploads the xlsx file to database. It inserts data in to zipcodes collection.
 */
var uploadfile = function(req,res) {
    var filepath =  path.join(approotpath, '/public/data/zipcodes.xlsx');
    var workbook = xlsx.readFile(filepath);
    var result = {};
    try {
        workbook.SheetNames.forEach(function (sheetName) {
            var sheetdata = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (sheetdata.length > 0) {
                sheetdata.forEach(function(zipcode){
                   //zipcodedao.save(zipcode);
                });
            }
        });
       zipcodedao.getZipCodesForCity('Nashua',function(err,states){
        if(err) {console.log(err);}
           console.log(JSON.stringify(states));
       });
        res.writeHead(200, {"Content-Type": "text/json"});
        res.end();
    }
    catch (exp) {
         console.log(exp);
    }
}


module.exports.uploadfile = uploadfile;