import React from 'react';

export function getError(error) {
    let message = [];
    for (let key in error) {
        message.push(error[key]);
    }
    return(
        message.map((el, i)=>{
            return (
                <p key={i}>{el}</p>
            )
        })
    )
}

export function convertMinutes(minutes) {
    return `(${Math.floor(minutes/24/60)}d ${Math.floor(minutes/60%24)}h ${Math.floor(minutes%60)}m)`;
}

export function isArray(arr) {
    return arr && arr.length && arr.length > 0;
}

export function hasExtension(fileName, exts) {
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
}