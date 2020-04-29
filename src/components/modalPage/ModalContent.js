import React, { Component } from "react";
import Modal from "./Modal";
// import { TodoList } from "../mainPage/TodoList";

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
  // closeModal = () => this.setState({ isModalOpen: false });

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
      <div>
        <input
          type="text"
          defaultValue={this.state.modalTitle}
          ref="theTextInputTitle"
        />
        <button onClick={this.changeEditModeTitle}>Cancel</button>
        <button onClick={this.updateComponentValueTitle}>Save</button>
      </div>
    );
  };
  renderEditViewText = () => {
    return (
      <div>
        <input
          type="text"
          defaultValue={this.state.modalText}
          ref="theTextInputText"
        />
        <button onClick={this.changeEditModeText}>Cancel</button>
        <button onClick={this.updateComponentValueText}>Save</button>
      </div>
    );
  };

  renderDefaultViewTitle = () => {
    return (
      <div onDoubleClick={this.changeEditModeTitle}>
        {this.state.modalTitle}
      </div>
    );
  };
  renderDefaultViewText = () => {
    return (
      <div onDoubleClick={this.changeEditModeText}>{this.state.modalText}</div>
    );
  };

  render() {
    // const { title, text } = this.props.location.state.task.task;
    const {
      modalTitle,
      modalText,
      isEditableTitle,
      isEditableText,
    } = this.state;
    // console.log("this.props", this.props);
    // console.log("this.state.isModalOpen", this.state.isModalOpen);

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

            {/* <div>
              <input
              type="text"
               defaultValue={this.state.modalTitle}
              // ref={this.}
                onDoubleClick={this.changeEditMode}
              
                {modalTitle}
              />
              <button onClick={this.changeEditMode}>Cancel</button>
              <button onClick={this.updateComponentValueTitle}>Save</button>
            </div>

            <p onDoubleClick={this.changeEditMode}>{modalText}</p> */}
            <button onClick={this.changeEditMode}>Edit</button>
            <button onClick={this.closeModal}>Save changes</button>
          </Modal>
        )}
      </div>
    );
  }
}
