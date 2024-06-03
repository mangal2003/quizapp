let loginUsers = document.getElementById("loginUsers");
let askName = document.getElementById("askName");
let nameHolder = document.getElementById("nameHolder");
let userNameDisplay = document.getElementById("userNameDisplay");
let introUser = document.getElementById("introUser");
let rules = document.getElementById("rules");
let quizArena = document.getElementById("quizArena");
let questionText = document.getElementById("questionText");
let currentScore = document.getElementById("currentScore");
let highScore = document.getElementById("highScore");
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let option4 = document.getElementById("option4");
let nameReq = document.getElementById("nameReq");
let gameOver = document.getElementById("gameOver");
let correctAns = document.getElementById("correctAns");
let wrongAns = document.getElementById("wrongAns");
let ansArr = [];
let correctAnswer = "";
let lives = 3;
let score = 0;
let hiScore = 0;
// get name from local storage
if (localStorage.getItem("name") != null) {
  loginUsers.style.display = "none";
  introUser.style.display = "flex";
  userNameDisplay.innerText = localStorage.getItem("name") + " !";
} else {
  loginUsers.style.display = "flex";
  introUser.style.display = "none";
}
function saveNameLocal() {
  if (nameHolder.value != "") {
    localStorage.setItem("name", nameHolder.value);
    loginUsers.style.display = "none";
    introUser.style.display = "flex";
  } else {
    nameReq.style.animation = "alertThis 3s linear 1";
  }
}

function showRules() {
  rules.style.display = "block";
}
function hideRules() {
  rules.style.display = "none";
}

const url = `https://opentdb.com/api.php?amount=1&type=multiple`;

function startQuiz() {
  if (lives < 1) {
    gameOver.style.animation = "alertThis 3s linear 1";
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data.results[0]);
      //   console.log(data.results[0].category);
      //   console.log(data.results[0].question);
      let ques = data.results[0].question;
      questionText.innerHTML = ques;
      introUser.style.display = "none";
      quizArena.style.display = "block";
      function rotateRight(arr, k) {
        k = k % arr.length;
        return arr.slice(-k).concat(arr.slice(0, -k));
      }

      const optionArr = [
        data.results[0].correct_answer,
        data.results[0].incorrect_answers[0],
        data.results[0].incorrect_answers[1],
        data.results[0].incorrect_answers[2],
      ];
      correctAnswer = data.results[0].correct_answer;
      const k = Math.floor(Math.random() * 10);
      const rotatedArr = rotateRight(optionArr, k);
      ansArr = [...rotatedArr];
      option1.innerHTML = rotatedArr[0];
      option2.innerHTML = rotatedArr[1];
      option3.innerHTML = rotatedArr[2];
      option4.innerHTML = rotatedArr[3];
    })
    .catch((error) => {
      questionText.innerHTML = error;
    });
}
function checkAnswer(optionNum) {
  if (lives < 1) {
    alert("Game Over");
    location.reload();
  }
  if (correctAnswer === ansArr[optionNum - 1]) {
    correctAns.style.animation = "alertThis 4s linear 1";
    score += 5;
    startQuiz();
  } else {
    wrongAns.style.animation = "alertThis 4s linear 1";
    lives--;
    startQuiz();
  }
  currentScore.innerText = score;
  if (score > hiScore) {
    hiScore = score;
    localStorage.setItem("hiScore", hiScore);
  }
  highScore.innerHTML = localStorage.getItem("hiScore");
}

highScore.innerHTML = localStorage.getItem("hiScore");
if (lives < 1) {
  gameOver.style.animation = "alertThis 4s linear 1";
  setTimeout(() => {
    location.reload();
  }, 2000);
}
