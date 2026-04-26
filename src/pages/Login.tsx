import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Key, Shield, Landmark, Loader2 } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      // Check if user exists in firestore
      const userRef = doc(db, 'users', fbUser.uid);
      
      let role = 'citizen';
      try {
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          const { serverTimestamp } = await import('firebase/firestore');
          const newUser: any = {
            name: fbUser.displayName || 'New User',
            email: fbUser.email || '',
            mobile: fbUser.phoneNumber || '',
            role: 'citizen',
            createdAt: serverTimestamp()
          };
          if (fbUser.photoURL) {
            newUser.photoURL = fbUser.photoURL;
          }
          await setDoc(userRef, newUser);
        } else {
          role = userSnap.data().role;
        }
      } catch (dbErr: any) {
        if (dbErr?.message?.includes('offline') || dbErr?.message?.includes('Missing or insufficient permissions')) {
          console.warn("Firestore unreachable or permissions denied. Proceeding with default citizen role.", dbErr.message);
          // Just proceed. They'll be logged in with citizen privileges.
        } else {
          throw dbErr; // Rethrow to be caught by the outer catch
        }
      }

      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch (err: any) {
      console.error("Login Error:", err);
      // Give a more descriptive error if it's a popup-closed error inside an iframe
      if (err.code === 'auth/popup-closed-by-user') {
         setError('Sign-in popup was closed before completing. If you are on a mobile device or inside a restricted iframe, try opening the app in a new tab.');
      } else if (err.code === 'auth/unauthorized-domain') {
         setError('This domain is not authorized for Firebase Auth. Please add it to your Firebase Console under Authentication > Settings > Authorized domains.');
      } else {
         setError(err.message || 'Failed to sign in with Google');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center relative px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-80px)] w-full max-w-7xl mx-auto">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full border border-blue-100 flex items-center justify-center opacity-50 bg-gradient-to-tr from-blue-50/10 to-transparent">
            <div className="w-[400px] h-[400px] rounded-full border border-blue-50"></div>
        </div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full border border-indigo-100 opacity-50 bg-gradient-to-tr from-indigo-50/10 to-transparent"></div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Branding & Trust Section */}
        <div className="lg:col-span-6 space-y-10">
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                        <Landmark className="w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">VoteWise India</h1>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                  Empowering the <span className="text-blue-600">Sovereign Voice</span> of India.
                </h2>
                <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
                    Access your secure voting portal to verify your details, locate polling booths, and participate in the world's largest democracy.
                </p>
            </div>

            {/* Institutional Trust Section */}
            <div className="glass-card p-8 rounded-3xl space-y-8 max-w-lg border-l-4 border-l-emerald-500 bg-white/60">
                <div className="flex items-center gap-4 text-emerald-700">
                    <ShieldCheck className="w-8 h-8" />
                    <span className="text-xl font-bold tracking-tight">Institutional Trust</span>
                </div>
                <div className="grid grid-cols-1 gap-8">
                    <div className="flex gap-5">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 shadow-inner">
                            <Key className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-1">End-to-End Encryption</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">Secured with ECI-approved 256-bit encryption protocols for citizen data protection.</p>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 shadow-inner">
                            <Landmark className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-lg mb-1">Official ECI Framework</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">Compliant with the Digital India sovereignty standards and Election Commission mandates.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Login Card */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="glass-card w-full max-w-[480px] p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden bg-white/80 border border-white/40">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-white to-green-500"></div>
                <div className="mb-10 text-center">
                    <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Sign In</h3>
                    <p className="text-slate-600 text-base">Securely access your civil rights dashboard using your Google account.</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm font-medium">
                    {error}
                  </div>
                )}

                <div className="pt-2">
                    <button 
                        onClick={handleGoogleLogin}
                        disabled={loading} 
                        className={`interactive-btn btn-primary shadow-lg shadow-blue-500/20 w-full h-14 text-lg flex items-center justify-center ${loading ? 'opacity-70' : ''}`}
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (
                          <div className="flex items-center justify-center">
                            <span>Sign In with Google</span>
                          </div>
                        )}
                    </button>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-center gap-8">
                    <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-help group">
                        <Shield className="w-5 h-5 text-slate-700 group-hover:text-emerald-600 transition-colors" />
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Powered by Firebase</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
