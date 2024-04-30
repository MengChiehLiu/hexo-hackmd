const axios = require('axios');


async function get_note(note_url, hackmd_token){
    const note_idx = note_url.split("/").pop();
    const note_api = `https://api.hackmd.io/v1/notes/${note_idx}`;
    const headers = {
        'Authorization': `Bearer ${hackmd_token}`
    }
    
    try{
        const response = await axios.get(note_api, {
            headers: headers
        });

        return response.data.content;
        
    }catch(error){
        throw error;
    }
};


async function get_img(img_url, hackmd_token){
    const headers = {
        'Authorization': `Bearer ${hackmd_token}`
    }

    try{
        const response = await axios.get(img_url, {
            responseType: 'stream',
            headers: headers
        });

        return response.data;
    }catch(error){
        throw error
    }
};


module.exports = {get_note, get_img};