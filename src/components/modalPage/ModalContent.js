import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import styles from "./ModalContent.module.css";

export default class ModalContent extends Component {
  state = {
    isModalOpen: true,
    modalTitle: "",
    modalText: "",
    isEditableTitle: false,
    isEditableText: false,
  };

  componentDidMount() {
    const { title, text } = this.props.location.state.task.task;
    this.setState({
      modalTitle: title,
      modalText: text,
    });
  }

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.props.history.push("/main");

  changeEditMode = () => {
    this.setState({
      isEditableTitle: !this.state.isEditableTitle,
      isEditableText: !this.state.isEditableText,
    });
  };
  changeEditModeTitle = () => {
    this.setState({
      isEditableTitle: !this.state.isEditableTitle,
    });
  };
  changeEditModeText = () => {
    this.setState({
      isEditableText: !this.state.isEditableText,
    });
  };

  updateComponentValueTitle = () => {
    this.setState({
      isEditableTitle: false,
      modalTitle: this.refs.theTextInputTitle.value,
    });
  };

  updateComponentValueText = () => {
    this.setState({
      isEditableText: false,
      modalText: this.refs.theTextInputText.value,
    });
  };

  renderEditViewTitle = () => {
    return (
      <div className={styles.titleContainer}>
        <input
          type="text"
          defaultValue={this.state.modalTitle}
          ref="theTextInputTitle"
        />
        <button
          onClick={this.changeEditModeTitle}
          className={styles.innerButton}
        >
          Cancel
        </button>
        <button
          onClick={this.updateComponentValueTitle}
          className={styles.innerButton}
        >
          Save
        </button>
      </div>
    );
  };
  renderEditViewText = () => {
    return (
      <div className={styles.textContainer}>
        <input
          type="text"
          defaultValue={this.state.modalText}
          ref="theTextInputText"
        />
        <button
          onClick={this.changeEditModeText}
          className={styles.innerButton}
        >
          Cancel
        </button>
        <button
          onClick={this.updateComponentValueText}
          className={styles.innerButton}
        >
          Save
        </button>
      </div>
    );
  };

  renderDefaultViewTitle = () => {
    return (
      <div
        onDoubleClick={this.changeEditModeTitle}
        className={styles.titleContainer}
      >
        {this.state.modalTitle}
      </div>
    );
  };
  renderDefaultViewText = () => {
    return (
      <div
        onDoubleClick={this.changeEditModeText}
        className={styles.textContainer}
      >
        {this.state.modalText}
      </div>
    );
  };

  render() {
    const { id, dated } = this.props.location.state.task;
    const {
      modalTitle,
      modalText,
      isEditableTitle,
      isEditableText,
    } = this.state;

    return (
      <div>
        {this.state.isModalOpen && (
          <Modal onClose={this.closeModal}>
            {isEditableTitle
              ? this.renderEditViewTitle()
              : this.renderDefaultViewTitle()}
            {isEditableText
              ? this.renderEditViewText()
              : this.renderDefaultViewText()}
            <div className={styles.buttonsContainer}>
              <button onClick={this.changeEditMode} className={styles.button}>
                Edit
              </button>
              <button onClick={this.closeModal} className={styles.button}>
                Cancel
              </button>

              <NavLink
                to={{
                  pathname: "/main",
                  state: {
                    updatedTask: {
                      id: id,
                      task: {
                        title: modalTitle,
                        text: modalText,
                      },
                      dated: dated,
                    },
                  },
                }}
              >
                <button onClick={this.closeModal} className={styles.button}>
                  Save changes
                </button>
              </NavLink>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
