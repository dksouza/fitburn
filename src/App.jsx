import { useState, useEffect, useCallback } from 'react'

// ─── LOCALSTORAGE HELPERS ─────────────────────────────────────────────────────
const STORAGE_KEY = 'fitburn_tasks'

function loadTasksFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

function saveTasksToStorage(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // silent fail
  }
}

// ─── MODULE DATA ──────────────────────────────────────────────────────────────
const MODULES = [
  {
    id: 1,
    icon: '🔥',
    title: 'Daily Burn',
    description: 'Quick daily fat-burning tasks to keep your metabolism fired up.',
    tasks: [
      'Drink at least 8 glasses of water today',
      'Take a brisk 10-minute walk',
      'No added sugar for the entire day',
      'Do 20 jumping jacks right now',
      'Replace one snack with a fruit',
    ],
  },
  {
    id: 2,
    icon: '🥗',
    title: 'Clean Eating',
    description: 'Build healthy nutrition habits and discover simple meal tips.',
    tasks: [
      'Eat a high-protein breakfast',
      'Prepare a home-cooked lunch',
      'Add vegetables to every meal',
      'Avoid processed foods today',
      'Drink a green smoothie',
    ],
  },
  {
    id: 3,
    icon: '💪',
    title: 'Workout of the Day',
    description: 'Short, intense exercise routines you can do anywhere.',
    tasks: [
      'Complete 3 sets of 15 squats',
      'Hold a plank for 60 seconds',
      'Do 10 push-ups (any variation)',
      'Stretch for 5 minutes post-workout',
    ],
  },
  {
    id: 4,
    icon: '🧘',
    title: 'Mind & Body',
    description: 'Reduce stress, improve sleep, and practice mindfulness.',
    tasks: [
      'Meditate for 5 minutes',
      'Practice deep breathing (4-7-8 technique)',
      'Write 3 things you\'re grateful for',
      'No screens 30 minutes before bed',
      'Take a relaxing warm shower',
    ],
  },
  {
    id: 5,
    icon: '📊',
    title: 'Progress Check',
    description: 'Track your body, measure results, and stay motivated.',
    tasks: [
      'Weigh yourself and log it',
      'Take a progress selfie',
      'Measure your waist circumference',
      'Review your weekly achievements',
    ],
  },
]

// ─── RECIPES DATA ─────────────────────────────────────────────────────────────
const RECIPES = [
  {
    id: 1,
    icon: '🍳',
    title: 'Healthy Recipes',
    description: 'Discover delicious and healthy recipes to fuel your journey.',
    // TODO: replace with actual recipe URL
    embedUrl: 'https://www.google.com',
  },
]

