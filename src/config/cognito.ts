export function getPoolData() {
  const UserPoolId = process.env.NEXT_PUBLIC_AWS_USER_POOL_ID
  const ClientId = process.env.NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID

  if (!UserPoolId || !ClientId) {
    throw new Error(
      'Missing Cognito configuration. Please set NEXT_PUBLIC_AWS_USER_POOL_ID and NEXT_PUBLIC_AWS_USER_POOL_WEB_CLIENT_ID environment variables.'
    )
  }

  return { UserPoolId, ClientId }
}
