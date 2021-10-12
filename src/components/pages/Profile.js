import { useState } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import { Provider } from '../../connectorScript';
import ButtonMenu from '../layout/ButtonMenu';

const DivAccount = styled.div`
    -webkit-box-align: center;
    width: 9rem;
    height: 2rem;
    padding: 0.8rem;
`

const TitleAccount = styled.div`
    display: flex;
    justify-content: center;
    padding: 0.2rem;
`

const Profile = () => {

    const [title, setTitle] = useState('Connect wallet with Metamask')
    const [provider, setProvider] = useState('')
    const [addressWallet, setAddressWallet] = useState('')

    const connectWallet = async () => {
        const provider = Provider()
        if (provider) {
            const addressWallet = await window.ethereum.selectedAddress
            setAddressWallet(addressWallet)
            setProvider(provider)
            setTitle(addressWallet)
        }
    }

    return (
        <div style={{ minHeight: '90vh' }}>
            <DivAccount>
                <div style={{
                    borderRadius: 10,
                    backgroundColor: 'blueviolet',
                    height: title.startsWith("0x") ? 'inherit' : '3rem',
                    paddingBottom: title.startsWith("0x") && '0.3rem'
                }}>
                    {!title.startsWith("0x") ?
                        <TitleAccount title={title} onClick={() => connectWallet()}>
                            {title}
                        </TitleAccount>
                        :
                        <ButtonMenu title={title} provider={provider} addressWallet={addressWallet} />
                    }
                </div>
            </DivAccount>
        </div>
    )

}

export default Profile;