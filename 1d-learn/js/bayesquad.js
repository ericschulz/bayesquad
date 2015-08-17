////////////////////////////////////////////////////////////////////////
//            JS-CODE FOR 1D ACTIVE FUNCTION LEARNING                 //
//                       AUTHOR: ERIC SCHULZ                          //
////////////////////////////////////////////////////////////////////////
var exnum = 10;
var mylengthex = new Array(exnum);
var xpredex = new Array(exnum);
var ypredex = new Array(exnum);
var tnum = 40;
var mycondition=1;
var mylength = new Array(tnum);
var xpred = new Array(tnum);
var ypred = new Array(tnum);
var ind = 0;
var oneTrialCurrentValue = 0.0;
var index = 0;
var exTrialCurrentValue = 0.0;
var pnum = 3;
var mylength2 = new Array(pnum);
var xpred3 = new Array(pnum);
var ypred3 = new Array(pnum);
var indm = 0;
var threeTrialCurrentValue = 0.0;
var predict= [-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12];
var yp2=[-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12];
var pnew=predict[0];
var twoTrialCurrentValue = 0.0;
var fhat = new Array(101);
var condition=Math.floor((Math.random() * 99));

////////////////////////////////////////////////////////////////////////
var ref = new Firebase("https://functions.firebaseio.com/");
var database = new Firebase("https://functionsdata.firebaseio.com/");

var list=[];
ref.once('value', function(nameSnapshot) {
list=nameSnapshot.val();
return(list)
});
////////////////////////////////////////////////////////////////////////
function sq(x)
{
 var y=Math.pow(x,2)
 return(y)
}

//Function to randomly shuffle an array:
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

//generates a standard normal using Box-Mueller transformation
function myNorm() 
{
    var x1, x2, rad;
     do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        rad = x1 * x1 + x2 * x2;
    } while(rad >= 1 || rad == 0);
     var c = Math.sqrt(-2 * Math.log(rad) / rad);
     return (x1 * c);
};
////////////////////////////////////////////////////////////////////////
//function to create the stage where stimuli are presented
function makeStage(w, h, object) {
	var stage = d3.select(object)
	  .insert("center")
	  .insert("svg")
	  .attr("width",w)
	  .attr("height",h);
        return stage;
}

//Create stage
var mystage0= makeStage(400,400, ".plot0")
var mystage1= makeStage(400,400, ".plot1")
var mystage2= makeStage(400,400, ".plot2")
var mystage3= makeStage(400,400, ".plot3")

//changes from one page to another
function clickStart(hide, show)
{
        document.getElementById(hide).style.display="none";
        document.getElementById(show).style.display = "block";
        window.scrollTo(0,0);        
}

//draws the points
function drawCircle(stage, cx, cy, mycolor) {
	stage.insert("circle")
	  .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", 2)
    .style("fill",mycolor)
    .style("stroke",mycolor)
    .style("stroke-width","5px");
}

//Draws the marked points, I used ellipse as a hack to avoid class clashes
function drawEllipse(stage, ex, ey) {
  stage.insert("ellipse")
    .attr("cx", ex)
    .attr("cy", ey)
    .attr("rx", 2)
    .attr("ry", 2)
    .style("fill","green")
    .style("stroke","green")
    .style("stroke-width","5px");
}

//Update ellipse by slider
function updateEllipse(stage, ex, ey) {
    stage.selectAll("ellipse").attr("cx", ex).attr("cy", ey);
}

//clears the points
function clearStimulus(stage) {
	stage.selectAll("circle").remove();
}

//clears the ellipse
function clearEllipse(stage) {
 stage.selectAll("ellipse").remove();
} 

//scalings for plot
var scalex = d3.scale.linear()
                    .domain([0, 10])
                    .range([10, 340]);

var scaley = d3.scale.linear()
                    .domain([0, 10])
                    .range([340, 10]);

function drawRectangle(stage, cx, cy, w, h) 
{
  stage.insert("rect")
    .attr("x", cx)
    .attr("y", cy)
    .attr("width", w)
    .attr("height", h)
    .style("fill","black")
    .style("fill-opacity",0)
    .style("stroke","black")
    .style("stroke-width","2px");
}


//create x axis
function make_x_axis() {        
    return d3.svg.axis()
        .scale(scalex)
         .orient("bottom")
         .ticks(10)
}

