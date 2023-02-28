import { styled } from '../../stitches.config';

export const Table = styled('table', {
	width: '100%',
	padding: '1rem',
});

export const Th = styled('th', {
	width: '16%',
});

export const Td = styled('td', {
	width: '16%',
	textAlign: 'center',
	padding: '0.5rem',
});

export const Flex = styled('div', {
	display: 'flex',
	width: '100%',
	justifyContent: 'space-around',
});

export const TableContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-between',
});
