import React, {useEffect } from "react";
import { getAboutList } from "../actions/aboutAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";

import {
  Col,
  Row,
  Container} from "react-bootstrap";

const About = () => {
  const listAbout = useSelector((state) => state.aboutList);
  const { loading, error, about } = listAbout;
  let aboutId = about.map((about) => about.id);
  console.log(aboutId);

  const dispatch = useDispatch();
  console.log(loading, error, about);
  useEffect(() => {
    dispatch(getAboutList());
  }, [dispatch]);

  return (
    <Container fluid  lg={12} md={12} sm={12} xs={12}>
      {loading && <Loader />}

      <Row>
        {about.map((a, index) => (
          <Col key={index}>
            {/* <Container
              style={{
                minWidth: 500,
                maxWidth: 1000,
                minHeight: 500,
                maxHeight: 1000,
                margin: 5,
                padding: 10,
              }}
            >
              <h1 dir="rtl">{a.header_ar}</h1>
              <hr></hr>
              <p
                dangerouslySetInnerHTML={{ __html: a.content_ar }}
                dir="rtl"
              ></p>
            </Container>

            <Container
              style={{
                minWidth: 500,
                maxWidth: 1000,
                minHeight: 500,
                maxHeight: 1000,
                margin: 5,
                padding: 10,
              }}
            >
              <h1>{a.header_fr}</h1>
              <hr></hr>
              <p dangerouslySetInnerHTML={{ __html: a.content_fr }}></p>
            </Container>

            <Container
              style={{
                minWidth: 500,
                maxWidth: 1000,
                minHeight: 500,
                maxHeight: 1000,
                margin: 5,
                padding: 10,
              }}
            >
              <h1>{a.header_tr}</h1>
              <hr></hr>
              <p dangerouslySetInnerHTML={{ __html: a.content_tr }}></p>
            </Container> */}

            <Container>
              <h1>{a.header_ar}</h1>
              <hr></hr>
    <p dangerouslySetInnerHTML={{ __html: a.content_ar }}></p>
            </Container>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default About;
