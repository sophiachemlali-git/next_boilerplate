export interface AwsAuthConfig {
  region: string
  userPoolId: string
  userPoolWebClientId: string
  identityPoolId: string
}

const awsExports: {
  Auth: AwsAuthConfig
} = {
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
    userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID || '',
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID || '',
    identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_POOL_ID || '',
  },
}

export default awsExports
