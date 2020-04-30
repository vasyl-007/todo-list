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
    const { id, task: {title, text} } = this.props.location.state.updatedTask;
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
  };

  // componentDidUpdate(prevState, prevProps) {
  //   console.log("prevState++++", prevState);
  //   console.log("this.state++++", this.state);
  //   console.log("prevProps++++", prevProps);
  //   console.log("this.Props++++", this.props);

  // if (prevState.location.state !== null) {
  //   const { title, text } = prevState.location.state.updatedTask.task;
  //   const { id } = prevState.location.state.updatedTask;
  //   const { allTasks } = this.state;
  //   const taskToUpdate = allTasks.find((taskItem) => taskItem.id === id);

  //   if (title === taskToUpdate.title && text === taskToUpdate.text) {
  //     return;
  //   } else this.updateTaskAfterCorrection();
  // this.setState({
  //   allTasks: allTasks.map((task) =>
  //     task.id === id
  //       ? {
  //           ...task,
  //           task: {
  //             title: title,
  //             text: text,
  //           },
  //         }
  //       : { ...task }
  //   ),
  // });
  // }
  // if (prevState.allTasks !== this.state.allTasks) {
  //   if (prevState.location.state && this.state) {
  //     const { allTasks } = this.state;

  //     if (prevState.allTasks !== this.state.allTasks) {
  //       console.log("re-render *****************");
  //       const { id } = this.props.location.state.updatedTask;
  //       const { title, text } = this.props.location.state.updatedTask.task;

  //       const currentTask = allTasks.find((task) => task.id === id);
  //       console.log("currentTask ----", currentTask);

  //       if (currentTask.title !== title || currentTask.text !== text) {
  //         this.setState({
  //           allTasks: allTasks.map((task) =>
  //             task.id === id
  //               ? {
  //                   ...task,
  //                   task: {
  //                     title: title,
  //                     text: text,
  //                   },
  //                 }
  //               : { ...task }
  //           ),
  //         });
  //       } else return;
  //     }
  //   }
  // }
  // }

  // componentDidUpdate(prevState, prevProps) {
  //   const { allTasks } = this.state;

  //   if (this.prevState.location.state) {
  //     const { id } = prevState.location.state.updatedTask;
  //     const { title, text } = prevState.location.state.updatedTask.task;

  //     const currentTask = allTasks.find((task) => task.id === id);
  //     //   console.log("currentTask ----", currentTask);

  //     if (currentTask.title !== title || currentTask.text !== text) {
  //       this.setState({
  //         allTasks: allTasks.map((task) =>
  //           task.id === id ? { ...task, title, text } : { ...task }
  //         ),
  //       });
  //     }
  //   }
  // }

  // if (prevState.location.state.updatedTask.task.title !== this.state) {
  //   const { allTasks } = this.state;
  //   const { id } = this.props.location.state.updatedTask;
  //   const currentTask = allTasks.find((task) => task.id === id);
  //   this.setState({
  //     allTasks: allTasks.map((t) =>
  //       t.id === id ? { ...currentTask } : { ...t }
  //     ),
  //   });

  // const { allTasks } = this.state;
  // if (this.props.location.state) {
  //   // const { id } = this.props.location.state.updatedTask;
  //   const { id } = this.props.location.state.updatedTask;
  //   const currentTask = allTasks.find((task) => task.id === id);
  //   console.log("currentTask ----", currentTask);
  // }
  // console.log("prevState++++", prevState);
  // console.log("this.state++++", this.state);
  // console.log("prevProps++++", prevProps);

  // if(prevState.location.state.updatedTask.id === id) {
  //   allTasks.map((t) => {
  //     t.id === id ? ({...t, title !== task.title}) : ({...t})
  //         ? { ...t, title: this.props.location.state.updatedTask.task.title }
  //         : { ...t },
  //       t.text !== this.props.location.state.updatedTask.task.text
  //         ? { ...t, text: this.props.location.state.updatedTask.task.text }}

  // }
  // editTask = () => {
  //   const {
  //     id,
  //     task: { title, text },
  //     dated,
  //   } = this.props.location.state.updatedTask;
  //   this.setState((prev) => ({
  //     allTasks: prev.allTasks.map((item) =>
  //       item.id === id ? { ...item, title, text, dated } : { ...item }
  //     ),
  //   }));
  // };

  render() {
    const { allTasks } = this.state;
    console.log("allTasks", allTasks);

    return (
      <section className={styles.container}>
        <h3 className={styles.header}>All tasks</h3>
        <Form addTask={this.putToAllTasks} />

        <button onClick={this.updateTaskAfterCorrection}>
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
