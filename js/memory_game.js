// memory_game.js

var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];  // 24 elements, content hidden under each tile
var memory_values = [];    
var memory_tile_ids = [];   
var tiles_flipped = 0;     // Holds # of matched tile pairs

//alert(memory_array);  // TEST
Array.prototype.memory_tile_shuffle = function(){  
	var i = this.length, j, temp;
	while(--i > 0){
		j = Math.floor(Math.random() * (i+1));
		temp = this[j];
		this[j] = this[i];
		this[i] = temp;
	}
	//alert("in Array.prototype.memory_tile_shuffle"); // TEST
}

function flipCard(elfront,elback){  //el=element; function flips card front to back
	//alert('flipCard: ' + elfront + ' , ' + elback);
	
	var elemFront = document.getElementById(elfront);
	var elemBack = document.getElementById(elback);
	var parseCardNum = elback.substring(5);   // parse out trailing card number of 0 thru 23 from the id="back_..."
	//alert(parseCardNum);
	var cardNum = parseInt(parseCardNum, 10);  // convert card number from string to int
	//var cardValue = elemBack.innerHTML;
	//alert(elback);
	//alert(cardNum);
	console.log("in flipCard(): memory_values.length = " + memory_values.length);
	if (memory_values.length < 2) {
	    elemBack.innerHTML = memory_array[cardNum];
	    cardValue = memory_array[cardNum];	
	    elemFront.style.transition = "transform .5s linear 0s"; 
	    elemBack.style.transition = "transform .5s linear 0s"; 
	    elemFront.style.transform = "perspective( 600px ) rotateY( -180deg )"; 
	    elemBack.style.transform = "perspective( 600px ) rotateY( 0deg )"; 
	}
	checkCardMatch(elback, cardValue);
}
function flipCardBack(elfront,elback){  //function flips card back to front
	//alert('flipCardBack: ' + elfront + ' , ' + elback);
	
	var elemFront = document.getElementById(elfront);
	var elemBack = document.getElementById(elback);
	var parseCardNum = elback.substring(5);
	var cardNum = parseInt(parseCardNum,10);
	
	elemBack.innerHTML = memory_array[cardNum];
		
	elemFront.style.transition = "transform .5s linear 0s"; 
	elemBack.style.transition = "transform .5s linear 0s"; 
	elemFront.style.transform = "perspective( 600px ) rotateY( 0deg )"; 
	elemBack.style.transform = "perspective( 600px ) rotateY( 180deg )"; 
		
}

function delay(time) {
    var total = 0;
    for (var i = 0; i < 10000000; i++) {
	    total = time * (total + i);       
	}
	//alert("in delay()");
}

function displayWin() {

    //winner.style.display.none;
	console.log("in displayWin()");
	document.getElementById("winner_container").className = "show";
}

function hideWin() {
     console.log("in hideWin()");
     document.getElementById("winner_container").className = "hide";
}

function newBoard(){
    console.log("in newboard()");
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div class="cards"><div id="back_'+i+'" ></div><div id="front_'+i+'" onclick="flipCard(\'front_'+i+'\',\'back_'+i+'\');"></div></div>';
        //document.getElementById()		
	}
	    
	document.getElementById('memory_board').innerHTML = output;
	//alert(output);
	//alert(memory_array);
}

function checkCardMatch(tileB,val){
    delay(10);
	//alert("in checkCardMatch()"); // TEST
	//alert(tileB + ' , ' + val);
	var tileId = document.getElementById(tileB);
	//flipCard(tileF,tileB);
	//alert("memory_values.length = " + memory_values.length);
	if(memory_values.length < 2){
		//tileB.style.background = '#FFF';
		//tileB.innerHTML = val;
		//alert("in memoryFlipTile() 2"); // TEST
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tileB);
			//alert("memory_values.length = " + memory_values.length);  //TEST
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tileB);
			console.log("memory_values[0] = " + memory_values[0]);
			console.log("memory_values[1] = " + memory_values[1]);
			//alert("tiles_flipped = " + tiles_flipped);  // TEST
			console.log("memory_values.length = " + memory_values.length);  //TEST
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
				memory_tile_ids = [];
				console.log("after erase memory_values.length = " + memory_values.length);
				console.log("after erase memory_tile_ids.length = " + memory_tile_ids.length);
				console.log("tiles_flipped = " + tiles_flipped); 
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
				    delay(1000);
					setTimeout(displayWin, 1000);
					//alert("CONGRATULATIONS!");
					setTimeout(hideWin, 20000);
					//document.getElementById('memory_board').innerHTML = "";
					setTimeout(newBoard, 21500);
				}
			} else {
			    function autoFlip2Back(){  // When no match is made, the two tiles are flipped back over
					// Flip the 2 tiles back overflow
					//alert("in autoFlip2Back() "); // TEST
				
					var elemBack_1 = document.getElementById(memory_tile_ids[0]);
					var elemBack_2 = document.getElementById(memory_tile_ids[1]);
										
					//alert("elemBackId_1 = " + elemBackId_1);  // TEST
					//alert("elemBackId_2 = " + elemBackId_2);  // TEST
					
					var tile1_frontId = "front_" + memory_tile_ids[0].substring(5);
					var tile2_frontId = "front_" + memory_tile_ids[1].substring(5);
					
					var elemFront_1 = document.getElementById(tile1_frontId);
					var elemFront_2 = document.getElementById(tile2_frontId);
					//alert("tile1_frontId = " + tile1_frontId);  // TEST
					//alert("tile2_frontId = " + tile2_frontId);  // TEST
					//alert("elemFront_1 = " + elemFront_1);      // TEST
					//alert("elemFront_2 = " + elemFront_2);      // TEST
					
					elemFront_1.style.transition = "transform .5s linear 0s"; 
	                elemBack_1.style.transition = "transform .5s linear 0s"; 
	                elemFront_1.style.transform = "perspective( 600px ) rotateY( 0deg )"; 
	                elemBack_1.style.transform = "perspective( 600px ) rotateY( 180deg )";
					
					elemFront_2.style.transition = "transform .5s linear 0s"; 
	                elemBack_2.style.transition = "transform .5s linear 0s"; 
	                elemFront_2.style.transform = "perspective( 600px ) rotateY( 0deg )"; 
	                elemBack_2.style.transform = "perspective( 600px ) rotateY( 180deg )";
					
					// Clear both arrays
					memory_values = [];
					memory_tile_ids = [];
					console.log("in autoFlip2Back(): after erase memory_values.length = " + memory_values.length);
				    console.log("in autoFlip2Back(): after erase memory_tile_ids.length = " + memory_tile_ids.length);
				    console.log("in auto flip2Back(): tiles_flipped = " + tiles_flipped); 
				}
				setTimeout(autoFlip2Back, 1500);
				
			}
		}
	}
} // end of checkCardMatch()


newBoard();