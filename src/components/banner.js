import React, {useEffect } from "react";
import { getBannerList } from "../actions/bannerAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import {
  Col,
  Row} from "react-bootstrap";

const Banner = () => {
    const listBanner = useSelector((state) => state.bannerList);
    const { loading, banner } = listBanner;
    const dispatch = useDispatch();
    useEffect(() => {
       
          dispatch(getBannerList());
      }, [dispatch]);
    
    return(
    <>
    <Row>
    {loading && <Loader />}
    {banner.map((banner, index) => (
                        <Col key={index}>
                          
                              
                                <h5 style={{color:"white"}}>{banner.banner_text_AR}</h5>
                                {/* <hr></hr>
                                <h3>{banner.banner_text_EN}</h3>
                                <hr></hr>
                                <h3>{banner.banner_text_FR}</h3>
                                <hr></hr>
                                <h3>{banner.banner_text_TR}</h3>
                                <hr></hr> */}
                        </Col>
                      ))}
                   </Row>
  
    </>)
};
 export default Banner