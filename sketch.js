var floorPos_y;
var gameChar_x;
var gameChar_y;
var scrollPos;

var clouds;
var sun;
var mountains;
var bush;
var senbonnTori;
var canyon;
var leaves;
var coin;
var mountainTerrain;
var trees;
var token;
var platform;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var game_score;
var flagpole;
var lives;
var winSoundPlayed;
var gameOverSoundPlayed;

function preload(){
	soundFormats('mp3', 'wav'); //audio files
	nuku1 = loadFont('assets/nuku1.ttf') //font for text purposes

	//load sounds here
	sounds = {backsound: loadSound('assets/Where I be.mp3'),
              jumpSound: loadSound('assets/Jump Up!.mp3'),
			  fallingSound: loadSound('assets/Whistle.wav'),
			  dieSound: loadSound('assets/Ough.mp3'),
			  winSound: loadSound('assets/Victory.mp3'),
			  collectSound: loadSound('assets/Money.mp3'),
			  gameOverSound: loadSound('assets/Lose.wav')}
	//set volumes
	sounds.backsound.setVolume(0.2);
	sounds.jumpSound.setVolume(0.1);
	sounds.fallingSound.setVolume(0.1);
	sounds.dieSound.setVolume(0.1);
	sounds.winSound.setVolume(0.1);
	sounds.collectSound.setVolume(0.1);
	sounds.gameOverSound.setVolume(0.1);
}

function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
	lives = 4;
	startGame();
	sounds.backsound.loop();
}

