import { Amplify } from "aws-amplify";

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

export default function ConfigureAmplifyClientSide() {
  return null;
}
