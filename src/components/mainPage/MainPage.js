import React, { Component } from "react";
// import shortId from "shortid";
import styles from "./MainPage.module.css";
import { TodoList } from "./TodoList";
import Form from "./Form";

class MainPage extends Component {
  state = {
    allTasks: [],
  };

  componentDidMount() {
    const storageTasksUnparsed = localStorage.getItem("tasks");
    const storageTasks = JSON.parse(storageTasksUnparsed);
    if (storageTasks) {
      this.setState({
        allTasks: storageTasks,
      });
    }
    if (this.props.location.state.updatedTask) this.editTask();
  }

  putToAllTasks = async (newTask) => {
    await this.setState({
      allTasks: [newTask, ...this.state.allTasks],
    });
    localStorage.setItem("tasks", JSON.stringify(this.state.allTasks));
  };

  deleteTask = (id) => {
    // console.log("id--------->", id);
    this.setState((prev) => ({
      allTasks: prev.allTasks.filter((item) => item.id !== id),
    }));
  };

  checkChange = (id) => {
    this.setState((prev) => ({
      allTasks: prev.allTasks.map((item) =>
        item.id === id ? { ...item, check: !item.check } : { ...item }
      ),
    }));
  };

  componentDidUpdate(prevState) {
    // console.log("update ---->");
    // console.log("prevState", prevState);
    // console.log("this.state", this.state);

    if (prevState.comments !== this.state.comments) {
      localStorage.setItem("comments", JSON.stringify(this.state.comments));
    }
  }
  editTask = () => {
    const { id, title, text, dated } = this.props.location.state.updatedTask;
    this.setState((prev) => ({
      allTasks: prev.allTasks.map((item) =>
        item.id === id ? { ...item, title, text, dated } : { ...item }
      ),
    }));
  };

  render() {
    // this.editTask();
    // {
    //   this.props.location.state.updatedTask
    //     ? () => {
    //         this.editTask();
    //       }
    //     : null;
    // }
    // const { task } = this.props.location.state.task;

    console.log("!!!!! updated task", this.props.location.state.updatedTask);

    const { allTasks } = this.state;
    console.log("allTasks", allTasks);
    // console.log("allTasks", allTasks);
    return (
      <section className={styles.container}>
        <h3 className={styles.header}>All tasks</h3>
        <Form addTask={this.putToAllTasks} />

        {allTasks.length > 0 && (
          <TodoList
            tasks={allTasks}
            deleteTask={this.deleteTask}
            checkChange={this.checkChange}
            // editTask={this.editTask}
          />
        )}
      </section>
    );
  }
}

export default MainPage;
