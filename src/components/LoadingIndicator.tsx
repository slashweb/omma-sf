import {useTranslation} from "@/context/TranslationContext";

export default function LoadingIndicator() {
    const t = useTranslation();

    return (
        <>
            <div className="flex justify-center items-center h-64">

            </div>
            <div className="flex justify-center items-center">
                <div className="absolute -mt-32 -ml-8 animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-pink-300"></div>
                <img src="/img/chocolate.gif" className={'z-50'} alt=""/>
            </div>
            <div className="flex px-12 justify-center items-center text-center w-full mt-10">
                <h1 className="text-3xl font-bold text-pink-300 animate-pulse">
                    {t.loading}
                </h1>
            </div>
        </>
    );
}
