"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import {
   onAuthStateChanged,
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   signOut as firebaseSignOut,
   updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase-config";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import type { User } from "../types";

interface FirebaseContextType {
   user: User | null;
   loading: boolean;
   signIn: (email: string, password: string) => Promise<void>;
   signUp: (email: string, password: string, name: string) => Promise<void>;
   signOut: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(
   undefined
);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
         if (firebaseUser) {
            const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
            if (userDoc.exists()) {
               const userData = userDoc.data() as Omit<User, "id">;
               setUser({
                  id: firebaseUser.uid,
                  ...userData,
                  createdAt: userData.createdAt?.toDate() || new Date(),
                  updatedAt: userData.updatedAt?.toDate() || new Date(),
               });
            } else {
               // Se o usuário existe no Auth mas não no Firestore
               setUser(null);
            }
         } else {
            setUser(null);
         }
         setLoading(false);
      });

      return () => unsubscribe();
   }, []);

   const signIn = async (email: string, password: string) => {
      try {
         await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
         console.error("Erro ao fazer login:", error);
         throw error;
      }
   };

   const signUp = async (email: string, password: string, name: string) => {
      try {
         const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
         );
         const firebaseUser = userCredential.user;

         // Atualiza o perfil do usuário no Auth
         await updateProfile(firebaseUser, { displayName: name });

         // Cria o documento do usuário no Firestore
         await setDoc(doc(db, "users", firebaseUser.uid), {
            name,
            email,
            photoURL: firebaseUser.photoURL,
            role: "reader", // Papel padrão para novos usuários
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
         });
      } catch (error) {
         console.error("Erro ao criar conta:", error);
         throw error;
      }
   };

   const signOut = async () => {
      try {
         await firebaseSignOut(auth);
      } catch (error) {
         console.error("Erro ao fazer logout:", error);
         throw error;
      }
   };

   return (
      <FirebaseContext.Provider
         value={{ user, loading, signIn, signUp, signOut }}
      >
         {children}
      </FirebaseContext.Provider>
   );
}

export const useFirebase = () => {
   const context = useContext(FirebaseContext);
   if (context === undefined) {
      throw new Error(
         "useFirebase deve ser usado dentro de um FirebaseProvider"
      );
   }
   return context;
};
