import { ethers } from 'ethers';
// const url = 'https://data-seed-prebsc-1-s1.binance.org:8545';
// const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

export const Provider = () => {

    if (window.ethereum.isMetaMask) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const signer = provider.getSigner()
        // console.log(window.ethereum.request({ method: 'eth_requestAccounts' }));
        return provider
    }

    else {
        console.log('INSTALL METAMASK TO CONNECT YOUR WALLET')
    }

    // console.log(await provider.getBalance("ethers.eth"))
}