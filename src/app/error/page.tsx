'use client'

import {useTranslation} from "@/context/TranslationContext";
import GradientButton from "@/components/GradientButton";

export default function Error() {
    const t = useTranslation()
    const phone = process.env.NEXT_PUBLIC_OMMA_NUMBER

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center space-y-8 p-6">
                <img
                    alt="Omma Cash"
                    src="/img/close-icon.png"
                    className="mx-auto h-32 w-auto"
                />
                <h2 className={'text-3xl text-center'}>
                    {t.error}
                </h2>
                <GradientButton>
                    <a href={"https://wa.me/" + phone} className={'flex items-center space-x-2 py-1'}>
                        <span>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"><path
                                d="M0.556641 24L2.24364 17.837C1.20264 16.033 0.655641 13.988 0.656641 11.891C0.659641 5.335 5.99464 0 12.5496 0C15.7306 0.001 18.7166 1.24 20.9626 3.488C23.2076 5.736 24.4436 8.724 24.4426 11.902C24.4396 18.459 19.1046 23.794 12.5496 23.794C10.5596 23.793 8.59864 23.294 6.86164 22.346L0.556641 24ZM7.15364 20.193C8.82964 21.188 10.4296 21.784 12.5456 21.785C17.9936 21.785 22.4316 17.351 22.4346 11.9C22.4366 6.438 18.0196 2.01 12.5536 2.008C7.10164 2.008 2.66664 6.442 2.66464 11.892C2.66364 14.117 3.31564 15.783 4.41064 17.526L3.41164 21.174L7.15364 20.193ZM18.5406 14.729C18.4666 14.605 18.2686 14.531 17.9706 14.382C17.6736 14.233 16.2126 13.514 15.9396 13.415C15.6676 13.316 15.4696 13.266 15.2706 13.564C15.0726 13.861 14.5026 14.531 14.3296 14.729C14.1566 14.927 13.9826 14.952 13.6856 14.803C13.3886 14.654 12.4306 14.341 11.2956 13.328C10.4126 12.54 9.81564 11.567 9.64264 11.269C9.46964 10.972 9.62464 10.811 9.77264 10.663C9.90664 10.53 10.0696 10.316 10.2186 10.142C10.3696 9.97 10.4186 9.846 10.5186 9.647C10.6176 9.449 10.5686 9.275 10.4936 9.126C10.4186 8.978 9.82464 7.515 9.57764 6.92C9.33564 6.341 9.09064 6.419 8.90864 6.41L8.33864 6.4C8.14064 6.4 7.81864 6.474 7.54664 6.772C7.27464 7.07 6.50664 7.788 6.50664 9.251C6.50664 10.714 7.57164 12.127 7.71964 12.325C7.86864 12.523 9.81464 15.525 12.7956 16.812C13.5046 17.118 14.0586 17.301 14.4896 17.438C15.2016 17.664 15.8496 17.632 16.3616 17.556C16.9326 17.471 18.1196 16.837 18.3676 16.143C18.6156 15.448 18.6156 14.853 18.5406 14.729Z"
                                fill="white"/>
                            </svg>
                        </span>
                        <span>
                            {t.back}
                        </span>
                    </a>
                </GradientButton>
                <img src="/img/logo.png" alt="Omma Cash"/>

            </div>
        </div>
    );
}
