import React, { useEffect, useRef } from 'react';

export function ShipTrackingMap() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Set global variables required by the script
        window.mst_width = "100%";
        window.mst_height = "100%";
        window.mst_border = "0";
        window.mst_map_style = "simple";
        window.mst_mmsi = "";
        window.mst_show_track = "";
        window.mst_show_info = "";
        window.mst_fleet = "";
        window.mst_lat = "20";
        window.mst_lng = "0";
        window.mst_zoom = "2";
        window.mst_show_names = "1";
        window.mst_scroll_wheel = "0";
        window.mst_show_menu = "0";

        // Create and append the script
        const script = document.createElement('script');
        script.id = 'myshiptrackingscript';
        script.src = 'https://www.myshiptracking.com/js/widgetApi.js';
        script.async = true;
        script.defer = true;

        // Clear container first to prevent duplicates on re-renders
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(script);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
            // Optional: Clean up globals if we want to be strict, 
            // but they might be used by other instances if we had them.
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full min-h-[500px] bg-[#0f172a] rounded-xl overflow-hidden border border-white/5 relative z-0"
        />
    );
}
