'use client';

import {Suspense, useEffect, useState} from 'react';
import useValidator from "../../../hooks/useValidator";
import GradientButton from "@/components/GradientButton";
import {useSearchParams} from "next/navigation";
import {useTranslation} from "../../../context/TranslationContext";
import DangerButton from "@/components/DangerButton";

export default function Confirm() {

    const {beginLogin} = useValidator()
    const searchParams = useSearchParams();
    const t = useTranslation();
    const [uid, setUid] = useState('');
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [method, setMethod] = useState('')

    useEffect(() => {
        const uid = searchParams.get('uid') || '';
        const name = searchParams.get('fullname') || '';
        const amount = searchParams.get('amount') || '';
        const method = searchParams.get('method') || '';
        setName(name)
        setAmount(amount)
        setMethod(method)
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
        <div className="flex min-h-full flex-1 items-center justify-center px-6 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm space-y-10">
                <div>
                    <img
                        alt="Your Company"
                        src="/img/logo.png"
                        className="mx-auto h-16 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl leading-9  text-gray-600">
                        {t.transferConfirm}
                    </h2>
                    <p className={'mt-10 text-center text-3xl leading-9 text-gray-700'}>
                        {name}
                    </p>
                    <p className={'mt-10 text-center text-3xl leading-9 text-gray-700'}>
                        {amount} {method}
                    </p>
                    <p className={'mt-10 text-center text-lg leading-9 text-gray-700'}>
                        {t.serviceCharge}
                    </p>
                </div>
                <div className="grid grid-cols-2 items-center justify-items-center  p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                    <DangerButton
                        onClick={() => validate()}
                    >
                        {t.cancel}
                    </DangerButton>
                    <GradientButton
                        onClick={() => validate()}
                    >
                        {t.confirm}
                    </GradientButton>
                </div>
            </div>
        </div>
    );
}
