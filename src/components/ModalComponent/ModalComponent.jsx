import { Modal } from "antd";
import React from "react";

const ModalComponent = ({
  title = "Modal",
  isOpen = false,
  children,
  onOk,
  handleCancelDelete,
  ...rests
}) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={handleCancelDelete}
      onOk={onOk}
      {...rests}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
