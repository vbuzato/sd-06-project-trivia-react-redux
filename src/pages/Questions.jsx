import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { fetchQuestions } from '../actions';
import './Questions.css';

class Questions extends React.Component {
  constructor() {
    super();
		this.myChoice = this.myChoice.bind(this);
		this.timer = this.timer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.state = {
      // questionNumber: ((prev) => prev + 1),
      questionNumber: 0,
      answered: false,
      isShuffle: false,
			shuffledAnswers: [],
      time: 30,
    };
	}

	timer() {
		setInterval(() => {
			const { time, clear } = this.state;
			this.setState((prev) => ({
				time: prev.time - 1,
			}));
			if(time >= 0) {
				clearInterval(time)
			}
		}, 1000)
	}
	
	componentDidMount() {
		this.timer()
  }

  myChoice() {
    this.setState({
      answered: true,
    });
  }

  class(answer) {
    const { answered, questionNumber } = this.state;
    const { results } = this.props;
    let buttonClass = 'answer';
    if (answered) {
      buttonClass = (answer === results[questionNumber].correct_answer)
        ? 'correct'
        : 'incorrect';
    }
    return buttonClass;
  }

  alternatives(answers, results) {
    const dataIdIndex = [0, 1, 2];
    const { questionNumber } = this.state;
    return (
      <div>
        {answers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            value={ answer }
            className={ this.class(answer) }
            disabled={this.state.time <= 0 ? true : false}
            data-testid={
              (answer === results[questionNumber].correct_answer)
                ? 'correct-answer'
                : `wrong-answer-${dataIdIndex.shift()}`
            }
            onClick={ this.myChoice }
          >
            { answer }
          </button>
        ))}
      </div>
    );
	}

  shuffle(array) {
    const { isShuffle } = this.state;
    const FIFTY_PERCENT = 0.5;
    const shuffledAnswers = array.sort(() => Math.random() - FIFTY_PERCENT); // https://javascript.info/task/shuffle
    if (!isShuffle) this.setState({ shuffledAnswers, isShuffle: true });
  }

  question() {
    const { results } = this.props;
    const { answered, shuffledAnswers, questionNumber } = this.state;
    const answersBeforeShuffle = [
      results[questionNumber].correct_answer,
      ...results[questionNumber].incorrect_answers,
    ];
    if (!answered) this.shuffle(answersBeforeShuffle);
    return (
      <>
        <Header />
        <h2 data-testid="question-category">
          {`Category: ${results[questionNumber].category}`}
        </h2>
        <h3 data-testid="question-text">
          {`Question: ${results[questionNumber].question}`}
        </h3>
        {this.alternatives(shuffledAnswers, results)}
				<p>{this.state.time}</p>
      </>
    );
  }

  nextQuestion() {
    const { questionNumber, time } = this.state;
    this.setState({
      questionNumber: questionNumber + 1,
      answered: false,
      isShuffle: false,
    }); 
  }

  render() {
    const { results } = this.props;
    const { answered, questionNumber } = this.state;
    const isEnable = !(answered);
    const hidden = !(answered);
    const NUMBER_OF_QUESTIONS = 5;
    return (
      <div>
        {(questionNumber === NUMBER_OF_QUESTIONS) ? <Redirect to="/feedback" /> : null}
        {(results[questionNumber]) ? this.question() : 'Loading...'}
        <button
          type="button"
          disabled={ isEnable }
          hidden={ hidden }
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.game.results,
});

const mapDispatchToProps = (dispatch) => ({
  myFetchQuestions: (token) => dispatch(fetchQuestions(token)),
});

Questions.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
