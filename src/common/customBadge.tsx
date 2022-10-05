import * as React from 'react';
import { Component } from 'react';

interface Props{
    size:number,
    color:any,
    label:string,
    lableStyle:any
}
const CustomBadge  = (props:Props) =>{
    const {size,color,label,lableStyle}=props
    return (
        <div className="flex flex-row" style={{alignItems:'center'}}>
            <div style={{display:'flex',width:size||7,height:size||7,backgroundColor:color||'red',borderRadius:"50%"}}/>
            <label style={lableStyle||{marginLeft:3,fontSize:14}}>{label ? label : ''}</label>     
      </div>
    );
}

export default CustomBadge