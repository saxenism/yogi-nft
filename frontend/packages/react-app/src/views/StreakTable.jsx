import React, { useContext, useState } from "react";
import {Table, Button, Card, Divider, Modal, Typography, Form, Input, message, Select} from "antd";
import {DummyDataContext} from "../context/dummy";
import { configKeys as keys } from "./configurations";
import { concatAST, ValuesOfCorrectTypeRule } from "graphql";
import axios from "apisauce/node_modules/axios";

const {Column, ColumnGroup} = Table;

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

export default function StreakTable() {
  const [modalVisible, setModalVisible] = useState(false);
  const {proofIpfsDetails} = useContext(DummyDataContext);

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

  async function mintNFT(values) {
    const options = {
      method: 'POST',
      url: 'https://api.nftport.xyz/v0/mints/easy/urls',
      header: {
        "Authorization": keys.NFTPortAPIKey,
      },
      data: {
        chain: 'polygon',
        name: values.user.nftName,
        description: values.user.nftDescription,
        file_url: `https://gateway.pinata.cloud/${values.user.ipfsHash}`,
        mint_to_address: values.user.nftAddress,
      }
    };

    try {
      const result = await axios.request(options);
      if(result) {
        console.log(result);
        alert("NFT succesfully minted");
      } else {
        console.log("Something went wrong. Try again");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  
  return (
    <div style={{width: "80%", margin: "auto", marginTop: 64 }}>
      <Card style={{ marginTop: 32 }}>
        <div>
          <h1>Mint into NFT</h1>
          <Button type="primary" size="large" style={{marginBottom: 10, marginTop: 10}} onClick={() => setModalVisible(true)}>Mint NFT</Button>
        </div>
      </Card>
        
        <h1 style={{marginTop: 10}}>Streak Table</h1>
        <Table dataSource={proofIpfsDetails}>
            <Column title="File Name" dataIndex="nftName" key="nftName" />
            <Column title="File Description" dataIndex="nftDescription" key="nftDescription" />
            <Column title="IPFS Hash" dataIndex="ipfsHash" key="ipfsHash" />
            <Column title="Upload Time Stamp" dataIndex="timeStamp" key="timeStamp" />
            <Column title="Proof Number" dataIndex="nftStreak" key="nftStreak" />
            <Column title="Total Proofs" dataIndex="nftTotalProofs" key="nftTotalProofs" />
            <Column title="Pin Size" dataIndex="pinSize" key="pinSize" />
        </Table>

        <Modal title="NFT Mint" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
          <Form {...layout} name="nest-messages" onFinish={mintNFT} validateMessages={validateMessages}>
            <Form.Item
              name={["user", "ipfsHash"]}
              label="IPFS Hash"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input placeholder="Your IPFS hash goes here"/>
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
