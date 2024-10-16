import { Amplify } from "aws-amplify";
import { defaultStorage } from "aws-amplify/utils";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";

export const authConfig = {
  Cognito: {
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
  },
};

Amplify.configure(
  {
    Auth: authConfig,
  },
  {
    ssr: true,
  }
);

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

export default function ConfigureAmplifyClientSide() {
  return null;
}
