"use client"; // Required for client components

import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";
import { useApollo } from "../lib/apolloClient"; // Assuming this is where the Apollo setup is

interface ApolloProviderWrapperProps {
    children: ReactNode;
}

const ApolloProviderWrapper = ({ children }: ApolloProviderWrapperProps) => {
    const apolloClient = useApollo(null); // Initialize Apollo client without initial state

    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
