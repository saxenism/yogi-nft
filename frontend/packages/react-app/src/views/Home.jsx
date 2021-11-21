import React, {useState} from "react";
import axios from "axios";
import { Button, Card, Divider, Modal, Typography, Form, Input, message, Select} from "antd";
import {NFTStorage, Blob} from "nft.storage";

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
  const [deployedContractAddress, setDeployedContractAddress] = useState('');
  const [txnURL, setTxnURL] = useState('');
  const [txnHash, setTxnHash] = useState('');

  const NFTPortAPIKey = "4a448f5d-98ab-42a7-bb26-a7f40f57e501";
  const CovalentAPIKey = "ckey_b6aa47493b8648339e1913eea4a";
  const NFTStorageAPIKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY0ODlmNjMxZjBEZEJiN2MxMDI4MzNBQ2I1OTFDMjZlNTgyOGIxRUMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNzQ3MjU1MjEzNywibmFtZSI6InlvZ2ktbmZ0In0.47Q_VGfsJ2k47ONMRQG533MlbK9wo8SG7xOdUxFZDg0";
  const NFTStorageEndpoint = 'https://api.nft.storage';

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
        "Authorization": NFTPortAPIKey,
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

  
  async function uploadFileToIPFS() {
    const storage = new NFTStorage({NFTStorageEndpoint, NFTPortAPIKey});
    const data = selectedFile;
    const cid = await storage.storeBlob(new Blob([data]));
    console.log({cid});
    const status = await storage.status(cid);
    console.log(status);
  }

  return (
    <div style={{width: "50%", margin: "auto", marginTop: 64 }}>
      <h1> 🧘 Welcome to <i>Yogi NFT</i> 🧘</h1>
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
              <Button type="primary" size="large" style={{marginBottom: 20}} onClick={() => setModalVisible(true)}>NFT Details</Button>
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
                Upload
              </Button>
              <br/>
              <Text>
                Use the <i>Choose File</i> button to select the file you want to upload as proof of accomplishing the task in your event. Please be honest here,
                because otherwise, you'll utimately be decieving yourself. Then click on the <i>Mint NFT</i> button to mint your proof-of-accomplishment NFT onto 
                the Polygon chain
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
