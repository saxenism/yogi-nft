import React, {useState, useContext} from "react";
import axios from "axios";
import { Button, Card, Divider, Modal, Typography, Form, Input, message, Select} from "antd";
import { configKeys as keys } from "./configurations";
import { DummyDataContext } from "../context/dummy";

const {Option} = Select;
const {Text} = Typography
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  },
  initialValues: {
      size: "large",
  },
};

function Home(params) {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [nftName, setNftName] = useState('');
  const [nftAddress, setNftAddress] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [nftEvent, setNftEvent] = useState('');
  const [nftTotalProofs, setNftTotalProofs] = useState(0);
  const [nftStreak, setNftStreak] = useState(0);

  const {proofIpfsDetails, setProofIpfsDetails} = useContext(DummyDataContext);

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!"
    },
    number: {
      range: "${label} must be between ${min} and ${max}"
    }
  };

  const successMessage = () => {
    message.success('Your NFT was minted succesfully');
  };
  
  const errorMessage = () => {
    message.error('Something went wrong, please try again');
  };

  function onFinish(values) {
    setNftName(values.user.nftName);
    setNftDescription(values.user.nftDescription);
    setNftAddress(values.user.nftAddress);
    setNftStreak(values.user.nftStreak);
    setNftTotalProofs(values.user.nftTotalProofs);
  }

  function onEventFinish(values) {
    setNftEvent(values.user.nftEvent);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        "Authorization": keys.NFTPortAPIKey,
      },
    };
    
    fetch("https://api.nftport.xyz/v0/mints/easy/files?" + new URLSearchParams({
      chain: 'polygon',
      name: nftName,
      description: nftDescription,
      mint_to_address: nftAddress,
    }), options)
      .then(function(response) {
        return response.json();
        successMessage();  
      })
      .then(function(responseJson) {
        console.log(responseJson);
      })
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  async function testPinataAuthentication() {
    const url = "https://api.pinata.cloud/data/testAuthentication";
    try {
      const result = await axios.get(url, {
        headers: {
          pinata_api_key: keys.PinataAPIKey,
          pinata_secret_api_key: keys.PinataAPISecret,
        }
      });
      if(result) {
        console.log(result);
        console.log(result.data.message);
        alert("Successfully authenticated");
      } else {
        alert("Failing authentication");
      }
    } catch(error) {
      console.log(error);
    }
  }

  async function uploadFileToIPFS(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

    const metadata = JSON.stringify({
      name: nftName,
      keyvalues: {
        description: nftDescription,
        nft_streak_number: nftStreak,
        event: nftEvent,
        total_intended_proofs: nftTotalProofs,
      }
    });

    formData.append('pinataMetadata', metadata);

    //console.log(metadata);
    try {
      const result = await axios.post(url, formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: keys.PinataAPIKey,
          pinata_secret_api_key: keys.PinataAPISecret,
        }
      });

      if(result) {
        setProofIpfsDetails([...proofIpfsDetails, {
          nftName: nftName,
          nftDescription: nftDescription,
          ipfsHash: result.data.IpfsHash,
          timeStamp: result.data.Timestamp,
          nftStreak: nftStreak,
          nftTotalProofs: nftTotalProofs,
          pinSize: result.data.PinSize,
        }]);
        alert("Uploaded to IPFS successfully");
      } else {
        console.log("Something went wrong. Try again");
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div style={{width: "50%", margin: "auto", marginTop: 64 }}>
      <h1> 🧘 Welcome to <i>Yogi NFT</i> 🧘</h1>
        {/*<Button onClick={testPinataAuthentication} type="primary" size="large" style={{marginBottom: 20}} >Test Pinata</Button>*/}
        <Card style={{ marginTop: 32 }}>
          <div>
            <div style={{ marginTop: 20 }}>
                <Button type="primary" size="large" style={{marginBottom: 20}} onClick={() => setEventModalVisible(true)}>Create Event</Button>
                <br/>
                <Text>
                    We welcome everyone on our platform who wants to mint a proof-of-accomplishment NFT. On this platform you are free to create
                    any event and then upload proof (to IPFS) as proof of accomplishing that task, which will enable you to mint an NFT that has your
                    proof embedded within it. Click on the button above to create an event. 
                </Text>
            </div>
            <Divider />
            <div style={{ marginTop: 20 }}>
              <Button type="primary" size="large" style={{marginBottom: 20}} onClick={() => setModalVisible(true)}>IPFS Metadata Details</Button>
              <br/>
              <Text>
                  Once you are done with creating an event, now is the time to furbish proof of accomplishing the task in that event.
                  Click on the button above to mint your NFTs and don't forget to furbish all the details.
              </Text>
            </div>
            <Divider />
            <div style={{ marginTop: 20 }}>
              <input type = "file" onChange={handleFileSelect}/>
              <br/><br/>
              <Button type="primary" htmlType="submit" onClick={uploadFileToIPFS}>
                Upload to IPFS
              </Button>
              <br/>
              <Text>
                Use the <i>Choose File</i> button to select the file you want to upload as proof of accomplishing the task in your event. Please be honest here,
                because otherwise, you'll utimately be decieving yourself. Then click on the <i>Upload to IPFS</i> button to upload your proof, which will be minted
                as your proof-of-accomplishment NFT onto the Polygon chain
              </Text>
            </div>
          </div>
        </Card>
        <Modal title="NFT Event" visible={eventModalVisible} onOk={() => setEventModalVisible(false)} onCancel={() => setEventModalVisible(false)}>
          <Form {...layout} name="nest-messages" onFinish={onEventFinish} validateMessages={validateMessages}>
            <Form.Item
              name={["user", "nftEvent"]}
              label="Create an event"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input placeholder="Your event task goes here"/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>        
      <Modal title="NFT Details" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item
          name={["user", "nftStreak"]}
          label="NFT Streak number: "
          >
            <Input placeholder="NFT Streak"/>
          </Form.Item> 
          <Form.Item
            name={["user", "nftTotalProofs"]}
            label="Total nos. of NFT required in your challenge"
          >
            <Input placeholder="Total NFTs that you'll upload"/>
          </Form.Item>
          <Form.Item
            name={["user", "nftName"]}
            label="Name of your NFT"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Name your NFT"/>
          </Form.Item>
          <Form.Item
            name={["user", "nftDescription"]}
            label="Describe your NFT"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="NFT Description"/>
          </Form.Item>
          <Form.Item
            name={["user", "nftAddress"]}
            label="Address to send your NFT"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Home of your NFT"/>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
         </Form>
      </Modal>
    </div>
  );
}

export default Home;
