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

        const registerUrl = '/webauthn/register?uid=' + user.uid
        const verificationUrl = '/webauthn/verify'


        let attResp
        try {
            const res = await axios.get(server + registerUrl);
            attResp = await startRegistration(res.data)

            const body = {
                registrationResponse: attResp,
                ...user
            }
            const verificationJSON = await axios.post(server + verificationUrl, body)
            // Show UI appropriate for the `verified` status
            if (verificationJSON && verificationJSON?.data.verified) {
                setIsRegistered(true)
                return true
            } else {
                setIsRegistered(false)
                return false
            }
        } catch
            (e) {
            console.error('Error on register user ', e)
            return false
        }
    }

    const beginLogin = async (uid: string) => {
        const server = process.env.NEXT_PUBLIC_API_SERVER
        const authenticateOptions = '/webauthn/generate-authentication-options?uid=' + uid
        const verificationUrl = '/webauthn/verify-authentication'

        try {
            const res = await axios.get(server + authenticateOptions);
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
            return false
        }

    }

    return {
        isRegistered,
        beginRegistration,
        beginLogin
    }
}
