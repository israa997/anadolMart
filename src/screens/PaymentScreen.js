import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
const PaymentScreen = ({ history }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [cvc, setCVC] = useState("");
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { cartItems } = cart;

  console.log(cart);

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  // const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      savePaymentMethod({
        cardHolderName,
        cardNumber,
        expireMonth,
        expireYear,
        cvc,
      })
    );
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 style={{ textAlign: "center" }}>Payment INFO</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="CARD HOLDER NAME">
          <Form.Label>CARD HOLDER NAME</Form.Label>
          <Form.Control
            type="text"
            placeholder="CARD HOLDER NAME"
            value={cardHolderName}
            required
            onChange={(e) => setCardHolderName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="CARD NUMBER">
          <Form.Label>CARD NUMBER</Form.Label>
          <Form.Control
            type="number"
            placeholder="CARD NUMBER"
            value={cardNumber}
            required
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </Form.Group>
        <Row style={{ whiteSpace: "nowrap", fontSize: ".8rem" }}>
          <Col md={4} sm={4} xs={4}>
            <Form.Group controlId="Expire Month">
              <Form.Label>Expire Month</Form.Label>
              <Form.Control
                type="number"
                placeholder="MM"
                value={expireMonth}
                required
                onChange={(e) => setExpireMonth(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4} sm={4} xs={4}>
            <Form.Group controlId="Expire Year">
              <Form.Label>Expire Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="YYYY"
                value={expireYear}
                required
                onChange={(e) => setExpireYear(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4} sm={4} xs={4}>
            <Form.Group controlId="CVC NUMBER">
              <Form.Label>CVC NUMBER</Form.Label>
              <Form.Control
                type="number"
                placeholder="CVC"
                value={cvc}
                required
                onChange={(e) => setCVC(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button block type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
