function preload(){

}

function  setup(){
canvas=createCanvas( 300,250);
canvas.center();
video=createCapture(VIDEO);
video.hide();
classifier=ml5.imageClassifier("MobileNet",modelloaded);
}

function draw(){
image(video,0,0,300,250);
classifier.classify(video,gotResult);
}

function modelloaded(){
    console.log("Model Loaded");
}

previous_result="";


function gotResult(error,results){
if(error){
    console.error(error);

}
else{
    if((results[0].confidence>0.5)&&(previous_result!=results[0].label)){
        console.log(results);
        previous_result=results[0].label;
synth=window.speechSynthesis;
speak_data="Object dectected is     "+results[0].label;
utter_this=new SpeechSynthesisUtterance(speak_data);
synth.speak(utter_this);
document.getElementById("object_name").innerHTML=results[0].label;
document.getElementById("object_accuracy").innerHTML=results[0].confidence.toFixed(3);
    }
}

}