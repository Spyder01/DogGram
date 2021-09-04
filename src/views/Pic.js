import React from 'react';
import {useLocation } from 'react-router-dom';


const Image = ()=>{
    console.log("hi")
    const {state} = useLocation ();

    return (
        <div>
            <img src={state.url} alt="Dog" />
        </div>
    )
}

export default Image;