const express=require("express");
const router=express.Router();
const pool=require('../pool');

//登录的请求方式
router.get("/shop",(req,res)=>{
  var $lid=req.query.lid;
  console.log($lid);

  let sql="select * from lg_laptop l inner join lg_laptop_pic p on l.lid =p.laptop_id where lid=?";
  pool.query(sql,[$lid],(err,result)=>{
    if(err) throw err;
    // console.log(result.length);
    res.send(result);
  })
})

module.exports=router;