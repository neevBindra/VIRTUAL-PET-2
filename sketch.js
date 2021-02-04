var dog,sadDog,happyDog;
var database , foodObj, foodS,foodStock ;

foods = 0
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  var feed = createButton ("FEED DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  var addFood = createButton("ADD FOOD")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  

}

function draw() {
  background(46,139,87);
  drawSprites();
  foodObj.display();
}

//function to read food Stock
function readStock(data){
foodS = data.val();
foodObj.update(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<= 0){ foodObj.update(foodObj.getFoodStock()*0); }
  else{ foodObj.update(foodObj.getFoodStock()-1);
   }
   dog.x = 420;
}

//function to add food in stock
function addFoods(){
  foodS++
  console.log("fd val" + foods)
  dog.x = 800;
  database.ref('/').update({
    Food:foodS
  })
}

