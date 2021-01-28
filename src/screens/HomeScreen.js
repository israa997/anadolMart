import React from "react";
import styles from '../home.module.css';
import { Link } from "react-router-dom";
import "../index.css";
import { useSelector } from "react-redux";
import { Row, Col, Nav, Image } from "react-bootstrap";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const productsList = useSelector((state) => state.productList);
  const { loading, products } = productsList;
  console.log(products.length);

  const isMobile = window.innerWidth <= 500;
  return (
    <>
      {!isMobile && (
        <Nav className="justify-content-center" style={{ fontSize: "1.5em" }}>
          <Nav.Item>
            <LinkContainer to="abiye">
              <Nav.Link>abiye</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="uzun">
              <Nav.Link>uzun</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="yazlık">
              <Nav.Link>yazlık</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="kısa">
              <Nav.Link>kısa</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="tesettür">
              <Nav.Link>tesettür</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="dantel">
              <Nav.Link>dantel</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="düğün">
              <Nav.Link>düğün</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="mezuniyet">
              <Nav.Link>mezuniyet</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="midi boy">
              <Nav.Link>midi boy</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      )}

      <Meta />

      <ProductCarousel />
      <br />
      <Row>
        <Col lg={5} md={12} sm={12} xs={12}>
          <Image
            style={{ height: "87%" }}
            fluid
            className="d-block w-100"
            src={
              process.env.REACT_APP_BACKEND_URL +
              "advertisment/71cfae9b-5013-41f0-beb6-f072232d1c0e.jpg"
            }
            alt=""
          />
        </Col>
        <Col md={12} lg={7}>
          <Row>
              {loading ? (
                <Loader />
              ) : (
                products.map((product, index) => {
                  return <Col key={index} lg={4} md={4} sm={6} xs={6}>
                   <div className={styles.container}>
                    <i id={styles.icon} className="far fa-heart fa-2x" aria-hidden="true"></i>
                    <Link to={`/product/${product.product_slug_name}`}>
                    <img 
                      src={
                        process.env.REACT_APP_BACKEND_URL +
                        `products/${product.productcolors[0].main_image_URL}`
                      }
                      alt=""
                      className="d-block w-100 "
                    />
                    </Link>    
                  </div>
                </Col>
                  }
                
                )
              
              )}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
