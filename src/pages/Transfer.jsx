import React, { useEffect, useRef,useState } from "react";
import { useWeb3Transfer,useMoralis } from "react-moralis";

// import {Moralis} from 'react-moralis'
// import Moralis from 'moralis';
import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";


const Transfer = () => {
  const { user, Moralis } = useMoralis();
  const [receiverAddRef,setReceiverAddRef] = useState("");
  const [contractAddRef,setContractAddRef] = useState("");
  const [tokenIdRef,setTokenIdRef] = useState(0);
  
  
  const [amountRef,setAmountRef] = useState(0);
  const [fundsReceiver,setFundsReceiver] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(()=>{
      console.log(user)
  },[])

  // const { fetch, error, isFetching } 
  const nftHandler = useWeb3Transfer({
    type: "erc721",
    receiver: receiverAddRef,
    contractAddress: contractAddRef,
    tokenId: tokenIdRef,
  });

  const etherHandler = useWeb3Transfer({
    type: "native",
    amount: Moralis.Units.ETH(amountRef),
    receiver: fundsReceiver,
  });

  return (
    <>
      <CommonSection title="Transfer Assets" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" className="m-auto text-center">
              <h2>Transfer Page For sending Ethers and Tokens</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus ipsum aperiam cumque fugit suscipit animi natus
                nostrum voluptatem iste quam!
              </p>
              <div className="contact mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="form__input">
                    <input
                      type="text"
                      placeholder="Enter Receiver Address of NFT"
                      value={receiverAddRef}
                      onChange={(e) => setReceiverAddRef(e.target.value)}
                    />
                  </div>
                  <div className="form__input">
                    <input
                      type="text"
                      placeholder="Enter Address of Smart Contract"
                      value={contractAddRef}
                      onChange={(e) => setContractAddRef(e.target.value)}
                    />
                  </div>
                  <div className="form__input">
                    <input
                      type="text"
                      placeholder="Enter TokenID of NFT"
                      value={tokenIdRef}
                      onChange={(e) => setTokenIdRef(e.target.value)}
                    />
                  </div>
                  {/* <div className="form__input">
                    <textarea
                      rows="7"
                      placeholder="Write message"
                      ref={messageRef}
                    ></textarea>

                    
                  </div> */}
                  <div>
                    {nftHandler.error && console.log(tokenIdRef.current) && console.error(nftHandler.error)}
                    <button 
                    className="btn btn-outline-warning"
                    style={{
                      border: "none",
                      padding: "7px 25px",
                      borderRadius: "30px",
                      color:"white",
                      marginTop: "20px",
                    }}
                    onClick={() => nftHandler.fetch()} disabled={nftHandler.isFetching}>
                      Transfer NFT
                      <i style={{margin:'0px',padding:"0px",marginLeft:"5px",fontSize:"1em"}} class="ri-send-plane-line"></i>
                    </button>
                  </div>
                  {/* <button
                    className="send__btn"
                    style={{
                      border: "none",
                      padding: "7px 25px",
                      borderRadius: "5px",
                      marginTop: "20px",
                    }}
                  >
                    Send a Message
                  </button> */}
                  <br/><br/><br/><br/>

                </form>

                <form onSubmit={handleSubmit}>
                  <div className="form__input">
                    <input
                      type="text"
                      placeholder="Enter Receiver Address of NFT"
                      value={fundsReceiver}
                      onChange={(e) => setFundsReceiver(e.target.value)}
                    />
                  </div>
                  <div className="form__input">
                    <input
                      type="number"

                      // to convert number to string
                      

                      placeholder="Enter TokenID of NFT"
                      value={amountRef}
                      onChange={(e) => setAmountRef(e.target.value)}
                    />
                  </div>
                  {/* <div className="form__input">
                    <textarea
                      rows="7"
                      placeholder="Write message"
                      ref={messageRef}
                    ></textarea>

                    
                  </div> */}
                  <div>
                    {etherHandler.error && 
                    // console.log(amountRef) && 
                    console.log(etherHandler.error)}
                    <button 
                    className="btn btn-outline-warning"
                    style={{
                      border: "none",
                      padding: "7px 25px",
                      borderRadius: "30px",
                      color:"white",
                      marginTop: "20px",
                    }}
                    onClick={() => etherHandler.fetch()} disabled={etherHandler.isFetching}>
                      Transfer Ethers
                      <i style={{margin:'0px',padding:"0px",marginLeft:"5px",fontSize:"1em"}} class="ri-send-plane-line"></i>
                    </button>
                  </div>
                  {/* <button
                    className="send__btn"
                    style={{
                      border: "none",
                      padding: "7px 25px",
                      borderRadius: "5px",
                      marginTop: "20px",
                    }}
                  >
                    Send a Message
                  </button> */}
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Transfer;
