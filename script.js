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
    question: "What does HTTP stand for?",
    answers: {
        a: "Hypertext Transfer Protocol",
        b: "Hyper Test Transport Protocol",
        c: "Hypertext Transmission Protocol",
        d: "Hypertext transfer Process"
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
        }else{
//multiple choice questions and generating radio buttons
for (letter in currentQuestion.answers) {
    answers.push(
      `<label>
        <input type="${currentQuestion.type === 'checkbox' ? 'checkbox' : 'radio'}" 
               name="question${questionNumber}" 
               value="${letter}">
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
            const selected = `input[name=question${questionNumber}]:checked`;
            userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainer.style.color = 'green';
            } else {
                answerContainer.style.color = 'red';
            }
            if (Array.isArray(currentQuestion.question.correctAnswer)) {
                userAnswer = Array.from(answerContainer.querySelectorAll(`input[name=questions$(questionNumber)]:checked`))
                .map(input => input.value);
                const correct = currentQuestion.correctAnswerl
                const isCorrect = correct.length === userAnswer.length && correct.every(ans=> userAnswer.includes(ans));
                if (isCorrect) {
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

