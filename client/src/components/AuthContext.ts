import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import type { DbUser } from '../types';

export interface AuthContextType {
    session: Session | null;
    user: User | null;
    dbUser: DbUser | null;
    signOut: () => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
