import React from 'react'

class Timer extends React.Component {
	constructor() {
		super();

		this.state = {
			time: 30,
		}
	}

  render() {
    const { time } = this.state;
		setTimeout(() => {
			if(time > 0) {
				this.setState((prev) => ({
					time: prev.time - 1,
				}));
			}
		}, 1000)
		return (
			<p>Timer: {time}</p>
		)
  }
}

export default Timer;
