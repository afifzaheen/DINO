
var PLAY=1;
var END =0;
var gameState=PLAY;
var trex,trex_image,ground_image,ground2;
var invisibleground;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacle,obstacleGroup;
var cloud,clouds,cloudGroup;
var gameover,restart;
var gameover1,restart1;
var trexcollided;
var jump,die;
var score =0;


function preload()
{

  trex_image = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_image =  loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage(" obstacle2.png");
  obstacle3 = loadImage(" obstacle3.png");
  obstacle4 = loadImage(" obstacle4.png");
  obstacle5 = loadImage(" obstacle5.png");
  obstacle6 = loadImage(" obstacle6.png");
  cloud = loadImage("cloud.png");
  restart = loadImage("restart.png");
  gameover = loadImage("gameOver.png");
  trexcollided = loadImage("trex_collided.png");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
}

function setup(){

  createCanvas(600,200);
  obstacleGroup = createGroup();
  cloudGroup = createGroup();


 trex = createSprite(50,160,20,50); 
 ground2 =createSprite(200,180,400,20); 
 ground2.x = ground2.width/2;
 
 trex.addAnimation("running",trex_image);
 trex.addAnimation("collided",trexcollided);

 ground2.addImage("ground2",ground_image);

 gameover1 = createSprite(300,100);
 gameover1.addImage(gameover);

 restart1 = createSprite(300,140);
 restart1.addImage(restart);

 gameover1.scale=0.5;
 restart1.scale=0.5;





 invisibleground =createSprite(200,190,400,20); 
 invisibleground.visible = false;

 trex.scale = 0.6;



}


function draw(){


  background(200);
  text("score"+score,500,50);


  if(gameState===PLAY){

    score = score + Math.round(getFrameRate()/60);
     
    trex.changeAnimation("running",trex_image);
    if(keyDown("space")){

      trex.velocityY= -12;
      jump.play();
    }
    trex.velocityY=  trex.velocityY+0.8;
    ground2.velocityX = -4;
    gameover1.visible=false;
    restart1.visible=false;


    if(ground2.x<0){
  
       ground2.x = ground2.width/2;
    }
    obstacles();

    if(obstacleGroup.isTouching(trex))
     {
     
       gameState=END;
       die.play();
   
     }
    clouds();
   
    
  }
  else if(gameState===END){
    trex.changeAnimation("collided",trexcollided);
    ground2.velocityX=0;
    trex.velocityY=0;
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(0);
    obstacleGroup.setLifetimeEach(0);
    
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    gameover1.visible=true;
    restart1.visible=true;


  }
  
  trex.collide(invisibleground);
  if(mousePressedOver(restart1)){

    reset();
  }

  function reset(){

    gameState=PLAY;
    gameover1.visible=false;
    restart1.visible=false;
  }

  
  
  drawSprites();
 

}

function clouds(){

  if(frameCount%60==0){
   var cloud1 = createSprite(600,120,10,40);
   cloud1.addImage(cloud);
   cloud1.velocityX=-6;
   cloud1.y = Math.round(random(30,110));
   cloud1.depth = trex.depth;
   trex.depth = trex.depth+1;

   cloud1.scale =  0.7;
   cloudGroup.add(cloud1);
   cloud1.lifetime=200;
  }

 

}

function obstacles(){

  if(frameCount%60==0){

    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX=-6;
    var rand = Math.round(random(1,6));
    switch(rand){
      
      case 1: obstacle.addImage(obstacle1);
      break;
      
      case 2: obstacle.addImage(obstacle2);
      break;
      
      case 3: obstacle.addImage(obstacle3);
      break;
      
      case 4: obstacle.addImage(obstacle4);
      break;
      
      case 5: obstacle.addImage(obstacle5);
      break;
      
      case 6: obstacle.addImage(obstacle6);
      break;

      default: break;


    }
    obstacle.scale=0.5;
    obstacleGroup.add(obstacle);
    obstacle.lifetime=300;
  }

}