import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { hash, name } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/'${hash}` }
          alt="foto perfil"
        />
        <span
          data-testid="header-player-name"
        >
          { name }
        </span>
        <span
          data-testid="header-score"
        >
          {0}
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  hash: state.token.hash,
  name: state.user.name,
});

Header.propTypes = {
  hash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
