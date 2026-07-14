import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export type UserRole = "student" | "advisor";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  studentId?: string; // links to mock student profile if role=student
}

interface StoredUser extends AuthUser {
  password: string;
}

const SESSION_KEY = "sp_session";
const USERS_COLLECTION = "users";

interface AuthCtx {
  user: AuthUser | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (data: { email: string; password: string; name: string; role: UserRole }) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Restore session from localStorage
    const raw = typeof window !== "undefined" ? localStorage.getItem(SESSION_KEY) : null;
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* noop */ }
    }
    setReady(true);

    // Seed default demo accounts into Firestore if DB is empty
    const seedDB = async () => {
      try {
        const snapshot = await getDocs(collection(db, USERS_COLLECTION));
        if (snapshot.empty) {
          await addDoc(collection(db, USERS_COLLECTION), { email: "student@demo.com", password: "demo1234", name: "Aditi Sharma", role: "student", studentId: "s1" });
          await addDoc(collection(db, USERS_COLLECTION), { email: "advisor@demo.com", password: "demo1234", name: "Dr. Elena Ross", role: "advisor" });
        }
      } catch (err) {
        console.error("Failed to seed DB:", err);
      }
    };
    
    if (typeof window !== "undefined") {
      seedDB();
    }
  }, []);

  const login: AuthCtx["login"] = async (email, password) => {
    const q = query(
      collection(db, USERS_COLLECTION), 
      where("email", "==", email.toLowerCase())
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      throw new Error("Invalid email or password");
    }

    const doc = snapshot.docs.find(d => (d.data() as StoredUser).password === password);
    
    if (!doc) {
      throw new Error("Invalid email or password");
    }

    const foundUser = doc.data() as StoredUser;
    const docId = doc.id;

    const safeUser: AuthUser = {
      id: docId,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
      studentId: foundUser.studentId
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  };

  const signup: AuthCtx["signup"] = async ({ email, password, name, role }) => {
    const q = query(
      collection(db, USERS_COLLECTION), 
      where("email", "==", email.toLowerCase())
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      throw new Error("Account already exists — try logging in.");
    }

    const newUser = {
      email: email.toLowerCase(),
      password,
      name,
      role,
      studentId: role === "student" ? "s1" : undefined
    };

    const docRef = await addDoc(collection(db, USERS_COLLECTION), newUser);

    const safeUser: AuthUser = {
      id: docRef.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      studentId: newUser.studentId
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
