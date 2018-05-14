var triviaquestion = [
    {
        question: "Who is founder of Facebook ?",
        answerList: ["Steve Jobs", "Mark Zuckerberg", "Bill Gates"],
        answer: 1
    },
    {
        question: "Who is founder of apple ?",
        answerList: ["Steve Jobs", "Mark Zuckerberg", "Bill Gates"],
        answer: 0
    },
    {
        question: "Who is founder of Microsoft ?",
        answerList: ["Steve Jobs", "Mark Zuckerberg", "Bill Gates"],
        answer: 2
    }
];

var gifImageArray = ['question1', 'question2', 'question3'];
var currentQuestion;
var correctanswers;
var incorrectanswers;
var unanswered;
var answered;
var userChoice;
var seconds;
var time;

var outputs = {

    correct: "YES! that's correct answer",
    incorrect: "NO! that's not correct answer",
    timing: "Sorry, Out of Time",
    over: "Let's see! how well you did"
}


$('#startbtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startoverbtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame()
{

    $("#final-msg").empty();
    $("#correctanswers").empty();
    $("#incorrectanswers").empty();
    $("#unanswered").empty();

    currentQuestion = 0;
    correctanswers = 0;
    incorrectanswers = 0;
    unanswered = 0;
    newQus();
}

function newQus(){
	$('#msg').empty();
	$('#correctans').empty();
	$('#gif-image').empty();
	answered = true;
	

	$('#currentQuestion').html('Question '+ (currentQuestion+1)+ '/' +triviaquestion.length);
	$('.question').html('<h2>' + triviaquestion[currentQuestion].question + '</h2>');
	for(var i = 0; i < 3; i++){
		var choices = $('<div>');
		choices.text(triviaquestion[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	
	$('.thisChoice').on('click',function(){
		userChoice = $(this).data('index');
		clearInterval(time);
		answer();
	});
}



function countdown(){
    seconds = 15;
	$('#time-left').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#time-left').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answer();
	}
}


function answer(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaquestion[currentQuestion].answerList[triviaquestion[currentQuestion].answer];
	var rightAnswerIndex = triviaquestion[currentQuestion].answer;
	$('#gif-image').html('<img src = "assets/images/'+ gifImageArray[currentQuestion] +'.gif" style="width: 200px; height: 200px">');
	
	if((userChoice == rightAnswerIndex) && (answered == true)){
		correctanswers++;
		$('#msg').html(outputs.correct);
	} else if((userChoice != rightAnswerIndex) && (answered == true)){
		incorrectanswers++;
		$('#msg').html(outputs.incorrect);
		$('#correctans').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#msg').html(outputs.timing);
		$('#correctans').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaquestion.length-1)){
		setTimeout(resultboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQus, 5000);
	}	
}

function resultboard(){
	$('#time-left').empty();
	$('#msg').empty();
	$('#correctans').empty();
	$('#gif-image').empty();

	$('#final-msg').html(outputs.over);
	$('#correctanswers').html("Correct Answers: " + correctanswers);
	$('#incorrectanswers').html("Incorrect Answers: " + incorrectanswers);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startoverbtn').addClass('reset');
	$('#startoverbtn').show();
	$('#startoverbtn').html('Start Over?');
}