import {useAppKitAccount} from "@reown/appkit/react";
import GradientButton from "@/components/GradientButton";
import DangerButton from "@/components/DangerButton";
import {useTranslation} from "@/context/TranslationContext";
import {useAppKit} from '@reown/appkit/react';
import {useDisconnect} from 'wagmi'


export default function CustomWalletConnect() {

    const {isConnected} = useAppKitAccount()
    const {open} = useAppKit()
    const t = useTranslation()
    const {disconnect} = useDisconnect()


    return (
        <div>
            {isConnected &&
              <div>
                <DangerButton onClick={disconnect}>Desconectar</DangerButton>
              </div>
            }

            {
                !isConnected && <GradientButton onClick={open}>
                    {t.connect}
              </GradientButton>
            }

        </div>
    )
}
