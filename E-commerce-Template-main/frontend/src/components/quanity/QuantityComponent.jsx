import React, { useState } from "react";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../state/reducers/cartSlice";
import { updateCart } from "../../services/cartDataService";

const QuantityComponent = ({ productId, quantity }) => {
  const dispatch = useDispatch();
  // const [quantity, setQuantity] = useState(1); // Initial quantity

  const increaseQuantity = async () => {
    // setQuantity((prevQuantity) => prevQuantity + 1);
    await updateCart(productId, quantity + 1);
    dispatch(updateQuantity({ productId: productId, quantity: quantity + 1 }));
  };

  const decreaseQuantity = async () => {
    await updateCart(productId, quantity - 1);
    dispatch(updateQuantity({ productId: productId, quantity: quantity - 1 }));
  };

  const onQuantityChange = async (e) => {
    await updateCart(productId, e.target.value);
    dispatch(
      updateQuantity({ productId: productId, quantity: e.target.value })
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button onClick={decreaseQuantity} disabled={quantity <= 1}>
        -
      </Button>
      <Input
        style={{ width: 40, textAlign: "center" }}
        min={1}
        value={quantity}
        onChange={onQuantityChange}
      />
      <Button onClick={increaseQuantity}>+</Button>
    </div>
  );
};

export default QuantityComponent;
