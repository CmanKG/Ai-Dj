song=""
score_left=0
score_right=0
leftwrist_x=0
leftwrist_y=0
rightwrist_x=0
rightwrist_y=0
function preload(){
    song=loadSound("music.mp3")
}
function setup(){
    canvas=createCanvas(550,550)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    posenet=ml5.poseNet(video,modelloaded)
    posenet.on("pose",gotposes)
}
function draw(){
    image(video,0,0,550,550)
    fill("red")
    stroke("red")
    circle(leftwrist_x,leftwrist_y,20)
    fill("red")
    stroke("red")
    if (score_right>0.2) {
        
    
    circle(rightwrist_x,rightwrist_y,20)
    if (rightwrist_y>0 && rightwrist_y<100) {
    document.getElementById("speed").innerHTML="speed=0.5x"
    song.rate(0.5)
    }
    if (rightwrist_y>100 && rightwrist_y<200) {
        document.getElementById("speed").innerHTML="speed=1x"
        song.rate(1)
        }
        if (rightwrist_y>200 && rightwrist_y<300) {
            document.getElementById("speed").innerHTML="speed=1.5x"
            song.rate(1.5)
            }
            if (rightwrist_y>300 && rightwrist_y<400) {
                document.getElementById("speed").innerHTML="speed=2x"
                song.rate(2)
                }
                if (rightwrist_y>400 && rightwrist_y<500) {
                    document.getElementById("speed").innerHTML="speed=2.5x"
                    song.rate(2.5)
                    }}
    if (score_left>0.2) {       
    InNumberleftwrist_y = Number(leftwrist_y);
    remove_decimals=floor(InNumberleftwrist_y);
    volume=remove_decimals/500;
    song.setVolume(volume)
    document.getElementById("volume").innerHTML="volume="+volume
    }}
function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}
function modelloaded(){
    console.log("posenetisinitialized")
}
function gotposes(results){
    if (results.length>0) {
        console.log(results)
        leftwrist_x=results[0].pose.leftWrist.x
        leftwrist_y=results[0].pose.leftWrist.y
        rightwrist_x=results[0].pose.rightWrist.x
        rightwrist_y=results[0].pose.rightWrist.y
        console.log(leftwrist_x,leftwrist_y,rightwrist_x,rightwrist_y)
        score_left=results[0].pose.keypoints[9].score;
        score_right=results[0].pose.keypoints[10].score;
    }
}