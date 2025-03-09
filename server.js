const express = require('express');
const Dropbox = 
require('dropbox').Dropbox;
const fetch =
require('node-fetch')
require('dotenv').config()

const app = express()
const dbx = new 
Dropbox({accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch })
app.get('/songs/:album/:song', async (req, res) =>{
    try {
        const {album, song} = req.params;
        const filePath = '/songs/${album}/${song}';
        const response = await dbx.filesGetTemporaryLink({path: filePath })
        res.json({url:response.result.link})
    } catch (error){
     console.error("error fetching song URL:", error);
     res.status(500).json({error: "error fetching song"})
    };
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> 
    console.log(`severr running on the port ${PORT}`))