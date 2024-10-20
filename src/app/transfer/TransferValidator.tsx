import GradientButton from "@/components/GradientButton";
import {useSendTransaction} from "wagmi";
import CustomWalletConnect from "@/components/CustomWalletConnect";
import {useTranslation} from "@/context/TranslationContext";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {getUserWallets} from "@/web3/utils";
import {useAppKitAccount} from "@reown/appkit/react";
import CustomInput from "@/components/CustomInput";  // Importar el componente CustomInput

export default function TransferValidator() {
    const {data: hash, sendTransaction} = useSendTransaction();
    const t = useTranslation();
    const [uid, setUid] = useState('');
    const [wallets, setWallets] = useState([]);
    const [usdAmount, setUsdAmount] = useState('');  // Monto en USD
    const [nativeAmount, setNativeAmount] = useState(0);  // Monto en la moneda nativa
    const [totalNativeAmount, setTotalNativeAmount] = useState(0);  // Monto total (incluyendo comisión) en la moneda nativa
    const [priceUSD, setPriceUSD] = useState(0);  // Precio del token en USD
    const [usdCommission] = useState(0.5);  // Comisión fija en USD
    const searchParams = useSearchParams();
    const {isConnected} = useAppKitAccount();

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

    // Función para enviar la transacción
    async function send() {
        console.log('wallets', wallets);
        const to = wallets[0].address;
        console.log('sending to', to);
        sendTransaction({
            to,
            value: totalNativeAmount,  // Envía la cantidad total (incluyendo comisión) en tokens nativos
        });
    }

    // Función para obtener el precio del token en USD desde CoinGecko
    async function fetchPrice() {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`);
        const data = await response.json();
        setPriceUSD(data.ethereum.usd);  // Actualiza el precio del token en USD
    }

    // Actualizar el precio cada 60 segundos
    useEffect(() => {
        fetchPrice();  // Llamada inicial para obtener el precio
        const interval = setInterval(fetchPrice, 60000);  // Actualiza cada 60 segundos
        return () => clearInterval(interval);  // Limpia el intervalo al desmontar
    }, []);

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

    // Función para manejar la entrada del monto en USD
    const handleUsdAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsdAmount(e.target.value);
    };

    return (
        <div className={'flex flex-col justify-center items-center p-8'}>
            <div className="flex flex-col items-center">
                <img src="/img/money.png" alt="" className={'text-center w-48'}/>
                <h1 className={'text-center text-2xl'}>
                    {t.connectTitle}
                </h1>
            </div>
            <div className="w-full mt-10">
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
                {nativeAmount ? `${nativeAmount.toFixed(6)} ETH` : t.calculating}
            </p>

            {/* Mostrar el desglose de la cantidad incluyendo la comisión */}
            <div className="mt-4 text-center">
                <p>{t.commission}: 0.5 USD</p>
                <p>{t.totalWithCommission}: {totalNativeAmount.toFixed(6)} ETH</p>
            </div>

            {/* Conectar billetera */}
            <div className={'mt-10 w-full'}>
                <CustomWalletConnect/>
            </div>

            {/* Botón de enviar solo si está conectado */}
            {isConnected && wallets.length > 0 && (
                <GradientButton onClick={send} className={'mt-4 w-full'}>
                    {t.connectText}
                </GradientButton>
            )}

            {hash && <p>{hash}</p>}
        </div>
    );
}
