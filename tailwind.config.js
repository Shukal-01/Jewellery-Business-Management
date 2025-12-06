/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			gold: {
    				'50': '#fffdf0',
    				'100': '#fefce8',
    				'200': '#fef9c3',
    				'300': '#fef08a',
    				'400': '#fde047',
    				'500': '#D4AF37',
    				'600': '#ca8a04',
    				'700': '#a16207',
    				'800': '#854d0e',
    				'900': '#713f12'
    			},
    			diamond: {
    				'50': '#f8fafc',
    				'100': '#f1f5f9',
    				'200': '#e2e8f0',
    				'300': '#cbd5e1',
    				'400': '#94a3b8',
    				'500': '#C0C0C0',
    				'600': '#475569',
    				'700': '#334155',
    				'800': '#1e293b',
    				'900': '#0f172a'
    			},
    			midnight: {
    				'50': '#f8fafc',
    				'100': '#f1f5f9',
    				'200': '#e2e8f0',
    				'300': '#cbd5e1',
    				'400': '#94a3b8',
    				'500': '#64748b',
    				'600': '#475569',
    				'700': '#191970',
    				'800': '#1e293b',
    				'900': '#0f172a'
    			},
    			roseGold: {
    				'50': '#fdf2f8',
    				'100': '#fce7f3',
    				'200': '#fbcfe8',
    				'300': '#f9a8d4',
    				'400': '#f472b6',
    				'500': '#E0BFB8',
    				'600': '#ec4899',
    				'700': '#db2777',
    				'800': '#be185d',
    				'900': '#9d174d'
    			},
    			darkTeal: {
    				'50': '#f0fdfa',
    				'100': '#ccfbf1',
    				'200': '#99f6e4',
    				'300': '#5eead4',
    				'400': '#2dd4bf',
    				'500': '#2F4F4F',
    				'600': '#0d9488',
    				'700': '#0f766e',
    				'800': '#115e59',
    				'900': '#134e4a'
    			},
    			charcoal: {
    				'50': '#f8fafc',
    				'100': '#f1f5f9',
    				'200': '#e2e8f0',
    				'300': '#cbd5e1',
    				'400': '#94a3b8',
    				'500': '#64748b',
    				'600': '#2c3e50',
    				'700': '#334155',
    				'800': '#1e293b',
    				'900': '#0f172a'
    			},
    			electric: {
    				'50': '#eff6ff',
    				'100': '#dbeafe',
    				'200': '#bfdbfe',
    				'300': '#93c5fd',
    				'400': '#60a5fa',
    				'500': '#3b82f6',
    				'600': '#2563eb',
    				'700': '#1d4ed8',
    				'800': '#1e40af',
    				'900': '#1e3a8a'
    			},
    			neon: {
    				'50': '#f0fdf4',
    				'100': '#dcfce7',
    				'200': '#bbf7d0',
    				'300': '#86efac',
    				'400': '#4ade80',
    				'500': '#10b981',
    				'600': '#059669',
    				'700': '#047857',
    				'800': '#065f46',
    				'900': '#064e3b'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		fontFamily: {
    			serif: [
    				'Playfair Display',
    				'serif'
    			],
    			sans: [
    				'Inter',
    				'sans-serif'
    			],
    			mono: [
    				'JetBrains Mono',
    				'monospace'
    			]
    		},
    		animation: {
    			'fade-in': 'fadeIn 0.5s ease-in-out',
    			'slide-in': 'slideIn 0.3s ease-out',
    			'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
    			'float': 'float 3s ease-in-out infinite',
    			'spin-slow': 'spin 20s linear infinite',
    			'gradient-shift': 'gradientShift 8s ease-in-out infinite'
    		},
    		keyframes: {
    			fadeIn: {
    				'0%': {
    					opacity: '0'
    				},
    				'100%': {
    					opacity: '1'
    				}
    			},
    			slideIn: {
    				'0%': {
    					transform: 'translateY(10px)',
    					opacity: '0'
    				},
    				'100%': {
    					transform: 'translateY(0)',
    					opacity: '1'
    				}
    			},
    			pulseGlow: {
    				'0%, 100%': {
    					boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
    				},
    				'50%': {
    					boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0px)'
    				},
    				'50%': {
    					transform: 'translateY(-10px)'
    				}
    			},
    			gradientShift: {
    				'0%, 100%': {
    					backgroundPosition: '0% 50%'
    				},
    				'50%': {
    					backgroundPosition: '100% 50%'
    				}
    			}
    		},
    		backgroundImage: {
    			'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
    			'gradient-silver': 'linear-gradient(135deg, #C0C0C0 0%, #E5E4E2 50%, #C0C0C0 100%)',
    			'gradient-rose': 'linear-gradient(135deg, #E0BFB8 0%, #F9A8D4 50%, #E0BFB8 100%)',
    			'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    			'gradient-mesh': 'radial-gradient(circle at 20% 80%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C0C0C0 0%, transparent 50%), radial-gradient(circle at 40% 40%, #E0BFB8 0%, transparent 50%)'
    		},
    		boxShadow: {
    			'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
    			'silver-glow': '0 0 20px rgba(192, 192, 192, 0.3)',
    			'rose-glow': '0 0 20px rgba(224, 191, 184, 0.3)',
    			'neon-blue': '0 0 30px rgba(59, 130, 246, 0.8)',
    			'neon-green': '0 0 30px rgba(16, 185, 129, 0.8)'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
}