// ─── HELPER: check if a module is fully completed ─────────────────────────────
function isModuleCompleted(moduleId, allTasks) {
  const moduleTasks = allTasks[moduleId]
  if (!moduleTasks) return false
  const mod = MODULES.find((m) => m.id === moduleId)
  if (!mod) return false
  return mod.tasks.every((_, i) => moduleTasks[i] === true)
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isPressed, setIsPressed] = useState(false)

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    onLogin(email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-7 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--color-fire-orange), transparent)' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, var(--color-fire-red), transparent)' }} />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-fire-amber opacity-40 animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-fire-orange opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-fire-red opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-sm sm:max-w-md animate-fade-in relative z-10">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 animate-pulse-glow"
            style={{ background: 'linear-gradient(135deg, var(--color-fire-orange), var(--color-fire-red))' }}>
            <span className="text-4xl">🔥</span>
          </div>
          <h1 className="font-heading text-6xl sm:text-7xl tracking-wider"
            style={{
              background: 'linear-gradient(135deg, var(--color-fire-amber), var(--color-fire-orange), var(--color-fire-red))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
            FIT BURN
          </h1>
          <p className="text-text-secondary mt-3 text-sm tracking-widest uppercase font-body">
            Transform Your Body
          </p>
        </div>

        {/* Headline */}
        <h2 className="font-heading text-3xl sm:text-4xl text-center mb-10 tracking-wide">
          Start burning today.
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <div
              className="flex items-center gap-3 rounded-2xl border-2 transition-all duration-300 overflow-hidden"
              style={{
                backgroundColor: 'var(--color-dark-card)',
                borderColor: error ? 'var(--color-fire-red)' : 'var(--color-dark-border)',
              }}
            >
              <div className="pl-5 flex-shrink-0">
                <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder="Enter your email"
                className="flex-1 py-5 pr-5 text-white placeholder-text-muted font-body text-base outline-none bg-transparent border-0"
                onFocus={(e) => e.target.closest('div[class*="border"]').style.borderColor = 'var(--color-fire-orange)'}
                onBlur={(e) => e.target.closest('div[class*="border"]').style.borderColor = error ? 'var(--color-fire-red)' : 'var(--color-dark-border)'}
              />
            </div>

            {error && (
              <p className="text-fire-red text-sm font-body animate-fade-in flex items-center gap-2 mt-3 ml-1">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            className="w-full py-5 rounded-2xl font-heading text-xl tracking-widest text-white transition-all duration-200 cursor-pointer border-0"
            style={{
              background: 'linear-gradient(135deg, var(--color-fire-orange), var(--color-fire-red))',
              transform: isPressed ? 'scale(0.97)' : 'scale(1)',
              boxShadow: isPressed
                ? '0 2px 10px rgba(255, 107, 0, 0.3)'
                : '0 8px 30px rgba(255, 107, 0, 0.3)',
            }}
          >
            LET'S GO 🔥
          </button>
        </form>

        {/* Bottom text */}
        <p className="text-text-muted text-xs text-center mt-8 font-body tracking-wide">
          No password needed — just your email to get started
        </p>
      </div>
    </div>
  )
}

// ─── MODULE CARD ──────────────────────────────────────────────────────────────
function ModuleCard({ module, onOpen, delay, completed }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="rounded-3xl p-7 cursor-pointer transition-all duration-300 border relative overflow-hidden group"
      style={{
        backgroundColor: 'var(--color-dark-card)',
        borderColor: completed
          ? 'rgba(0, 230, 118, 0.35)'
          : isHovered ? 'var(--color-fire-orange)' : 'var(--color-dark-border)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: completed
          ? '0 4px 20px rgba(0, 230, 118, 0.1)'
          : isHovered ? '0 12px 40px rgba(255, 107, 0, 0.15)' : '0 4px 20px rgba(0,0,0,0.2)',
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(module)}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(255, 107, 0, 0.05), transparent 70%)' }} />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <span className="text-3xl mt-0.5 transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1)' }}>
            {module.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-heading text-xl tracking-wide">{module.title}</h3>
              {completed && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 animate-check-pop"
                  style={{ background: 'linear-gradient(135deg, var(--color-success), #00c853)' }}>
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </div>
            <p className="text-text-secondary text-sm font-body leading-relaxed">
              {module.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5 pt-5" style={{ borderTop: '1px solid var(--color-dark-border)' }}>
          <span className="text-text-muted text-xs font-body">
            {module.tasks.length} tasks
          </span>
          {completed ? (
            <span className="text-sm font-body font-semibold flex items-center gap-1.5" style={{ color: 'var(--color-success)' }}>
              Completed ✓
            </span>
          ) : (
            <span
              className="text-sm font-body font-semibold flex items-center gap-1.5 transition-all duration-300"
              style={{ color: 'var(--color-fire-orange)' }}
            >
              Start
              <svg className="w-4 h-4 transition-transform duration-300" style={{ transform: isHovered ? 'translateX(4px)' : '' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── MODULE PANEL ─────────────────────────────────────────────────────────────
function ModulePanel({ module, checkedTasks, onToggleTask, onResetTasks, onClose }) {
  const [isClosing, setIsClosing] = useState(false)

  const moduleTasks = checkedTasks[module.id] || {}
  const completedCount = module.tasks.filter((_, i) => moduleTasks[i] === true).length
  const progress = (completedCount / module.tasks.length) * 100

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => onClose(), 300)
  }

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}`}
      style={{ backgroundColor: 'var(--color-dark)' }}>
      <div className="max-w-2xl mx-auto px-7 sm:px-10 py-10 min-h-screen pb-28">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-200 font-body text-sm cursor-pointer bg-transparent border-0 p-2 -ml-2 rounded-lg"
            style={{ transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = 'var(--color-dark-card)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Reset button */}
          <button
            onClick={() => onResetTasks(module.id)}
            className="flex items-center gap-1.5 text-text-muted hover:text-fire-red transition-colors duration-200 font-body text-xs cursor-pointer bg-transparent border-0 px-3 py-2 rounded-lg"
            style={{ transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = 'var(--color-dark-card)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>

        {/* Module header */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{module.icon}</span>
            <h2 className="font-heading text-4xl sm:text-5xl tracking-wide">{module.title}</h2>
          </div>
          <p className="text-text-secondary font-body leading-relaxed">{module.description}</p>
        </div>

        {/* Progress bar */}
        <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary text-sm font-body">Progress</span>
            <span className="text-sm font-body font-semibold" style={{ color: 'var(--color-fire-orange)' }}>
              {completedCount} / {module.tasks.length}
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-dark-card)' }}>
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: progress === 100
                  ? 'linear-gradient(90deg, var(--color-success), #00c853)'
                  : 'linear-gradient(90deg, var(--color-fire-orange), var(--color-fire-red))',
              }}
            />
          </div>
          {progress === 100 && (
            <p className="text-success text-sm mt-2 font-body animate-fade-in flex items-center gap-2">
              <span>🎉</span> All tasks completed! You're on fire!
            </p>
          )}
        </div>

        {/* Task list */}
        <div className="space-y-4">
          {module.tasks.map((task, index) => {
            const isChecked = !!moduleTasks[index]
            return (
              <label
                key={index}
                className="flex items-center gap-5 px-6 py-5 rounded-2xl cursor-pointer transition-all duration-200 group"
                style={{
                  backgroundColor: isChecked ? 'rgba(255, 107, 0, 0.06)' : 'var(--color-dark-card)',
                  border: `1px solid ${isChecked ? 'rgba(255, 107, 0, 0.2)' : 'var(--color-dark-border)'}`,
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleTask(module.id, index)}
                  className="custom-checkbox"
                />
                <span
                  className="font-body text-[15px] leading-relaxed transition-all duration-200"
                  style={{
                    textDecoration: isChecked ? 'line-through' : 'none',
                    color: isChecked ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                  }}
                >
                  {task}
                </span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── RECIPE CARD ──────────────────────────────────────────────────────────────
function RecipeCard({ recipe, onOpen }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="rounded-3xl p-7 cursor-pointer transition-all duration-300 border relative overflow-hidden group"
      style={{
        backgroundColor: 'var(--color-dark-card)',
        borderColor: isHovered ? 'var(--color-fire-amber)' : 'var(--color-dark-border)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 12px 40px rgba(255, 171, 0, 0.12)' : '0 4px 20px rgba(0,0,0,0.2)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(recipe)}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(255, 171, 0, 0.06), transparent 70%)' }} />

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <span className="text-3xl transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1)' }}>
            {recipe.icon}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-xl tracking-wide mb-1">{recipe.title}</h3>
            <p className="text-text-secondary text-sm font-body leading-relaxed">
              {recipe.description}
            </p>
          </div>
          <svg className="w-5 h-5 text-fire-amber transition-transform duration-300 flex-shrink-0" style={{ transform: isHovered ? 'translateX(4px)' : '' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

// ─── RECIPE PANEL ─────────────────────────────────────────────────────────────
function RecipePanel({ recipe, onClose }) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => onClose(), 300)
  }

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}`}
      style={{ backgroundColor: 'var(--color-dark)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 flex-shrink-0" style={{ borderBottom: '1px solid var(--color-dark-border)' }}>
        <button
          onClick={handleClose}
          className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-200 font-body text-sm cursor-pointer bg-transparent border-0 p-2 -ml-2 rounded-lg"
          style={{ transition: 'background 0.2s' }}
          onMouseEnter={(e) => e.target.style.background = 'var(--color-dark-card)'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex items-center gap-2 ml-2">
          <span className="text-2xl">{recipe.icon}</span>
          <h2 className="font-heading text-2xl tracking-wide">{recipe.title}</h2>
        </div>
      </div>

      {/* Iframe embed */}
      <div className="flex-1 w-full">
        {/* TODO: replace with actual recipe URL */}
        <iframe
          src={recipe.embedUrl}
          title={recipe.title}
          className="w-full h-full border-0"
          style={{ backgroundColor: '#111' }}
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ email, onOpenModule, onOpenRecipe, allTasks, onLogout }) {
  // Count how many modules are fully completed
  const completedModules = MODULES.filter((m) => isModuleCompleted(m.id, allTasks)).length
  const [showBanner, setShowBanner] = useState(true)

  return (
    <div className="min-h-screen px-7 sm:px-10 py-12 max-w-xl sm:max-w-2xl lg:max-w-4xl mx-auto pb-28">

      {/* Update announcement banner */}
      {
        showBanner && (
          <div
            className="rounded-2xl px-5 py-4 mb-10 flex items-center gap-3 animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.12), rgba(255, 61, 0, 0.08))',
              border: '1px solid rgba(255, 107, 0, 0.2)',
            }}
          >
            <span className="text-lg flex-shrink-0">🚀</span>
            <p className="text-sm font-body text-text-secondary flex-1">
              <span className="text-white font-semibold">App updated!</span> More modern design and faster performance.
            </p>
            <button
              onClick={() => setShowBanner(false)}
              className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-white cursor-pointer bg-transparent border-0 transition-colors duration-200"
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.06)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )
      }

      {/* Header */}
      <header className="mb-16 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--color-fire-orange), var(--color-fire-red))' }}>
              <span className="text-lg">🔥</span>
            </div>
            <span className="font-heading text-2xl tracking-wider"
              style={{
                background: 'linear-gradient(135deg, var(--color-fire-amber), var(--color-fire-orange))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              FIT BURN
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-text-muted hover:text-white transition-colors duration-200 font-body text-sm cursor-pointer bg-transparent border-0 px-3 py-2 rounded-lg"
            style={{ transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = 'var(--color-dark-card)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Exit
          </button>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl tracking-wide mb-3">
          Welcome back! 🔥
        </h2>
        <p className="text-text-secondary font-body text-sm">
          {email}
        </p>
      </header>

      {/* Module completion progress */}
      <div className="rounded-3xl p-12 mb-14 border animate-fade-in"
        style={{
          backgroundColor: 'var(--color-dark-card)',
          borderColor: completedModules === MODULES.length ? 'rgba(0, 230, 118, 0.35)' : 'var(--color-dark-border)',
          animationDelay: '0.1s',
        }}>
        <div className="flex items-center justify-between mb-7">
          <div>
            <h3 className="font-heading text-lg tracking-wide">Your Progress</h3>
            <p className="text-text-secondary text-sm font-body">
              {completedModules === MODULES.length
                ? 'All modules done! You\'re on fire! 🎉'
                : 'Complete all modules to finish the day'}
            </p>
          </div>
          <div className="text-right">
            <span className="font-heading text-4xl" style={{
              color: completedModules === MODULES.length ? 'var(--color-success)' : 'var(--color-fire-orange)'
            }}>
              {completedModules}
            </span>
            <span className="text-text-secondary text-sm font-body block">/ {MODULES.length}</span>
          </div>
        </div>

        {/* Module progress bars */}
        <div className="flex gap-3.5">
          {MODULES.map((mod) => {
            const done = isModuleCompleted(mod.id, allTasks)
            return (
              <div key={mod.id} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full h-3 rounded-full transition-all duration-500"
                  style={{
                    background: done
                      ? 'linear-gradient(90deg, var(--color-fire-orange), var(--color-fire-red))'
                      : 'var(--color-dark-border)',
                  }}
                />
                <span className="text-[13px]" style={{ opacity: done ? 1 : 0.4 }}>
                  {mod.icon}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recipes section */}
      <div className="mb-14 animate-fade-in" style={{ animationDelay: '0.12s' }}>
        <h3 className="font-heading text-2xl tracking-wide mb-2">Recipes</h3>
        <p className="text-text-secondary text-sm font-body mb-7">Healthy meals to power your transformation</p>
        <div className="grid grid-cols-1 gap-5">
          {RECIPES.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onOpen={onOpenRecipe} />
          ))}
        </div>
      </div>

      {/* Module grid */}
      <div className="mb-10 animate-fade-in" style={{ animationDelay: '0.18s' }}>
        <h3 className="font-heading text-2xl tracking-wide mb-2">Your Modules</h3>
        <p className="text-text-secondary text-sm font-body mb-7">Choose a module to start your session</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 stagger-children">
        {MODULES.map((module, index) => (
          <ModuleCard
            key={module.id}
            module={module}
            onOpen={onOpenModule}
            delay={index * 50}
            completed={isModuleCompleted(module.id, allTasks)}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-24 pb-12 text-center">
        <p className="text-text-muted text-xs font-body">
          FIT BURN — Your daily fire fuel 🔥
        </p>
      </footer>
    </div >
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function App() {
  const [userEmail, setUserEmail] = useState(null)
  const [openModule, setOpenModule] = useState(null)
  const [openRecipe, setOpenRecipe] = useState(null)
  const [allTasks, setAllTasks] = useState(() => loadTasksFromStorage())

  // Persist to localStorage whenever tasks change
  useEffect(() => {
    saveTasksToStorage(allTasks)
  }, [allTasks])

  const handleLogin = (email) => {
    setUserEmail(email)
  }

  const handleLogout = () => {
    setUserEmail(null)
  }

  const handleOpenModule = (module) => {
    setOpenModule(module)
  }

  const handleCloseModule = () => {
    setOpenModule(null)
  }

  const handleOpenRecipe = (recipe) => {
    setOpenRecipe(recipe)
  }

  const handleCloseRecipe = () => {
    setOpenRecipe(null)
  }

  const handleToggleTask = useCallback((moduleId, taskIndex) => {
    setAllTasks((prev) => {
      const moduleTasks = prev[moduleId] || {}
      return {
        ...prev,
        [moduleId]: {
          ...moduleTasks,
          [taskIndex]: !moduleTasks[taskIndex],
        },
      }
    })
  }, [])

  const handleResetTasks = useCallback((moduleId) => {
    setAllTasks((prev) => {
      const next = { ...prev }
      delete next[moduleId]
      return next
    })
  }, [])

  // Show login screen if not logged in
  if (!userEmail) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <>
      <Dashboard
        email={userEmail}
        onOpenModule={handleOpenModule}
        onOpenRecipe={handleOpenRecipe}
        allTasks={allTasks}
        onLogout={handleLogout}
      />
      {openModule && (
        <ModulePanel
          module={openModule}
          checkedTasks={allTasks}
          onToggleTask={handleToggleTask}
          onResetTasks={handleResetTasks}
          onClose={handleCloseModule}
        />
      )}
      {openRecipe && (
        <RecipePanel
          recipe={openRecipe}
          onClose={handleCloseRecipe}
        />
      )}
    </>
  )
}

export default App
