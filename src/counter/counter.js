import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      count: 0,
    };
  }

  // Define an effect when the component mounts
  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  // Define an effect when the 'count' state updates
  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  // Event handler to increment the count
  increment = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  // Event handler to decrement the count
  decrement = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  };

  render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}

export default Counter;
