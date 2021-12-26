video = "";
status = "";
objects = [];

function preload() {

  video = createVideo("video.mp4");
  video.hide();

}

function setup() {

  canvas = createCanvas(400,350);
  canvas.center();

}

function draw() {

  image(video,0,0,400,350);

  if(status!="") {

    objectDetector.detect(video,gotResult);

    for(i=0;i<objects.length;i++) {

      document.getElementById("status").innerHTML = "Status : Object(s) detected";
      document.getElementById("no_of_obj").innerHTML = "Number of Object(s) detected : " + objects.length;

      fill("#FF0000");
      percent = floor(objects[i].confidence)*100;
      text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
      noFill();
      stroke("FF0000");
      rect(object[i].x,objects[i].y,objects[i].width,objects[i].height);

    }

  }

}

function start() {

  objectDetector = ml5.objectDetector('cocossd',modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function modelLoaded() {

  console.log("Model Loaded");
  status = true;
  video.loop();
  video.speed(1);
  video.volume(0);

}

function gotResult(results,error) {

  if(error) {

    console.error(error);

  } else {

    console.log(results);
    objects = results;

  }

}

