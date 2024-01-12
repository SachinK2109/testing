import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Flex, Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addProduct,
  updateProduct,
} from "../../../state/reducers/productSlice";
import {
  addAdminProduct,
  updateAdminProduct,
} from "../../../services/productDataService";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const uploadButton = (
  <button
    style={{
      border: 0,
      background: "none",
    }}
    type="button"
  >
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </button>
);

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const product = location.state || "";
  const onFinish = async (values) => {
    try {
      // Create an instance of FormData
      const formData = new FormData();

      // Append all form values to formData
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Handle file upload
      fileList.forEach((file) => {
        // Check if the file is an instance of File and append it
        if (file.originFileObj instanceof File) {
          formData.append("imageUrl", file.originFileObj);
        }
      });

      if (!location.pathname.includes("/edit")) {
        const newProduct = await addAdminProduct(formData);
        if (newProduct) {
          dispatch(addProduct(newProduct.data.data));
        }
      } else {
        const updatedProduct = await updateAdminProduct(product._id, formData);
        if (updatedProduct) {
          dispatch(updateProduct(updatedProduct.data.data));
        }
      }
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  useEffect(() => {
    if (product.imageUrl) {
      setFileList([
        {
          uid: "-1", // Unique ID for the file
          name: "Image", // File name
          status: "done", // File status
          url: product.imageUrl, // URL of the file
        },
      ]);
    }
  }, [product.imageUrl]);

  return (
    <Form
      encType="multipart/form-data"
      name="add_product_form"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        // Set the initial values here
        title: product.title || "",
        brand: product.brand || "",
        // imageUrl: product.imageUrl || "",
        category: product.category || "",
        description: product.description || "",
        price: product.price || "",
        discount: product.discount || "",
        quantity: product.quantity || "",
      }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input the product title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="brand"
        label="Brand"
        rules={[{ required: true, message: "Please input the brand!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="imageUrl" label="Image URL">
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: "Please input the category!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Flex>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item name="discount" label="Discount">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please input the quantity!" }]}
        >
          <InputNumber min={1} />
        </Form.Item>
      </Flex>

      <Form.Item style={{ margin: "0 10px 10px 10px" }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
          {location.pathname.includes("/edit")
            ? "Update Product"
            : "Add Product"}
        </Button>
        <Button
          type="primary"
          htmlType="button"
          onClick={() => {
            navigate("/admin");
          }}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProduct;