function startGame(){
	gameChar_x = width/4;
    gameChar_y = floorPos_y;
	scrollPos = 0;

	//game variables
	sun = {x: 830,
		   y: 74};

	clouds = [{x: 200, y: 65, width: 130, height: 45, curve: 15, curveOne: 10, curveTwo: 15, curveThree: 10},
		{x: 720, y: 85, width: 120, height: 45, curve: 15, curveOne: 10, curveTwo: 15, curveThree: 10},
		{x: 370, y: 105, width: 137, height: 51, curve: 15, curveOne: 10, curveTwo: 15, curveThree: 10},
		{x: 592, y: 25, width: 122, height: 40, curve: 15, curveOne: 10, curveTwo: 15, curveThree: 10},
		{x: 0, y: 15, width: 115, height: 43, curve: 15, curveOne: 10, curveTwo: 15, curveThree: 10}];

	coin = [{x: 540, y: 363, width: 18, height: 18, isFound: false},
		{x: 650, y: 423, width: 18, height: 18, isFound: false},
		{x: 1245, y: 373, width: 18, height: 18, isFound: false},
		{x: 1890, y: 423, width: 18, height: 18, isFound: false},
		{x: 2175, y: 363, width: 18, height: 18, isFound: false},
		{x: 2225, y: 343, width: 18, height: 18, isFound: false},
		{x: 2275, y: 323, width: 18, height: 18, isFound: false},
		{x: 2325, y: 343, width: 18, height: 18, isFound: false},
		{x: 2375, y: 363, width: 18, height: 18, isFound: false},
		{x: 2740, y: 383, width: 18, height: 18, isFound: false}];

	mountains = [{x: 285, y: 435, height: 90},
		{x: 1280, y: 435, height: 90},
		{x: 2280, y: 435, height: 90},
	    {x: 3500, y: 435, height: 90}];
	
	bush = {x: [0, 380, 760, 1140, 1520, 1900, 2280, 2660, 3040, 3420, 3800],
			y: 435,
			secPointX: [100, 480, 860, 1240, 1620, 2000, 2380, 2760, 3140, 3520, 3900],
			secPointY: 400,
			thirdPointX: [165, 545, 925, 1305, 1685, 2065, 2445, 2845, 3205, 3585, 3965],
			thirdPointY: 415,
			quadPointX: [215, 595, 975, 1355, 1735, 2115, 2495, 2895, 3255, 3635, 4015],
			quadPointY: 400,
			penPointX: [275, 655, 1035, 1415, 1795, 2175, 2555, 2955, 3315, 3695, 4075], 
			penPointY: 395,
			endPointX: [380, 760, 1140, 1520, 1900, 2280, 2660, 3040, 3420, 3800, 4180],
			endPointY: 435}
	
	 canyon = [ 
		{x: -450, y: 435},
		{x: -400, y: 435},
		{x: -350, y: 435},
		{x: -300, y: 435},
		{x: -250, y: 435},
		{x: -200, y: 435},
		{x: -150, y: 435},
		{x: -100, y: 435},
		{x: 500, y: 435}, 
		{x: 755, y: 435}, 
		{x: 925, y: 435}, 
		{x: 955, y: 435},
		{x: 1100, y: 435}, 
		{x: 1250, y: 435}, 
		{x: 1300, y: 435},
		{x: 1490, y: 435},
		{x: 1750, y: 435},
		{x: 2150, y: 435},
		{x: 2200, y: 435},
		{x: 2250, y: 435},
		{x: 2300, y: 435},
		{x: 2700, y: 435}];
	
	mountainTerrain = [{x:0, y: 433}, 
		{x: 920, y: 433},
		{x: 1840, y: 433},
		{x: 2780, y: 433}];
	
	senbonnTori = {x: [185, 985, 1485, 1785, 3185],
					y: 290, 
					width: 15, 
					height: 145,
					verticalX: [160, 960, 1460, 1760, 3160],
					verticalY: 312,
					verticalWidth: 162,
					verticalHeight: 15,
					trianglePointX: [200, 1000, 1500, 1800, 3200],
					trianglePointY: 280,
					triangleTwoX: [120, 920, 1420, 1720, 3120],
					triangleTwoY: 240,
					triangleThreeX: [155, 955, 1455, 1755, 3155],
					triangleThreeY: 284,
					InverseTriangleX: [286,  1086, 1586, 1886, 3286],
					InverseTriangleTwoX: [360, 1160, 1660, 1960, 3360],
					InverseTriangleThreeX: [327, 1127, 1627, 1927, 3327],
					rectX: [238, 1038, 1538, 1838, 3238],
					rectY: 288};
	
	trees = [{x: 50, y: 435}, 
			 {x: 400, y: 435}, 
			 {x: 455, y: 435}, 
			 {x: 700, y: 435}, 
			 {x: 850, y: 435}, 
			 {x: 900, y: 435}, 
			 {x: 1100, y: 435}, 
			 {x: 1230, y: 435}, 
			 {x: 1390, y: 435}, 
			 {x: 1480, y: 435}, 
			 {x: 2100, y: 435},
	         {x: 2440, y: 435}, 
			 {x: 2690, y: 435}, 
			 {x: 2800, y: 435},
			 {x: 3100, y: 435},
			 {x: 3340, y: 435},
			 {x: 3700, y: 435},
			 {x: 4000, y: 435}];
	
	leaves = {x:423, y:389}

	token = [{x: 50, y: 65}, {x: 80, y: 65}, {x: 110, y: 65}, {x: 140, y: 65}]

	flagpole = {x: 3000, y: 435, isReached: false}

	//initialize game mechanics 
	game_score = 0;
	winSoundPlayed = false;
    gameOverSoundPlayed = false;
	
	//initial movement 
	isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

	lives -= 1;

	platform = [];
	platform.push(createPlatforms(490,floorPos_y - 60, 85));
	platform.push(createPlatforms(1220, floorPos_y - 50, 55));
	platform.push(createPlatforms(2150, floorPos_y - 60, 50));
	platform.push(createPlatforms(2200, floorPos_y - 80, 50));
	platform.push(createPlatforms(2250, floorPos_y - 100, 50));
	platform.push(createPlatforms(2300, floorPos_y - 80, 50));
	platform.push(createPlatforms(2350, floorPos_y - 60, 50));
	platform.push(createPlatforms(2720, floorPos_y - 40, 60));

	enemies = [];
	enemies.push(new Enemy(500, floorPos_y - 62, 60));
	enemies.push(new Enemy(590, floorPos_y, 130));
    enemies.push(new Enemy(1180, floorPos_y, 50));
	enemies.push(new Enemy(1580, floorPos_y, 130))
    enemies.push(new Enemy(2400, floorPos_y, 290));
    enemies.push(new Enemy(2780, floorPos_y, 150));
	enemies.push(new Enemy(2800, floorPos_y, 50));
}

