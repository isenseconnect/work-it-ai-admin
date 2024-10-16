import { fetchAuthSession, signIn, signOut } from "aws-amplify/auth";

export async function handleSignIn({ username, password }) {
  try {
    const user = await signIn({ username, password });
    const session = (await fetchAuthSession()).tokens ?? {};
    // Access token contains user groups
    const accessToken = session.accessToken?.payload ?? {};
    const userGroups = accessToken["cognito:groups"] || [];
    if (userGroups.includes("Admin")) {
      console.log("User signed in successfully as Admin.");
      return { success: true };
    } else {
      // If not an admin, sign out the user
      await signOut();
      console.log("Access denied: User is not an Admin.");
      return {
        success: false,
        message: "Access denied: Admins only.",
      };
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
    window.location.reload();
  } catch (error) {
    console.log("Logout error", error);
  }
}
