import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth.js';
import { apiClient } from './lib/api-client.js';
import { BlogList } from './components/Blog/BlogList.js';
import { BlogEditor } from './components/Blog/BlogEditor.js';
import { PageList } from './components/Pages/PageList.js';
import { PageEditor } from './components/Pages/PageEditor.js';
import { AnalyticsDashboard } from './components/Analytics/AnalyticsDashboard.js';
import { SeoAnalyzer } from './components/SEO/SeoAnalyzer.js';
import { TemplateLibrary } from './components/Features/TemplateLibrary.js';
import { DraftRecovery } from './components/Features/DraftRecovery.js';
import { ExportContent } from './components/Features/ExportContent.js';
import { Blog, Page } from './types/index.js';
import { 
  Menu, X, LogOut, LayoutDashboard, BookOpen, FileText, 
  BarChart3, Search, Sparkles, Plus, Key, ShieldCheck, 
  ArrowUpRight, Activity, Clock, Globe, ArrowRight, CheckCircle2,
  Layers, ChevronRight, Zap
} from 'lucide-react';

type Page_View = 'dashboard' | 'blogs' | 'blog-new' | 'blog-edit' | 'pages' | 'page-new' | 'page-edit' | 'analytics' | 'seo' | 'features';

function App() {
  const { apiKey, setApiKey, logout, isAuthenticated } = useAuth();
  const [keyInput, setKeyInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<Page_View>('dashboard');
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>();
  const [selectedPage, setSelectedPage] = useState<Page | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [serverOnline, setServerOnline] = useState(true);

  const defaultKey = 'sk_ad034930ac91c9adb27cc9eccf0e3124acaeab993985b4435625a1e96313cebb';

  useEffect(() => {
    console.log('%c🚀 Kawaki Studios Admin Engine', 'font-size: 20px; font-weight: bold; color: #FC4625;');
    console.log('%cEditorial Engineering & Content Management', 'font-size: 12px; color: #A1A1AA;');
  }, []);

  const handleLogin = async (e?: React.FormEvent, customKey?: string) => {
    if (e) e.preventDefault();
    const keyToUse = customKey || keyInput;
    if (!keyToUse) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      apiClient.setApiKey(keyToUse);
      const response = await apiClient.get('/blogs');

      if (!response.success && response.error?.includes('Unauthorized')) {
        throw new Error('Invalid or inactive API key');
      }

      setApiKey(keyToUse);
      setKeyInput('');
      setSuccess('Authenticated with Kawaki Studios Engine');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      apiClient.clearApiKey();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentView('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0B0E] text-zinc-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Ambient Glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#FC4625]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#FF6B4A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#FC4625]/5 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="glass-panel p-8 sm:p-10 shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-2xl bg-[#13131A]/90">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FC4625] to-transparent" />

            {/* Studio Badge & Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wide text-zinc-400 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FC4625] animate-pulse" />
                KAWAKI STUDIOS ENGINE
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
                Admin <span className="text-[#FC4625]">Portal</span>
              </h1>
              <p className="text-sm text-zinc-400 mt-2 font-normal">
                Enter your administrative key to manage content, pages, and analytics.
              </p>
            </div>

            <form onSubmit={(e) => handleLogin(e)} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 text-red-300 text-xs flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5 text-emerald-300 text-xs flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">
                  Secret API Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    placeholder="sk_..."
                    className="input pl-10 pr-4 font-mono text-sm"
                    required
                  />
                  <Key size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-sm font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Authenticating...' : 'Enter Dashboard'}
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Quick Demo Autofill Button */}
            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <button
                type="button"
                onClick={() => {
                  setKeyInput(defaultKey);
                  handleLogin(undefined, defaultKey);
                }}
                className="text-xs text-zinc-400 hover:text-[#FC4625] transition-colors inline-flex items-center gap-1.5 font-medium"
              >
                <Zap size={14} className="text-[#FC4625]" />
                Autofill Master Admin Key
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-500 mt-6 font-mono">
            &copy; {new Date().getFullYear()} Kawaki Studios • All systems operational
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-zinc-100 flex flex-col md:flex-row font-sans selection:bg-[#FC4625]/30 selection:text-white">
      {/* Floating Dark Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#101015] border-r border-white/5 flex flex-col transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FC4625] to-[#FF6B4A] flex items-center justify-center font-display font-extrabold text-white text-lg shadow-lg shadow-[#FC4625]/30">
              K
            </div>
            <div>
              <h2 className="font-display font-bold text-lg tracking-tight text-white leading-none">
                KAWAKI
              </h2>
              <span className="text-[10px] font-mono tracking-widest text-[#FC4625] font-semibold uppercase">
                STUDIOS CMS
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-mono font-semibold tracking-wider text-zinc-500 uppercase">
            Core Engine
          </div>

          <SidebarLink
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active={currentView === 'dashboard'}
            onClick={() => {
              setCurrentView('dashboard');
              setSidebarOpen(false);
            }}
          />
          <SidebarLink
            icon={<BookOpen size={18} />}
            label="Blog Stories"
            active={currentView.startsWith('blog')}
            badge="Articles"
            onClick={() => {
              setCurrentView('blogs');
              setSelectedBlog(undefined);
              setSidebarOpen(false);
            }}
          />
          <SidebarLink
            icon={<FileText size={18} />}
            label="Static Pages"
            active={currentView.startsWith('page')}
            onClick={() => {
              setCurrentView('pages');
              setSelectedPage(undefined);
              setSidebarOpen(false);
            }}
          />

          <div className="pt-4 px-3 py-2 text-[11px] font-mono font-semibold tracking-wider text-zinc-500 uppercase">
            Intelligence
          </div>

          <SidebarLink
            icon={<BarChart3 size={18} />}
            label="Analytics"
            active={currentView === 'analytics'}
            onClick={() => {
              setCurrentView('analytics');
              setSidebarOpen(false);
            }}
          />
          <SidebarLink
            icon={<Search size={18} />}
            label="SEO Optimizer"
            active={currentView === 'seo'}
            onClick={() => {
              setCurrentView('seo');
              setSidebarOpen(false);
            }}
          />
          <SidebarLink
            icon={<Sparkles size={18} />}
            label="Advanced Suite"
            active={currentView === 'features'}
            onClick={() => {
              setCurrentView('features');
              setSidebarOpen(false);
            }}
          />
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 space-y-3 bg-[#0D0D12]">
          {/* Server Status Indicator */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
            <span className="text-zinc-400 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              API Engine
            </span>
            <span className="font-mono text-zinc-500 text-[11px]">v5.0.0</span>
          </div>

          {/* User / Logout */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FC4625]/20 border border-[#FC4625]/40 flex items-center justify-center font-bold text-xs text-[#FC4625]">
                KS
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-semibold text-zinc-200">Kunal Sharma</p>
                <p className="text-[10px] text-zinc-500 font-mono">Master Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Glassmorphism Header */}
        <header className="sticky top-0 z-30 bg-[#0B0B0E]/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-500 hidden sm:inline">Portal /</span>
                <h1 className="text-lg font-bold text-white font-display">
                  {getPageTitle(currentView)}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs py-2 px-3 hidden sm:inline-flex"
              >
                <Globe size={14} />
                Live Website
                <ArrowUpRight size={12} className="text-zinc-500" />
              </a>

              {currentView === 'blogs' && (
                <button
                  onClick={() => {
                    setSelectedBlog(undefined);
                    setCurrentView('blog-new');
                  }}
                  className="btn-primary text-xs py-2 px-3.5"
                >
                  <Plus size={14} />
                  New Story
                </button>
              )}

              {currentView === 'pages' && (
                <button
                  onClick={() => {
                    setSelectedPage(undefined);
                    setCurrentView('page-new');
                  }}
                  className="btn-primary text-xs py-2 px-3.5"
                >
                  <Plus size={14} />
                  New Page
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Body Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'dashboard' && (
            <DashboardView
              onNewBlog={() => {
                setSelectedBlog(undefined);
                setCurrentView('blog-new');
              }}
              onViewBlogs={() => setCurrentView('blogs')}
              onViewPages={() => setCurrentView('pages')}
              onViewAnalytics={() => setCurrentView('analytics')}
              onViewSeo={() => setCurrentView('seo')}
              onViewFeatures={() => setCurrentView('features')}
            />
          )}

          {currentView === 'blogs' && (
            <BlogList
              onNew={() => {
                setSelectedBlog(undefined);
                setCurrentView('blog-new');
              }}
              onEdit={(blog) => {
                setSelectedBlog(blog);
                setCurrentView('blog-edit');
              }}
            />
          )}

          {currentView === 'blog-new' && (
            <BlogEditor
              onSave={() => setCurrentView('blogs')}
              onBack={() => setCurrentView('blogs')}
            />
          )}

          {currentView === 'blog-edit' && selectedBlog && (
            <BlogEditor
              blog={selectedBlog}
              onSave={() => setCurrentView('blogs')}
              onBack={() => setCurrentView('blogs')}
            />
          )}

          {currentView === 'pages' && (
            <PageList
              onNew={() => {
                setSelectedPage(undefined);
                setCurrentView('page-new');
              }}
              onEdit={(page) => {
                setSelectedPage(page);
                setCurrentView('page-edit');
              }}
            />
          )}

          {currentView === 'page-new' && (
            <PageEditor
              onSave={() => setCurrentView('pages')}
              onBack={() => setCurrentView('pages')}
            />
          )}

          {currentView === 'page-edit' && selectedPage && (
            <PageEditor
              page={selectedPage}
              onSave={() => setCurrentView('pages')}
              onBack={() => setCurrentView('pages')}
            />
          )}

          {currentView === 'analytics' && <AnalyticsDashboard />}
          {currentView === 'seo' && <SeoAnalyzer />}
          {currentView === 'features' && <FeaturesView />}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-white/5 bg-[#0B0B0E] py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC4625]" />
              <span className="font-semibold text-zinc-300">Kawaki Studios CMS</span>
              <span>— Editorial Engineering Engine</span>
            </div>
            <div className="font-mono text-[11px] text-zinc-500">
              Built with Hono • Drizzle ORM • React 19 • Tailwind CSS
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function SidebarLink({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
        active
          ? 'bg-gradient-to-r from-[#FC4625] to-[#FF6B4A] text-white shadow-lg shadow-[#FC4625]/25 font-semibold'
          : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`${active ? 'text-white' : 'text-zinc-400 group-hover:text-[#FC4625]'} transition-colors`}>
          {icon}
        </span>
        <span>{label}</span>
      </div>
      {badge && (
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
            active ? 'bg-white/20 text-white' : 'bg-white/5 text-zinc-400'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function DashboardView({
  onNewBlog,
  onViewBlogs,
  onViewPages,
  onViewAnalytics,
  onViewSeo,
  onViewFeatures,
}: {
  onNewBlog: () => void;
  onViewBlogs: () => void;
  onViewPages: () => void;
  onViewAnalytics: () => void;
  onViewSeo: () => void;
  onViewFeatures: () => void;
}) {
  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-2xl p-8 overflow-hidden bg-gradient-to-br from-[#161622] via-[#12121A] to-[#0E0E14] border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FC4625]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FC4625]/10 border border-[#FC4625]/20 text-[#FC4625] text-xs font-mono font-semibold mb-4">
            <Sparkles size={14} />
            KAWAKI EDITORIAL STUDIO
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Welcome back, <span className="text-[#FC4625]">Kunal</span>.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 leading-relaxed">
            Your studio content management engine is synchronized. Create new editorial pieces, publish static pages, and monitor SEO performance in realtime.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={onNewBlog} className="btn-primary">
              <Plus size={16} /> Compose New Story
            </button>
            <button onClick={onViewBlogs} className="btn-secondary">
              Manage Articles
            </button>
          </div>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Published Stories"
          value="1"
          change="+1 this week"
          icon={<BookOpen className="text-[#FC4625]" size={22} />}
          gradient="from-[#FC4625]/10 to-transparent"
        />
        <MetricCard
          title="Live Pages"
          value="6"
          change="All pages synced"
          icon={<FileText className="text-blue-400" size={22} />}
          gradient="from-blue-500/10 to-transparent"
        />
        <MetricCard
          title="Total Readers"
          value="1,420"
          change="+18% vs last mo"
          icon={<BarChart3 className="text-emerald-400" size={22} />}
          gradient="from-emerald-500/10 to-transparent"
        />
        <MetricCard
          title="SEO Health Score"
          value="98 / 100"
          change="Grade A+ Optimal"
          icon={<Search className="text-purple-400" size={22} />}
          gradient="from-purple-500/10 to-transparent"
        />
      </div>

      {/* Quick Launch Cards */}
      <div>
        <h3 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
          <Zap size={18} className="text-[#FC4625]" /> Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ActionCard
            title="Content Templates"
            description="Use pre-built editorial formats (Tutorials, Hooks, Case Studies) to draft instantly."
            icon={<Sparkles className="text-[#FC4625]" size={20} />}
            onClick={onViewFeatures}
          />
          <ActionCard
            title="SEO Engine Audit"
            description="Inspect meta tags, keywords density, and readability across your active website."
            icon={<Search className="text-blue-400" size={20} />}
            onClick={onViewSeo}
          />
          <ActionCard
            title="Bulk Content Export"
            description="Download all stories and static landing pages in clean Markdown or JSON archives."
            icon={<Layers className="text-emerald-400" size={20} />}
            onClick={onViewFeatures}
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  icon,
  gradient,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className={`card relative overflow-hidden bg-gradient-to-br ${gradient}`}>
      <div className="flex justify-between items-start">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{title}</p>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">{icon}</div>
      </div>
      <p className="text-3xl font-extrabold font-display text-white mt-4 tracking-tight">{value}</p>
      <p className="text-xs font-mono text-zinc-400 mt-2 flex items-center gap-1">
        <span className="text-emerald-400">●</span> {change}
      </p>
    </div>
  );
}

function ActionCard({
  title,
  description,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="card group cursor-pointer hover:border-[#FC4625]/40 hover:bg-[#181822] transition-all flex flex-col justify-between"
    >
      <div>
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#FC4625]/10 transition-all">
          {icon}
        </div>
        <h4 className="font-bold text-white font-display text-base group-hover:text-[#FC4625] transition-colors">
          {title}
        </h4>
        <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{description}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 group-hover:text-white font-medium">
        <span>Launch module</span>
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

function FeaturesView() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <TemplateLibrary type="blog" />
        </div>
        <div>
          <ExportContent contentType="blog" exportAll />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <DraftRecovery contentType="blog" />
        </div>
      </div>
    </div>
  );
}

function getPageTitle(view: Page_View): string {
  const titles: Record<Page_View, string> = {
    dashboard: 'Overview & Studio Metrics',
    blogs: 'Editorial Articles',
    'blog-new': 'Compose New Article',
    'blog-edit': 'Edit Story',
    pages: 'Static Website Pages',
    'page-new': 'Create New Page',
    'page-edit': 'Edit Page',
    analytics: 'Reader Analytics & Traffic',
    seo: 'SEO Performance Analyzer',
    features: 'Advanced Studio Utilities',
  };
  return titles[view];
}

export default App;
