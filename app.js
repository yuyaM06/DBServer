const express = require('express')
const cors = require( 'cors' );

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// urlencodedとjsonは別々に初期化する
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());

app.listen(3100, () => console.log('http://localhost:3100'))


const productJson = {
  "prodID": 13,
  "prodName": "７プレミアム 牛乳寒天 ３個パック",
  "description": "つるっとしたのど越しの、牛乳のコクとやさしい甘みの寒天です",
  "price": 158,
  "figURL": "https://img.7api-01.dp1.sej.co.jp/item-image/251949/B6658D9D5DFBFE214574D38C7F7E792B.jpg",
  "date": null,
  "calory": 78,
  "protein": 1.5,
  "lipid": 2.4,
  "carbonhydrates": 12.6,
  "sugar": null,
  "fiber": null,
  "scequiv": 0.1,
  "region": ["東北", "関東", "甲信越", "北陸", "東海", "近畿", "中国", "四国", "九州", "北海道"],
  "allergy": ["乳"]
}

app.get('/getproduct', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(productJson)
})

app.post('/product', function (req, res) {
  console.log(req.body);
  console.log(req.body.sympton);
  // console.log(req);
  // res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(productJson);

})
