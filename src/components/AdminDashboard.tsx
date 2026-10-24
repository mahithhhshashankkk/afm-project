import { useEffect, useState, useCallback } from 'react';
import {
  Recycle, LogOut, Search, Mail, Building2, Users, Clock,
  CheckCircle2, XCircle, Loader2, Inbox, TrendingUp, Calendar,
  ArrowLeft, Trash2, ChevronDown,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface DemoRequest {
  id: string;
  name: string;
  email: string;
  institution: string;
  residents: string;
  message: string | null;
  status: 'pending' | 'contacted' | 'demo_scheduled' | 'closed';
  created_at: string;
}

const STATUS_CONFIG: Record<DemoRequest['status'], { label: string; color: string; bg: string; dot: string }> = {
  pending: { label: 'Pending', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', dot: 'bg-amber-400' },
  contacted: { label: 'Contacted', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', dot: 'bg-blue-400' },
  demo_scheduled: { label: 'Demo Scheduled', color: 'text-green-700', bg: 'bg-green-50 border-green-200', dot: 'bg-green-400' },
  closed: { label: 'Closed', color: 'text-ink-500', bg: 'bg-ink-50 border-ink-200', dot: 'bg-ink-400' },
};

const STATUSES = Object.entries(STATUS_CONFIG) as [DemoRequest['status'], typeof STATUS_CONFIG[DemoRequest['status']]][];

export function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<DemoRequest['status'] | 'all'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 0, pending: 0, contacted: 0, scheduled: 0 });

  // Auth form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchRequests = useCallback(async () => {
    if (!session) return;
    const { data, error } = await supabase
      .from('demo_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError('Failed to load requests');
      return;
    }
    setRequests(data as DemoRequest[]);
    const all = data as DemoRequest[];
    setStats({
      total: all.length,
      pending: all.filter((r) => r.status === 'pending').length,
      contacted: all.filter((r) => r.status === 'contacted').length,
      scheduled: all.filter((r) => r.status === 'demo_scheduled').length,
    });
  }, [session]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      setAuthLoading(false);
    }
  };

  const handleLogout = () => supabase.auth.signOut();

  const updateStatus = async (id: string, status: DemoRequest['status']) => {
    setUpdatingId(id);
    const { error } = await supabase.from('demo_requests').update({ status }).eq('id', id);
    if (error) {
      setError('Failed to update status');
      setUpdatingId(null);
      return;
    }
    await fetchRequests();
    setUpdatingId(null);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('demo_requests').delete().eq('id', id);
    if (error) {
      setError('Failed to delete request');
      return;
    }
    await fetchRequests();
  };

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.institution.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-50 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-ink-100 bg-white p-8 shadow-xl shadow-ink-900/5">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 shadow-lg shadow-primary-600/30">
                <Recycle className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="mt-5 font-display text-2xl font-extrabold text-ink-900">WasteHero Admin</h1>
              <p className="mt-1 text-sm text-ink-400">Sign in to manage demo requests</p>
            </div>

            {authError && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-500">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm font-medium text-ink-800 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  placeholder="admin@wastehero.in"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-500">
                  Password
                </label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm font-medium text-ink-800 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className="btn-primary w-full justify-center disabled:opacity-60"
              >
                {authLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
              </button>
            </form>

            <a
              href="#"
              onClick={() => (window.location.hash = '')}
              className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-ink-500 transition-colors hover:text-primary-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-ink-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-600/30">
              <Recycle className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-extrabold tracking-tight text-ink-900">
              Waste<span className="text-primary-600">Hero</span>
              <span className="ml-2 text-xs font-medium text-ink-400">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={() => (window.location.hash = '')}
              className="hidden items-center gap-2 text-sm font-semibold text-ink-500 transition-colors hover:text-primary-600 sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-600 transition-colors hover:border-red-200 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <h1 className="font-display text-2xl font-extrabold text-ink-900">Demo Requests</h1>
        <p className="mt-1 text-sm text-ink-400">Manage and track all incoming demo requests</p>

        {/* Stats cards */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: 'Total Requests', value: stats.total, icon: Inbox, color: 'text-ink-600', bg: 'bg-ink-100' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Contacted', value: stats.contacted, icon: Mail, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Demos Scheduled', value: stats.scheduled, icon: Calendar, color: 'text-green-600', bg: 'bg-green-50' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-ink-100 bg-white p-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="mt-3 font-display text-3xl font-extrabold text-ink-900">{stat.value}</p>
              <p className="text-xs font-medium text-ink-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <XCircle className="h-5 w-5 shrink-0" />
            {error}
          </div>
        )}

        {/* Search + filter */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or institution..."
              className="w-full rounded-xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-ink-800 placeholder:text-ink-300 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filter === 'all' ? 'bg-ink-900 text-white' : 'bg-white text-ink-500 hover:bg-ink-100'
              }`}
            >
              All
            </button>
            {STATUSES.map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === key ? 'bg-ink-900 text-white' : 'bg-white text-ink-500 hover:bg-ink-100'
                }`}
              >
                {cfg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-ink-100 bg-white">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Inbox className="h-12 w-12 text-ink-300" />
              <p className="mt-4 font-display text-lg font-bold text-ink-700">No requests found</p>
              <p className="mt-1 text-sm text-ink-400">
                {requests.length === 0 ? 'New demo requests will appear here.' : 'Try adjusting your search or filter.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ink-100 bg-ink-50/50">
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-ink-500">Name</th>
                    <th className="hidden px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-ink-500 sm:table-cell">Institution</th>
                    <th className="hidden px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-ink-500 lg:table-cell">Residents</th>
                    <th className="hidden px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-ink-500 md:table-cell">Date</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wide text-ink-500">Status</th>
                    <th className="px-5 py-3.5 text-right text-xs font-bold uppercase tracking-wide text-ink-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {filtered.map((req) => {
                    const cfg = STATUS_CONFIG[req.status];
                    return (
                      <tr key={req.id} className="transition-colors hover:bg-ink-50/50">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                              {req.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-ink-900">{req.name}</p>
                              <p className="text-xs text-ink-400">{req.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-5 py-4 sm:table-cell">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-ink-400" />
                            <span className="text-sm font-medium text-ink-700">{req.institution}</span>
                          </div>
                        </td>
                        <td className="hidden px-5 py-4 lg:table-cell">
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-ink-50 px-2.5 py-1 text-xs font-semibold text-ink-600">
                            <Users className="h-3.5 w-3.5" />
                            {req.residents}
                          </span>
                        </td>
                        <td className="hidden px-5 py-4 text-sm text-ink-500 md:table-cell">
                          {new Date(req.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-4">
                          <div className="relative inline-block">
                            <select
                              value={req.status}
                              disabled={updatingId === req.id}
                              onChange={(e) => updateStatus(req.id, e.target.value as DemoRequest['status'])}
                              className={`appearance-none rounded-full border px-3 py-1.5 pr-8 text-xs font-bold transition-colors ${cfg.bg} ${cfg.color} focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-50`}
                            >
                              {STATUSES.map(([key, scfg]) => (
                                <option key={key} value={key} className="bg-white text-ink-900">
                                  {scfg.label}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
                            {updatingId === req.id && (
                              <Loader2 className="absolute -right-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-primary-600" />
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`mailto:${req.email}`}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                              title="Email"
                            >
                              <Mail className="h-4 w-4" />
                            </a>
                            <button
                              onClick={() => handleDelete(req.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-red-50 hover:text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filtered.length > 0 && (
          <p className="mt-4 text-center text-xs text-ink-400">
            Showing {filtered.length} of {requests.length} request{requests.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}