function draw()
{
	scrollPos = gameChar_x - width/4
	background(173, 216, 230); //fill the sky blue
    noStroke();

	//the land
	noStroke();
	fill(117, 179, 157); 
	rect(0, 435, width, 144);
	fill(201, 185, 139); 
	rect(0, 435, width, 40);

	push();
		translate(-scrollPos, 0);
		//draw game environment (sun, clouds, bush, etc.)
		push();
			translate(scrollPos, 0)
			fill('#FAB612')
			ellipse(sun.x, sun.y, 80, 80);
			fill("#DF1905")
			ellipse(sun.x, sun.y, 70, 70);
		pop();
		drawClouds();
		drawMountains();
		drawMountainTerrain();
		drawKyotoShrine();
		drawBush();
		drawTrees();

		for(var i = 0; i < platform.length; i++){
			platform[i].draw();
		}
	
		for(var i = 0; i < canyon.length; i++){
			drawCanyon(canyon[i]);
			checkCanyon(canyon[i]);
		}

		for(var i = 0; i < coin.length; i++){
			drawCollectibles(coin[i]);
			checkCollectible(coin[i]);
		}

		checkFlagPole();
		renderFlagPole();
		
		for(var i = 0; i < enemies.length; i++){
			enemies[i].draw();

			var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
			if(isContact){
				sounds.dieSound.play();
				if(lives > 0){
					startGame();
					break;
				}
			}
		}
		noStroke();
	
		//drawing game character
		drawGameChar();
	pop();

	//drawing the game elements
	push();
		fill(76);
		stroke(255, 129, 23);
		textAlign(LEFT, LEFT)
		textFont('nuku1');
		textSize(25);
		text("Score: " + game_score, 40, 40);
	pop();

	for(var i = 0; i < lives; i++){
		drawToken(token[i]);
    }

	//initializing game conditions
	if(gameChar_y > 576 && lives > 0)
	{
		startGame();
	}

	//conditions for winning or game over
	if(lives < 1 && !gameOverSoundPlayed){
		sounds.backsound.stop();
		sounds.gameOverSound.play();
		gameOverSoundPlayed = true;
	}
	if(lives < 1)
	{
		sounds.backsound.stop();
		push();
        textFont(nuku1);
        textSize(80);
		fill('#621B21');
        textStyle(BOLD);
        textAlign(CENTER);
        text("Game Over!", width/2, height/2);
        textStyle(NORMAL);
        textSize(20);
        text("Never give up by pressing SPACE", width/2, height/2 + 35)
        textAlign(LEFT);
        pop();
		return;
	}
	if(flagpole.isReached == true && !winSoundPlayed){

		sounds.backsound.stop();
		sounds.winSound.play();
		winSoundPlayed = true;
	}
	if(flagpole.isReached == true){
		push();
        textFont(nuku1);
        textSize(80);
		fill('#621B21')
        textStyle(BOLD);
        textAlign(CENTER);
        text("Congratulations!", width/2, height/2);
        textStyle(NORMAL);
        textSize(20);
        text("Final Score: " + game_score + "." + " Press SPACE to restart", width/2, height/2 + 35)
        textAlign(LEFT);
        pop();
		return;
	}

	//Interaction Code
	if(flagpole.isReached == true){
		isLeft = false;
		isRight = false;
		isFalling = false;
		isPlummeting = false;
	}
	if(isLeft == true)
	{
		gameChar_x -= 2;
	}

	if(isRight == true)
	{
		gameChar_x += 2;
	}
	if(gameChar_y < floorPos_y)
	{
		var isContact = false;
		for(var i = 0; i < platform.length; i++){
			if(platform[i].checkContact(gameChar_x, gameChar_y) == true){
				isContact = true;
				break;
			}
		}
			if(isContact == false){
				isFalling = true;
			}
			else 
			{
			isFalling = false;
			}
    }else
	{
		isFalling = false;
	}

	if(isFalling || isPlummeting){
		if(isPlummeting){
			gameChar_y += 5;

			sounds.fallingSound.play();
		}else{
			gameChar_y += 1.5;
		}
	}
}

