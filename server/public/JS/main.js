
window.onscroll=function(){
  const md=document.getElementById("sbtn"),
    cl_left=document.getElementById("cl-left"),
    cl_right=document.getElementById("cl-right");
  var top=window.scrollY;
  if(top>80){
    md.style.cssText="display:block";
  }else if(top<80){
    md.style.cssText="";
  }
  if(top>630){
    cl_left.style.cssText="position:fixed;top:50px;";
    cl_right.style.cssText="position:fixed;top:115px;";
  }else if(top<630){
    cl_left.style.cssText="";
    cl_right.style.cssText="";
  }
}


const i1=document.getElementById("i1");
function kw(obj){
  console.log(i1.value);
  obj.href=`product.html?kws=${i1.value}`
}