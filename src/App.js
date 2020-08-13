import React, { Component } from 'react';
import './App.css';
import Result from './containers/Result';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			wheelArr: [
				76,
				67,
				85,
				90,
				80,
				79,
				72,
				76,
				93,
				84,
				100,
				95,
				92,
				83,
				35,
				30,
				44,
				70,
				52,
				69,
				57,
				42,
				59,
				49,
				74,
				57,
				68,
				67,
				53,
				57,
				30,
				61,
				48,
				53,
				57,
				48,
				55,
				40,
				35,
				44,
				61,
				60,
				50,
				63,
				65,
				54,
				56,
				58,
				34,
				32,
				38,
				51,
				46,
				33,
				41,
				28,
				45,
				78,
				90,
				81,
				80,
				92,
				24
			],
			x: '',
			resArr: [],
			isPressed: false
		};
	}

	handleChange = (e) => {
		this.setState({
			x: e.target.value,
			resArr: [],
			isPressed: false
		});
	};

	searchForResults = (e) => {
		e.preventDefault();
		let resArr = [],
			{ wheelArr, x } = this.state;

		for (let i = 0; i < wheelArr.length; i++)
			for (let j = 0; j < wheelArr.length; j++)
				for (let k = 0; k < wheelArr.length; k++)
					for (let l = 0; l < wheelArr.length; l++) {
						if (
							wheelArr[l] / wheelArr[k] * (wheelArr[j] / wheelArr[i]) === x / 24 &&
							i !== j &&
							i !== k &&
							i !== l &&
							j !== k &&
							j !== l &&
							k !== l &&
							(wheelArr[i] > 19 && wheelArr[i] < 46)
						) {
							let next = { a: wheelArr[i], b: wheelArr[j], c: wheelArr[k], d: wheelArr[l] };

							if (JSON.stringify(resArr).indexOf(JSON.stringify(next)) < 0) {
								resArr.push(next);
							}
						}
					}

		this.setState({
			isPressed: true,
			resArr: resArr
		});
	};

	componentDidMount() {
		const wheelArr = this.state.wheelArr.sort((a, b) => {
			return a - b;
		});

		this.setState({
			wheelArr: wheelArr
		});
	}

	render() {
		const { resArr, x, isPressed } = this.state;
		let outputContent, info;

		if (x === '') {
			info = <div className="input__info input__info--neutral">Uzupełnij pole!</div>;
			outputContent = <div className="output__info output__info--neutral">Tutaj pokażą się wyniki.</div>;
		} else if (resArr.length !== 0) {
			info = (
				<div className="input__info input__info--good">
					Dla wartości {x} uzyskano: {resArr.length} wyników.
				</div>
			);
			outputContent = resArr.map((item, i) => <Result a={item.a} b={item.b} c={item.c} d={item.d} key={i} />);
		} else if (resArr.length === 0 && isPressed) {
			outputContent = (
				<div className="output__info output__info--bad">
					Niestety!<br />Dla wartości {x} nie uzyskano żadnych wyników.
				</div>
			);
			info = <div className="input__info input__info--bad">Niestety! Brak wyników!</div>;
		} else {
			outputContent = <div className="output__info output__info--neutral">Tutaj pokażą się wyniki.</div>;
			info = <div className="input__info input__info--neutral">Naciśnij "Podaj wyniki"</div>;
		}

		return (
			<div>
				<div className="input">
					<form onSubmit={this.searchForResults}>
						<input
							type="number"
							onChange={this.handleChange}
							className="input__search-number"
							placeholder="Szukana liczba"
						/>
						<input type="submit" value="Zatwierdź" className="input__search-submit" />
						{info}
					</form>
				</div>
				<div className="output">{outputContent}</div>
			</div>
		);
	}
}

export default App;
