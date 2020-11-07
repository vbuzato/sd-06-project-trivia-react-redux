import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  // constructor() {
  //   super();

  //   this.feedScore = this.feedScore.bind(this);

  //   this.state = {
  //     hits: 3,
  //     score: 0,
  //   };
  // }

  // componentDidMount() {
  //   const { hits } = this.state;
  //   this.setState({
  //     score: hits * 10,
  //   });
  // }

  feedScore() {
    const { assertions } = this.props;
    const MIN_QUESTIONS = 3;
    if (assertions < MIN_QUESTIONS) {
      return (
        <h1 data-testid="feedback-text">Podia ser melhor...</h1>
      );
    }
    return (
      <h1 data-testid="feedback-text">Mandou bem!</h1>
    );
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          {this.feedScore()}
          <h3>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
            {' '}
            questões!
            <br />
            Um total de
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
            {' '}
            pontos
          </h3>
        </div>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">VER RANKING</button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">JOGAR NOVAMENTE</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.game.score,
  assertions: state.game.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
