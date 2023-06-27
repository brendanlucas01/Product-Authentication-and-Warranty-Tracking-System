import React, { useEffect, useRef,useState } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import axios from "axios";
const Contact = () => {
const [userAddress,setUserAddress] = useState("")
const [sendButton,setSendButton] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(()=>{

    if(sendButton){
      axios.get("http://localhost:5000/getnftbywallet", userAddress)
      .then(res => { 
        console.log(res)
        // setNftUrl(res.data)
      })
      setSendButton(false)
    }
  
  },[sendButton])

  return (
    <>
      <CommonSection title="Sign Up" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" className="m-auto text-center">
              <h2>Sign up in our Marketplace</h2>
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
                      placeholder="Enter your name"
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                    />
                  </div>
                  

                  <button
                    className="send__btn"
                    onClick={() => setSendButton(true)}
                    style={{
                      border: "none",
                      padding: "7px 25px",
                      borderRadius: "5px",
                      marginTop: "20px",
                    }}


                  >
                    Send a Message
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;
