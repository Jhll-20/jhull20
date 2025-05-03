// declaring the containers 
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
//This lists the questions and establishes the answers
const myQuestions =  [
  {
    question: "When did Web 1.0 release?",
    answers: {
        a: "1800",
        b: "1975",
        c: "2002",
        d: "1989"
    },
    correctAnswer: "d"
  },
  {
    question: "What does HTML stand for?",
    answers: {
        a: "Hypertext Markup Language",
        b: "Hyper Test Media Language",
        c: "Hyper Translate Mixed Language",
        d: "Hypertext Markup Loop"
    },
    correctAnswer: "a"
  },
  {
    question: "What is a key feature that Web 3.0 has but Web 2.0 does not?",
    answers: {
        a: "User-generated content",
        b: "Decentralized applications using blockchain technology",
        c: "Centralized platforms",
        d: "static webpages"
    },
    correctAnswer: "b"
  }, 
  {
    question: "What are the current Web versions that are released",
    answers: {
        a: "Web 1.0",
        b: "Web 3.0",
        c: "Web 2.0",
        d: "Web 4.0"
    },
    correctAnswer: ["a","c"]
  },
  {
    question: "In a web application the client uses _____ to interact with a web server",
    type: "text",
    correctAnswer: ["web browser", "browser"]
  }

];
//This section programs the quiz and the buttons
function buildQuiz(){
    const output =[];

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers =[];
        // fill in the blank question input field
        if (currentQuestion.type === "text") {
            answers.push(
            `<label>
            <input type= "text" name="question${questionNumber}" />
            </label>`
        );
    } else {
        const inputType = Array.isArray(currentQuestion.correctAnswer) ? "checkbox" : "radio";
    
        for (let letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="${inputType}" name="question${questionNumber}" value="${letter}">
                    ${letter}: ${currentQuestion.answers[letter]}
                </label>`
            );
        }
    }
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });
    quizContainer.innerHTML=output.join('');
}

//This Function shows the results for each question type (multiple choice, fill in the blank and multiple answered questions)
function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        let userAnswer = "";
// determines if fill in the blank response is right or wrong
        if (currentQuestion.type === "text") {
            const input = answerContainer.querySelector(`input[name=question${questionNumber}]`);
            userAnswer = input ? input.value.trim().toLowerCase() : "";
            const correctAnswers = currentQuestion.correctAnswer.map(ans => ans.toLowerCase());
            if (correctAnswers.includes(userAnswer)) {
                numCorrect++;
                answerContainer.style.color = 'green';
            } else {
                answerContainer.style.color = 'red';
            }
        } else {
            //Color codes and determines if checkbox question is right or wrong
            if (Array.isArray(currentQuestion.correctAnswer)) {
                userAnswer = Array.from(answerContainer.querySelectorAll(`input[name=question${questionNumber}]:checked
`)) .map(input => input.value);
                const correct = currentQuestion.correctAnswer
                const isCorrect = correct.length === userAnswer.length && correct.every(ans=> userAnswer.includes(ans));
                if (isCorrect) {
                    numCorrect++;
                    answerContainer.style.color = 'green';
                } else {
                    answerContainer.style.color = 'red';
                }
            } else {
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainer.style.color = 'green';
            } else {
                answerContainer.style.color = 'red';
            }
            }   
        } 
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length} correct!`;

}

  buildQuiz();
submitButton.addEventListener("click",showResults);


const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
    quizContainer.innerHTML = '';
    resultsContainer.innerHTML = '';
    buildQuiz();
});