/*
Javascript Game-Flappy Bird: HTML5 canvas, Image(),Audio(), EventListeners(), Math.floor(),Math.random(), location.reload()
@2020-2021 | ΙΕΚ ΔΕΛΤΑ
*/

var cvs=document.getElementById("canvas");
var ctx=cvs.getContext("2d");

var bird=new Image();
var background=new Image();
var foreground=new Image();
var pipeup=new Image();
var pipedown=new Image();

var flyAudio=new Audio('audio/fly.mp3');
var scoreAudio=new Audio('audio/score.mp3')

var bX=0;
var bY=150;

var score=0;
var gravity=1;

bird.src="images/bird.png";
background.src="images/bg.png";
foreground.src="images/fg.png";
pipeup.src="images/pipeup.png"
pipedown.src="images/pipedown.png"

var gap=160;

var pipe=[];

pipe[0]={
	x:cvs.width,
	y:-30    
}

function birdMove(){
	bY-=35;
	flyAudio.play();
}

document.addEventListener("keydown",birdMove)

function draw(){
	var con=pipeup.height+gap;
	ctx.drawImage(background,0,0); 
		for (var i=0;i<pipe.length;i++){	
			ctx.drawImage(pipeup, pipe[i].x, pipe[i].y);
			ctx.drawImage(pipedown, pipe[i].x, pipe[i].y+con);
		
			pipe[i].x--;

			if(pipe[i].x==60){
				pipe.push({
				x:cvs.width,
				y:Math.floor(Math.random()*pipeup.height)-pipeup.height
				})    
			}

			if (pipe[i].x==0){
				score++; 
				scoreAudio.play();
				//console.log(score);
			}
	
			if(bX+bird.width>=pipe[i].x && bX<=pipe[i].x+pipeup.width && (bY<=pipe[i].y+pipeup.height || bY+bird.height>=pipe[i].y+con)) {
				location.reload();
			}
	
			if(bY+bird.height>cvs.height-foreground.height){
				location.reload();
			}
		}
	ctx.drawImage(foreground,0,cvs.height-foreground.height);   
	ctx.drawImage(bird,bX,bY); 

	bY+=gravity;

	ctx.fillStyle="#333";
	ctx.font="30px Arial";
	ctx.fillText("Score:"+score,10,cvs.height-10);

	requestAnimationFrame(draw);
}

draw();
