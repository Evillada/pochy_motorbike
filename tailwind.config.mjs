/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          deep: 'var(--accent-deep)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        border: 'var(--border)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '100%': { transform: 'translate3d(-8%, 10%, 0) scale(1.18)' },
        },
        'shine-text': {
          '0%': { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '0% 0' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(28px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in-scale': {
          '0%': { opacity: 0, transform: 'scale(0.85)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        halo: {
          '0%': { transform: 'scale(1)', opacity: 0.55 },
          '100%': { transform: 'scale(1.18, 1.45)', opacity: 0 },
        },
        nudge: {
          '0%, 70%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '74%': { transform: 'rotate(-14deg) scale(1.1)' },
          '78%': { transform: 'rotate(12deg) scale(1.1)' },
          '82%': { transform: 'rotate(-8deg) scale(1.05)' },
          '86%': { transform: 'rotate(6deg) scale(1.05)' },
          '90%': { transform: 'rotate(0deg) scale(1)' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        drift: 'drift 18s ease-in-out infinite alternate',
        'drift-slow': 'drift 26s ease-in-out -9s infinite alternate-reverse',
        title: 'fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) 150ms both, shine-text 2.6s ease-in-out 0.9s both',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-scale': 'fade-in-scale 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
        halo: 'halo 1.8s ease-out infinite',
        nudge: 'nudge 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
