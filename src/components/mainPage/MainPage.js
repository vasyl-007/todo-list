import React, { Component } from "react";
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

  updateTaskAfterCorrection = () => {
    if (this.props.location.state) {
      const {
        id,
        task: { title, text },
      } = this.props.location.state.updatedTask;
      const { allTasks } = this.state;
      this.setState({
        allTasks: allTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                task: {
                  title: title,
                  text: text,
                },
              }
            : { ...task }
        ),
      });
    }
  };

  render() {
    const { allTasks } = this.state;
    console.log("allTasks", allTasks);

    return (
      <section className={styles.container}>
        <h3 className={styles.header}>All tasks</h3>
        <Form addTask={this.putToAllTasks} />

        <button
          className={styles.button}
          onClick={this.updateTaskAfterCorrection}
        >
          Show updated tasks
        </button>

        {allTasks.length > 0 && (
          <TodoList
            tasks={allTasks}
            deleteTask={this.deleteTask}
            checkChange={this.checkChange}
          />
        )}
      </section>
    );
  }
}

export default MainPage;
