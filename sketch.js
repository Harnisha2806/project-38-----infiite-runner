var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var runner, runnerImg;
var city , cityImg;
var ground;
var  obs ,obs1 , obs2 ,  obs3 ,obs4 , obsGroup;
var bird , bird1 , bird2 , birdsGroup;
var gameover, gameoverImg;
var restart ,restartImg;
var score = 0;

function preload(){
runnerImg=loadAnimation("r1.png","r2.png","r3.png","r4.png","r5.png");
cityImg = loadImage("b1.png");
  
obs1 = loadImage("obstacle1.png"); 
obs2 = loadImage("obstacle2.png");
obs3 = loadImage("obstacle3.png");  
obs4 = loadImage("c1.png");

bird1 = loadImage("bird1.png");
bird2 = loadImage("bird2.png");
 
gameoverImg = loadImage("gameOver.png");  
 restartImg=loadImage("restart.png"); 
 obsGroup = new Group(); 
 birdsGroup = new Group(); 
  
}

function setup() {
 createCanvas(1000,400);
  //adding backgroung
  city = createSprite(0,220,10,10);
  city.addImage(cityImg);
  city.scale = 0.85
  city.velocityX = -12;
  
  ground = createSprite(150,385,500,5);
  ground.visible = false;
  
  gameover = createSprite(390,200);
  gameover.addImage(gameoverImg);
  gameover.scale = 1.9;
  
  restart = createSprite(390,300);
  restart.addImage(restartImg);
  restart.scale=0.5;
  
  // creating runner
runner =  createSprite(100,350,10,10);
runner.addAnimation("runner@",runnerImg);
runner.scale=0.4; 
runner.setCollider("rectangle",0,0,runner.width,
runner.height);

}

function draw() {
 background(0);
  
drawSprites();  
  
   //displaying score
  textSize(20);
  fill("black");
  text("Score= "+ score, 50,50);
  
  //colliding runner with ground
  runner.collide(ground);
  
    // adding gravity
  runner.velocityY = 10;
  
 if (gameState === PLAY) {
   if(city.x < 0){
    city.x = width;
  }

  // camera setting
  camera.position.x = runner.x;
  //camera.position.y = height;

   //scoring
  city.velocityX = -(8 + 3* score/100);
    score = score + Math.round(getFrameRate()/60);
   
   gameover.visible = false;
   restart.visible = false;
  
  if (keyDown("space")){
   runner.velocityY = -5;
  }
// spwaning obstacles
  obstacles();
  birds();
  
  if(obsGroup.isTouching(runner)||
     birdsGroup.isTouching(runner)||
     runner.y < 0){
   birdsGroup.destroyEach();
   obsGroup.destroyEach();
   gameState=END;
  }
 }
  
  if (gameState === END) {
    city.velocityX = 0;
    gameover.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)) {
      reset();
    }
  } 
}

function obstacles(){
 if(World.frameCount % 135 === 0){
obs = createSprite(1000,380,20,20);
obs.scale=0.2;
 
var rand=Math.round(random(1,5));
  switch(rand){
 case 1: obs.addImage(obs1);
         break;
 case 2: obs.addImage(obs2);
      break;
 case 3: obs.addImage(obs3);
      break;
 case 4: obs.addImage(obs4);  
      break;
  default: break; 
  }  
  obs.velocityX = -(8+ 3* score/100) ;
    //assign scale and lifetime to the obstacle           
    obs.scale = 0.1;
    obs.lifetime = 900;
 obs.setCollider("rectangle",0,0,820,620);  
   
   //add each obstacle to the group
    obsGroup.add(obs);
 }
}



function birds(){
if (World.frameCount % 100 ===0){
bird = createSprite(800,80,10,10);
 var rand = Math.round(random(1,2));
  switch(rand){
    case 1:bird.addImage(bird1) ;
    break; 
    case 2:bird.addImage(bird2) ;
    break; 
    default: break;
  }
 bird.lifetime = 900;
 bird.velocityX =  -(8+ 2* score/100) ;
 bird.scale = 0.15; 
birdsGroup.add(bird); bird.setCollider("rectangle",0,0,220,200);
  }
}

function reset(){
  gameState=PLAY;
  score=0;
  gameover.visible=false;
  obsGroup.destroyEach();
  birdsGroup.destroyEach();
}