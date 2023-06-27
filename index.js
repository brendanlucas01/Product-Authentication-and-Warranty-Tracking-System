// const express = require('express')
// const app = express()

// console.log("Hello world")

// import Moralis  from 'moralis';
// import { EvmChain } from '@moralisweb3/evm-utils';
const Moralis = require('moralis')
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const shell = require('shelljs');
const fs = require('fs');
const app = express();
const { EvmChain } = require('@moralisweb3/common-evm-utils');

app.use(cors());
app.use(express.static("./img"));
app.use(express.json())


var storage = multer.diskStorage({

destination: "./img",
filename: function (req, file, cb) {
cb(null,file.originalname )
}
})



var upload = multer({ storage: storage }).array('file');


app.post('/upload',function(req, res) {
 
upload(req, res, function (err) {
       if (err instanceof multer.MulterError) {
           return res.status(500).json(err)
       } else if (err) {
           return res.status(500).json(err)
       }
  return res.status(200).send(req.file)

})

});

app.post('/uploadmetadata',(req,res)=>{
    console.log(req.body)
    // const spawner = require('child_process').spawn;
    //string
    let datas = JSON.stringify(req.body);
    console.log(datas)
    fs.writeFileSync('./transfer_files/test1.txt', datas);



//array
// const data_to_pass_in = ['Send this to python Script'];

// object
// const data_to_pass_in = {
//     data_send: "Send this to python Script",
//     data_returned: undefined
// }

    // console.log("Data send to the python Script:", data_to_pass_in);

    // const python_process = spawner('brownie', ['run scripts/advanced_collectible/create_metadata.py',data_to_pass_in]);
    shell.exec(`brownie run scripts/advanced_collectible/create_collectible.py --network goerli`)
    let outpt = shell.exec(`brownie run scripts/advanced_collectible/create_metadata.py --network goerli`)
// 
    let req_url = outpt["stdout"].match("ipfs:.*json")[0]
    console.log(req_url)
    fs.writeFileSync('./transfer_files/test2.txt', req_url);
    let outpt2 = shell.exec(`brownie run scripts/advanced_collectible/set_tokenuri.py --network goerli`)
    req_url = outpt2["stdout"].match("https://testnets.opensea.io.*")[0]
// const python_process = spawner('python', ['./python_test_file.py',JSON.stringify(data_to_pass_in)]);

    // python_process.stdout.on("data",(data)=>{
    // console.log("Data received from python Script:",data.toString());
    console.log(req_url)
    return res.status(200).send(req_url)
});


app.get("/getnftbywallet",async (req,res)=>{
    try {
        const address = req;
        console.log(address)
        const chain = EvmChain.ETHEREUM;
    
        await Moralis.start({
            apiKey: 'dS4UE5QcHlUTiqvHYggKyUNNTRmuvDfKRMDUcDQE4ARLiX20yrjNp8Hq2HXYEzEX', // API Key
            // ...and any other configuration
        });
    
        const response = await Moralis.EvmApi.nft.getWalletNFTTransfers({
            address,
            chain,
        });
    
        console.log(response);
        return res.status(200).send(response)
    } catch (e) {
        console.error(e);
        return res.status(500).send(e)
    }
    
})
// python_process.stdout.on("data",(data)=>{
//     console.log("Data received from python Script:",JSON.parse(data.toString()));
// });
    
// })

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
console.log("server started at port "+PORT);
});