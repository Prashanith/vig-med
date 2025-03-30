import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";

export async function loginWithEmailAndPassword(
  email: string,
  password: string
) {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
}
