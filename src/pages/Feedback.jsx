import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  constructor() {
    super();

    this.feedScore = this.feedScore.bind(this);

    this.state = {
      hits: 3,
      score: 0,
    }
  }

  componentDidMount() {
    const { hits } = this.state;
    this.setState({
      score: hits * 10,
    })
  }

  feedScore() {
    const { score } = this.state;
    if(score <= 30) {
      return (
        <h1 data-testid="feedback-text">Podia ser melhor...</h1>
      )
    } else {
      return (
        <h1 data-testid="feedback-text">Mandou bem!</h1>
      )
    }
  }

  render() {
    const { hits, score } = this.state;
    return (
      <div>
        <div>
          <Header />
        </div>
        <div data-testid="feedback-total-score">
          {this.feedScore()}
          <h3
            data-testid="feedback-total-question"
          >
            Você acertou {hits} questões!<br/>
            Um total de {score} pontos
          </h3>
        </div>
        <Link to="/ranking"><button data-testid="btn-ranking">VER RANKING</button></Link>
        <Link to="/"><button data-testid="btn-play-again">JOGAR NOVAMENTE</button></Link>
      </div>
    );
  }
}

export default Feedback;
