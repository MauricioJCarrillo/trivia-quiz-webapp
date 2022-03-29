const welcome_screen_node = document.getElementById("welcome_screen");
const questions_screen_node = document.getElementById("questions_screen");
const results_screen_node = document.getElementById("results_screen");
const counter_node = document.getElementById("counter");
const category_question_node = document.getElementById("category_question");
const category_icon_node = document.getElementById("category_icon");
const current_question_node = document.getElementById("current_question");
const true_node = document.getElementById("true");
const false_node = document.getElementById("false");
const progressBar_node = document.getElementById("progressBar");
const score_percent_node = document.getElementById("score_percent");
const score_counter_node = document.getElementById("score_counter");
const results_section_node = document.getElementById("results_section");
const play_again_node = document.getElementById("play_again");
let results_container_node = document.getElementById("results_container");

const URL_API =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

class Game {
  constructor() {
    this.startGame = this.startGame.bind(this);
    this.startGame();
  }

  startGame = async () => {
    welcome_screen_node.classList.add("hide");
    questions_screen_node.classList.remove("hide");
    results_screen_node.classList.add("hide");
    this.chooseAnswer = this.chooseAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.index = 0;
    this.counter = 0;
    this.score_percent_value = 0;
    this.score_counter_value = 0;
    this.correct_answers = [];
    this.userAnswers = [];
    this.userResults = [];
    this.answers = {
      true_node,
      false_node,
    };
    progressBar_node.value = 0;
    let response = await fetch(URL_API);
    response = await response.json();
    this.results = response.results;
    console.log("API response:", response);
    console.log("API results:", this.results);
    console.log("Length:", this.results.length);
    this.nextQuestion();
  };

  nextQuestion() {
    if (this.index < this.results.length) {
      category_question_node.innerHTML = this.results[this.index].category;
      category_icon_node.src = this.showCategoryIcon(
        this.results[this.index].category
      );
      counter_node.innerHTML = `${this.counter}/10`;
      current_question_node.innerHTML = this.results[this.index].question;
      this.answers.true_node.addEventListener("click", this.chooseAnswer);
      this.answers.false_node.addEventListener("click", this.chooseAnswer);
      this.index = this.index + 1;
      console.log("Index: ", this.index);
    } else {
      this.answers.true_node.removeEventListener("click", this.chooseAnswer);
      this.answers.false_node.removeEventListener("click", this.chooseAnswer);
      this.showResults();
    }
  }

  showCategoryIcon(category) {
    switch (category) {
      case "Science: Computers":
        return "./assets/icons/computer-icon.png";

      case "Entertainment: Film":
        return "./assets/icons/film-icon.png";

      case "Entertainment: Video Games":
        return "./assets/icons/games-icon.png";

      case "Geography":
        return "./assets/icons/geography-icon.png";

      case "History":
        return "./assets/icons/history-icon.png";

      case "Entertainment: Music":
        return "./assets/icons/music-icon.png";

      case "Science & Nature":
        return "./assets/icons/nature-icon.png";

      case "Politics":
        return "./assets/icons/politics-icon.png";

      case "Celebrities":
        return "./assets/icons/star-icon.png";

      case "Science: Mathematics":
        return "./assets/icons/history-icon.png";

      case "Entertainment: Japanese Anime & Manga":
        return "./assets/icons/history-icon.png";

      case "General Knowledge":
        return "./assets/icons/history-icon.png";

      case "Mythology":
        return "./assets/icons/history-icon.png";

      case "Entertainment: Board Games":
        return "./assets/icons/history-icon.png";

      case "Entertainment: Comics":
        return "./assets/icons/history-icon.png";

      case "Art":
        return "./assets/icons/history-icon.png";

      case "Vehicles":
        return "./assets/icons/history-icon.png";

      case "Entertainment: Books":
        return "./assets/icons/history-icon.png";

      case "Entertainment: Television":
        return "./assets/icons/computer-icon.png";

      case "Entertainment: Musicals & Theatres":
        return "./assets/icons/history-icon.png";
    }
  }

  chooseAnswer(ev) {
    const answer = ev.target.dataset.answer;
    console.log(answer);
    this.userAnswers.push(answer);
    console.log(this.userAnswers);
    progressBar_node.value = progressBar_node.value + 10;
    this.counter = this.counter + 1;
    this.nextQuestion();
  }

  showResults() {
    results_section_node.removeChild(results_container_node);
    questions_screen_node.classList.add("hide");
    results_screen_node.classList.remove("hide");
    console.log("Resultados: ");

    this.correct_answers = this.results.map((item) => item.correct_answer);
    console.log("Array de res. correctas: ", this.correct_answers);

    for (let i = 0; i < this.results.length; i++) {
      console.log(i);
      const question = document.createElement("p");
      question.innerHTML = this.results[i].question;

      const answer = document.createElement("p");
      answer.innerHTML = `Your answer: ${this.userAnswers[i]}`;

      const img = document.createElement("img");

      if (this.correct_answers[i] == this.userAnswers[i]) {
        img.className = "icon";
        img.src = "./assets/icons/ok-icon.png";
        answer.className = "green_font";
        this.score_percent_value = this.score_percent_value + 10;
        this.score_counter_value++;
      } else {
        img.className = "icon";
        img.src = "./assets/icons/cancel-icon.png";
        answer.className = "red_font";
      }

      const container_words = document.createElement("section");
      container_words.className = "result_words";
      container_words.append(question, answer);

      const card = document.createElement("section");
      card.className = "result_question";
      card.append(img, container_words);

      this.userResults.push(card);
    }

    results_container_node = document.createElement("section");
    results_container_node.append(...this.userResults);
    results_section_node.append(results_container_node);
    score_percent_node.innerHTML = `${this.score_percent_value}%`;
    score_counter_node.innerHTML = `${this.score_counter_value} out of 10 questions`;

    play_again_node.addEventListener("click", this.startGame);
  }
}

function beginGame() {
  const game = new Game();
}
