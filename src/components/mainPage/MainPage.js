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

  // editTask = (id, newTitle, newText) => {
  //   this.setState((prev) => ({
  //     allTasks: prev.allTasks.map((item) =>
  //       item.id === id
  //         ? { ...item, title: newTitle, text: newText }
  //         : { ...item }
  //     ),
  //   }));
  // };

  render() {
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
