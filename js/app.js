/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond',
            'fa-paper-plane-o', 'fa-paper-plane-o',
            'fa-anchor', 'fa-anchor',
            'fa-bolt', 'fa-bolt',
            'fa-cube', 'fa-cube',
            'fa-leaf', 'fa-leaf',
            'fa-bicycle', 'fa-bicycle',
            'fa-bomb', 'fa-bomb'],
    $container = $('.container'),
    $rating = $('.fa-star'),
    $moves = $('.moves'),
    $timer = $('.timer'),
    $restart = $('.restart'),
    $deck = $('.deck'),
    timeNow,
    allOpen = [],
    match = 0,
    seconds = 0,
    moves = 0,
    wait = 500,
    totalCards = cards.length /2,
    stars3 = 15,
    stars2 = 20,
    msg = "";
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* 
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function initGame(){
    let allCards = shuffle(cards);
    $deck.empty();
    match = 0;
    moves = 0;
    $moves.text('0');
    for(let i=0; i < allCards.length; i++){
        $deck.append($('<li class="card"><i class="fa ' + allCards[i] + '"></i></li>'));
    }
    addCardListener();
    // Reset time
    resetTimer(timeNow);
    seconds = 0;
    $timer.text(`${seconds}`);
    initTime();

}

function rating(moves) {
    let rating = 3;
    if (moves <= stars3) {
        $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves <= stars2) {
        $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    } else {
        $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    return { 
        score: rating 
    };
}
function gameOver(moves, score) {
    
    msg = `Congratulations! you won in ${seconds} seconds, with a total of ${moves} moves and a score of ${score}. Well done!`;
    alert (msg);
    let answer = confirm("Do you want to play again?")
    if (answer) {
		$rating.removeClass('fa-star-o').addClass('fa-star');
        initGame();
    }
}

$restart.bind('click', function (confirmed) {
    if (confirmed) {
        $rating.removeClass('fa-star-o').addClass('fa-star');
        initGame();
    }
});
let addCardListener = function () {

    // With the following, the card that is clicked on is flipped
    $deck.find('.card').bind('click', function () {
        let $this = $(this);

        if ($this.hasClass('show') || $this.hasClass('match')) { return true; }

        let card = $this.context.innerHTML;
        $this.addClass('open show');
        allOpen.push(card);

        // Compares cards if they matched
        if (allOpen.length > 1) {
            if (card === allOpen[0]) {
                $deck.find('.open').addClass('match');
                setTimeout(function () {
                    $deck.find('open').removeClass('open show');
                }, wait);
                match++;

                // If cards are not matched
            } else {
                $deck.find('.open').addClass('notmatch');
                setTimeout(function () {
                    $deck.find('.open').removeClass('open show');
                }, wait / 1.6);
            }
            allOpen = [];
            // Increments the number of moves when two cards are matched or not matched
            moves++;
            rating(moves);
            $moves.html(moves);
        }
        // The game is finished when all cards are matched
        if (totalCards == match) {
            rating(moves);
            let score = rating(moves).score;
            setTimeout(function () {
                gameOver(moves, score);
            }, 600);
        }
    });
}

// Initiates the timer
function initTime() {
    timeNow = setInterval(function () {
        $timer.text(`${seconds}`);
        seconds = seconds + 1;
    }, 1000);
}

// Resets the timer when the game ends or is restarted
function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}

initGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