function keyPressed(){
// When the key is pressed.
if(keyCode == 32 && (lives < 1 || flagpole.isReached == true)){
	flagpole.isReached = false;
	setup();	
}
if((keyCode == 37 || keyCode == 65) && isPlummeting == false)
{
	if(flagpole.isReached == true)
	{
		return;
	}
	if(lives < 1)
	{
		return;
	}
	
	isLeft = true;
	isFalling = true;
}
if((keyCode == 39 || keyCode == 68) && isPlummeting == false)
{
	if(flagpole.isReached == true)
	{
		return;
	}
	if(lives < 1)
	{
		return;
	}
	
	isRight = true;
	isFalling = true;
}
if((keyCode == 38 || keyCode == 87 || keyCode == 32) && isFalling == false && isPlummeting == false)
{
	if(flagpole.isReached == true )
	{
		return false;
	}
	if(lives < 1)
	{
		return;
	}
	
	isFalling = true;
	sounds.jumpSound.play();
	gameChar_y = gameChar_y - 80
}
}


function keyReleased(){
// When the key is released.
if(keyCode == 37 || keyCode == 65){
	isLeft = false;
}
else if(keyCode == 39 || keyCode == 68){
	isRight = false;
}
}

function drawClouds(){
	cloudsPosition();
	for(var i = 0; i < clouds.length; i++){
		fill(255);
		rect(clouds[i].x, clouds[i].y, clouds[i].width, clouds[i].height, clouds[i].curve, clouds[i].curveOne, clouds[i].curveTwo, clouds[i].curveThree); 
	}
}

function cloudsPosition(){
	for(var i = 0; i < clouds.length; i++){
		clouds[i].x += 1
		if(clouds[i].x > scrollPos + width){
			clouds[i].x = scrollPos - 80
		}	
	}
}

function drawMountains(){
	for(var i = 0; i < mountains.length; i++){
	fill(148, 174, 212);
	beginShape();
	curveVertex(mountains[i].x, mountains[i].y);
	curveVertex(mountains[i].x, mountains[i].y);
	curveVertex(mountains[i].x + 382, mountains[i].height);
	curveVertex(mountains[i].x + 739, mountains[i].y);
	curveVertex(mountains[i].x + 739, mountains[i].y);
	endShape();
	}
}

