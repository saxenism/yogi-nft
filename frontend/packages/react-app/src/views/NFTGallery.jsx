import React, {useState, useContext} from "react";
import {Button, Card, Col, Row, Typography, Modal, Input, Form, InputNumber} from 'antd';
import { DummyDataContext } from "../context/dummy";
import axios from "axios";
 
const {Meta} = Card;
const {Paragraph} = Typography;

export default function NFTGallery() {
  const {approvedNftData} = useContext(DummyDataContext);
  const CovalentAPIKey = "ckey_b6aa47493b8648339e1913eea4a";

    const client = axios.create({
        auth: {
          username: CovalentAPIKey,
          password: ''
        }
      });
    
      const getAddressBalance = async (address, withNft) => {
        // console.log('getAddressBalance',address);
        try {
          const result = await client.get(`https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?nft=${withNft ? 'true' : 'false'}`)
          // console.log(result.data.data);
          return result;
        } catch (error) {
          if (error.response) {
            console.log('api response error', error.response);
            if (error.response.data) {
              return error.response.data.error_message;
            }
            return error.response;
          } else if (error.request) {
            console.log('api request error', error.request);
            return error.request;
          } else {
            console.log('unexpected api error', error.message);
            return error.message;
          }
        }
      }

  return (
    <div style={{padding: 16, width: "80%", margin: "auto", marginTop: 16 }}>
    <h1>NFT Gallery </h1> 
    <Button onClick={getAddressBalance} type="primary" size="large" style={{marginBottom: 20}} >Get Assets</Button>
        <div style={{padding: "30px"}}>
            <Row gutter={16}>
                {
                    approvedNftData.map(nftInfo =>  
                        <Col span={8}>
                            <Card title={<Paragraph copyable>{nftInfo.nftName}</Paragraph>}
                                hoverable={true} 
                                bordered={true} 
                                cover={<img alt={nftInfo.nftName} src={nftInfo.img}/>}
                                size = "large"
                            >
                            <Meta title ="NFT Address: " description = {(nftInfo.nftAddress)}/>
                            <br />
                            <Meta title ="NFT Token ID: " description = {nftInfo.tokenID}/>
                            <br />
                            <Meta title ="Desired Collateral Asset: " description = {(nftInfo.collateralAsset)}/>
                            <br />
                            <Meta title ="Description: " description = {(nftInfo.description)}/>
                            </Card>        
                        </Col>
                    )
                }
            </Row>
        </div>
</div>
  );
}
