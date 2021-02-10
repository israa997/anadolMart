
import axios from 'axios';
import React, {useState, useEffect, useCallback} from 'react';
import styles from './style.module.css';
import { Modal,Form} from 'react-bootstrap'; 

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
   
   <Form.Check type="checkbox" label="Privacy Policy" required onClick={toggle}  className={styles.formCheckInput}/>        
     {!privacy_policy ? (<p>loading....{/*translate*/} </p>): (
          privacy_policy.map((policy, index) => (
         <Modal show={show} onHide={toggle} centered key={index}>
          
         <Modal.Header closeButton centered>

           <Modal.Title  className={styles.modalTitle} dangerouslySetInnerHTML={{ __html: policy.header_ar}}></Modal.Title>
         </Modal.Header>
         <Modal.Body dangerouslySetInnerHTML={{ __html: policy.content_ar}}>
         </Modal.Body>
      </Modal>
          )))}

      
    </>
)};
export {PrivacyPolicy};