function drawTrees(){
	// leaves
	for (var i = 0; i < trees.length; i++) {
	fill("#FFAAC8")
	ellipse(trees[i].x - 10, leaves.y, 35, 35);
	ellipse(trees[i].x - 13 - 10 , leaves.y - 20, 35, 35);
	ellipse(trees[i].x - 3  -10, leaves.y - 43, 35, 35);
	ellipse(trees[i].x + 10 -10, leaves.y - 20, 35, 35);
	ellipse(trees[i].x + 18 - 10, leaves.y - 49, 35, 35);
	ellipse(trees[i].x + 38 - 10, leaves.y - 38, 35, 35);
	ellipse(trees[i].x + 40 - 10, leaves.y - 15, 35, 35);
	ellipse(trees[i].x + 27 - 10, leaves.y, 35, 35);

	// tree
	fill("#901f3b");
	beginShape();
	vertex(trees[i].x + 0, trees[i].y);
	vertex(trees[i].x + 0, trees[i].y - 45);
	vertex(trees[i].x - 25 + 0, trees[i].y - 60);
	vertex(trees[i].x - 20 + 0, trees[i].y - 60);
	vertex(trees[i].x + 0, trees[i].y - 50);
	vertex(trees[i].x + 0, trees[i].y - 70);
	vertex(trees[i].x + 5 + 0, trees[i].y - 80);
	vertex(trees[i].x + 5 + 0, trees[i].y - 65);
	vertex(trees[i].x + 15 + 0, trees[i].y - 75);
	vertex(trees[i].x + 20 + 0, trees[i].y - 75);
	vertex(trees[i].x + 5 + 0, trees[i].y - 60);
	vertex(trees[i].x + 5 + 0, trees[i].y);
	endShape();
	}
}

function drawCollectibles(t_coin){
	if (!t_coin.isFound) {
		fill("yellow");
		stroke(0);
		ellipse(t_coin.x, t_coin.y - 2, t_coin.width, t_coin.height);
		ellipse(t_coin.x, t_coin.y - 2, t_coin.width/2, t_coin.height/2);
		line(t_coin.x, t_coin.y - 4, t_coin.x, t_coin.y);
	}
}

function checkCollectible(t_coin){
	if(!t_coin.isFound && dist(gameChar_x, gameChar_y, t_coin.x, t_coin.y) < 15){
		t_coin.isFound = true;
		game_score += 100;
	}	
}

function drawCanyon(t_canyon){
	fill("#82584E");
	beginShape();
		vertex(t_canyon.x, t_canyon.y);
		vertex(t_canyon.x - 20, t_canyon.y + 20);
		vertex(t_canyon.x - 25, t_canyon.y + 65);
		vertex(t_canyon.x - 20	, t_canyon.y + 140);
		vertex(t_canyon.x, t_canyon.y + 140);
		vertex(t_canyon.x + 80, t_canyon.y + 140);
		vertex(t_canyon.x + 85, t_canyon.y + 65);
		vertex(t_canyon.x + 80, t_canyon.y + 20);
		vertex(t_canyon.x + 60, t_canyon.y);
		endShape();
}

function checkCanyon(t_canyon){
	if((gameChar_x > t_canyon.x && gameChar_x < t_canyon.x + 60) && gameChar_y >= floorPos_y)
	{
		isPlummeting = true;
		isLeft = false;
		isRight= false;
	}
}

function drawBush(){
	for(var i = 0; i < bush.x.length; i++){
		fill("#4F7942")
		beginShape();
		curveVertex(bush.x[i], bush.y);
		curveVertex(bush.x[i], bush.y);
		curveVertex(bush.secPointX[i], bush.secPointY);
		curveVertex(bush.thirdPointX[i], bush.thirdPointY);
		curveVertex(bush.quadPointX[i], bush.quadPointY);
		curveVertex(bush.penPointX[i], bush.penPointY);
		curveVertex(bush.endPointX[i], bush.endPointY);
		curveVertex(bush.endPointX[i], bush.endPointY);
		endShape();
	}
}

function drawMountainTerrain(){
	for(var i = 0; i < mountainTerrain.length; i++){
		fill("#FADFFF")
		beginShape();
		curveVertex(mountainTerrain[i].x, mountainTerrain[i].y );
		curveVertex(mountainTerrain[i].x, mountainTerrain[i].y );
		curveVertex(mountainTerrain[i].x + 122, mountainTerrain[i].y - 128);
		curveVertex(mountainTerrain[i].x + 310, mountainTerrain[i].y - 88);
		curveVertex(mountainTerrain[i].x + 445, mountainTerrain[i].y - 113);
		curveVertex(mountainTerrain[i].x + 605, mountainTerrain[i].y - 78);
		curveVertex(mountainTerrain[i].x + 740, mountainTerrain[i].y - 118);
		curveVertex(mountainTerrain[i].x + 855, mountainTerrain[i].y - 73);
		curveVertex(mountainTerrain[i].x + 980, mountainTerrain[i].y - 83);
		curveVertex(mountainTerrain[i].x + 1024, mountainTerrain[i].y);
		curveVertex(mountainTerrain[i].x + 1024, mountainTerrain[i].y);
		endShape();
	}
}

