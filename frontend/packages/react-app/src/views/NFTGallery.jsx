import { utils } from "ethers";
import { Select } from "antd";
import React, { useState } from "react";
import { Address, AddressInput } from "../components";
import axios from "axios";

const { Option } = Select;

export default function NFTGallery() {
    const CovalentAPIKey = "ckey_b6aa47493b8648339e1913eea4a";

    const client = axios.create({
        auth: {
          username: CovalentAPIKey,
          password: ''
        }
      });
    
      async function covalentTest() {
         try {
           const result = await client.get('https://api.covalenthq.com/v1/137/');
         } catch(error) {
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
    <div style={{width: "80%", margin: "auto", marginTop: 64 }}>
        <h1> 🎨 Your NFT Gallery 🎨</h1>
    </div>
  );
}
