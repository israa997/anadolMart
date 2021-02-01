
import axios from 'axios';
import React, {useState, useEffect, useCallback} from 'react';
import styles from './style.module.css';
import { Modal,Form} from 'react-bootstrap'; 

function PrivacyPolicy() {
    const [privacy_policy, setprivacy_policy] = useState();
    const getPrivacyPolicy = useCallback( async _=>{
        const { data } = await axios.get('http://192.168.1.39:5000/api/home/privacy-policy');
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
         <Modal show={show} onHide={toggle} centered>
          
         <Modal.Header closeButton centered>

           <Modal.Title  className={styles.modalTitle}>{privacy_policy[0].header_ar}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
             {privacy_policy[0].content_ar}
         </Modal.Body>
      </Modal>
     )}

      
    </>
)};
export {PrivacyPolicy};


//{ privacy_policy.map((p) => (p.header_ar ))}