function drawKyotoShrine(){
	for(var i = 0; i < senbonnTori.x.length; i++){
		fill("#d3462e")
			rect(senbonnTori.x[i], senbonnTori.y, senbonnTori.width, senbonnTori.height);
			fill("#b13421")  
			rect(senbonnTori.x[i], senbonnTori.y, 6, senbonnTori.height);
			fill("#d3462e")
			rect(senbonnTori.x[i] + 100, senbonnTori.y, senbonnTori.width, senbonnTori.height);
			fill("#b13421")
			rect(senbonnTori.x[i] + 100, senbonnTori.y, 6, senbonnTori.height);
			fill("#d3462e")
			rect(senbonnTori.verticalX[i], senbonnTori.verticalY, senbonnTori.verticalWidth, senbonnTori.verticalHeight);
			fill("#b13421")
			rect(senbonnTori.verticalX[i], senbonnTori.verticalY + 11, senbonnTori.verticalWidth, 3);
			fill("#d3462e")
			rect(senbonnTori.verticalX[i], senbonnTori.verticalY - 35, senbonnTori.verticalWidth, senbonnTori.verticalHeight);

			//theroof
			fill("#4d4b45")                                 
			rect(senbonnTori.rectX[i], senbonnTori.rectY, 15, 15);
			rect(senbonnTori.verticalX[i], senbonnTori.verticalY - 45, senbonnTori.verticalWidth, senbonnTori.verticalHeight);
			triangle(senbonnTori.trianglePointX[i], senbonnTori.trianglePointY, senbonnTori.triangleTwoX[i], senbonnTori.triangleTwoY, senbonnTori.triangleThreeX[i], senbonnTori.triangleThreeY);
			triangle(senbonnTori.InverseTriangleX[i], senbonnTori.trianglePointY, senbonnTori.InverseTriangleTwoX[i], senbonnTori.triangleTwoY, senbonnTori.InverseTriangleThreeX[i], senbonnTori.triangleThreeY);
	}
}

