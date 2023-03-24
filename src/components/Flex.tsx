import { styled, css } from '../../stitches.config';

export const flexCss = css({
	display: 'flex',

	variants: {
		direction: {
			row: {
				flexDirection: 'row',
			},
			column: {
				flexDirection: 'column',
			},
			rowReverse: {
				flexDirection: 'row-reverse',
			},
			columnReverse: {
				flexDirection: 'column-reverse',
			},
		},
		align: {
			start: {
				alignItems: 'flex-start',
			},
			center: {
				alignItems: 'center',
			},
			end: {
				alignItems: 'flex-end',
			},
			stretch: {
				alignItems: 'stretch',
			},
			baseline: {
				alignItems: 'baseline',
			},
		},
		justify: {
			start: {
				justifyContent: 'flex-start',
			},
			center: {
				justifyContent: 'center',
			},
			end: {
				justifyContent: 'flex-end',
			},
			between: {
				justifyContent: 'space-between',
			},
		},
		wrap: {
			noWrap: {
				flexWrap: 'nowrap',
			},
			wrap: {
				flexWrap: 'wrap',
			},
			wrapReverse: {
				flexWrap: 'wrap-reverse',
			},
		},
		gap: {
			1: {
				gap: '1rem',
			},
			2: {
				gap: '2rem',
			},
			3: {
				gap: '3rem',
			},
			4: {
				gap: '4rem',
			},
			5: {
				gap: '5rem',
			},
		},
	},
	defaultVariants: {
		direction: 'row',
		align: 'stretch',
		justify: 'start',
		wrap: 'noWrap',
	},
});

const Flex = styled('div', flexCss);

export default Flex;
