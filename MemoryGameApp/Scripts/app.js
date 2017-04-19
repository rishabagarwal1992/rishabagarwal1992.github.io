var source = "#GameArena";
var score=0;
var colorSource = ["orange","green","red","blue","yellow","black","pink","purple"];
var firstSelect;
var gridSystem=4;

function BindClick(){
	$('.Card').click(function(event){
		var currCard=$(this).attr("id");;
		var currColor=$(this).attr("data-color");
		$(this).css("background-color",currColor);
		setTimeout(function(){
		if(firstSelect===undefined){			
			firstSelect=currCard;
		}
		else{
			MatchCards(currCard);
		}
	},500);
	})
}

function MatchCards(cardId){
var firstColor=$("#"+firstSelect).attr("data-color");
var secondColor=$("#"+cardId).attr("data-color");
if(firstColor===secondColor){
	score+=10;
	$(".CurrScore").text(score);
}
else{
	$("#"+firstSelect).css('background-color','#fff');
	$("#"+cardId).css('background-color','#fff');
}
firstSelect=undefined;
if(score===(10*colorSource.length)){
	$(".Overlay").show();
	$(".ResetGame").show();
}
}

function ResetGame(){
	firstSelect=undefined;
	$(".Card").css("background-color","#fff");
	ShuffleCards();
	score=0;
	$(".CurrScore").text(score);
	$(".Overlay").hide();
	$(".ResetGame").hide();
}
function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	
function ShuffleCards() {
	var cards = $(source).children();
	var currCard = $(source + " div:first-child");
	var cardArr = new Array();

	for (var i = 0; i < cards.length; i++) {
		cardArr[i] = $("#" + currCard.attr("id")).attr("data-color");
		currCard = currCard.next();
	}
	
		currCard = $(source + " div:first-child");
	
	for (var z = 0; z < cards.length; z++) {
	var RandomNumber = RandomFunction(0, cardArr.length - 1);

		$("#" + currCard.attr("id")).attr("data-color", cardArr[RandomNumber]);
		cardArr.splice(RandomNumber, 1);
		currCard = currCard.next();
	}
}

$(document).ready(function(){
	$(".Container").css('width',70*gridSystem+'px');
 for(var x=1;x<3;x++){
 	GenerateDeck(x);
 }
 ShuffleCards();
 BindClick();
 $(".ResetBtn").click(function(){
 	ResetGame()
 });
})
function GenerateDeck(idx){
	for(var iCard in colorSource){
		$(source).append("<div class='Card' id='"+idx+iCard+"' data-color='"+colorSource[iCard]+"'></div>");
	}

}