import React, {useEffect, useState} from 'react';

import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import imga from "../assets/images/img-01.jpg";
import avatar from "../assets/images/ava-01.png";

import styles from './comp_styles.css'
// import {Container} from 'reactstrap';
import {useDropzone} from 'react-dropzone';
import axios from "axios";

import "../styles/create-item.css";



const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const imgs = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


const Create = () => {
  const [imgb,setImgb] = useState(imga)
  const [metadata,setMetadata]= useState({
    name:"Guard",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
    image: "",
    trait1Name:"",
    trait1Value:"",
    trait2Name:"",
    trait2Value:"",
    trait3Name:"",
    trait3Value:"",
    trait4Name:"",
    trait4Value:"",
    creatorName:"Brendan Lucas",
    price:7.89
  })

  const [NFTurl,setNftUrl] =  useState("");

  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps,open} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      // setFiles(acceptedFiles)
      setFiles(
        acceptedFiles.map(file => 
          Object.assign(file, 
            {preview: URL.createObjectURL(file)}
            )
        )  
      );
    },
    noClick: true,
    noKeyboard: true
  });
  
  const handleSubmitForm = async (event) => {
    // event.preventDefault();
    // console.log(files)
    let resp1 = await handleSubmitImage();
    console.log(resp1)
    console.log(metadata)
    axios.post("http://localhost:5000/uploadmetadata", metadata)
    .then(res => { 
        console.log(res)
        setNftUrl(res.data)
      })
}

  const handleSubmitImage = async (event) => {
    // event.preventDefault();
    const data = new FormData();
    for(var x = 0; x<files.length; x++) {
        data.append('file', files[x])
    }
    console.log(files)
    console.log(data)
    axios.post("http://localhost:5000/upload", data)
    .then(res => { 
        console.log(res.statusText)
      })
}

const item = {
  id: "01",
  title:  metadata.name,
  desc: metadata.desc,
  imgUrl: imgb,
  creator: metadata.creatorName,
  creatorImg: avatar,
  currentBid: metadata.price,
};

  const thumbs = files.map(file => (
    // <div className={styles.cont} key={file.name}>
    <div key={file.name} style={{"color":"white"}}>
    <div style={thumb} >
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={imgs}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
    <br/>
    {file.name} - {file.size/1000}KB
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    console.log(files["0"])
    if (files["0"]) {
    setImgb(files["0"].preview)
    setMetadata({...metadata,image: files["0"].name})
    }
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);






  return (
    <>
      <CommonSection title="Create Item" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview Item</h5>
              <NftCard item={item} />
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <form>
                  <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    {/* <input type="file" className="upload__input" /> */}

                    <section className="container" style={styles.dropzone}>
                    {/* <section> */}
                        <div {...getRootProps({className: 'dropzone'})}>
                          <input {...getInputProps()} />
                          <br/>
                          <p>Drag 'n' drop some files here, or click to select files</p>
                          <br/>
                              <button type="button" className="btn btn-outline btn-dark mt-3" onClick={open}>
                                Open File Dialog
                              </button>
                              <br/><br/>
                        </div>
                        {/* <aside style={thumbsContainer}>
                          {thumbs}
                        </aside> */}
                      </section>
                  </div>
                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder="Enter title" value={metadata.name} onChange={(e)=>{setMetadata({...metadata,name:e.target.value })}} />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Price</label>
                    <input
                      type="number"
                      placeholder="Enter price for one item (ETH)"
                      value={metadata.price} onChange={(e)=>{setMetadata({...metadata,price:e.target.value })}}
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Creator Name</label>
                    <input type="text" placeholder="Enter Creator Name" value={metadata.creatorName} onChange={(e)=>{setMetadata({...metadata,creatorName:e.target.value })}}/>
                  </div>

                  <div className=" d-flex align-items-center gap-4">
                    <div className="form__input w-50">
                      <label htmlFor="">Attribute</label>
                      <input type="text" value={metadata.trait1Name} onChange={(e)=>{setMetadata({...metadata,trait1Name:e.target.value })}}/>
                    </div>

                    <div className="form__input w-50">
                      <label htmlFor="">Value</label>
                      <input type="text" value={metadata.trait1Value} onChange={(e)=>{setMetadata({...metadata,trait1Value:e.target.value })}}/>
                    </div>
                  </div>

                  <div className=" d-flex align-items-center gap-4">
                    <div className="form__input w-50">
                      <label htmlFor="">Attribute</label>
                      <input type="text" value={metadata.trait2Name} onChange={(e)=>{setMetadata({...metadata,trait2Name:e.target.value })}}/>
                    </div>

                    <div className="form__input w-50">
                      <label htmlFor="">Value</label>
                      <input type="text" value={metadata.trait2Value} onChange={(e)=>{setMetadata({...metadata,trait2Value:e.target.value })}}/>
                    </div>
                  </div>

                  <div className=" d-flex align-items-center gap-4">
                    <div className="form__input w-50">
                      <label htmlFor="">Attribute</label>
                      <input type="text" value={metadata.trait3Name} onChange={(e)=>{setMetadata({...metadata,trait3Name:e.target.value })}}/>
                    </div>

                    <div className="form__input w-50">
                      <label htmlFor="">Value</label>
                      <input type="text" value={metadata.trait3Value} onChange={(e)=>{setMetadata({...metadata,trait3Value:e.target.value })}}/>
                    </div>
                  </div>

                  <div className=" d-flex align-items-center gap-4">
                    <div className="form__input w-50">
                      <label htmlFor="">Attribute</label>
                      <input type="text" value={metadata.trait4Name} onChange={(e)=>{setMetadata({...metadata,trait4Name:e.target.value })}}/>
                    </div>

                    <div className="form__input w-50">
                      <label htmlFor="">Value</label>
                      <input type="text" value={metadata.trait4Value} onChange={(e)=>{setMetadata({...metadata,trait4Value:e.target.value })}}/>
                    </div>
                  </div>

                  

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                      value={metadata.desc} onChange={(e)=>{setMetadata({...metadata,desc:e.target.value })}}
                    ></textarea>
                  </div>
                </form>
                  <div style={styles.cont}>
                    <button onClick={()=>{handleSubmitForm()}} className="btn d-flex  btn-outline-primary gap-2 align-items-center " style={{"color":"white"}}>
                        {/* <span>
                          <i class="ri-wallet-line"></i>
                        </span> */}
                      Create NFT
                    </button>
                  </div>
                  <br></br>
                  <div className="form__input">
                    <label htmlFor="">NFT URL</label>
                    <br/>
                    <p style={{color:"white"}}>Please give up to 20 minutes, and hit the "refresh metadata" button</p>
                    <br/>
                    {/* <input type="text" value={metadata.trait4Value} onChange={(e)=>{setMetadata({...metadata,trait4Value:e.target.value })}}/> */}
                        <a href={NFTurl}>{NFTurl}</a>
                  </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Create;
