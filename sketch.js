var sol_stand, sol_standImg, lift, liftImg, tnt, tntImg
var sol, solImg, zombie, zombieImg, zombiesGroup, tntGroup
var counter = 0;
var numTnt = 0
var gameState = "play"
var edges

function preload() {
  sol_standImg = loadImage("sol.png")

  sol_walkingImg = loadAnimation("sol2.png", "sol3.png", "sol4.png", "sol5.png");
  zombieImg = loadAnimation("zom1.png", "zom2.png", "zom3.png", "zom4.png")

  liftImg = loadImage("lift.png");
  tntImg = loadImage("TNT.png")
}

function setup() {
  createCanvas(500, 430)
  
  edges = createEdgeSprites();
  sol = createSprite(50, 355, 10, 10)
  sol.addImage("walking", sol_standImg)
  sol.scale = 0.15


  lift = createSprite(100, 410, 100, 10)
  lift.addImage(liftImg)
  lift.scale = 0.25
  lift.debug = false
  lift.setCollider("circle", 0, 0, 40)

  zombiesGroup = new Group();
  tntGroup = new Group();
}

function draw() {
  background("lightblue");

  lift.bounceOff(edges[0])
  lift.bounceOff(edges[1])
  lift.bounceOff(edges[2])
  lift.bounceOff(edges[3])
  
  textSize(20)
  text("TNT :" + numTnt, 400, 50)
   
   if (gameState === "play") {

    if (keyDown("right")) {
      sol.x = sol.x + 5
    }
    if (keyDown("up")) {
      sol.y = sol.y - 5
    }
    if (keyDown("down")) {
      sol.y = sol.y + 5
    }
    if (keyDown("left")) {
      sol.x = sol.x - 5;
    }
    if(keyWentDown("w")){
      lift.velocityY = -3
    }
     if(keyDown("s")){
      lift.velocityY = 3
    }
     if(keyDown("a")){
      lift.velocityX = -3
    }
     if(keyDown("d")){
      lift.velocityX = 3
    }
    spawnTnt();
    spawnZombies();
    if (tntGroup.isTouching(zombiesGroup)) {
      for (var i = 0; i < tntGroup.length; i++) {
        for (var j = 0; j < zombiesGroup.length; j++){
          if (tntGroup[i].x === zombiesGroup[j].x) {
            tntGroup[i].destroy();
            zombiesGroup[j].destroy()
          }
        }
      }
    }
  for (var i = 0; i < tntGroup.length; i++) {
    if (sol.isTouching(tntGroup[i])) {
      numTnt = numTnt + 1
    }
  }
 }

  if (sol.isTouching(zombiesGroup)) {
    gameState = "end";
  }
  else if(gameState === "end"){
        tntGroup.destroyEach()
        zombiesGroup.destroyEach()
        sol.destroy()
        lift.destroy()
        background("black")
        textAlign(CENTER)
        textSize(20)
        text("Game Over", 250, 200)
        text("Press R to restart",250,250)
  }
  
  sol.collide(lift)
   drawSprites();
}

function spawnTnt() {
  if (frameCount % 100 === 0) {
    counter = frameCount
    tnt = createSprite(random(0, 500), random(0, 400), 10, 10);
    //tnt.velocityX = 4

    tnt.addImage(tntImg)
    tnt.scale = 0.25
    tntGroup.add(tnt)
  }
  if (counter + 50 === frameCount) {
    tntGroup.destroyEach();
  }
}

function spawnZombies() {
  if (frameCount % 100 === 0) {
    zombie = createSprite(400, random(50, 430), 10, 10);
    zombie.addAnimation("zombie_walk", zombieImg)
    zombie.velocityX = -4
    zombiesGroup.add(zombie)
  }

}