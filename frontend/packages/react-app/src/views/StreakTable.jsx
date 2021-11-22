import React, { useContext, useState } from "react";
import {Table, Tag, Space} from "antd";
import {DummyDataContext} from "../context/dummy";

const {Column, ColumnGroup} = Table;

export default function StreakTable() {
  const {proofIpfsDetails} = useContext(DummyDataContext);
  
  return (
    <div style={{width: "80%", margin: "auto", marginTop: 64 }}>
        <h1>Streak Table</h1>
        <Table dataSource={proofIpfsDetails}>
            <Column title="File Name" dataIndex="nftName" key="nftName" />
            <Column title="File Description" dataIndex="nftDescription" key="nftDescription" />
            <Column title="IPFS Hash" dataIndex="ipfsHash" key="ipfsHash" />
            <Column title="Upload Time Stamp" dataIndex="timeStamp" key="timeStamp" />
            <Column title="Proof Number" dataIndex="nftStreak" key="nftStreak" />
            <Column title="Total Proofs" dataIndex="nftTotalProofs" key="nftTotalProofs" />
            <Column title="Pin Size" dataIndex="pinSize" key="pinSize" />
        </Table>
    </div>
  );
}
