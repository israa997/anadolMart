import axios from 'axios';
import React, {useState,useEffect,useCallback} from 'react';
import {PrivacyPolicy} from './PrivacyPolicy.js';
import {SocialAccounts} from './socialAccount.js';
import {Button,Form, Col, Modal} from 'react-bootstrap'; 
import styles from './style.module.css';

function AnnounceEmail(){
 const[announceEmail, getEmail]=useState();
 const getAlreadyExistedEmail = useCallback( async _=>{
  const {data } = await axios.get('http://192.168.1.39:5000/api/home/announce-email');
  getEmail(data)
  for(var i = 0; i < data.length; i++){
    console.log(data[i].email);
  }
} ,[] 
);
console.log(announceEmail);
useEffect(()=> {
  getAlreadyExistedEmail();
}, [getAlreadyExistedEmail])


const [email, setEmail] = useState();
console.log( email);
const [str,setStr] = useState();
const post = async(e) => {
  
  try{
 e.preventDefault();
  await axios
  .post('http://192.168.1.39:5000/api/home/postAnnounce-email', {email});
 setStr("post");
  isPost(str);
  console.log(isPost(str));
} catch(error){
// alert(error);
console.log(error);
setStr("none");
isPost(str);
}
} 


const isPost = (str) => {
  if(str === "post") {
    return true;
  }
  else {
    return false;
  }
}

console.log(isPost(str))






const [showModal, setShow ]= useState(false);
const toggle =() => {
    setShow(!showModal)
}
     
    return(
       <div style={{float: 'right'}}> 
    <h4>E-newsletter</h4>     
           <p>Be the first to know about new product announcements,</p>
            <p>special events and online offers.</p>
        <Form  onSubmit={post}>
        <Form.Row>
        <Col xs="auto">
  <Form.Group controlId="formBasicEmail">
    <Form.Control 
    className={styles.formGroup}
            required
            type='email' 
            
            placeholder='Enter email'  
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
  </Form.Group>
  </Col>
  <Col xs="auto">
<Button type="submit" variant="outline-dark" onClick={toggle} className={styles.formGroup}>
  submit 
  </Button>
{
isPost(str)? 

<Modal show={showModal} onHide={toggle} centered>
        <Modal.Header closeButton centered>

          <Modal.Title  className={styles.modalTitle}>E-nwesletter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Successfully add it
        </Modal.Body>
      </Modal> :
      <Modal show={showModal} onHide={toggle} centered>
      <Modal.Header closeButton centered>

        <Modal.Title  className={styles.modalTitle}>E-nwesletter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         Unsuccessfully add it check the privacy or the email is already exist.
      </Modal.Body>
    </Modal>
      }

  </Col>
  </Form.Row>

  <Form.Row>
  <Col xs="auto">
  <Form.Group id="formBasicCheckbox">
  <PrivacyPolicy/>
  </Form.Group>
  </Col>
  </Form.Row>
</Form>
<div>
  <SocialAccounts/>
  </div>
    </div>
    );
}

export {AnnounceEmail};