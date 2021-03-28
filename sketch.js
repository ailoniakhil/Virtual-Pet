var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  feedthedog = createButton("feed the dog")
  feedthedog.position(500,450);
  feedthedog.mousePressed(feedDogs);
}

function draw() {
  background(46,139,87);
  foodObj.display();
  fedtime = database.ref('Feedtime');
  fedtime.on("value",function(data){
    lastFed = data.val();
    if (lastFed>=12){
      text("LastFed : "+ lastFed%12+" PM",351,30)
    }else if(lastFed==0){
      text("LastFed : 12 AM", 350,50);

    }else {
      text("LastFed : "+ lastFed+" AM",351,30)
    }
  })
  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDogs(){
  dog.addImage(happyDog);
  var foodStockvalue = foodObj.getFoodStock();
  if (foodStockvalue <= 0){
    foodObj.updateFoodStock(foodStockvalue * 0)
  } 
  else {
    foodObj.updateFoodStock(foodStockvalue - 1)
  }
  //write code here to update food stock and last fed time
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    Feedtime: hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
