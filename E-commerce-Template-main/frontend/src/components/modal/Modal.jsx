import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Modal as AntModal, Form, Input, Button, Flex } from "antd";

const Modal = ({ visible, onClose, data }) => {
  const { title, description, price, discountPrice, imageUrl } = data;
  const modalRoot = document.getElementById("modal-root");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Forgot Password Form Values:", values);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Forgot Password Form Error:", error);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    onClose();
  };
  return (
    <>
      <AntModal title={title} open={visible} onCancel={handleCancel}>
        <Flex>
          <div className="img-container">
            <img src={imageUrl} alt={title} />
          </div>
          <Flex></Flex>
        </Flex>
      </AntModal>
    </>
  );
};

export default Modal;
