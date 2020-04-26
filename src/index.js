import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import quizService from "./quizService";
import QuestionBox from "./components/Questionbox";
import Result from "./components/Result";

class QuizBee extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0,
  };

  getQuestions = () => {
    quizService().then((question) => {
      this.setState({
        questionBank: question,
      });
    });
  };

  componentDidMount() {
    this.getQuestions();
  }

  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState((prevState) => {
        return { score: this.state.score + 1 };
      });
    }

    this.setState((prevState) => {
      return {
        responses: this.state.responses < 5 ? this.state.responses + 1 : 5,
      };
    });
  };

  playAgain = () => {
    console.log(this.state.responses);
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0,
    });
  };

  render() {
    //change background based on whether game is complete or not
    let screenChange;
    if (this.state.responses < 5) {
      screenChange = "container";
    } else {
      screenChange = "container2";
    }
    return (
      <div className={screenChange}>
        <div className="title">QuizBee</div>
        {this.state.questionBank.length > 0 &&
          this.state.responses < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                correct={correct}
                key={questionId}
                selected={(answer) => this.computeAnswer(answer, correct)}
              />
            )
          )}
        {this.state.responses === 5 ? (
          <Result
            className="container-2"
            score={this.state.score}
            playAgain={() => this.playAgain()}
          />
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<QuizBee />, document.getElementById("root"));
