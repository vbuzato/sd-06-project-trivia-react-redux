import React from 'react';
import { Link } from 'react-router-dom';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="settings-title">CONFIGURAÇÕES</h1>
        <Link to="/"><button>Voltar</button></Link>
      </div>
    )
  }
}

export default Settings;
