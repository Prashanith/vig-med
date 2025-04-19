import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";

export async function loginWithEmailAndPassword(
  email: string,
  password: string
) {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
}

export async function logOut() {
  await signOut(auth);
}
