import { poolData } from '@/config/cognito'
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
  ICognitoUserAttributeData,
  ISignUpResult,
} from 'amazon-cognito-identity-js'

// Create a CognitoUserPool instance using poolData
const userPool: CognitoUserPool = new CognitoUserPool(poolData)

// Retrieve the current user from the user pool
let currentUser: CognitoUser | null = userPool.getCurrentUser()

/**
 * Get the current authenticated user.
 * @returns Current authenticated user or null if not authenticated.
 */
export function getCurrentUser(): CognitoUser | null {
  return currentUser
}

/**
 * Get a CognitoUser instance for the given username.
 * @param username - The username of the user.
 * @returns CognitoUser instance.
 */
export function getCognitoUser(username: string): CognitoUser {
  const userData = {
    Username: username,
    Pool: userPool,
  }

  return new CognitoUser(userData)
}

/**
 * Get the current user session.
 * @returns A promise that resolves to the current user session.
 */
export async function getSession(): Promise<CognitoUserSession> {
  // If currentUser is not available, retrieve it from the user pool
  if (!currentUser) {
    currentUser = userPool.getCurrentUser()
  }

  return new Promise((resolve, reject) => {
    // Get the session for the current user
    currentUser?.getSession((error: Error | null, sessionResult: CognitoUserSession | null) => {
      if (error) {
        reject(error)
      } else if (sessionResult) {
        resolve(sessionResult)
      } else {
        reject(new Error('No session and no error received from Cognito.'))
      }
    })
  })
}

/**
 * Sign up a user with email.
 * @param username - The desired username for the new user.
 * @param email - The email address of the new user.
 * @param password - The password for the new user.
 * @returns A promise that resolves to the sign-up result or undefined on failure.
 */
export async function signUpUserWithEmail(
  username: string,
  email: string,
  password: string
): Promise<ISignUpResult | undefined> {
  return new Promise((resolve, reject) => {
    // Create user attributes for email
    const attributeData: ICognitoUserAttributeData = {
      Name: 'email',
      Value: email,
    }

    const attributeList = [new CognitoUserAttribute(attributeData)]

    // Sign up the user with email
    userPool.signUp(username, password, attributeList, [], (error, signUpResult) => {
      if (error) {
        reject(error)
      } else {
        resolve(signUpResult)
      }
    })
  })
}

/**
 * Verify a user's registration code.
 * @param username - The username of the user.
 * @param code - The verification code.
 * @returns A promise that resolves on successful verification.
 */
export async function verifyCodeValidation(username: string, code: string): Promise<unknown> {
  const cognitoUser = getCognitoUser(username)

  return new Promise((resolve, reject) => {
    // Confirm the registration code
    cognitoUser.confirmRegistration(code, true, (error, confirmationResult) => {
      if (error) {
        reject(error)
      } else {
        resolve(confirmationResult)
      }
    })
  })
}

/**
 * Verify a user's registration code.
 * @param username - The username of the user.
 * @param code - The verification code.
 * @returns A promise that resolves on successful verification.
 */
export async function verifyCode(username: string, code: string): Promise<unknown> {
  const cognitoUser = getCognitoUser(username)

  return new Promise((resolve, reject) => {
    // Confirm the registration code
    cognitoUser.confirmRegistration(code, true, (error, confirmationResult) => {
      if (error) {
        reject(error)
      } else {
        resolve(confirmationResult)
      }
    })
  })
}

/**
 * Sign in a user with email and password.
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @param code - The MFA code if MFA is set up.
 * @returns A promise that resolves to the user session on successful sign-in.
 */
