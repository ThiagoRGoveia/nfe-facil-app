/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,js,vue}'],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'rainbow': 'rainbow 5s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'disco': 'disco 2s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out infinite',
        'glitch': 'glitch 1s ease-in-out infinite',
      },
      keyframes: {
        rainbow: {
          '0%, 100%': { 
            color: 'rgb(255, 0, 0)',
            textShadow: '0 0 5px rgba(255, 0, 0, 0.5)' 
          },
          '14%': { 
            color: 'rgb(255, 127, 0)',
            textShadow: '0 0 5px rgba(255, 127, 0, 0.5)' 
          },
          '28%': { 
            color: 'rgb(255, 255, 0)',
            textShadow: '0 0 5px rgba(255, 255, 0, 0.5)' 
          },
          '43%': { 
            color: 'rgb(0, 255, 0)',
            textShadow: '0 0 5px rgba(0, 255, 0, 0.5)' 
          },
          '57%': { 
            color: 'rgb(0, 0, 255)',
            textShadow: '0 0 5px rgba(0, 0, 255, 0.5)' 
          },
          '71%': { 
            color: 'rgb(75, 0, 130)',
            textShadow: '0 0 5px rgba(75, 0, 130, 0.5)' 
          },
          '86%': { 
            color: 'rgb(148, 0, 211)',
            textShadow: '0 0 5px rgba(148, 0, 211, 0.5)' 
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        disco: {
          '0%': { backgroundColor: 'rgba(255, 0, 0, 0.2)' },
          '16.6%': { backgroundColor: 'rgba(255, 165, 0, 0.2)' },
          '33.3%': { backgroundColor: 'rgba(255, 255, 0, 0.2)' },
          '50%': { backgroundColor: 'rgba(0, 128, 0, 0.2)' },
          '66.6%': { backgroundColor: 'rgba(0, 0, 255, 0.2)' },
          '83.3%': { backgroundColor: 'rgba(75, 0, 130, 0.2)' },
          '100%': { backgroundColor: 'rgba(238, 130, 238, 0.2)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-2px, 2px)' },
          '20%': { transform: 'translate(2px, -2px)' },
          '30%': { transform: 'translate(-2px, -2px)' },
          '40%': { transform: 'translate(2px, 2px)' },
          '50%': { transform: 'translate(-2px, 2px)' },
          '60%': { transform: 'translate(2px, -2px)' },
          '70%': { transform: 'translate(-2px, -2px)' },
          '80%': { transform: 'translate(2px, 2px)' },
          '90%': { transform: 'translate(-2px, 2px)' },
        },
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
        // Custom color palettes
        custom: {
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554',
          },
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
            950: '#052e16',
          },
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7e22ce',
            800: '#6b21a8',
            900: '#581c87',
            950: '#3b0764',
          }
        }
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

