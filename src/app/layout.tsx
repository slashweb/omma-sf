import type {Metadata} from "next";
import {Fredoka} from 'next/font/google'; // Importar Fredoka desde Google Fonts
import "./globals.css";
import {TranslationProvider} from "@/context/TranslationContext";
import ContextProvider from "@/context";
import {headers} from "next/headers";
// Importar Fredoka desde Google Fonts
const fredoka = Fredoka({
    subsets: ['latin'],
    weight: ['400', '700'],  // Puedes elegir los pesos que necesites
    variable: '--font-fredoka',  // Variable CSS para usar Fredoka
});

export const metadata: Metadata = {
    title: "OmmaCash",
    description: "Sending money made easy"
};

// Layout como Server Component
export default function RootLayout({children, params}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const {locale} = params;


    const cookies = headers().get('cookie');

    return (
        <html lang={locale}>
        <body className={`${fredoka.variable} antialiased`}>
        <ContextProvider cookies={cookies}>
            <TranslationProvider locale={locale}>
                {children}
            </TranslationProvider>
        </ContextProvider>
        </body>
        </html>
    )
        ;
}
