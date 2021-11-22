import React, {createContext, useState} from "react";

export const DummyDataContext = createContext(undefined);

export const DummyDataContextProvider = props => {
    const [proofIpfsDetails, setProofIpfsDetails] = useState([]);
    const [approvedNftData, setApprovedNftData] = useState([
        {
            nftName: "CryptoPunk #7257",
            description: "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.",
            img: "https://lh3.googleusercontent.com/qe7ey1P7pSeBGZImtSUTEE_MjAo2Ht_bvyAYcfzUX-Mwti8fr2V85oho6gm5QM8ZBLlvyVwS5duaa8OZuaqOy0B2fw=w600",
            nftAddress: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
            collateralAsset: "$ETH",
            maxRentalDays: 180,
            tokenID: 7257 
        },
        {
            nftName:"Bored Ape Yacht Club #5017",
            description: "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.",
            img:"https://lh3.googleusercontent.com/4fa_ZMCYOZbDS8jj7SisvbnofvtRuEYFokn-FBVnah3k4g4wD_PaIBZlvHFHOFX7JM7CyUvmKW0LR4guXvQ8DL6Lwd9Omv0oiMRp3Dc=w600",
            nftAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
            collateralAsset: "$USDC",
            maxRentalDays: 260,
            tokenID: 5017
        },
        {
            nftName:"CryptoKitties #5",
            description: "winces. My name is CryptoKitties #5. I love to wear magenta. I'm well-educated, don't worry. If I were a cheese, I would definitely be goat cheese, no question.",
            img: "https://lh3.googleusercontent.com/7JejnMn_3PMxwd6RsDtXRTIWz0I4d6YLtLQ4SciYyIPVswAtxh39gIM3c2zCxXzn0ZjkOB-NVZGet7zuBAIVeNbAM8h__4ngjNp8=w600",
            nftAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
            collateralAsset: "$wBTC",
            maxRentalDays: 7,
            tokenID: 1787909
        },
    ]);

    return (
        <DummyDataContext.Provider value={{proofIpfsDetails, setProofIpfsDetails, approvedNftData, setApprovedNftData}}>
            {props.children}
        </DummyDataContext.Provider>
    )
}