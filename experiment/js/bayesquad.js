////////////////////////////////////////////////////////////////////////
//            JS-CODE FOR 1D ACTIVE FUNCTION LEARNING                 //
//                       AUTHOR: ERIC SCHULZ                          //
////////////////////////////////////////////////////////////////////////
var exnum = 5;
var mylengthex = new Array(exnum);
var xpredex = new Array(exnum);
var xpredex1 = new Array(exnum);
var xpredex2 = new Array(exnum);
var xpredex3 = new Array(exnum);
var xpredex4 = new Array(exnum);

var index=0

var myDataRef = new Firebase("https://myexample.firebaseio.com/");
////////////////////////////////////////////////////////////////////////

function sq(x)
{
 var y=Math.pow(x,2)
 return(y)
}

function isInArray(value, array) 
{
  return array.indexOf(value) === -1;
}

//Function to randomly shuffle an array:
function shuffle(o)
{ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
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


//changes from one page to another
function clickStart(hide, show)
{
        document.getElementById(hide).style.display="none";
        document.getElementById(show).style.display = "block";
        window.scrollTo(0,0);        
}

function clickCheckprior(hide, show, id1, down, up, id2)
{
  var estimate=document.getElementById(id1).value;
  var cum=document.getElementById(id2).value;

  if ( estimate<=up & estimate>=down & cum>=0 & cum<=1000){
    clickStart(hide, show)

  }
else{
var insert='Wrong input format. Assessment should be between ' + down + ' and '+up+'. Frequency judgement should be between 0 and 1000.'
  alert(insert)

}
}

function clickCheckposterior(hide, show, id)
{
  var cum=document.getElementById(id).value;

  if (cum>=0 & cum<=1000){
    clickStart(hide, show)

  }
else{
var insert='Wrong input format. Frequency judgement should be between 0 and 1000.'
  alert(insert)

}
}



function clearStimulus(stage) 
{
  stage.selectAll("image").remove();
}
//Draw axes
function drawPic(stage, link)
{
stage.append("image")
  .attr("xlink:href", link)
  .attr({ width: 410,height: 410 })
  .attr("class", "bg");
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var mystage0= makeStage(400,400, ".plot1")
drawPic(mystage0, "https://raw.githubusercontent.com/ericschulz/bayesquad/master/example/h00000000000.png");
var height = [127.0422, 132.9472, 138.8521, 144.7571, 150.6620, 156.5670, 162.4719, 168.3769, 174.2818, 180.1868, 186.0917, 191.9967];
var chosen = [0,0,0,0,0,0,0,0,0,0,0];
function markinput1(value){
//mark
  exTrialCurrentValue=Math.round(value);
//update by slider  
  $('#slider1value').text(Math.round(height[exTrialCurrentValue]));
}

//do example
function dotrial1(){
  if (mylengthex.length > 0) {
     if (isInArray(exTrialCurrentValue, xpredex)){
mylengthex.shift();
clearStimulus(mystage0);
xex=exTrialCurrentValue;
chosen[xex]=1;
xpredex[index]=xex;
string="https://raw.githubusercontent.com/ericschulz/bayesquad/master/example/h"+chosen[0]+chosen[1]+chosen[2]+chosen[3]+chosen[4]+chosen[5]+chosen[6]+chosen[7]+chosen[8]+chosen[9]+chosen[10]+".png"
drawPic(mystage0,string);
index=index+1;
var insertex ="Number of trials left: "+(exnum-index)
document.getElementById("remainingex").innerHTML = insertex;}
else {alert("You have chosen this inout before")}
}
else {
clickStart('page5','page6');
}}

$(document).ready(function() {

// var sliderex = document.getElementById('sliderex');
$('#slider1').slider({
    min: 0.0,
    max: 10.0,
    step: 1,
    value: 0,
    slide: function(event, ui) {
        markinput1(ui.value);
    }
});
// need to initialize the value
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mylength2 = new Array(exnum);
var index2 = 0;
var mystage2= makeStage(400,400, ".plot2")
drawPic(mystage2, "https://raw.githubusercontent.com/ericschulz/bayesquad/master/mail/h00000000000.png");
var email = [ 1.000000,  2.727273,  4.454545,  6.181818,  7.909091,  9.636364, 11.363636, 13.090909, 14.818182, 16.545455, 18.272727, 20.000000];
var chosen2 = [0,0,0,0,0,0,0,0,0,0,0];
function markinput2(value){
//mark
  exTrialCurrentValue=Math.round(value);
//update by slider  
  $('#slider2value').text(Math.round(email[exTrialCurrentValue]));
}

//do example
function dotrial2(){
  if (mylength2.length > 0) {
     if (isInArray(exTrialCurrentValue, xpredex2)){
mylength2.shift();
clearStimulus(mystage2);
xex=exTrialCurrentValue;
chosen2[xex]=1;
xpredex2[index2]=xex;
string="https://raw.githubusercontent.com/ericschulz/bayesquad/master/mail/h"+chosen2[0]+chosen2[1]+chosen2[2]+chosen2[3]+chosen2[4]+chosen2[5]+chosen2[6]+chosen2[7]+chosen2[8]+chosen2[9]+chosen2[10]+".png"
drawPic(mystage2,string);
index2=index2+1;
var insertex ="Number of trials left: "+(exnum-index2)
document.getElementById("remaining2").innerHTML = insertex;}
else {alert("You have chosen this input before")}
}
else {
clickStart('page8','page9');
}}

$(document).ready(function() {

// var sliderex = document.getElementById('sliderex');
$('#slider2').slider({
    min: 0.0,
    max: 10.0,
    step: 1,
    value: 0,
    slide: function(event, ui) {
        markinput2(ui.value);
    }
});
// need to initialize the value
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DICE DICE BABY!!!
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mylength3 = new Array(exnum);
var index3 = 0;
var mystage3= makeStage(400,400, ".plot3")
drawPic(mystage3, "https://raw.githubusercontent.com/ericschulz/bayesquad/master/dice/h00000000000.png");
var dice = [1,4,7,10,13,16,19,22,25,28,31,34];
var chosen3 = [0,0,0,0,0,0,0,0,0,0,0];
function markinput3(value){
//mark
  exTrialCurrentValue=Math.round(value);
//update by slider  
  $('#slider3value').text(Math.round(dice[exTrialCurrentValue]));
}

//do example
function dotrial3(){
  if (mylength3.length > 0) {
     if (isInArray(exTrialCurrentValue, xpredex3)){
mylength3.shift();
clearStimulus(mystage3);
xex=exTrialCurrentValue;
chosen3[xex]=1;
xpredex3[index3]=xex;
string="https://raw.githubusercontent.com/ericschulz/bayesquad/master/dice/h"+chosen3[0]+chosen3[1]+chosen3[2]+chosen3[3]+chosen3[4]+chosen3[5]+chosen3[6]+chosen3[7]+chosen3[8]+chosen3[9]+chosen3[10]+".png"
drawPic(mystage3,string);
index3=index3+1;
var insertex ="Number of trials left: "+(exnum-index3)
document.getElementById("remaining3").innerHTML = insertex;}
else {alert("You have chosen this input before")}
}
else {
clickStart('page11','page12');
}}

$(document).ready(function() {

// var sliderex = document.getElementById('sliderex');
$('#slider3').slider({
    min: 0.0,
    max: 10.0,
    step: 1,
    value: 0,
    slide: function(event, ui) {
        markinput3(ui.value);
    }
});
// need to initialize the value
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//VIDEO GAME
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mylength4 = new Array(exnum);
var index4 = 0;
var mystage4= makeStage(400,400, ".plot4")
drawPic(mystage4, "https://raw.githubusercontent.com/ericschulz/bayesquad/master/game/h00000000000.png");
var video = [4.166276, 4.828317, 5.490358, 6.152400,  6.814441,  7.476482,  8.138524,  8.800565,  9.462606, 10.124648, 10.786689, 11.448730];
var chosen4 = [0,0,0,0,0,0,0,0,0,0,0];
function markinput4(value){
//mark
  exTrialCurrentValue=Math.round(value);
//update by slider  
  $('#slider4value').text(Math.round(video[exTrialCurrentValue]));
}

//do example
function dotrial4(){
  if (mylength4.length > 0) {
     if (isInArray(exTrialCurrentValue, xpredex4)){
mylength4.shift();
clearStimulus(mystage4);
xex=exTrialCurrentValue;
chosen4[xex]=1;
xpredex4[index4]=xex;
string="https://raw.githubusercontent.com/ericschulz/bayesquad/master/game/h"+chosen4[0]+chosen4[1]+chosen4[2]+chosen4[3]+chosen4[4]+chosen4[5]+chosen4[6]+chosen4[7]+chosen4[8]+chosen4[9]+chosen4[10]+".png"
drawPic(mystage4,string);
index4=index4+1;
var insertex ="Number of trials left: "+(exnum-index4)
document.getElementById("remaining4").innerHTML = insertex;}
else {alert("You have chosen this input before")}
}
else {
clickStart('page14','page15');
}}

$(document).ready(function() {

// var sliderex = document.getElementById('sliderex');
$('#slider4').slider({
    min: 0.0,
    max: 10.0,
    step: 1,
    value: 0,
    slide: function(event, ui) {
        markinput4(ui.value);
    }
});
// need to initialize the value
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function senddata(){
  var gender=document.getElementById("gender").value;
  var age=document.getElementById("age").value;
  var height=document.getElementById("height").value;
  var heightprior=document.getElementById("heightprior").value;
  var heightposterior=document.getElementById("heightposterior").value;
  var email=document.getElementById("email").value;
  var emailprior=document.getElementById("emailprior").value;
  var emailposterior=document.getElementById("emailposterior").value;
  var dice=document.getElementById("dice").value;
  var diceprior=document.getElementById("diceprior").value;
  var diceposterior=document.getElementById("diceposterior").value;
  var game=document.getElementById("game").value;
  var gameprior=document.getElementById("gameprior").value;
  var gameposterior=document.getElementById("gameposterior").value;
  var prolific=document.getElementById("prolific").value;


    myDataRef.push({prolific: prolific, chosen: chosen, xpredex: xpredex, chosen2: chosen2, xpredex2: xpredex2, 
      chosen3: chosen3, xpredex3: xpredex3, chosen4: chosen4, xpredex4: xpredex4, age: age, 
      gender: gender, height: height, heightprior: heightprior, heightposterior: heightposterior,
      email: email, emailprior, emailprior, emailposterior: emailposterior, 
      dice: dice, diceprior: diceprior, diceposterior, diceposterior,
      game: game, gameprior: gameprior, gameposterior: gameposterior});
    clickStart('page16','page17');

}
