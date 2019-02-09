$(document).ready(function(){
    let targetNum;
    let numGuesses = 5;
    
    targetNum = Math.floor((Math.random()*1000) + 1);
    console.log(targetNum);
    let hint = document.getElementById("hint");
    
    //-----------------HINT FUNCTIONS NECESSARY------------------//
    //Check Even or odd
    function isEven(num){
        console.log("num =" + num);
        return num%2 ==0;
    }
    //Make Factors for Hint
    function factorize(){
        var factors = [];
        for (i=1; i<=targetNum;i++){
            if (targetNum%i==0){
                factors.push(i);
            }
        }
        console.log("factors = " + factors)
        return factors;
    }
    
    //Get ONE random factor as the hint
    function factorChoice(factors){
        if (factors.length>1){
            let choice= factors[Math.floor((Math.random()*factors.length) + 1)];
            console.log("Choice = " + choice)
            return choice;
        }
        else{
            return 0;
        }
    }
    
    //------------------------------------------------------------//
    
    //disables input box and guess button
    function disabled(){
        $('#number').prop('disabled', true);
        $('#guessButton').prop('disabled', true);
    }
    
    function guessCheck(){
        let guess = parseInt(document.getElementById('number').value);
        console.log("guess = " + guess);
        
        numGuesses = numGuesses -1;
        let numGuessed = document.getElementById("numGuesses");
        let numguessString = "Num Guesses Left: " + numGuesses;
        console.log(numguessString);
        numGuessed.innerHTML =  numguessString;
        
        //Guess function
        if (numGuesses > 0 && guess !== targetNum ){
            //Logs your guesses
            $('.yourGuesses').append("<h4> Guess: " + guess + "</h4>" )
            //High/Low
            if (numGuesses == 4){
                if (guess > targetNum){
                    $('#hint').append('<h4>Your guess is Too High! </h4>');
                }
                else if(guess < targetNum){
                    $('#hint').append('<h4>Your guess is Too Low! </h4>');
                }
            }
            //greater than half (binary sort hint)
            if (numGuesses == 3){
                if (targetNum>=500){
                    $('#hint').append('<h4>The Number is greater than or equal to 500. </h4>');
                }
                else{
                    $('#hint').append('<h4>The Number is less than 50. </h4>');
                }
            }
            
            //It's a factor of
            if (numGuesses == 2){
                let factors = factorize();
                let factorHint = factorChoice(factors);
                $('#hint').append('<h4>A factor of this number is ' + factorHint + '.</h4>');
            }
            
            
            //Even/Odd
            if (numGuesses == 1){
                if (isEven(targetNum)){
                   $('#hint').append('<h4>The number is even.</h4>'); 
                }
                else{
                $('#hint').append('<h4>The Number is odd.</h4>');
                }
            }
          
            
            
            
        }
        else if(guess==targetNum){
            disabled();
            $('#gameResult').append('<h2 class="wonResponse"> Congratulations! You got it!!</h2>' + 
            '<h3 class="wonResponse">The correct answer was: <span id="targetNumAns">' + targetNum + '</span></h3>' +
            '<h3 class="wonResponse"> Click <a href="index.html"> <i>here</i></a> To go back home and start again!</h3>')
        }
        
        else{
            disabled();
            $('#gameResult').append('<h2 class="lostResponse"> Sorry! You Lost</h2>' + 
            '<h3 class="lostResponse">The correct answer was: <span id="targetNumAns">' + targetNum + '</span></h3>' +
            '<h3 class="lostResponse"> Click <a href="index.html"> <i>here</i></a> To go back home and start again!</h3>')
        }
    }



    document.getElementById("guessButton").addEventListener("click",function(){ 
        guessCheck();
        });

})