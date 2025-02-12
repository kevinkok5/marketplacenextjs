"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({
    speed: 100,
    showSpinner: false,
    trickle: true,
    trickleSpeed: 20,
});

function RouteChangeProgressBar() {
    const pathname = usePathname();

    useEffect(() => {
        // Start progress bar when route starts changing

        const handleRouteChangeStart = () => {
            NProgress.start();
        };

        // Stop progress bar when route changes are complete
        const handleRouteChangeComplete = () => {
            NProgress.done();
            NProgress.remove();
        };

        // Use a mutation observer to handle changes to route
        handleRouteChangeStart();

        // Listen for page transitions directly by reacting to pathname changes
        const observer = new MutationObserver(() => {
            handleRouteChangeComplete();
        });

        // Observe the route change directly by watching for changes in the DOM (as Next.js does route rendering)
        observer.observe(document, { childList: true, subtree: true });

        // Clean up the observer and stop progress on unmount
        return () => {
            observer.disconnect();
            NProgress.remove();
        };
    }, [pathname]);

    return <></>;
}

export default RouteChangeProgressBar;
