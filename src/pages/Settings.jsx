import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveSettings, fetchCategories } from '../actions';

class Settings extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      category: 'Any Category',
      difficulty: 'Any Difficulty',
      type: 'Any Type',
    };
  }

  componentDidMount() {
    const { requestCategories } = this.props;
    requestCategories();
  }

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value,
    });
  }

  render() {
    const { options, confirm } = this.props;
    const { category, difficulty, type } = this.state;
    return (
      <div>
        <h1 data-testid="settings-title">CONFIGURAÇÕES</h1>
        <label htmlFor="categories">
          <select id="category" onChange={ this.handleChange } value={ category }>
            {options.categories.map((item) => (
              <option key={ item } value={ item }>
                { item }
              </option>))}
          </select>
        </label>
        <label htmlFor="difficulty">
          <select id="difficulty" onChange={ this.handleChange } value={ difficulty }>
            {options.difficulty.map((item) => (
              <option key={ item } value={ item }>
                { item }
              </option>))}
          </select>
        </label>
        <label htmlFor="type">
          <select id="type" onChange={ this.handleChange } value={ type }>
            {options.type.map((item) => (
              <option key={ item } value={ item }>
                { item }
              </option>))}
          </select>
        </label>
        <button type="button" onClick={ () => confirm(category, difficulty, type) }>
          Confirmar
        </button>
        <Link to="/"><button type="button">Voltar</button></Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  options: state.game.options,
});

const mapDispatchToProps = (dispatch) => ({
  requestCategories: () => dispatch(fetchCategories()),
  confirm: (category, difficulty, type) => dispatch(saveSettings(category, difficulty, type)),
});

Settings.propTypes = {
  options: PropTypes.objectOf().isRequired,
  requestCategories: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
