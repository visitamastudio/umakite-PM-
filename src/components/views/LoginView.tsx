import React, { useState } from 'react';
import {
  FolderKanban,
  CheckSquare,
  Calendar,
  DollarSign,
  Package,
  Users,
  BarChart3,
  MoreHorizontal,
  Eye,
  EyeOff,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { ViewMode, UserRole } from '../../types';

interface LoginViewProps {
  onLoginSuccess: (role?: UserRole) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('robald@projeezy.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('Project Manager');
  };

  const featurePills = [
    { label: 'Projects', icon: FolderKanban },
    { label: 'Tasks', icon: CheckSquare },
    { label: 'Schedule', icon: Calendar },
    { label: 'Budget', icon: DollarSign },
    { label: 'Materials', icon: Package },
    { label: 'Team', icon: Users },
    { label: 'Reports', icon: BarChart3 },
    { label: 'More', icon: MoreHorizontal },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px] border border-slate-800/20">
        {/* Left Side: Brand & Visual Showcase */}
        <div className="lg:col-span-6 relative bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between overflow-hidden">
          {/* Background image overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-blue-950/60" />

          {/* Top: Brand Logo */}
          <div className="relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">Projeezy</span>
            </div>
          </div>

          {/* Middle: Headline */}
          <div className="relative z-10 my-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Build Better
              <br />
              <span className="text-blue-400">Manage Smarter</span>
            </h1>
            <p className="mt-4 text-slate-300 text-sm leading-relaxed max-w-md">
              The complete construction project management platform for your team. From schedule and RAB
              to site monitoring and client reporting.
            </p>

            {/* Feature Pills (matching Image 1) */}
            <div className="grid grid-cols-4 gap-2.5 mt-8 max-w-md">
              {featurePills.map((pill) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={pill.label}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-center hover:bg-white/10 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-blue-400 mb-1" />
                    <span className="text-[10px] font-medium text-slate-300">{pill.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom: Trust note */}
          <div className="relative z-10 flex items-center space-x-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Multi-tenant SaaS Architecture with Role-Based Access Control</span>
          </div>
        </div>

        {/* Right Side: Auth Form (matching Image 1) */}
        <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {isRegisterMode ? 'Create an Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isRegisterMode
                  ? 'Get started with Projeezy for your construction company'
                  : 'Sign in to your account to continue'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email or username
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">Password</label>
                  {!isRegisterMode && (
                    <button
                      type="button"
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isRegisterMode && (
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-xs text-slate-600">
                    Remember me
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                {isRegisterMode ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-slate-400">or</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => onLoginSuccess('Project Manager')}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Demo quick roles switcher */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Quick Demo Login:</span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => onLoginSuccess('Project Manager')}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    As PM (Robald)
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => onLoginSuccess('Client')}
                    className="text-emerald-600 hover:underline font-semibold"
                  >
                    As Client (Budi)
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-slate-500">
              {isRegisterMode ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegisterMode(false)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Sign in here
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsRegisterMode(true)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Register now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
