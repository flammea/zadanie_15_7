class Stopwatch extends React.Component {
  constructor() {
    super();
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      history: []
    };
    this.start = this.start.bind(this);
    this.step = this.step.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.resetList = this.resetList.bind(this);
    this.add = this.add.bind(this);
  }

  reset() {
    this.setState ({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  format(time) {
    return (`${pad0(time.minutes)}:${pad0(time.seconds)}:${pad0(Math.floor(time.miliseconds))}`);
  }

  start() {
    if (!this.state.running) {
      this.setState ({
        running: true
      });
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) {
      return;
    }
    this.calculate();
  }

  calculate() {
    const times = this.state.times;
    times.miliseconds += 1;
    if (times.miliseconds >= 100) {
      times.seconds += 1;
      times.miliseconds = 0;
    }
    if (times.seconds >= 60) {
      times.minutes += 1;
      times.seconds = 0;
    }
    this.setState({
      times
    });
  }

  stop() {
    this.setState({
      running: false
    });
    clearInterval(this.watch);
  }

  add() {
    const history = this.state.history;
    history.push(this.state.times);
    this.setState({
      history
    });
    this.reset();
  }

  resetList() {
    this.reset();
    this.setState({
      history: []
    });
  }

 render() {
	return (
            <div className = {'stoper'}>
            <h1>Timer!</h1>
            <nav className = {'controls'}>
                <a href = {'#'} className = {'button'} id = {'start'} onClick = {this.start}>Start</a>
                <a href = {'#'} className = {'button'} id = {'stop'} onClick = {this.stop}>Stop</a>
                <a href = {'#'} className = {'button'} id = {'resetbtn'} onClick = {this.reset}>Reset</a>
            </nav>
            <div className = {'stopwatch'}>{this.format(this.state.times)}</div>
            <a href = {'#'} className = {'button'} id = {'add'} onClick = {this.add}>Add to list</a>
            <a href = {'#'} className = {'button'} id = {'reset_list'} onClick = {this.resetList}>Reset results</a>
            <ul className = {'results'}>
          		{this.state.history.map((time, index) => <li key={index}>{this.format(time)}</li>)}
            </ul>
        </div>
    )
   }
}   

const pad0 = (value) => {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

ReactDOM.render(
  <Stopwatch />,
  document.getElementById('app')
);