//create y-axis
function make_y_axis() {        
    return d3.svg.axis()
        .scale(scaley)
        .orient("left")
        .ticks(10)
}


//Function to draw axes
function drawaxis(svg){
   svg.append("g")        
        .attr("class", "grid")
        .attr("transform", "translate(0," + 350 + ")")
        .call(make_x_axis()
            .tickSize(-350, 0, 0)
            
        )

      svg.append("g")         
        .attr("class", "grid")
        //.attr("transform", "translate("+16+",0)") 
        .call(make_y_axis()
            .tickSize(-350, 0, 0)
            
        )
        
}

//scalings for plot
var scalex2 = d3.scale.linear()
                    .domain([-2, 12])
                    .range([10, 340]);

var scaley2 = d3.scale.linear()
                    .domain([-2, 12])
                    .range([340, 10]);

//create x axis
function make_x_axis2() {        
    return d3.svg.axis()
        .scale(scalex2)
         .orient("bottom")
         .ticks(14)
}

//create y-axis
function make_y_axis2() {        
    return d3.svg.axis()
        .scale(scaley2)
        .orient("left")
        .ticks(14)
}


//Function to draw axes
function drawaxis2(svg){
   svg.append("g")        
        .attr("class", "grid")
        .attr("transform", "translate(0," + 350 + ")")
        .call(make_x_axis2()
            .tickSize(-350, 0, 0)
            
        )

      svg.append("g")         
        .attr("class", "grid")
        //.attr("transform", "translate("+16+",0)") 
        .call(make_y_axis2()
            .tickSize(-350, 0, 0)
            
        )
        
}


//Draw axes
mystage0.append("image")
  .attr("xlink:href", "https://raw.githubusercontent.com/ericschulz/bayesquad/master/height/00000000001.png")
  .attr({ width: 380,height: 380 })
  .attr("class", "bg");

drawaxis2(mystage2);
drawaxis(mystage3);
drawRectangle(mystage2, scalex2(0)-2, scaley2(10)-2, Math.abs(scalex2(0)-scalex2(10))+4, Math.abs(scalex2(0)-scalex2(10))+4);

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////
function getstarted()
{

var input=list[condition];
   for(var j=0; j<fhat.length; j++) {
      fhat[j]=input[j].y;
    }
clickStart('page4','pageexample');
}

//Checkers:
////////////////////////////////////////////////////
function instructioncheck(){
if (document.getElementById('icheck1').checked) {var  ch1 = 1}
if (document.getElementById('icheck2').checked) {var  ch2 = 1}
if (document.getElementById('icheck3').checked) {var  ch3 = 1}
var checksum=ch1+ch2+ch3
if (checksum===3){
  clickStart('page5','pagecheckcorrect')
  console.log(checksum)}
  else{
console.log(checksum)
alert('You have answered some of the questions wrong. Please try again.')}
  }
////////////////////////////////////////////////////

//Example:

function myidentity(x){
  var y= x;
  return(y)
}

function markinputex2(value){
//mark
  exTrialCurrentValue=value;
//update by slider  
  $('#sliderexvalue').text(value);
  updateEllipse(mystage0, scalex(exTrialCurrentValue),scaley(0));
}

function markinputex(){
  xtrial=$("#sliderex").value;
  clearEllipse(mystage0);
  drawEllipse(mystage0, scalex(xtrial),scaley(0));}

//do example
function dotrialex2(){
  if (mylengthex.length > 0) {
mylengthex.shift();
clearStimulus(mystage0);
xex=exTrialCurrentValue;
yex=myidentity(xex);
xpredex[index]=xex;
ypredex[index]=yex;
index=index+1;
var insertex ="Number of trials left: "+(exnum-index)
document.getElementById("remainingex").innerHTML = insertex;
drawCircle(mystage0,scalex(xex),scaley(yex), "red");}
else {
clickStart('pageexample','page5');
}}

////////////////////////////////////////////////////
function markinputone2(value){
  //xtrial=document.getElementById("sliderex").value;
  oneTrialCurrentValue=value;
  //clearEllipse(mystage0);
  $('#slider1value').text(value);
  updateEllipse(mystage1, scalex(oneTrialCurrentValue),scaley(0));
}

function markinputone(){
  xtrial1=$("#slider1").value;
  clearEllipse(mystage1);
  drawEllipse(mystage1, scalex(xtrial1),scaley(0));}

