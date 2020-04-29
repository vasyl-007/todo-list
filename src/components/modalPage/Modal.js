/** @jsx jsx */
import { Component, createRef } from "react";
import { jsx, css } from "@emotion/core";

/*
 **********************************
 * Styles
 **********************************
 */
const backdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const modal = css`
  padding: 16px;
  max-width: 480px;
  width: 100%;
  min-height: 320px;
  background-color: #fff;
`;

/*
 **********************************
 * Component
 **********************************
 */
export default class Modal extends Component {
  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.code !== "Escape") return;

    this.props.onClose();
  };

  handleBackdropClick = (e) => {
    const { current } = this.backdropRef;

    if (current && e.target !== current) {
      return;
    }

    this.props.onClose();
  };

  render() {
    return (
      <div
        css={backdrop}
        ref={this.backdropRef}
        onClick={this.handleBackdropClick}
      >
        <div css={modal}>{this.props.children}</div>
      </div>
    );
  }
}
