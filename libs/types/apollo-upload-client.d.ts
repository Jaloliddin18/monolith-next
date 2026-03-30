declare module "apollo-upload-client/public/createUploadLink.js" {
  import type { ApolloLink } from "@apollo/client";

  interface CreateUploadLinkOptions {
    uri?: string;
    headers?: HeadersInit;
    credentials?: RequestCredentials;
    fetchOptions?: RequestInit;
  }

  export default function createUploadLink(
    options?: CreateUploadLinkOptions,
  ): ApolloLink;
}
