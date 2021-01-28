 // eslint-disable-next-line
import axios from 'axios';
import React, {useState, useEffect, useCallback} from 'react';
import './style.module.css';
function SocialAccounts (){
    const [socialAccount, fetchSocialAccount]= useState();
    const getSocialAccounts = useCallback(
        async _=> {
            const {data} = await axios.get('http://192.168.1.39:5000/api/home/social-accounts');
        fetchSocialAccount(data);
    } ,[]
    );

    useEffect(() => {
        getSocialAccounts();
    },[getSocialAccounts]); 
    
    return (
   
       <>
       <div>
        <h3>Follow Us</h3>
         { !socialAccount ? (<p>loading...</p>):(
         <div>
        <span> <a className="fab fa-instagram fa-2x" rel="noreferrer" target="_blank" href = {socialAccount[0].instagram_URL}> </a></span>
        <span> <a className="fab fa-facebook fa-2x" rel="noreferrer" target="_blank" href= {socialAccount[0].facebook_URL}> </a></span>
        <span> <a className="fab fa-twitter fa-2x" rel="noreferrer" target="_blank" href= {socialAccount[0].twitter_URL}> </a></span>
        <span> <a className="fab fa-youtube-square fa-2x" rel="noreferrer" target="_blank" href= {socialAccount[0].youtube_URL}> </a></span>
        <span> <a className="fab fa-pinterest-p fa-2x" rel="noreferrer" target="_blank" href= {socialAccount[0].pintrest_URL}> </a></span>
        <span> <a className="fab fa-tumblr fa-2x "  rel="noreferrer" target="_blank" href= {socialAccount[0].tumblr_URL}> </a></span>
        <span> <a className="fab fa-telegram-plane fa-2x" rel="noreferrer" target="_blank" href= {socialAccount[0].telegram_URL}> </a></span>
       <div>
           <p></p>
            <h3>contact number</h3>
        <span style={{desply: 'block'}}><a href = {'tel:' + socialAccount[0].phoneNum}>{socialAccount[0].phoneNum}</a></span>
        </div>
</div>
        
     
      

        )} </div>
       
   </>
   );
}
 export {SocialAccounts};