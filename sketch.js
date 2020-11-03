var PLAY=1;
var END=0;
var gameState=PLAY;
var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var survivalTime=0;
var tree,treeImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  treeImage = loadImage("tree.png");
 
}



function setup() {
createCanvas(600,400);  
ground = createSprite(300,370,600,60);
ground.velocityX=-5;
ground.shapeColor="brown";

monkey = createSprite(70,320,50,50);  
monkey.addAnimation("monkey",monkey_running);
monkey.scale=0.16;
   

obstacleGroup = new Group();
foodGroup = new Group(); 
  
score=0;  
}

function draw() {
background("cyan");
  
if (gameState===PLAY){
survivalTime=Math.ceil(frameCount/frameRate());
if (ground.x<300){
 ground.x=ground.width/2; 
}  
if (keyDown("space") && monkey.y>=250){
monkey.velocityY=-17;  
}
monkey.velocityY+=0.8;
if (foodGroup.isTouching(monkey)){
  score=score+2;
  foodGroup.destroyEach();
  survivalTime=survivalTime;
  
}
spawnObstacles();
spawnFood();
spawnTree();  
}  
stroke("white");
fill("white");  
textSize(20);  
text("score : "+score,30,30);
text("Survival Time : "+survivalTime,130,30);  
 if (gameState===END){
   obstacle.velocityX=0;
  obstacle.lifetime=-1;
  banana.lifetime=-1;
  tree.lifetime=-1; 
  obstacleGroup.setVelocityXEach=0;
  banana.velocityX=0;
  ground.velocityX=0;
  tree.velocityX=0; 
   stroke("red");
   textSize(40);
   fill("red");
   text ("GAME OVER",300,50);
 } 

monkey.collide(ground);
  
if (obstacleGroup.isTouching(monkey)){
  
  gameState=0;
  
}
  
 
drawSprites();  
  
}

function spawnObstacles(){
if (frameCount%300===0){
obstacle = createSprite(650,318,40,40);
obstacle.velocityX=-7;
obstacle.addImage(obstacleImage);
obstacle.scale=0.15;
obstacle.lifetime=100;
obstacleGroup.add(obstacle);  
}  
}

function spawnFood(){
if (frameCount%90===0){
banana = createSprite(650,318,40,40);
banana.velocityX=-7;
banana.y=Math.round(random(120,200));  
banana.addImage(bananaImage);
banana.scale=0.10;
banana.lifetime=100;
foodGroup.add(banana);  
}  
}

function spawnTree(){
  if (frameCount%90===0){
    tree = createSprite(650,220,40,40);
    tree.velocityX=-7;
    tree.addImage(treeImage);
    tree.lifetime=150;
    tree.scale=0.5;
    tree.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    
    
  }
}