function dotrial1(){
  if (mylength.length > 0) {
mylength.shift();
clearStimulus(mystage1);
xt=oneTrialCurrentValue;
yt=fhat[xt*10]+myNorm()/10;
xpred[ind]=xt;
ypred[ind]=yt;
ind=ind+1;
var insertp1 ="Number of trials left: "+(tnum-ind)
document.getElementById("remain1").innerHTML = insertp1;
drawCircle(mystage1,scalex(xt),scaley(yt), "red");}
else {
clickStart('page6','page7');
}}

////////////////////////////////////////////////////
function markinputtwo2(value){
  //xtrial=document.getElementById("sliderex").value;
  twoTrialCurrentValue=value;
  //clearEllipse(mystage0);
  $('#slider2value').text(value);
  updateEllipse(mystage2, scalex2(pnew),scaley2(twoTrialCurrentValue));
}

function markinputtwo(){
  xtrial2=$("#slider2").value;
  clearEllipse(mystage2);
  drawEllipse(mystage2, scalex2(pnew),scaley2(xtrial2));
}

var topredict= "Please enter your prediction for the input: " +predict[0];
document.getElementById("tobepredicted").innerHTML = topredict;
indp=0;

function dotrial2(){
  if (predict.length>0){
    //clearStimulus(mystage2)
    if (predict[1]==undefined){
      var topredict= "No more predictions to be made." ;}
    else{ var topredict= "Please enter your prediction for the input: " +predict[1];}
    document.getElementById("tobepredicted").innerHTML = topredict;
    xpred2=predict.shift()
    ypred2=twoTrialCurrentValue;
    yp2[indp]=ypred2;
    indp=indp+1;
    drawCircle(mystage2, scalex2(xpred2), scaley2(ypred2), "blue")
    pnew=predict[0];
    return(pnew)}
else{
clickStart('page7','page8')
     }}

////////////////////////////////////////////////////
function markinputthree2(value){
  //xtrial=document.getElementById("sliderex").value;
  threeTrialCurrentValue=value;
  //clearEllipse(mystage0);
  $('#slider3value').text(value);
  updateEllipse(mystage3, scalex(threeTrialCurrentValue),scaley(0));
}

function markinputthree(){
  xtrial2=$("#slider3").value;
  clearEllipse(mystage3);
  drawEllipse(mystage3, scalex(threeTrialCurrentValue),scaley(0));
}

//Picking maximum:
function dotrial3(){
  if (mylength2.length > 0) {
mylength2.shift();
//clearStimulus(mystage3)
xt3=threeTrialCurrentValue;
xpred3[indm]=xt3;
indm=indm+1;
var insertm1 ="Number of trials left: "+(pnum-indm)
document.getElementById("remainmax").innerHTML = insertm1;
drawCircle(mystage3,scalex(xt3),scaley(0), "orange");}
else {
clickStart('page8','page9');
}}

function senddata(){
var gender=document.getElementById("gender").value;
  var age=document.getElementById("age").value;
    database.push({condition: condition, xpred: xpred,  ypred: ypred, predict: predict, yp2: yp2, xpred3: xpred3, gender: gender, age: age});
    clickStart('page9','page10');

}
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
$(document).ready(function() {

// var sliderex = document.getElementById('sliderex');
$('#sliderex').slider({
    min: 0.0,
    max: 10.0,
    step: 0.1,
    value: 0.0,
    slide: function(event, ui) {
        markinputex2(ui.value);
    }
});

// need to initialize the value
drawEllipse(mystage0, scalex(0),scaley(0));
});

$(document).ready(function() {
$('#slider1').slider({
    min: 0.0,
    max: 10.0,
    step: 0.1,
    value: 0.0,
    slide: function(event, ui) {
        markinputone2(ui.value);
    }
});
drawEllipse(mystage1, scalex(0),scaley(0));
});

$(document).ready(function() {
$('#slider2').slider({
    min: -2.0,
    max: 12.0,
    step: 0.1,
    value: 0.0,
    slide: function(event, ui) {
        markinputtwo2(ui.value);
    }
});
drawEllipse(mystage2, scalex2(-2),scaley2(0));
});

$(document).ready(function() {
$('#slider3').slider({
    min: 0.0,
    max: 10.0,
    step: 0.1,
    value: 0.0,
    slide: function(event, ui) {
      markinputthree2(ui.value);
   }
});
drawEllipse(mystage3, scalex(0),scaley(0));
})
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////