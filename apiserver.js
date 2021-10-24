const exp = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = exp();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const sql = require("mysql");
const con = sql.createConnection({
  user : "root",
  host : "localhost",
  password : "password",
  database : "otndb"
})

app.listen(3100,function(){
  console.log("Start DB-API Server.");
})

app.post("/product",function(req,res,nex){
  let data = {};
  let sympton = req.body.sympton;
  let dataNumAll;
  let dataNum;
  let prodID;
  let regionNumAll;
  let regionArray = [];
  let allergyNumAll;
  let allergyArray = [];

  new Promise (resolve => {
    // getDataNumAll(sympton)
    // console.log(sympton);
    con.query("select count(distinct prodID) as dataNumAll from prodsympview where sympton = ?", [sympton], async (e,r) => {
      if(e) throw e;
      dataNumAll = r[0].dataNumAll;
      resolve();
    });
  }).then(() => {
    // randomNumReturn(dataNumAll)
    // console.log(dataNumAll);
    return new Promise (resolve => {
      dataNum = Math.floor(Math.random()*dataNumAll);
      resolve();
    });
  }).then(() => {
    // getDataID(dataNum)
    // console.log(dataNum);
    return new Promise (resolve => {
      con.query("select distinct prodID from prodsympview where sympton = ? limit ?, 1", [sympton, dataNum], async (e,r) => {
        if(e) throw e;
        prodID = r[0].prodID;
        resolve();
      });
    });
  }).then(() => {
    // getDataCommon(prodID)
    // console.log(prodID);
    return new Promise (resolve => {
      con.query("select distinct prodName, description, price, figURL, releaseDate, calory, protein, lipid, carbonhydrates, sugar, fiber, scequiv from prodsympview where prodID = ?", [prodID], async (e,r) => {
        if(e) throw e;
        data["prodID"] = prodID;
        data["prodName"] = r[0].prodName;
        data["description"] = r[0].description;
        data["price"] = r[0].price;
        data["figURL"] = r[0].figURL;
        data["date"] = r[0].releaseDate;
        data["calory"] = r[0].calory;
        data["protein"] = r[0].protein;
        data["lipid"] = r[0].lipid;
        data["carbonhydrates"] = r[0].carbonhydrates;
        data["sugar"] = r[0].sugar;
        data["fiber"] = r[0].fiber;
        data["scequiv"] = r[0].scequiv;
        resolve();
      });
    });
  }).then(() => {
    // getRegionNumAll(prodID);
    // console.log(data);
    return new Promise (resolve => {
      con.query("select count(distinct region) as regionNumAll from prodsympview where prodID = ?", [prodID], async (e,r) => {
        if(e) throw e;
        regionNumAll = r[0].regionNumAll;
        resolve();
      });
    });
  }).then(() => {
    // getDataRegion(prodID, regionNumAll)
    // console.log(regionNumAll);
    return new Promise (resolve => {
      con.query("select distinct region from prodsympview where prodID = ?", [prodID], async (e,r) => {
        if(e) throw e;
        for (let i = 0; i < regionNumAll; i++){
          regionArray.push(r[i].region);
        }
        data["region"] = regionArray;
        resolve();
      });
    });
  }).then(() => {
    // getAllergyNumAll(prodID);
    // console.log(data);
    return new Promise (resolve => {
      con.query("select count(distinct allergy) as allergyNumAll from prodsympview where prodID = ?", [prodID], async (e,r) => {
        if(e) throw e;
        allergyNumAll = r[0].allergyNumAll;
        resolve();
      });
    });
  }).then(() => {
    // getDataAllergy(prodID, allergyNumAll)
    // console.log(allergyNumAll);
    return new Promise (resolve => {
      con.query("select distinct allergy from prodsympview where prodID = ?", [prodID], async (e,r) => {
        if(e) throw e;
        for (let i = 0; i < allergyNumAll; i++){
          allergyArray.push(r[i].allergy);
        }
        data["allergy"] = allergyArray;
        resolve();
      });
    });
  }).then(() => {
    // sendData(data)
    // console.log(data);
    res.send(data);
  });
});
