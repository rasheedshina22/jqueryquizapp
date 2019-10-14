const selectedQuestion = questions
  .sort(() => {
    return Math.random() - Math.random();
  })
  .slice(0, 5);
let score = 0;
let questionIndex = 0;

const gradeQuestion = answ => {
  if (answ == selectedQuestion[questionIndex].answer) {
    score += 20;
  }
  questionIndex += 1;
};

console.log(questions);

const renderSuccess = () => {
  $(".question-number").text("");
  $(".question-question").text("");
  $(".option1").text("");
  $(".option2").text("");
  $(".option3").text("");
  $(".option4").text("");
  if (score >= 50) {
    $(".score").html(` Well done! You scored ${score}`);
  } else {
    $("<p>You can do it. Refresh the brower and try again </p>").appendTo($(".question-question"));

    $(".score").html(` Hmmmmm! You scored ${score}`);
  }
};

const renderQuestion = qindex => {
  let question = selectedQuestion[qindex];
  $(".question-number").text(`Question ${qindex + 1}`);
  $(".question-question").text(question.question);
  $(".option1").text("");
  $(".option2").text("");
  $(".option3").text("");
  $(".option4").text("");
  //   since we are using jquery
  $.each(question.options, (index, option) => {
    let opt = ".option" + (index + 1);
    let radioInput = $(
      '<input type="radio" name="answer" value=' + option + " />"
    );
    let radioLabel = $("<label for=" + option + "> " + option + " </label>");
    radioInput.appendTo(opt);

    radioLabel.appendTo(opt);
  });

  $('input:radio[name="answer"]').click(function() {
    //grade the question
    gradeQuestion(this.value);
    if (questionIndex == selectedQuestion.length) {
      renderSuccess();
    } else {
      renderQuestion(questionIndex);
    }
  });
};

$(document).ready(function() {
  renderQuestion(questionIndex);
});
