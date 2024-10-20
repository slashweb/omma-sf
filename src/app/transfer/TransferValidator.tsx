import {useAccount, useSendTransaction} from "wagmi";
import {useTranslation} from "@/context/TranslationContext";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {getUserWallets} from "@/web3/utils";
import CustomInput from "@/components/CustomInput";
import {Wallet} from "@/types/general";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import GradientButton from "@/components/GradientButton";

export default function TransferValidator() {
    const {data: hash, sendTransaction} = useSendTransaction();
    const t = useTranslation();
    const {chain} = useAccount();
    const [uid, setUid] = useState('');
    const [wallets, setWallets] = useState([] as Wallet[]);
    const [usdAmount, setUsdAmount] = useState('');  // Monto en USD
    const [nativeAmount, setNativeAmount] = useState(0);  // Monto en la moneda nativa
    const [totalNativeAmount, setTotalNativeAmount] = useState(0);  // Monto total (incluyendo comisión) en la moneda nativa
    const [priceUSD, setPriceUSD] = useState(0);  // Precio del token en USD
    const [usdCommission] = useState(0.5);  // Comisión fija en USD
    const searchParams = useSearchParams();
    const {isConnected} = useAccount();
    const router = useRouter();

    // Obtener el UID desde los query params
    useEffect(() => {
        setUid(searchParams.get('uid') || '');
    }, [searchParams]);

    // Obtener wallets del usuario basado en el UID
    useEffect(() => {
        if (uid) {
            getUserWallets(uid)
                .then(usrWallets => {
                    setWallets(usrWallets);
                });
        }
    }, [uid]);

    function convertEthToWei(ethAmount: number): bigint {
        return BigInt(Math.floor(ethAmount * 1e18));  // Convierte el valor a Wei y luego a BigInt
    }

    // Función para enviar la transacción
    async function send() {
        if (!wallets.length) {
            alert('No wallets found');
            return;
        }
        let to = wallets[0].address;
        to = to.replace('0x', '');
        sendTransaction({
            to: `0x${to}`,
            value: convertEthToWei(totalNativeAmount),  // Envía la cantidad total (incluyendo comisión) en tokens nativos
        });
    }

    // Función para obtener el precio del token en USD dependiendo de la red
    async function fetchPrice() {
        if (!chain) return
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const coinId = chain?.id === 137 ? 'matic-network' : 'ethereum';  // Detectar si es Matic o ETH
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`);
        const data = await response.json();
        setPriceUSD(data[coinId].usd);  // Actualiza el precio del token en USD
    }

    // Actualizar el precio cada 60 segundos
    useEffect(() => {
        fetchPrice();  // Llamada inicial para obtener el precio
        const interval = setInterval(fetchPrice, 60000);  // Actualiza cada 60 segundos
        return () => clearInterval(interval);  // Limpia el intervalo al desmontar
    }, [chain]);

    // Actualiza el monto en la moneda nativa cada vez que cambia el monto en USD o el precio
    useEffect(() => {
        if (usdAmount && priceUSD) {
            const nativeValue = parseFloat(usdAmount) / priceUSD;  // Calcula el equivalente en la moneda nativa sin comisión
            setNativeAmount(nativeValue);

            // Calcula el total incluyendo la comisión
            const totalUsdAmount = parseFloat(usdAmount) + usdCommission;  // Suma la comisión al monto en USD
            const totalNativeValue = totalUsdAmount / priceUSD;  // Calcula el total en la moneda nativa
            setTotalNativeAmount(totalNativeValue);
        }
    }, [usdAmount, priceUSD]);

    useEffect(() => {
        if (hash) {
            router.push(`/success`);
        }
    }, [hash]);

    // Función para manejar la entrada del monto en USD
    const handleUsdAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsdAmount(e.target.value);
    };

    return (
        <div className={'flex shadow-lg p-4 rounded-lg flex-1 flex-col mx-auto my-10 justify-center max-w-xl'}>
            <div className="flex flex-col items-center">
                <img src="/img/money.png" alt="" className={'text-center w-48'}/>
                <h1 className={'text-center text-2xl'}>
                    {t.connectTitle}
                </h1>
            </div>
            <div className="mt-10">
                <div className={'mt-4'}>
                    <label htmlFor="usdAmount">{t.amountInUSD}</label>
                    <CustomInput
                        id="usdAmount"
                        name="usdAmount"
                        type="number"
                        value={usdAmount}
                        onChange={handleUsdAmountChange}
                        placeholder={t.enterAmountInUSD}
                        required
                    />
                </div>
            </div>

            {/* Mostrar el equivalente en la moneda nativa */}
            <p className="mt-2 text-center">
                {nativeAmount ? `${nativeAmount.toFixed(6)} ${chain?.id === 137 ? 'MATIC' : 'ETH'}` : t.calculating}
            </p>

            {/* Mostrar el desglose de la cantidad incluyendo la comisión */}
            <div className="mt-4 text-center">
                <p>{t.commission}: $0.5 USD</p>
                <p>{t.totalWithCommission}: {totalNativeAmount.toFixed(6)} {chain?.id === 137 ? 'MATIC' : 'ETH'}</p>
            </div>

            {/* Conectar billetera */}
            <div className={'mt-10 w-full justify-center items-center text-center'}>
                <ConnectButton/>
            </div>

            {/* Botón de enviar solo si está conectado */}
            {isConnected && (
                <GradientButton onClick={send} className={'mt-4 w-full'}>
                    {t.connectText}
                </GradientButton>
            )}

            {hash && <p>{hash}</p>}
        </div>
    );
}
