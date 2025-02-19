import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-provider";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryClientProvider from "@/contexts/ReactQueryClientProvider";
import ApolloProviderWrapper from "@/contexts/ApollowClientProvider";
import RouteChangeProgressBar from "@/components/RouteChangeProgressBar";
import "nprogress/nprogress.css";
// import Router from "next/router";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-imb-plex-serif",
});

export const metadata: Metadata = {
    title: "Marketplace",
    description: "Marketplace is a modern way of shoping for everyone",
    icons: {
        icon: "/icons/logo.svg",
    },
};

// Router.events.on("routeChangeStart", () => NProgress.start());
// Router.events.on("routeChangeComplete", () => {
//     NProgress.done();
//     NProgress.remove();
// });
// Router.events.on("routeChangeError", () => {
//     NProgress.done();
//     NProgress.remove();
// });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ReactQueryClientProvider>
                        <ApolloProviderWrapper>
                            <RouteChangeProgressBar />
                            {children}
                            <Toaster />
                        </ApolloProviderWrapper>
                    </ReactQueryClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
