// import api from '../api.js';
// import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import videojs from 'video.js';
// import "videojs-contrib-hls";
// import "videojs-contrib-quality-levels";
// import "videojs-hls-quality-selector";
// import "video.js/dist/video-js.min.css";

// async function createStream() {
//     try {
//         let createStreamResponse = await axios.post(api.createStream);
//         //console.log(createStreamResponse.data[12]);
//         return createStreamResponse.data[12];
//     } catch (error) {
//         console.log(error);
//     }
// }

// export default function LivePeerStream({
//   purpose,
//   address,
//   mainnetProvider,
//   localProvider,
//   yourLocalBalance,
//   price,
//   tx,
//   readContracts,
//   writeContracts,
// }) {
//     const [videoSource, setVideoSource] = useState('');

//     return (
//         <div>
//             <h1>Hello World</h1>
//             <Button onClick = {async function() {
//                 const stream_playback_id = await createStream();
//                 const streamURL = `https://cdn.livepeer.com/hls/${stream_playback_id}/index.m3u8`;
//                 setVideoSource(streamURL);
//                 console.log(streamURL, videoSource);
//             }}>Create Stream</Button>
//             <br />
//             <br />
//             {videoSource === '' ? <h1>Click on the Create Stream Button</h1> : <VideoPlayer 
//                                                                                     src={videoSource}
//                                                                                     width="720"
//                                                                                     height="420"
//                                                                                 />
//             }
//         </div>
//     );
// }
