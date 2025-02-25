import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../../firebase";
  
  // Registro de usuario
  export const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // Inicio de sesión
  export const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      return user;
    } catch (error) {
      console.error("Error al iniciar sesión: ", error.message);
      throw new Error(error.message);
    }
  };
  
  // Cerrar sesión
  export const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  export const checkAuth = (callback) => {
    return onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  };