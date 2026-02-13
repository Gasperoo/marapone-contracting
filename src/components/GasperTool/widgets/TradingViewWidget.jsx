import React, { useEffect, useRef } from 'react';

export const TradingViewWidget = ({
    src,
    scriptHTML,
    containerId,
    className = "",
    widgetType = "ticker-tape"
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear previous content
        containerRef.current.innerHTML = '';

        // Create the script element
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = src;

        // Parse the JSON configuration from the passed object/string
        // if scriptHTML is an object, stringify it
        const config = typeof scriptHTML === 'object' ? JSON.stringify(scriptHTML) : scriptHTML;
        script.innerHTML = config;

        // Append to container
        const widgetContainer = document.createElement('div');
        widgetContainer.className = `tradingview-widget-container__widget`;
        containerRef.current.appendChild(widgetContainer);
        containerRef.current.appendChild(script);

        // Add copyright/branding if needed, heavily optional.

    }, [src, scriptHTML]);

    return (
        <div
            id={containerId}
            ref={containerRef}
            className={`tradingview-widget-container ${className}`}
        />
    );
};
