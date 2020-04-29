import React, { Component } from "react";
import shortId from "shortid";
import moment from "moment";
import styles from "./Form.module.css";

const INITIAL_STATE = {
  task: { title: "", text: "" },
};

class Form extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = ({ target }) => {
    // console.log("target --------->", target);
    const { name, value } = target;
    this.setState({
      task: { ...this.state.task, [name]: value },
    });
  };

  handleSubmit = (e) => {
    const { task } = this.state;
    e.preventDefault();
    const newTask = {
      id: shortId.generate(),
      task,
      dated: moment().format("MMMM Do YYYY, h:mm:ss a"),
      check: false,
    };
    this.props.addTask(newTask);
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({
      task: {
        title: "",
        text: "",
      },
    });
  };
  
  render() {
    const { title, text } = this.state.task;
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          onChange={this.handleChange}
          value={title}
          className={styles.input}
          placeholder="Enter task..."
        />
        <input
          type="text"
          name="text"
          onChange={this.handleChange}
          value={text}
          className={styles.input}
          placeholder="Enter description..."
        />
        <button>Add task</button>
      </form>
    );
  }
}
export default Form;
