import axios from "axios";
import {startAuthentication, startRegistration} from '@simplewebauthn/browser';
import {useState} from "react";

interface formData {
    fullname: string;
    email: string;
    phone: string;
    uid: string;
}

export default function useValidator() {
    const [isRegistered, setIsRegistered] = useState(false)

    const beginRegistration = async (user: formData) => {
        const server = process.env.NEXT_PUBLIC_API_SERVER

        console.log('server', server)
        const registerUrl = '/webauthn/register?uid=' + user.uid
        const verificationUrl = '/webauthn/verify'

        const res = await axios.get(server + registerUrl);

        let attResp
        try {
            attResp = await startRegistration(res.data)
        } catch (e) {
            console.log('Error on register user ', e)
            alert(JSON.stringify(e))
        }

        alert(JSON.stringify(attResp))
        const body = {
            registrationResponse: attResp,
            ...user
        }
        alert(JSON.stringify(body))

        const verificationJSON = await axios.post(server + verificationUrl, body)
        console.log('verificationJSON', verificationJSON)
        // Show UI appropriate for the `verified` status
        if (verificationJSON && verificationJSON?.data.verified) {
            setIsRegistered(true)
            return true
        } else {
            setIsRegistered(false)
            return false
        }

    }

    const beginLogin = async (uid: string) => {
        const server = process.env.NEXT_PUBLIC_API_SERVER
        const authenticateOptions = '/webauthn/generate-authentication-options'
        const verificationUrl = '/webauthn/verify-authentication'

        const res = await axios.get(server + authenticateOptions);

        try {
            const authenticationResponse = await startAuthentication(res.data)
            const verificationJSON = await axios.post(server + verificationUrl, {
                authenticationResponse,
                uid
            })

            if (verificationJSON && verificationJSON?.data.verified) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.error('Error on login user ', e)
        }

    }

    return {
        isRegistered,
        beginRegistration,
        beginLogin
    }
}
