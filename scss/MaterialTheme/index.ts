import { typography } from './typography';

export const light = {
	palette: {
		type: 'light',
		primary: { main: '#C46A4A', light: '#F7F2EE', dark: '#AA5A3D' },
		secondary: { main: '#1C1C1C' },
		text: {
			primary: '#2D2D2D',
			secondary: '#787878',
		},
		background: {
			default: '#FAFAFA',
			paper: '#FFFFFF',
		},
	},
	typography,
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				html: { scrollBehavior: 'smooth' },
				body: { margin: 0, fontFamily: "'Poppins', sans-serif" },
			},
		},
		MuiButton: {
			styleOverrides: {
				root: { minWidth: 'auto', boxShadow: 'none', borderRadius: 4 },
			},
		},
		MuiContainer: {
			styleOverrides: {
				root: { maxWidth: 'inherit', padding: 0 },
			},
		},
	},
};
