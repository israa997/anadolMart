
import axios from 'axios';
import React, {useState, useEffect, useCallback} from 'react';
import { Modal,Form} from 'react-bootstrap'; 
import './style.module.css';
import Loader from "../components/Loader";

function PrivacyPolicy() {
    const [privacy_policy, setprivacy_policy] = useState();
    const getPrivacyPolicy = useCallback( async _=>{
        const { data } = await axios.get('http://192.168.1.38:5000/api/home/privacy-policy');
        setprivacy_policy(data);
    } ,[] 
      );
    useEffect(()=> {
        getPrivacyPolicy();
    }, [getPrivacyPolicy])
    const [show, setShow] = useState(false);
  
    const toggle =() => {
        setShow(!show)
    }
return(
    <>
   
   <Form.Check type="checkbox" style={{display:"inline"}} required/> 
   <button type="button" style={{ textDecoration:"underline", textDecorationColor:"black", border:"none", marginLeft:"0.4rem"}} onClick={toggle}>سياسة الخصوصية</button>          
     {!privacy_policy ? (<Loader />): (
          privacy_policy.map((policy, index) => (
         <Modal show={show} onHide={toggle}  key={index}>
         <Modal.Header closeButton >
           <Modal.Title  dangerouslySetInnerHTML={{ __html: policy.header_ar}}></Modal.Title>
         </Modal.Header>
         <Modal.Body dangerouslySetInnerHTML={{ __html: policy.content_ar}}>
         </Modal.Body>
      </Modal>
          )))}

      
    </>
)};
export {PrivacyPolicy};