export async function signInWithEmail(
  username: string,
  password: string,
  code: string
): Promise<CognitoUserSession> {
  return new Promise((resolve, reject) => {
    const authenticationData = {
      Username: username,
      Password: password,
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    const cognitoUser = getCognitoUser(username)
    currentUser = cognitoUser

    // Authenticate the user
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: signInResult => {
        resolve(signInResult)
      },
      onFailure: error => {
        console.log(error)
        reject(error)
      },
      mfaSetup: () => {
        if (code) {
          // Send MFA code if available
          cognitoUser.sendMFACode(code, {
            onSuccess: result => {
              resolve(result)
            },
            onFailure: error => {
              console.log(error)
              reject(error)
            },
          })
        } else {
          console.log('Missing MFA code')
          // Resolve with a dummy session if MFA code is missing
          resolve({ isValid: () => true } as CognitoUserSession)
          return
        }
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        resolve({
          requiresPasswordChange: true,
          userAttributes,
          requiredAttributes,
        } as unknown as CognitoUserSession)
      },
    })
  })
}

/**
 * Complete new password the current user.
 * @param password - The password of the user.
 * @returns A promise that resolves on successful complete new password.
 */
export function completeNewPassword(newPassword: string): Promise<CognitoUserSession> {
  return new Promise<CognitoUserSession>((resolve, reject) => {
    currentUser?.completeNewPasswordChallenge(
      newPassword,
      {},
      {
        onSuccess: session => {
          resolve(session)
        },
        onFailure: error => {
          console.error('Error changing password:', error)
          reject(error)
        },
      }
    )
  })
}

/**
 * Sign out the current user.
 * @returns A promise that resolves on successful sign-out.
 */
export function signOut(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Sign out the current user
    currentUser?.globalSignOut({
      onSuccess: () => {
        resolve()
      },
      onFailure: error => {
        reject(error)
      },
    })
  })
}

/**
 * Get the attributes of the current user.
 * @returns A promise that resolves to the list of user attributes.
 */
export async function getAttributes(): Promise<unknown> {
  return new Promise((resolve, reject) => {
    // Get user attributes
    currentUser?.getUserAttributes((error, attributesList) => {
      if (error) {
        reject(error)
      } else {
        resolve(attributesList)
      }
    })
  })
}

/**
 * Set a user attribute.
 * @param attribute - The user attribute to set.
 * @returns A promise that resolves on successful attribute update.
 */
export async function setAttribute(attribute: ICognitoUserAttributeData): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const userAttribute = new CognitoUserAttribute(attribute)

    // Update user attributes
    currentUser?.updateAttributes([userAttribute], (error, updateResult) => {
      if (error) {
        reject(error)
      } else {
        resolve(updateResult)
      }
    })
  })
}

/**
 * Send a verification code to reset the user's password.
 * @param username - The username of the user.
 * @returns A promise that resolves on successful code send.
 */
export async function sendCode(username: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(username)

    if (!cognitoUser) {
      reject(`Could not find user: ${username}`)
      return
    }

    // Initiate forgot password process
    cognitoUser.forgotPassword({
      onSuccess: result => {
        resolve(result)
      },
      onFailure: error => {
        reject(error.message)
      },
    })
  }).catch(error => {
    throw error
  })
}

/**
 * Reset the user's password using a verification code.
 * @param username - The username of the user.
 * @param code - The verification code.
 * @param password - The new password.
 * @returns A promise that resolves on successful password update.
 */
export async function forgotPassword(
  username: string,
  code: string,
  password: string
): Promise<string> {
  const cognitoUser = getCognitoUser(username)

  return new Promise((resolve, reject) => {
    // Confirm the password reset
    cognitoUser.confirmPassword(code, password, {
      onSuccess: () => {
        resolve('Password updated')
      },
      onFailure: error => {
        reject(error.message)
      },
    })
  })
}

/**
 * Change the user's password.
 * @param oldPassword - The current password.
 * @param newPassword - The new password.
 * @returns A promise that resolves on successful password change.
 */
export async function changePassword(
  oldPassword: string,
  newPassword: string
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    // Change the user's password
    currentUser?.changePassword(oldPassword, newPassword, (error, changeResult) => {
      if (error) {
        reject(error)
      } else {
        resolve(changeResult)
      }
    })
  })
}
