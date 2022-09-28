import styled, { css } from 'styled-components';
import { usePagination } from './usePagination';

const PaginationContainer = styled.ul`
	display: flex;
	list-style-type: none;
`;

type ItemProps = {
	disabled?: boolean;
	dots?: boolean;
	selected?: boolean;
};

const PaginationItem = styled.li<ItemProps>`
	padding: 0 12px;
	height: 32px;
	text-align: center;
	margin: auto 4px;
	color: rgba(0, 0, 0, 0.87);
	display: flex;
	box-sizing: border-box;
	align-items: center;
	letter-spacing: 0.01071em;
	border-radius: 16px;
	line-height: 1.43;
	font-size: 13px;
	min-width: 32px;

	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
		cursor: pointer;
	}

	${(props) => {
		if (props.disabled) {
			return css`
				pointer-events: none;
				&:hover {
					background-color: transparent;
					cursor: default;
				}
			`;
		}
		if (props.dots) {
			return css`
				&:hover {
					background-color: transparent;
					cursor: default;
				}
			`;
		}
		if (props.selected) {
			return css`
				background-color: rgba(0, 0, 0, 0.08);
			`;
		}
	}}
`;

type ArrowProps = {
	left?: boolean;
	right?: boolean;
	disabled?: boolean;
};

const Arrow = styled.div<ArrowProps>`
	&::before {
		position: relative;
		/* top: 3pt; Uncomment this to lower the icons as requested in comments*/
		content: '';
		/* By using an em scale, the arrows will size with the font */
		display: inline-block;
		width: 0.4em;
		height: 0.4em;
		border-right: 0.12em solid rgba(0, 0, 0, 0.87);
		border-top: 0.12em solid rgba(0, 0, 0, 0.87);
	}

	${(props) => {
		if (props.left) {
			return css`
				transform: rotate(-135deg) translate(-50%);
			`;
		}

		if (props.right) {
			return css`
				transform: rotate(-135deg) translate(-50%);
				transform: rotate(45deg);
			`;
		}

		if (props.disabled) {
			return css`
				&::before {
					border-right: 0.12em solid rgba(0, 0, 0, 0.43);
					border-top: 0.12em solid rgba(0, 0, 0, 0.43);
				}
			`;
		}
	}}
`;

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
			<PaginationItem onClick={onPrevious} disabled={currentPage === 1}>
				<Arrow left disabled={currentPage === 1} />
			</PaginationItem>
			{paginationRange!.map((pageNumber) => {
				// If the pageItem is a DOT, render the DOTS unicode character
				if (pageNumber === '...') {
					return (
						<PaginationItem dots key={pageNumber}>
							&#8230;
						</PaginationItem>
					);
				}

				// Render our Page Pills
				return (
					<PaginationItem
						onClick={() => onPageChange(Number(pageNumber))}
						selected={pageNumber === currentPage}
						key={pageNumber}
					>
						{pageNumber}
					</PaginationItem>
				);
			})}
			{/*  Right Navigation arrow */}
			<PaginationItem onClick={onNext} disabled={currentPage === lastPage}>
				<Arrow right />
			</PaginationItem>
		</PaginationContainer>
	);
};

export default Pagination;
