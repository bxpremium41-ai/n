import React, { useState, useEffect } from 'react';
import { X, Trash2, LogOut, ShieldCheck, MessageSquare, Calendar } from 'lucide-react';
import { Lead } from '../types';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Listen for realtime updates when logged in
  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, "leads"), orderBy("submittedAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedLeads: Lead[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Lead));
        setLeads(fetchedLeads);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
      setError('');
    } catch (err: any) {
      console.error(err);
      setError('Invalid email or password.');
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('Are you sure you want to remove this lead?')) {
        try {
            await deleteDoc(doc(db, "leads", id));
        } catch (err) {
            console.error("Error deleting: ", err);
            alert("Could not delete lead.");
        }
    }
  };

  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/50 backdrop-blur-sm p-4">
        <div className="bg-surface w-full max-w-sm p-8 rounded-[2rem] shadow-material-3 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-secondary-container rounded-full transition-colors">
            <X className="w-6 h-6 text-secondary" />
          </button>
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-2xl text-on-surface">Staff Access</h3>
            <p className="text-secondary text-sm mt-1">Please log in to view leads.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="bg-secondary-container/30 rounded-t-lg border-b border-secondary">
              <input
                type="email"
                placeholder="Email Address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent p-4 outline-none placeholder-secondary"
              />
            </div>
            <div className="bg-secondary-container/30 rounded-t-lg border-b border-secondary">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent p-4 outline-none placeholder-secondary"
              />
            </div>
            
            {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              className="w-full bg-primary text-on-primary rounded-full py-3 font-bold shadow-md hover:shadow-lg transition-all hover:bg-primary-dark mt-4"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-surface-variant overflow-y-auto font-sans">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-surface p-6 rounded-3xl shadow-sm border border-white">
          <div>
            <h2 className="text-2xl font-display font-bold text-on-surface">Lead Dashboard</h2>
            <p className="text-secondary mt-1">Logged in as {currentUser.email} • {leads.length} active inquiries.</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button onClick={handleLogout} className="flex items-center px-6 py-2 border border-secondary text-secondary font-medium rounded-full hover:bg-secondary-container transition-colors">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
            <button onClick={onClose} className="px-6 py-2 bg-on-surface text-surface font-medium rounded-full hover:opacity-90 transition-opacity">
              Close
            </button>
          </div>
        </div>

        {leads.length === 0 ? (
            <div className="text-center py-24 bg-surface rounded-3xl border border-dashed border-secondary-container">
                <p className="text-secondary text-lg">No leads yet. Time to do some marketing!</p>
            </div>
        ) : (
            <div className="bg-surface shadow-material-1 rounded-3xl overflow-hidden border border-secondary-container">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-secondary-container/50 text-secondary text-xs font-bold uppercase tracking-wider">
                        <th className="p-6">Type</th>
                        <th className="p-6">Date</th>
                        <th className="p-6">Name / Details</th>
                        <th className="p-6">Contact</th>
                        <th className="p-6">Message / Info</th>
                        <th className="p-6 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary-container">
                    {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-surface-variant transition-colors group">
                        
                        {/* Type Icon */}
                        <td className="p-6">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center ${lead.type === 'contact_form' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                              {lead.type === 'contact_form' ? <MessageSquare size={18} /> : <Calendar size={18} />}
                           </div>
                        </td>

                        {/* Date */}
                        <td className="p-6 whitespace-nowrap text-secondary text-sm">
                            {new Date(lead.submittedAt).toLocaleDateString()} <br/>
                            <span className="text-xs opacity-60">{new Date(lead.submittedAt).toLocaleTimeString()}</span>
                        </td>

                        {/* Name or Meeting Time */}
                        <td className="p-6 text-on-surface">
                            {lead.scheduledDate ? (
                                <div>
                                    <div className="font-bold text-primary">Meeting: {lead.scheduledDate}</div>
                                    <div className="text-xs text-secondary">{lead.scheduledTime} (IST)</div>
                                    <div className="text-sm mt-1">{lead.name}</div>
                                </div>
                            ) : (
                                <div className="font-bold text-lg">{lead.name || 'Anonymous'}</div>
                            )}
                        </td>

                        {/* Contact */}
                        <td className="p-6">
                            <div className="flex flex-col">
                                {lead.email && <span className="text-primary underline cursor-pointer">{lead.email}</span>}
                                {lead.phone && <span className="text-secondary text-sm mt-1">{lead.phone}</span>}
                            </div>
                        </td>

                        {/* Message or Role */}
                        <td className="p-6">
                            {lead.message ? (
                                <p className="text-sm text-secondary max-w-xs line-clamp-3" title={lead.message}>{lead.message}</p>
                            ) : (
                                <span className="px-3 py-1 bg-primary-container text-primary-dark rounded-full text-xs font-bold">
                                {lead.role || 'Lead'}
                                </span>
                            )}
                        </td>

                        {/* Actions */}
                        <td className="p-6 text-right">
                            <button 
                            onClick={() => handleDelete(lead.id)}
                            className="text-secondary hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all"
                            title="Delete"
                            >
                            <Trash2 className="w-5 h-5" />
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            </div>
        )}
      </div>
    </div>
  );
};