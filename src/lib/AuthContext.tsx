import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  createdAt: number;
  photoURL?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        // Real-time listener for user profile
        unsubscribeProfile = onSnapshot(doc(db, 'users', fbUser.uid), (userDoc) => {
          if (userDoc.exists()) {
            const data = userDoc.data() as Omit<UserProfile, 'id'>;
            setUser({ id: fbUser.uid, photoURL: fbUser.photoURL || undefined, ...data });
          } else {
            // Default for new users
            const newUser = {
                id: fbUser.uid,
                name: fbUser.displayName || 'New User',
                email: fbUser.email || '',
                mobile: fbUser.phoneNumber || '',
                role: 'citizen',
                createdAt: Date.now(),
                photoURL: fbUser.photoURL || undefined
            };
            setUser(newUser);
          }
          setLoading(false);
        }, (err) => {
            console.error("Error listening to user profile", err);
            // Fallback
            setUser({
                id: fbUser.uid,
                name: fbUser.displayName || 'User',
                email: fbUser.email || '',
                mobile: fbUser.phoneNumber || '',
                role: 'citizen',
                createdAt: Date.now(),
                photoURL: fbUser.photoURL || undefined
            });
            setLoading(false);
        });
      } else {
        if (unsubscribeProfile) unsubscribeProfile();
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
        unsubscribeAuth();
        if (unsubscribeProfile) unsubscribeProfile();
    };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      firebaseUser,
      loading,
      logout,
      isAuthenticated: !!firebaseUser && !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
