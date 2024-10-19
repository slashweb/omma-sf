'use client';

import {Suspense, useEffect, useState} from 'react';
import useValidator from "../../../hooks/useValidator";
import GradientButton from "../../../components/GradientButton";
import {useSearchParams} from "next/navigation";
import {useTranslation} from "../../../context/TranslationContext";

export default function Confirm() {

    const {beginLogin} = useValidator()
    const searchParams = useSearchParams();
    const t = useTranslation();
    const [uid, setUid] = useState('');

    useEffect(() => {
        const uid = searchParams.get('uid') || '';
        setUid(uid);
    }, [searchParams]);

    const validate = async () => {

        const res = await beginLogin(uid)
        if (res) {
            alert('Usuario autenticado')
        } else {
            alert('Error al autenticar usuario')
        }
    }
    return (
        <Suspense>
            <div
                className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <GradientButton
                    onClick={() => validate()}
                >
                    {t.confirm}
                </GradientButton>
            </div>
        </Suspense>
    );
}
