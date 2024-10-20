import axios from "axios";

export const getUserWallets = async (uid: string) => {
    const API = process.env.NEXT_PUBLIC_API_SERVER

    try {
        const res = await axios.get(`${API}/web3/wallets/${uid}`)
        return res.data
    } catch (e) {
        console.log(e)
    }
    return []
}
