import { signIn, signOut } from "aws-amplify/auth";

export async function handleSignIn({
  username,
  password,
}) {
  try {
    const { isSignedIn } = await signIn({ username, password });
    if (isSignedIn) {
      return { success: true };
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message || "Sign-in failed, please try again.",
    };
  }
}


export async function handleSignOut() {
  try {
    await signOut();
    window.location.reload()
  } catch (error) {
    console.log('Logout error', error);
  }
}