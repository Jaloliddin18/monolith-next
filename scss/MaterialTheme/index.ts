import { typography } from './typography';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

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

export const RippleBadge = styled(Badge)(() => ({
	'& .MuiBadge-badge': {
		backgroundColor: '#b4dcff8f',
		color: '#2c40bdd6',
		boxShadow: '0',
		'&::after': {
			position: 'absolute',
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: 'ripple 1.2s infinite ease-in-out',
			border: '2px solid #32c2c1',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': { transform: 'scale(.8)', opacity: 1 },
		'100%': { transform: 'scale(2.4)', opacity: 0 },
	},
}));
