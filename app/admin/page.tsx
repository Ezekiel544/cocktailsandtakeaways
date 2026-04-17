"use client"

import { useState, useCallback } from "react"
import { Lock, Users, Download, RefreshCw, LogOut, Mail, Calendar, Search } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Signup {
  id: string
  firstName: string
  email: string
  createdAt: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day:   "2-digit",
    month: "short",
    year:  "numeric",
    hour:  "2-digit",
    minute:"2-digit",
  })
}

function exportCSV(signups: Signup[]) {
  const header = "First Name,Email,Signed Up\n"
  const rows = signups
    .map((s) => `${s.firstName},${s.email},${formatDate(s.createdAt)}`)
    .join("\n")
  const blob = new Blob([header + rows], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `signups-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pw.trim()) return
    setLoading(true)
    setError("")

    const res = await fetch("/api/signups", {
      headers: { "x-admin-password": pw },
    })

    setLoading(false)

    if (res.ok) {
      onLogin(pw)
    } else {
      setError("Incorrect password. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          {/* Icon */}
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-1">Admin Access</h1>
          <p className="text-muted-foreground text-sm text-center mb-8">
            Enter your password to view signups
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-secondary border border-border text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              autoFocus
            />

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying...
                </>
              ) : (
                "Enter Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [signups, setSignups] = useState<Signup[]>([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  const fetchSignups = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/signups", {
        headers: { "x-admin-password": password },
      })
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setSignups(data.signups)
      setLoaded(true)
    } catch {
      setError("Failed to load signups. Please refresh.")
    } finally {
      setLoading(false)
    }
  }, [password])

  // Auto-load on mount
  useState(() => { fetchSignups() })

  const filtered = signups.filter(
    (s) =>
      s.firstName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  )

  // Most recent signup date
  const latestDate = signups.length > 0 ? formatDate(signups[0].createdAt) : "—"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold text-sm md:text-base">Concert </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchSignups}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-white hover:border-primary/50 text-xs transition-all disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-white hover:border-red-500/50 text-xs transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8 space-y-6">

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total */}
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Total Signups</p>
            <p className="text-white text-3xl font-bold">{signups.length}</p>
          </div>
          {/* Latest */}
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Latest Signup</p>
            <p className="text-white text-sm font-semibold">{latestDate}</p>
          </div>
          {/* Today */}
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Today</p>
            <p className="text-white text-3xl font-bold">
              {signups.filter((s) => {
                const d = new Date(s.createdAt)
                const now = new Date()
                return d.toDateString() === now.toDateString()
              }).length}
            </p>
          </div>
        </div>

        {/* Table card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-border">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-4 bg-secondary border border-border rounded-lg text-white placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => exportCSV(signups)}
              disabled={signups.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="p-6 text-center text-red-400 text-sm">{error}</div>
          )}

          {/* Loading skeleton */}
          {loading && !loaded && (
            <div className="divide-y divide-border">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-8 h-8 rounded-full bg-secondary animate-pulse flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-secondary rounded animate-pulse w-32" />
                    <div className="h-3 bg-secondary rounded animate-pulse w-48" />
                  </div>
                  <div className="h-3 bg-secondary rounded animate-pulse w-28" />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {loaded && filtered.length === 0 && (
            <div className="py-16 text-center">
              <Mail className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                {search ? "No results match your search." : "No signups yet."}
              </p>
            </div>
          )}

          {/* Table */}
          {loaded && filtered.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/40">
                    <th className="text-left px-6 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">#</th>
                    <th className="text-left px-6 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left px-6 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">Email</th>
                    <th className="text-left px-6 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Signed Up</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((s, i) => (
                    <tr key={s.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 text-muted-foreground">{i + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-xs flex-shrink-0">
                            {s.firstName[0].toUpperCase()}
                          </div>
                          <span className="text-white font-medium">{s.firstName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{s.email}</td>
                      <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{formatDate(s.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer count */}
          {loaded && filtered.length > 0 && (
            <div className="px-6 py-3 border-t border-border text-xs text-muted-foreground">
              Showing {filtered.length} of {signups.length} signups
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null)

  if (!password) return <LoginScreen onLogin={setPassword} />
  return <Dashboard password={password} onLogout={() => setPassword(null)} />
}