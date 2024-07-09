import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
export default function CSRFToken() {
    const [CSRFToken,setCSRFToken] = useState('')
    const getCookie = (name)=> {
        let cookieValue = null;
        console.log(document.cookie)
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                await axios.get('https://fullstack-forecast-forge-03fcfb305bcd.herokuapp.com/auth/csrf_cookie')
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
        setCSRFToken(getCookie('csrftoken'));
        
    },[])


    return (
        <input name='csrfmiddlewaretoken' value={CSRFToken} type='hidden'/>
    )
}
