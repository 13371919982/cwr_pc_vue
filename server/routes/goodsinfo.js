const express=require("express");
const router=express.Router();
const pool=require("../pool");

// 商品请求的方法
router.get("/detail",(req,res)=>{
  var $lid=req.query.lid;
  let sql="select * from lg_laptop l inner join lg_laptop_pic p on l.lid =p.laptop_id where lid=?";
  pool.query(sql,[$lid],(err,result)=>{
    if(err) throw err;
    res.send(result);
  })
})

module.exports=router;