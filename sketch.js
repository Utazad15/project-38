var canvas;
var bg;
var bulletImg;
var bullet;
var distance = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  bg = loadImage("images/bg1.png");
  manImg = loadAnimation("images/runningman1.png","images/runningman2.png","images/runningman3.png",
                         "images/runningman4.png","images/runningman5.png","images/runningman6.png");
  manImg1 = loadAnimation("images/runningman10.png");
  manImg2 = loadAnimation("images/runningman1.png"); 
  obstacle1 = loadImage("images/monster1.png");
  obstacle2 = loadImage("images/monster2.png");
  obstacle3 = loadImage("images/monster3.png");
  obstacle4 = loadImage("images/monster4.png");
  obstacle5 = loadImage("images/monster5.png");
  obstacle6 = loadImage("images/monster6.png");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  createCanvas(950,600);

  objectsGroup = createGroup();

  distance = 0;

  bg1 = createSprite(650,340,50,50);
  bg1.addImage("background",bg);
  bg1.scale = 1.8;
  bg1.velocityX = -7;
  
  man = createSprite(150,340,50,50);
  man.addAnimation("runRight",manImg);
  man.addAnimation("jump",manImg1);
  man.addAnimation("stand",manImg2);
  man.scale = 2.5;

  ground = createSprite(150,425,150,10);
  ground.visible = false;

  gameOver = createSprite(500,300);
  gameOver.addImage(gameOverImg); 
}

function draw(){
 background("brown");
 man.collide(ground);

 if(gameState === PLAY){
  

  gameOver.visible = false;

  if (bg1.x < 300){
    bg1.x = 400;
  }
  
  if(keyDown("up") && man.y > 200){
    man.changeAnimation("jump",manImg1);
    man.velocityY = man.velocityY - 4;
  }
  
  if(keyWentUp("up")){
    man.changeAnimation("runRight",manImg); 
  }
  
  if(objectsGroup.isTouching(man)){
    gameState = END;
  }
  
  man.velocityY = man.velocityY + 2;
  
 
  
  spawnObstacles();

 } else if(gameState === END){
  bg1.velocityX = 0;
  gameOver.visible = true;
  man.y = 345;
  man.changeAnimation("stand",manImg2);
  objectsGroup.setVelocityXEach(0);
  objectsGroup.destroyEach();
 }
 

 drawSprites();
}

function spawnObstacles(){
  if(frameCount%100 === 0){
    objects = createSprite(1000,375);
    objects.velocityX = -(5 + 2 * distance/150);
    objects.scale = 0.35;
    objects.lifetime = 200;
    objectsGroup.add(objects);
    objects.setCollider("rectangle",0,0,150,150)
    
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:objects.addImage(obstacle1);
             break;
      case 2:objects.addImage(obstacle2);
             break;
      case 3:objects.addImage(obstacle3);
             break;
      case 4:objects.addImage(obstacle4);
             break;
      case 5:objects.addImage(obstacle5);
             break;
      case 6:objects.addImage(obstacle6);
             break;
      default:break;
    }
  }
}