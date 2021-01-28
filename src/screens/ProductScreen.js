import React, { useState, useCallback } from "react";
import ReactImageMagnify from "react-image-magnify";
import SwiperCore, { Thumbs, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { BrowserView, MobileView } from "react-device-detect";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/thumbs/thumbs.min.css";
SwiperCore.use([Thumbs, Navigation, Pagination]);

const ProductScreen = ({ history, match }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeColorIndex] = useState(0);

  const [zIndex, setZIndex] = useState(9);
  const [sizeName, setSizeName] = useState('');
  const [selectedColor, setselectedColor] = useState('');

  const decreaseZindex = useCallback(() => {
    setZIndex(-9);
  }, []);
  const increaseZindex = useCallback(() => {
    setZIndex(9);
  }, []);

  const [qty, setQty] = useState(1);
  const [productImageUrl, setProductImageUrl] = useState("");

  const productsList = useSelector((state) => state.productList);
  const { loading, products, error } = productsList;

  const singleProductDetail = products.filter(
    (product) => product.product_slug_name === match.params.slug_name
  )[0];
  const addToCartHandler = () => {
    history.push(
      `/cart/${match.params.slug_name}?qty=${qty}&color=${selectedColor}&sizename=${sizeName}&imageUrl=${productImageUrl}`
    );
  };

  const changeIndex = (index) => {
    setColorIndex(index);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={singleProductDetail.ar_name} />
          <BrowserView>
            <Container>
              <Row>
                <Col md={1} lg={1} sm={1} xs={1}>
                  <Swiper
                    id="thumbs"
                    tag="section"
                    onSwiper={setThumbsSwiper}
                    spaceBetween={0}
                    slidesPerView={5}
                    direction="vertical"
                    wrapperTag="div"
                    style={{ width: "180%", height: "650px" }}
                  >
                    {singleProductDetail.productcolors[
                      colorIndex
                    ].productcolorimages.map((image, index) => {
                      return (
                        <SwiperSlide
                          key={index}
                          style={{
                            listStyle: "none",
                            height: window.innerHeight,
                          }}
                        >
                          <img
                            width="70vw"
                            height="100vh"
                            src={
                              process.env.REACT_APP_BACKEND_URL +
                              "products/" +
                              image.imageUrl
                            }
                            alt=""
                          />
                        </SwiperSlide>
                      );
                    })}
                    {singleProductDetail.productcolors[colorIndex] !==
                      undefined && (
                      <SwiperSlide>
                        <video
                          width="70vw"
                          height="100vh"
                          src={
                            process.env.REACT_APP_BACKEND_URL +
                            "products/" +
                            singleProductDetail.productcolors[colorIndex]
                              .video_Url
                          }
                        />
                      </SwiperSlide>
                    )}
                  </Swiper>
                </Col>
                <Col md={7} lg={5} sm={11} xs={11}>
                  <div style={{ width: "200%" }}>
                    <Swiper
                      tag="section"
                      wrapperTag="ul"
                      id="main"
                      thumbs={{ swiper: thumbsSwiper }}
                      spaceBetween={0}
                      slidesPerView={1}
                      onSlideChange={() => console.log("slide change")}
                      onSwiper={(swiper) => console.log(swiper)}
                    >
                      {singleProductDetail.productcolors[
                        colorIndex
                      ].productcolorimages.map((image, index) => {
                        return (
                          <SwiperSlide
                            key={index}
                            tag="li"
                            style={{ listStyle: "none", height: "100%" }}
                            onMouseOver={decreaseZindex}
                            onMouseOut={increaseZindex}
                            onClick={increaseZindex}
                          >
                            <ReactImageMagnify
                              {...{
                                smallImage: {
                                  alt: "",
                                  src:
                                    process.env.REACT_APP_BACKEND_URL +
                                    "products/" +
                                    image.imageUrl,
                                  width: 420,
                                  height: 720,
                                },
                                largeImage: {
                                  src:
                                    process.env.REACT_APP_BACKEND_URL +
                                    "products/" +
                                    image.imageUrl,
                                  width: 420 * 3,
                                  height: 720 * 3,
                                },
                              }}
                            />
                          </SwiperSlide>
                        );
                      })}
                      {singleProductDetail.productcolors[colorIndex] !==
                        undefined && (
                        <SwiperSlide
                          tag="li"
                          style={{ listStyle: "none" }}
                          onMouseOver={decreaseZindex}
                          onMouseOut={increaseZindex}
                          onClick={increaseZindex}
                        >
                          <video
                            width="420px"
                            height="720px"
                            controls
                            style={{ objectFit: "fill" }}
                            src={
                              process.env.REACT_APP_BACKEND_URL +
                              "products/" +
                              singleProductDetail.productcolors[colorIndex]
                                .video_Url
                            }
                          />
                        </SwiperSlide>
                      )}
                    </Swiper>
                  </div>
                </Col>
                <Col
                  md={4}
                  lg={4}
                  sm={12}
                  xs={12}
                  style={{ zIndex: zIndex }}
                  onMouseOver={increaseZindex}
                  onClick={increaseZindex}
                >
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{singleProductDetail.ar_name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price: $
                      {
                        singleProductDetail.countries[0].pricepercountry
                          .realPrice
                      }
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Description: {singleProductDetail.ar_description}
                    </ListGroup.Item>
                  </ListGroup>
                  <Col
                    style={{ marginTop: "1em", zIndex: zIndex }}
                    onMouseOver={increaseZindex}
                    onClick={increaseZindex}
                  >
                    <Row className="d-flex justify-content-center align-items-center">
                      <Col
                        className="d-flex justify-content-center align-items-center"
                        md={12}
                        lg={12}
                        sm={12}
                        xs={12}
                      >
                        <p>please pick a color: </p>
                      </Col>
                      <Row className="flex-nowrap">
                        {singleProductDetail.productcolors.map(
                          (color, index) => {
                            return (
                              <>
                                <Col
                                  key={index}
                                  md={6}
                                  lg={6}
                                  sm={6}
                                  xs={6}
                                  className="d-flex justify-content-center align-items-center"
                                >
                                  <div>
                                    <img
                                      onMouseOver={increaseZindex}
                                      style={{
                                        border:
                                          selectedColor === color.color_name
                                            ? `2px solid ${color.color_name}`
                                            : "",
                                      }}
                                      onClick={() => {
                                        setSizeColorIndex(0);
                                        setProductImageUrl(color.main_image_URL)
                                        changeIndex(index);
                                        setselectedColor(color.color_name);
                                        setSizeName(null);
                                      }}
                                      height="100px"
                                      width="70px"
                                      src={
                                        process.env.REACT_APP_BACKEND_URL +
                                        "products/" +
                                        color.main_image_URL
                                      }
                                      alt=""
                                    />
                                    <p className="colorFont d-flex justify-content-center align-items-center">
                                      <strong>{color.color_name}</strong>
                                    </p>
                                  </div>
                                </Col>
                              </>
                            );
                          }
                        )}
                      </Row>

                      <Col
                        className="d-flex justify-content-center align-items-center"
                        md={12}
                        lg={12}
                        sm={12}
                        xs={12}
                      >
                        <p>please pick a size: </p>
                      </Col>
                      <Row className="flex-nowrap">
                        <Col
                          className="d-flex justify-content-around align-items-center"
                          md={12}
                          lg={12}
                          sm={12}
                          xs={12}
                        >
                          {singleProductDetail.productcolors[
                            colorIndex
                          ].productcolorsizes.map((size, index) => (
                            <div
                              onClick={() => {setSizeName(size.size_name); setSizeColorIndex(index)}}
                              key={index}
                              style={{
                                border:
                                  sizeName === size.size_name
                                    ? "3px solid black"
                                    : "1px solid black",
                                width: "2em",
                                height: "2em",
                                textAlign: "center",
                                margin: "1rem",
                              }}
                            >
                              {size.size_symbol}
                            </div>
                          ))}
                        </Col>
                      </Row>
                    </Row>
                  </Col>
                  <Col
                    md={12}
                    lg={12}
                    sm={12}
                    xs={12}
                    style={{ zIndex: zIndex }}
                    onMouseOver={increaseZindex}
                    onMouseEnter={increaseZindex}
                  >
                    <Card>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Row>
                            <Col>Price:</Col>
                            <Col>
                              <strong>
                                $
                                {
                                  singleProductDetail.countries[0]
                                    .pricepercountry.realPrice
                                }
                              </strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Row>
                            <Col>Status:</Col>
                            <Col>
                            {console.log(singleProductDetail.productcolors[colorIndex]
                                .productcolorsizes[sizeIndex])}
                              {singleProductDetail.productcolors[colorIndex]
                                .productcolorsizes[sizeIndex].quantity > 0
                                ? "In Stock"
                                : "Out Of Stock"}
                            </Col>
                          </Row>
                        </ListGroup.Item>

                        {singleProductDetail.productcolors[colorIndex]
                          .productcolorsizes[sizeIndex].quantity > 0 && (
                          <ListGroup.Item>
                            <Row>
                              <Col>Quantity</Col>
                              <Col>
                                <Form.Control
                                  as="select"
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {[
                                    ...Array(
                                      singleProductDetail.productcolors[
                                        colorIndex
                                      ].productcolorsizes[sizeIndex].quantity
                                    ).keys(),
                                  ].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )}

                        <ListGroup.Item>
                          <Button
                            onClick={addToCartHandler}
                            className="btn-block"
                            type="button"
                            disabled={
                              singleProductDetail.productcolors[colorIndex]
                                .productcolorsizes[sizeIndex].quantity === 0 ||
                              !sizeName ||
                              !selectedColor
                            }
                          >
                            Add To Cart
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                </Col>
              </Row>
            </Container>
          </BrowserView>

          <MobileView>
            <Row>
              <Col>
                <Swiper
                  id="main"
                  key={singleProductDetail.productcolors[colorIndex].length}
                  navigation
                  pagination
                  style={{ width: "100%", height: "100%" }}
                  spaceBetween={0}
                  slidesPerView={1}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {singleProductDetail.productcolors[
                    colorIndex
                  ].productcolorimages.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={
                            process.env.REACT_APP_BACKEND_URL +
                            "products/" +
                            image.imageUrl
                          }
                          alt=""
                        />
                      </SwiperSlide>
                    );
                  })}
                  {singleProductDetail.productcolors[colorIndex] !==
                    undefined && (
                    <SwiperSlide
                      style={{ listStyle: "none" }}
                      onMouseOver={decreaseZindex}
                      onMouseOut={increaseZindex}
                    >
                      <video
                        autoPlay="true"
                        width="100%"
                        height="100%"
                        controls
                        style={{ objectFit: "fill" }}
                        src={
                          process.env.REACT_APP_BACKEND_URL +
                          "products/" +
                          singleProductDetail.productcolors[colorIndex]
                            .video_Url
                        }
                      />
                    </SwiperSlide>
                  )}
                </Swiper>
              </Col>
              <Col
                style={{ marginTop: "1em", zIndex: zIndex }}
                onMouseOver={increaseZindex}
                onClick={increaseZindex}
              >
                <Row className="d-flex justify-content-center align-items-center">
                  <Col
                    className="d-flex justify-content-center align-items-center"
                    md={12}
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <p>please pick a color: </p>
                  </Col>
                  <Row className="flex-nowrap">
                    {singleProductDetail.productcolors.map((color, index) => {
                      return (
                        <>
                          <Col
                            key={index}
                            md={6}
                            lg={6}
                            sm={6}
                            xs={6}
                            className="d-flex justify-content-center align-items-center"
                          >
                            <div>
                              <img
                                onMouseOver={increaseZindex}
                                style={{
                                  border:
                                    selectedColor === color.color_name
                                      ? `2px solid ${color.color_name}`
                                      : "",
                                }}
                                alt=""
                                onClick={() => {
                                  setSizeColorIndex(0)
                                  changeIndex(index);
                                  setselectedColor(color.color_name);
                                  setProductImageUrl(color.main_image_URL)
                                }}
                                height="100px"
                                width="70px"
                                src={
                                  process.env.REACT_APP_BACKEND_URL +
                                  "products/" +
                                  color.main_image_URL
                                }
                              />
                              <p className="colorFont d-flex justify-content-center align-items-center">
                                <strong>{color.color_name}</strong>
                              </p>
                            </div>
                          </Col>
                        </>
                      );
                    })}
                  </Row>

                  <Col
                    className="d-flex justify-content-center align-items-center"
                    md={12}
                    lg={12}
                    sm={12}
                    xs={12}
                  >
                    <p>please pick a size: </p>
                  </Col>
                  <Row className="flex-nowrap">
                    <Col
                      className="d-flex justify-content-around align-items-center"
                      md={12}
                      lg={12}
                      sm={12}
                      xs={12}
                    >
                      {singleProductDetail.productcolors[
                        colorIndex
                      ].productcolorsizes.map((size, index) => (
                        <div
                          onClick={() => {setSizeName(size.size_name); setSizeColorIndex(index)}}
                          key={index}
                          style={{
                            border:
                              sizeName === size.size_name
                                ? "3px solid black"
                                : "1px solid black",
                            width: "2em",
                            height: "2em",
                            textAlign: "center",
                            margin: "1rem",
                          }}
                        >
                          {size.size_symbol}
                        </div>
                      ))}
                    </Col>
                  </Row>
                </Row>
              </Col>
              <Col md={12}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{singleProductDetail.ar_name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price: $
                    {singleProductDetail.countries[0].pricepercountry.realPrice}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: {singleProductDetail.ar_description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>
                            $
                            {
                              singleProductDetail.countries[0].pricepercountry
                                .realPrice
                            }
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {singleProductDetail.productcolors[colorIndex]
                            .productcolorsizes[sizeIndex].quantity > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {singleProductDetail.productcolors[colorIndex]
                      .productcolorsizes[sizeIndex].quantity > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[
                                ...Array(
                                  singleProductDetail.productcolors[colorIndex]
                                    .productcolorsizes[sizeIndex].quantity
                                ).keys(),
                              ].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                        disabled={
                          singleProductDetail.productcolors[colorIndex]
                            .productcolorsizes[sizeIndex].quantity === 0 ||
                          !sizeName ||
                          !selectedColor
                        }
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </MobileView>
        </>
      )}
    </>
  );
};

export default ProductScreen;
