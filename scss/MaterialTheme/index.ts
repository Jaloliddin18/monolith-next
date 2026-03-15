import { typography } from './typography';

export const light = {
	palette: {
		type: 'light',
		primary: { main: '#a0616a' },
		secondary: { main: '#212121' },
		text: {
			primary: '#212121',
			secondary: '#616161',
		},
		background: {
			default: '#ffffff',
			paper: '#ffffff',
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
