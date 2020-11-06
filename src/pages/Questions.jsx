import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../actions';
import './Questions.css';

class Questions extends React.Component {
  constructor() {
    super();
    this.myChoice = this.myChoice.bind(this);

    this.state = {
      // questionNumber: 1,
      answered: false,
      isShuffle: false,
      shuffledAnswers: [],
    };
  }

  myChoice() {
    this.setState({
      answered: true,
    });
  }

  class(answer) {
    const { answered } = this.state;
    const { results } = this.props;
    let buttonClass = 'answer';
    if (answered) {
      buttonClass = (answer === results[0].correct_answer) ? 'correct' : 'incorrect';
    }
    return buttonClass;
  }

  alternatives(answers, results) {
    const dataIdIndex = [0, 1, 2];
    return (
      <div>
        {answers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            value={ answer }
            className={ this.class(answer) }
            data-testid={
              (answer === results[0].correct_answer)
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
    const { answered, shuffledAnswers } = this.state;
    const answersBeforeShuffle = [
      results[0].correct_answer,
      ...results[0].incorrect_answers,
    ];
    if (!answered) this.shuffle(answersBeforeShuffle);
    return (
      <>
        <Header />
        <h2 data-testid="question-category">{`Category: ${results[0].category}`}</h2>
        <h3 data-testid="question-text">{`Question: ${results[0].question}`}</h3>
        {this.alternatives(shuffledAnswers, results)}
      </>
    );
  }

  render() {
    const { results } = this.props;
    const { answered } = this.state;
    const isEnable = !(answered);
    return (
      <div>
        {(results[0]) ? this.question() : 'Loading...'}
        <button disabled={ isEnable } data-testid="btn-next">Próxima</button>
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
