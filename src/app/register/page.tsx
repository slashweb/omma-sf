'use client';

import {useSearchParams} from 'next/navigation'; // Hook para obtener los query params
import {useEffect, useState} from 'react';       // Hooks para manejar el estado y efectos
import {useTranslation} from "@/context/TranslationContext";
import useValidator from "@/hooks/useValidator";
import GradientButton from "@/components/GradientButton";
import CustomInput from "@/components/CustomInput";
import {useRouter} from 'next/navigation';
import LoadingIndicator from "@/components/LoadingIndicator";

export default function Register() {
    const t = useTranslation();
    const searchParams = useSearchParams();
    const {beginRegistration} = useValidator();
    const router = useRouter();

    // Estados para almacenar los valores del formulario
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        uid: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // Efecto para autocompletar los campos con los query params al cargar la página
    useEffect(() => {
        const fullname = searchParams.get('fullname') || ''; // Obtener "fullname" del query string
        const phone = searchParams.get('phone') || '';
        const uid = searchParams.get('uid') || '';

        // Autocompletar los campos con los valores del query string
        setFormData((prevState) => ({
            ...prevState,
            fullname,
            phone,
            uid
        }));
    }, [searchParams]);

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const result = await beginRegistration(formData);
        if (result) {
            router.push('/success');
        } else {
            router.push('/error');
        }
        setIsLoading(false);
    }

    if (isLoading) {
        return <LoadingIndicator />
    }
    return (
        <>
            <div className="flex min-h-full flex-1 items-center justify-center px-6 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-sm space-y-10">
                    <div>
                        <img
                            alt="Your Company"
                            src="/img/logo.png"
                            className="mx-auto h-16 w-auto"
                        />
                        <h2 className="mt-10 text-left text-2xl leading-9  text-gray-600">
                            {t.register} {/* Mensaje de bienvenida */}
                        </h2>
                    </div>
                    <form action="#" onSubmit={registerUser} className="space-y-6">
                        {/* Nombre */}
                        <div className="rounded-md shadow-sm">
                            <label htmlFor="fullname">{t.name}</label>
                            <CustomInput
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={formData.fullname}
                                placeholder={t.name}
                                required
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Email */}
                        <div className="rounded-md shadow-sm">
                            <label htmlFor="email-address">{t.email}</label>
                            <CustomInput
                                id="email-address"
                                name="email"
                                type="email"
                                value={formData.email}
                                placeholder={t.email}
                                required
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="rounded-md shadow-sm">
                            <label htmlFor="phone">{t.phone}</label>
                            <CustomInput
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                placeholder={t.phone}
                                onChange={handleInputChange}
                                required
                                disabled
                            />
                        </div>

                        {/* Aceptar términos y condiciones */}
                        <div className="flex items-center">
                            <input
                                id="accept-terms"
                                name="accept-terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="accept-terms" className="ml-3 block text-sm leading-6 text-gray-900">
                                {t.acceptTerms}
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="confirm-phone"
                                name="confirm-phone"
                                type="checkbox"
                                required
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor="accept-terms" className="ml-3 block text-sm leading-6 text-gray-900">
                                Confirm your phone number
                            </label>
                        </div>

                        <div>
                            <GradientButton type={'submit'}>
                                {t.submit}
                            </GradientButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
