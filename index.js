let questionNumber = 0;
let score = 0;

function generateQuestion () {
  if (questionNumber < DATA.length) {
    /*Question*/
    return `<div class="question-${questionNumber}">
    <h2>${DATA[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${DATA[questionNumber].answers[0]}" name="answer" required>
    <span>${DATA[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${DATA[questionNumber].answers[1]}" name="answer" required>
    <span>${DATA[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${DATA[questionNumber].answers[2]}" name="answer" required>
    <span>${DATA[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${DATA[questionNumber].answers[3]}" name="answer" required>
    <span>${DATA[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(DATA.length)
  }
}

function changeQuestionNumber () {
    questionNumber ++;
 
  $('.questionNumber').text(questionNumber+1);
}

function plusOneToScore () {
  score ++;
}


function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}

function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}

function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${DATA[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

function userAnswerFeedbackCorrect () {
  let correctAnswer = `${DATA[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${DATA[questionNumber].icon}" alt="${DATA[questionNumber].alt}"/></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function userAnswerFeedbackWrong () {
  let correctAnswer = `${DATA[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${DATA[questionNumber].icon2}" alt="${DATA[questionNumber].alt}"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function updateScore () {
  plusOneToScore();
  $('.score').text(score);
}

function renderResults () {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You're on fire!</h3><img src="https://66.media.tumblr.com/8d144c9e445f50eca971b42ce45b5142/tumblr_nx2bmptHZv1rwfctbo1_500.gif" alt="Disney Magic icon"/><p>You got ${score} / 10</p><p>You truly have the Disney Magic!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Almost there!</h3><img src="https://66.media.tumblr.com/770dfd3cfda39cdb5ec320e63c5e915d/tumblr_nftjo2qisT1rwfctbo1_540.gif" alt="snow white clapping"/><p>You got ${score} / 10</p><p>You could even impress a princess!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>You almost got it</h3><img src="http://www.reactiongifs.com/r/sbbn.gif" alt="sadness crying"/><p>You got ${score} / 10</p><p>With more trips to Disney Land and movie magic, you'll be able to conquer this quiz someday!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

function doQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(doQuiz);
