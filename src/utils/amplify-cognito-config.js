import { Amplify } from "aws-amplify";
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

export const authConfig = {
  Cognito: {
    userPoolId: 'us-east-2_IyQxTzjYj',
    userPoolClientId: '4dj0t0jqsj2j8gtdtjv6f161j9'
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
