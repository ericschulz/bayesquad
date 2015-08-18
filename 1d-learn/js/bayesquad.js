////////////////////////////////////////////////////////////////////////
//            JS-CODE FOR 1D ACTIVE FUNCTION LEARNING                 //
//                       AUTHOR: ERIC SCHULZ                          //
////////////////////////////////////////////////////////////////////////
var exnum = 5;
var mylengthex = new Array(exnum);
var xpredex = new Array(exnum);
var ypredex = new Array(exnum);
var index=0


////////////////////////////////////////////////////////////////////////

function sq(x)
{
 var y=Math.pow(x,2)
 return(y)
}

function isInArray(value, array) {
  return array.indexOf(value) === -1;
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

//changes from one page to another
function clickStart(hide, show)
{
        document.getElementById(hide).style.display="none";
        document.getElementById(show).style.display = "block";
        window.scrollTo(0,0);        
}



function clearStimulus(stage) 
{
  stage.selectAll("image").remove();
}
//Draw axes
function drawPic(stage, link)
stage.append("image")
  .attr("xlink:href", link)
  .attr({ width: 410,height: 410 })
  .attr("class", "bg");

drawPic(mystage0, "https://raw.githubusercontent.com/ericschulz/bayesquad/master/example/h00000000000.png");
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////
function getstarted()
{
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

var height = [127.0422, 132.9472, 138.8521, 144.7571, 150.6620, 156.5670, 162.4719, 168.3769, 174.2818, 180.1868, 186.0917, 191.9967];
var chosen = [0,0,0,0,0,0,0,0,0,0,0];
function markinputex2(value){
//mark
  exTrialCurrentValue=Math.round(value);
//update by slider  
  $('#sliderexvalue').text(Math.round(height[exTrialCurrentValue]));
}

//do example
function dotrialex2(){
  if (mylengthex.length > 0) {
     if (isInArray(exTrialCurrentValue, xpredex)){
mylengthex.shift();
clearStimulus(mystage0);
xex=exTrialCurrentValue;
yex=myidentity(xex);
chosen[xex]=1;
xpredex[index]=xex;
ypredex[index]=yex;
string="https://raw.githubusercontent.com/ericschulz/bayesquad/master/example/h"+chosen[0]+chosen[1]+chosen[2]+chosen[3]+chosen[4]+chosen[5]+chosen[6]+chosen[7]+chosen[8]+chosen[9]+chosen[10]+".png"
drawPic(mystage0,string);
index=index+1;
var insertex ="Number of trials left: "+(exnum-index)
document.getElementById("remainingex").innerHTML = insertex;}
else {alert("You have chosen this inout before")}
}
else {
clickStart('pageexample','page5');
}}

////////////////////////////////////////////////////
function markinputone2(value){
  //xtrial=document.getElementById("sliderex").value;
  oneTrialCurrentValue=value;
  //clearEllipse(mystage0);
  $('#slider1value').text(value);
}

function markinputone(){
  xtrial1=$("#slider1").value;}

function dotrial1(){
  if (mylength.length > 0) {
mylength.shift();
xt=oneTrialCurrentValue;
yt=fhat[xt*10]+myNorm()/10;
xpred[ind]=xt;
ypred[ind]=yt;
ind=ind+1;
var insertp1 ="Number of trials left: "+(tnum-ind)
document.getElementById("remain1").innerHTML = insertp1;}
else { 
  clickStart('page6','page7');
}}


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
$(document).ready(function() {

// var sliderex = document.getElementById('sliderex');
$('#sliderex').slider({
    min: 0.0,
    max: 10.0,
    step: 1,
    value: 1,
    slide: function(event, ui) {
        markinputex2(ui.value);
    }
});

// need to initialize the value
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
})
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////