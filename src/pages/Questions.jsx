import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Questions extends React.Component {
	render() {
		const { results } = this.props;
		const wAnswers = [results.incorrect_answers];
		return (
			<div>
				<h2 data-testsid="question-category">Category: {results.category}</h2>
				<h3 data-testid="question-text">Question: {results.question}</h3>
				<button type="button" data-testid="correct-answer">{results.correct_answer}</button>
				{wAnswers.map((answer, index) => <button type="button" data-testid={`wrong-answer-${ index }`}>{ answer }</button>)}
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