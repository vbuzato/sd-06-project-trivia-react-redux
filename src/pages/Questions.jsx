import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

class Questions extends React.Component {
	render() {
		const { results } = this.props;
		//const wAnswers = [results.incorrect_answers];
		return (
			<div>
				<Header />
				<h2 data-testsid="question-category">Category: Peixe</h2>
				<h3 data-testid="question-text">Question: Arroz</h3>
				<button type="button" data-testid="correct-answer">Feijão</button>
				{/* <Link to="/feed">Feedback</Link> Pode apagar, é so para poder entrar no Feed*/ }
				{/* {wAnswers.map((answer, index) => <button type="button" data-testid={`wrong-answer-${ index }`}>{ answer }</button>)} */}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	results: state.token.results,
});

Questions.propTypes = {
	results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect (mapStateToProps)(Questions);