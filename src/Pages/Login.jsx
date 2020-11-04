import React from 'react';

class Login extends React.Component {
	constructor() {
		super();
    
		this.state = {
			email: '',
      name: '',
		};
		
    this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange({ target }) {
		this.setState({ [target.name]: target.value });
	}
	
	render() {
    const { name, email } = this.state;
    const isEnable = (name && email) ? false : true;
		return(
			<div>
				<label htmlFor="email">Email do Gravatar:
					<input 
						id="email"
						type="email"
						name="email"
						value={ email }
						data-testid="input-gravatar-email"
						onChange= { this.handleChange }
				 	/>
				</label>
				<label htmlFor="name">Nome do Jogador:
					<input
            id="name"
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
				</label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={isEnable}
        >
          Jogar
        </button>
			</div>
		);
	}
}

export default Login;