function drawGameChar(){
if(isLeft && isFalling){
//Jump-left
push();
	translate(gameChar_x, gameChar_y);
	scale(-1, 1)
	
	fill(178, 200, 186);
	ellipse(0 - 6, 0 - 2,4,5);
	ellipse(0 + 6, 0 - 2,4,5);

	//face
	fill(210, 227, 200);
	ellipse(0, 0 - 9, 17, 17);

	//hands
	fill(178, 200, 186);
	ellipse(0 - 4, 0 - 8, 8, 4);

	//eyes
	fill(169, 92, 104);
	ellipse(0 + 6, 0 - 11, 3, 6);

	//hat
	fill("#DAC388");
	triangle(0, 0 - 28, 0 - 20, 0 -11, 0 + 20, 0 -11)
pop();
}
else if(isRight && isFalling)
{
//Jump Right
push();
	fill(178, 200, 186);
	ellipse(gameChar_x - 6, gameChar_y - 2,4,5);
	ellipse(gameChar_x + 6, gameChar_y - 2,4,5);
	
	//face
	fill(210, 227, 200);
	ellipse(gameChar_x, gameChar_y - 9, 17, 17);

	//hands
	fill(178, 200, 186);
	ellipse(gameChar_x - 4, gameChar_y - 8, 8, 4);

	//eyes
	fill(169, 92, 104);
	ellipse(gameChar_x + 6, gameChar_y - 11, 3, 6);

	//hat
	fill("#DAC388");
	triangle(gameChar_x, gameChar_y - 28, gameChar_x - 20, gameChar_y -11, gameChar_x + 20, gameChar_y -11);
pop();
}
else if(isLeft)
{	
//Walk left
push();
	translate(gameChar_x, gameChar_y);
	scale(-1,1);

	//anchor point (feet)
	fill(178, 200, 186);
	ellipse(0, 0,8,4);

	//face
	fill(210, 227, 200);
	ellipse(0, 0 - 9, 17, 17);

	//hands
	fill(178, 200, 186);
	ellipse(0 - 2, 0 - 7, 4, 8);

	//eyes
	fill(169, 92, 104);
	ellipse(0 + 6, 0 - 11, 3, 6);

	//hat
	fill("#DAC388");
	triangle(0 - 7, 0, 0 - 7, 0 - 27, 0 - 18, 0 - 14);

	//fire
	fill(156, 41, 0);
	beginShape();
	curveVertex(0 - 7, 0 - 17);
	curveVertex(0 - 7, 0 - 17);
	curveVertex(0, 0 - 20);
	curveVertex(0 + 6, 0 - 17);
	curveVertex(0 + 6, 0 - 17);
	endShape();
pop();
}
else if(isRight)
{
	//Walk Right
	fill(178, 200, 186);
	ellipse(gameChar_x, gameChar_y, 8, 4);

	//face
	fill(210, 227, 200);
	ellipse(gameChar_x, gameChar_y - 9, 17, 17);

	//hands
	fill(178, 200, 186);
	ellipse(gameChar_x - 2, gameChar_y - 7, 4, 8);

	//eyes
	fill(169, 92, 104);
	ellipse(gameChar_x + 6, gameChar_y - 11, 3, 6);
	
	//hat
	fill("#DAC388");
	triangle(gameChar_x - 7, gameChar_y, gameChar_x - 7, gameChar_y - 27, gameChar_x - 18, gameChar_y - 14);

	//fire
	fill(156, 41, 0);
	beginShape();
	curveVertex(gameChar_x - 7, gameChar_y - 17);
	curveVertex(gameChar_x - 7, gameChar_y - 17);
	curveVertex(gameChar_x, gameChar_y - 20);
	curveVertex(gameChar_x + 6, gameChar_y - 17);
	curveVertex(gameChar_x + 6, gameChar_y - 17);
	endShape();
}
else if(isFalling || isPlummeting)
{
	//Face front
	fill(178, 200, 186);
	ellipse(gameChar_x, gameChar_y, 3, 3)
	
	//feet
	fill(178, 200, 186);
	ellipse(gameChar_x - 5, gameChar_y, 4, 6);
	ellipse(gameChar_x + 5, gameChar_y, 4, 6);
	ellipse(gameChar_x - 10, gameChar_y - 8, 7, 3);
	ellipse(gameChar_x + 10, gameChar_y - 8, 7, 3);

	//face
	fill(210, 227, 200);
	ellipse(gameChar_x, gameChar_y - 9, 17, 17);

	//eyes
	fill(169, 92, 104);
	ellipse(gameChar_x - 3, gameChar_y - 9, 3, 6);
	ellipse(gameChar_x + 3, gameChar_y - 9, 3, 6);

	//hat
	fill("#DAC388");
	triangle(gameChar_x, gameChar_y - 28, gameChar_x - 21, gameChar_y - 15, gameChar_x + 19, gameChar_y - 15);
}
else
{
	//standing face front
	//hands and feet
	fill(178, 200, 186);
	ellipse(gameChar_x - 5, gameChar_y, 8, 4);
	ellipse(gameChar_x + 5, gameChar_y, 8, 4);
	ellipse(gameChar_x - 9, gameChar_y - 7, 4, 8);
	ellipse(gameChar_x + 9, gameChar_y - 7, 4, 8);

	//face
	fill(210, 227, 200);
	ellipse(gameChar_x, gameChar_y - 9, 17, 17);

	//hat
	fill("#DAC388");
	triangle(gameChar_x, gameChar_y - 28, gameChar_x - 20, gameChar_y-15, gameChar_x + 23, gameChar_y - 15);

	//eyes
	fill(169, 92, 104);
	ellipse(gameChar_x - 3, gameChar_y - 9, 3, 6);
	ellipse(gameChar_x + 3, gameChar_y - 9, 3, 6);
}
}

