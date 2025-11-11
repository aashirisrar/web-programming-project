import type { Config } from "tailwindcss";

export default {
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				LinksHubb: {
					// Professional theme (default)
					gray: '#f3f4f6',
					darkGray: '#4b5563',
					text: '#334155',  // slate-700 equivalent
					accent: '#0066cc', 
					accentLight: '#3399ff', 
					background: '#ffffff',
					header: '#666666',
					footer: '#334155',
					border: '#e5e7eb', // gray-200 equivalent
					placeholder: '#e5e7eb', // gray-200 equivalent
					tableHeader: '#6b7280', // slate-500 equivalent
					footerBg: '#0a2540',
					white: '#ffffff',
					lightText: '#cccccc',
					mediumText: '#64748b', // slate-500 equivalent
					borderDark: '#2c3e50',
					tableBorder: '#cbd5e1', // slate-300 equivalent
					contactBg: '#0a2540',

					// Creative theme
					creative: {
						text: '#333333',
						accent: '#8a2be2',
						accentLight: '#b15eff',
						background: '#ffffff',
						headerText: '#777777',
						footerBg: '#5f2987',
						lightText: '#e5d4f0',
						borderDark: '#6e3d94'
					},

					// Modern theme
					modern: {
						text: '#212121',
						accent: '#00c6cf',
						accentLight: '#5ff0fb',
						background: '#ffffff',
						headerText: '#555555',
						footerBg: '#2a2a2a',
						lightText: '#cccccc',
						borderDark: '#444444'
					}
				  }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
