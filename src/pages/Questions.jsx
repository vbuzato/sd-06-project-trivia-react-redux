import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../actions';

class Questions extends React.Component {
  shuffle(array) {
    const FIFTY_PERCENT = 0.5;
    return array.sort(() => Math.random() - FIFTY_PERCENT); // https://javascript.info/task/shuffle
  }

  alternatives(answers, results) {
    const dataIdIndex = [0, 1, 2];
    return (
      <div>
        {answers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            data-testid={
              (answer === results[0].correct_answer)
                ? 'correct-answer'
                : `wrong-answer-${dataIdIndex.shift()}`
            }
          >
            { answer }
          </button>
        ))}
      </div>
    );
  }

  question() {
    const { results } = this.props;
    const answersBeforeShuffle = [
      results[0].correct_answer,
      ...results[0].incorrect_answers,
    ];
    console.log(answersBeforeShuffle);
    const answers = this.shuffle(answersBeforeShuffle);
    console.log(answers);
    return (
      <>
        <Header />
        <h2 data-testid="question-category">{`Category: ${results[0].category}`}</h2>
        <h3 data-testid="question-text">{`Question: ${results[0].question}`}</h3>
        {this.alternatives(answers, results)}
      </>
    );
  }

  render() {
    const { results } = this.props;
    return (
      <div>
        {(results[0]) ? this.question() : 'Loading...'}
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
