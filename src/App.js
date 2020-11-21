import React, { Component } from "react";
import "./App.css";
import {
  faShoppingCart,
  faPlusCircle,
  faMinusCircle,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class App extends Component {
  state = {
    cart: 0,
    counters: [
      { value: 0, id: "0", item: 0 },
      { value: 0, id: "1", item: 0 },
      { value: 0, id: "2", item: 0 },
      { value: 0, id: "3", item: 0 },
    ],
  };
  reset = () => {
    this.setState((prevState) => {
      let newCounters = prevState.counters.map((counter, id) => {
        counter.value = 0;
        counter.item = 0;
        return counter;
      });
      return { counters: newCounters, cart: 0 };
    });
  };
  incr = (e) => {
    const { id } = e.target;
    let Addcart = 0;
    this.setState((prevState) => {
      //copy counter array
      //const newCounter = [...prevState.counter];
      const newCounters = prevState.counters.map((counter) => {
        if (counter.id === id) {
          counter.value += 1;
          if (counter.item !== 1) {
            counter.item = 1;
            Addcart = 1;
          }
          return { ...counter };
        }
        return { ...counter };
      });
      console.log(newCounters);
      return { counters: newCounters, cart: prevState.cart + Addcart };
    });
  };

  decr = (e) => {
    let Subcart = 0;
    const { id } = e.target;
    this.setState((prevState) => {
      const newCounters = prevState.counters.map((counter) => {
        if (counter.id === id) {
          counter.value -= 1;
          if (counter.item === 1 && counter.value === 0) {
            counter.item = 0;
            Subcart = 1;
          }
          return { ...counter };
        }
        return { ...counter };
      });

      console.log(newCounters);
      return { counters: newCounters, cart: prevState.cart - Subcart };
    });
  };

  render() {
    const { counters, cart } = this.state;

    return (
      <div className="App">
        <div className="header">
          <div className="header-items">
            <span>
              <FontAwesomeIcon icon={faShoppingCart} />
            </span>
            <span className="result">{cart}</span>
            <span className="items">Items</span>
          </div>
        </div>

        <div className="reset">
          <button className="reset-button" onClick={this.reset}>
            <FontAwesomeIcon icon={faSyncAlt} />
          </button>
        </div>

        <div className="counters ">
          {counters.map(({ id, value }) => (
            <Counter
              className="row"
              key={id}
              id={id}
              counter={value}
              incr={this.incr}
              decr={this.decr}
            />
          ))}
        </div>
      </div>
    );
  }
}
function Counter(props) {
  const { counter, incr, decr, id } = props;
  return (
    <div className="item-counter">
      <div className="count">
        {counter === 0 && <h1 className="zero-item">Zero</h1>}
        {counter !== 0 && <h1 className="item">{counter}</h1>}
      </div>
      {/* <h1>{counter}</h1> */}
      <button className="add-item" id={id} onClick={incr}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>
      {counter === 0 && (
        <button className="delete-item">
          <FontAwesomeIcon icon={faMinusCircle} />
        </button>
      )}
      {counter !== 0 && (
        <button className="delete-item" id={id} onClick={decr}>
          <FontAwesomeIcon icon={faMinusCircle} />
        </button>
      )}
    </div>
  );
}
