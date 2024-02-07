import React , { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/footer.css';

function Footer (){
    return (
        <div className="footer">
            <p>Copyright &#169; 2024 by Grazia Baiamonte | All Rights Reserved</p>
            <p>Project commissioned by Start2impact</p>
        </div>
    )
}

export default Footer