import React, { useEffect } from "react";
import { createOrder } from "../../services/orderService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CheckoutSuccess = () => {
  const { success_token } = useParams();
  const navigate = useNavigate();

  const placeOrder = async (success_token) => {
    await createOrder(success_token);
    navigate("/orders");
  };

  useEffect(() => {
    if (success_token) {
      placeOrder(success_token);
    }
  }, []);

  return <div>Please Wait...Do not refresh</div>;
};

export default CheckoutSuccess;
