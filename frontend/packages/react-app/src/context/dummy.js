import React, {createContext, useState} from "react";

export const DummyDataContext = createContext(undefined);

export const DummyDataContextProvider = props => {
    const [proofIpfsDetails, setProofIpfsDetails] = useState([]);

    return (
        <DummyDataContext.Provider value={{proofIpfsDetails, setProofIpfsDetails}}>
            {props.children}
        </DummyDataContext.Provider>
    )
}