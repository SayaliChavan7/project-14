var PLAY=1;
var END=0;
var gameState;
var gameoverImage;
var sword,swordImage;
var monsterImage;
var fruit1,fruit2,fruit3,fruit4,fruitImage1,fruitImage2,fruitImage3,fruitImage4;

var score;

function preload(){
  swordImage = loadImage("sword.png")
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruitImage1 = loadImage("fruit1.png")
  fruitImage2 = loadImage("fruit2.png")
  fruitImage3 = loadImage("fruit3.png")
  fruitImage4 = loadImage("fruit4.png")
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
 knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
 
}

function setup(){
  createCanvas(600,600)
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7
  
  sword.setCollider("rectangle",0,0,40,40);
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
 score=0
  
  gameState=PLAY
  
  gameOver= createSprite(200,180);
    gameOver.addImage(gameOverImage);
    gameOver.scale=0.9
        
       
  
 
}

function draw(){
  
  background("lightblue")
  text("Score: "+ score, 300,50);
  
  
    
  if(gameState===PLAY){
    knifeSwooshSound.play()
   gameOver.visible=false
    fruits();
    Enemy(); 
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score=score+2;
       
    
    }
    
    else
    {
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        gameOverSound.play()
        gameOver.visible=true
        gameOverSound.play()
        
      }
    }
     if (gameState===END)  {
       
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
      
    
  } 
  drawSprites();
}
}

function Enemy(){
  if(World.frameCount % 200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(10+8*score/100);
    monster.setlifetime=50;
    
    enemyGroup.add(monster);
  }
}
 
   
function fruits(){
  if(World.frameCount%80===0){
  fruit=createSprite(400,200,20,20)
  fruit.scale=0.2;
  //fruit.debug=true;
  r=Math.round(random(1,4));
  if (r == 1){
    fruit.addImage(fruitImage1);
  }else if (r == 2){
     fruit.addImage(fruitImage2);
  }else if (r == 3){
     fruit.addImage(fruitImage3);
  }else {
     fruit.addImage(fruitImage4);
    }
  fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-(10+3*score/100);
    fruit.setlifetime=100;
    
    fruitGroup.add(fruit);
    
  }
}
