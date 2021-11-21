const baseURL = "http://localhost:5000/api";

const backendAPIs = {
    createStream: `${baseURL}/createStream`,
    allStreams: `${baseURL}/allStreams`,
    getStreamByID: `${baseURL}/getStreamByID`
}

export default backendAPIs;