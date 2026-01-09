import React, { useEffect } from 'react';

interface FacebookCommentsProps {
    url: string;
    appId?: string;
    width?: string;
    numPosts?: number;
    colorScheme?: 'light' | 'dark';
}

declare global {
    interface Window {
        FB: any;
    }
}

const FacebookComments: React.FC<FacebookCommentsProps> = ({
    url,
    appId,
    width = '100%',
    numPosts = 5,
    colorScheme = 'light'
}) => {
    useEffect(() => {
        // Initialize FB SDK if it exists
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        // Helper to load SDK
        const loadSdk = () => {
            if (document.getElementById('facebook-jssdk')) return;

            const fjs = document.getElementsByTagName('script')[0];
            if (fjs && fjs.parentNode) {
                const js = document.createElement('script');
                js.id = 'facebook-jssdk';
                js.src = `https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v18.0${appId ? `&appId=${appId}` : ''}`;
                js.crossOrigin = "anonymous";
                fjs.parentNode.insertBefore(js, fjs);
            }
        };

        loadSdk();
    }, [url, appId]);

    return (
        <div className="w-full bg-white rounded-xl p-4 mt-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Comentarios</h3>
            <div id="fb-root"></div>
            <div
                className="fb-comments"
                data-href={url}
                data-width={width}
                data-numposts={numPosts}
                data-colorscheme={colorScheme}
            ></div>
        </div>
    );
};

export default FacebookComments;
