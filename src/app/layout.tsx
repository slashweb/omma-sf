import type {Metadata} from "next";
import {Fredoka} from 'next/font/google'; // Importar Fredoka desde Google Fonts
import "./globals.css";
import {TranslationProvider} from "@/context/TranslationContext";

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


    return (
        <html lang={locale}>
        <body className={`${fredoka.variable} antialiased`}>
        <TranslationProvider locale={locale}>
            {children}
        </TranslationProvider>
        </body>
        </html>
    );
}
