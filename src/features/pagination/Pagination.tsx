import { usePagination } from './usePagination';
import { styled } from '../../../stitches.config';

const PaginationContainer = styled('ul', {
	display: 'flex',
	listStyleType: 'none',
});

const PaginationItem = styled('li', {
	padding: '0 12px',
	height: '32px',
	textAlign: 'center',
	margin: 'auto 4px',
	color: 'rgba(0, 0, 0, 0.87)',
	display: 'flex',
	boxSizing: 'border-box',
	alignItems: 'center',
	letterSpacing: '0.01071em',
	borderRadius: '16px',
	lineHeight: '1.43',
	fontSize: '13px',
	minWidth: '32px',

	'&:hover': {
		backgroundColor: 'rgba(0, 0, 0, 0.04)',
		cursor: 'pointer',
	},

	'&.disabled': {
		pointerEvents: 'none',
		'&:hover': {
			backgroundColor: 'transparent',
			cursor: 'default',
		},
	},

	'&.dots': {
		'&:hover': {
			backgroundColor: 'transparent',
			cursor: 'default',
		},
	},

	'&.selected': {
		backgroundColor: 'rgba(0, 0, 0, 0.08)',
	},
});

const Arrow = styled('div', {
	'&::before': {
		position: 'relative',
		content: '',
		display: 'inline-block',
		width: '0.4em',
		height: '0.4em',
		borderRight: '0.12em solid rgba(0, 0, 0, 0.87)',
		borderTop: '0.12em solid rgba(0, 0, 0, 0.87)',
	},

	'&.disabled': {
		'&::before': {
			borderRight: '0.12em solid rgba(0, 0, 0, 0.43)',
			borderTop: '0.12em solid rgba(0, 0, 0, 0.43)',
		},
	},

	variants: {
		direction: {
			left: {
				transform: 'rotate(-135deg) translate(-50%)',
			},
			right: {
				transform: 'rotate(45deg) translate(-50%)',
			},
		},
	},
});

type Props = {
	totalPageCount: number;
	siblingCount: number;
	currentPage: number;
	onPageChange: (page: number) => void;
};

const Pagination = (props: Props) => {
	const { totalPageCount, siblingCount = 1, currentPage, onPageChange } = props;

	const paginationRange = usePagination({
		currentPage,
		totalPageCount,
		siblingCount,
	});

	// If there are less than 2 times in pagination range we shall not render the component
	if (currentPage === 0 || paginationRange!.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange![paginationRange!.length - 1];
	return (
		<PaginationContainer>
			{/* Left navigation arrow */}
			<PaginationItem
				onClick={onPrevious}
				className={currentPage === 1 ? 'disabled' : ''}
			>
				<Arrow
					direction="left"
					className={currentPage === 1 ? 'disabled' : ''}
				/>
			</PaginationItem>
			{paginationRange!.map((pageNumber) => {
				// If the pageItem is a DOT, render the DOTS unicode character
				if (pageNumber === '...') {
					return (
						<PaginationItem className="dots" key={pageNumber}>
							&#8230;
						</PaginationItem>
					);
				}

				// Render our Page Pills
				return (
					<PaginationItem
						onClick={() => onPageChange(Number(pageNumber))}
						className={pageNumber === currentPage ? 'selected' : ''}
						key={pageNumber}
					>
						{pageNumber}
					</PaginationItem>
				);
			})}
			{/*  Right Navigation arrow */}
			<PaginationItem
				onClick={onNext}
				className={currentPage === lastPage ? 'disabled' : ''}
			>
				<Arrow
					direction="right"
					className={currentPage === lastPage ? 'disabled' : ''}
				/>
			</PaginationItem>
		</PaginationContainer>
	);
};

export default Pagination;