function renderFlagPole(){
	fill(0);
	strokeWeight(6);
	stroke(255, 0, 0);
	line(flagpole.x, floorPos_y, flagpole.x, floorPos_y - 250)

	// console.log ("hi")
	noStroke();
	if(flagpole.isReached == true){
		fill(255);
		rect(flagpole.x, floorPos_y - 250, 100, 50);
		fill('red');
		ellipse(flagpole.x + 50, floorPos_y - 225, 25, 25);
		console.log ("hiiiii")
	}
	else
	{
		fill(255);
		rect(flagpole.x, floorPos_y - 50, 100, 50);
		fill('red');
		ellipse(flagpole.x + 50, floorPos_y - 25, 25, 25);
		// console.log ("yoooooo")
	}

	
}

function checkFlagPole(){
	if(gameChar_x >= flagpole.x && !flagpole.isReached){
		flagpole.isReached = true;
		game_score += 500
	}
}

function drawToken(t_token){
	fill(210, 227, 200);
	ellipse(t_token.x, t_token.y, 25, 25);
	//eyes
	fill(169, 92, 104);
	ellipse(t_token.x - 5, t_token.y , 4, 7);
	ellipse(t_token.x + 5, t_token.y , 4, 7);
}

function createPlatforms(x, y, length){
	var p = {
		x: x,
		y: y,
		length: length,
		draw: function(){
			fill(111,67,99);
			rect(this.x, this.y, this.length, 10);
		},
		checkContact: function(gc_x, gc_y){
			if(gc_x > this.x && gc_x < this.x + this.length){
				var d = this.y - gc_y;
				if(d >= 0 && d < 5){
					return true;
				}
			}
			return false;
		}
	}
	return p;
}

function Enemy(x, y, range){
	this.x = x;
	this.y = y;
	this.range = range;

	this.currentX = x;
	this.inc = 1;

	this.update = function()
	{
		this.currentX += this.inc;

		if(this.currentX >= this.x + this.range)
		{
			this.inc = -1;
		}
		else if(this.currentX < this.x)
		{
			this.inc = 1;
		}
	}
	this.draw = function()
	{
		this.update();
		fill(255, 0, 0);
		fill(128);
		ellipse(this.currentX - 5, this.y, 8, 4);
		ellipse(this.currentX + 5, this.y, 8, 4);
		ellipse(this.currentX - 9, this.y - 7, 4, 8);
		ellipse(this.currentX + 9, this.y - 7, 4, 8);

		//face
		fill(109, 11,11);
		ellipse(this.currentX, this.y - 9, 20, 20);

		//eyes
		fill('#add8e6');
		beginShape();
		vertex(this.currentX, this.y - 19);
		vertex(this.currentX - 10, this.y - 10);
		vertex(this.currentX, this.y);
		vertex(this.currentX + 10, this.y - 10);
		endShape();
		fill(0);
		ellipse(this.currentX, this.y - 10, 10, 10);
		fill(255);
		ellipse(this.currentX, this.y - 10, 5, 5);
		fill('#FC46AA');
		ellipse(this.currentX, this.y - 10, 2,2);
	} 
	
	this.checkContact = function(gc_x, gc_y){
		var d = dist(gc_x, gc_y, this.currentX, this.y);

		if(d < 22){
			return true;
		}
		return false;
	}
}