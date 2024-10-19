'use client';  // Esta línea es necesaria para que el contexto funcione en el cliente

import {createContext, useContext, ReactNode} from 'react';
import {getTranslations} from '../utils/translation';

// Definimos el tipo para el contexto
interface TranslationContextProps {
    [key: string]: string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

interface TranslationProviderProps {
    children: ReactNode;
    locale: string;
}

export function TranslationProvider({children, locale}: TranslationProviderProps) {
    const translations = getTranslations(locale);

    return (
        <TranslationContext.Provider value={translations}>
            {children}
        </TranslationContext.Provider>
    );
}

export const useTranslation = (): TranslationContextProps => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};
