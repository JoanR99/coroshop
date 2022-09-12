import styled, { css } from 'styled-components';
import { useFormContext, Controller } from 'react-hook-form';

interface InputProps {
	readonly value: boolean;
}

const FormGroup = styled.div`
	margin-bottom: 3rem;
`;

const Input = styled.input`
	display: none;
`;

const Label = styled.label`
	font-size: 1.2rem;
	cursor: pointer;
	position: relative;
	padding-left: 4.5rem;
`;

const Button = styled.span<InputProps>`
	width: 2.4rem;
	height: 2.4rem;
	border: 0.5rem solid #1d3557;
	border-radius: 50%;
	display: inline-block;
	position: absolute;
	top: -0.5rem;
	left: 0;

	&::after {
		content: '';
		display: block;
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #1d3557;
		transition: opacity 0.2s;
	}

	${(props) => {
		console.log(props.value);
		return props.value
			? css`
					&::after {
						opacity: 1;
					}
			  `
			: css`
					&::after {
						opacity: 0;
					}
			  `;
	}}
`;

const CheckboxInput = ({
	name,
	...otherProps
}: {
	name: string;
	label: string;
	required: boolean;
	id: string;
	multiline?: boolean;
	rows?: number;
}) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			defaultValue=""
			render={({ field }) => (
				<FormGroup>
					<Input type="checkbox" {...field} {...otherProps} />
					<Label htmlFor={otherProps.id}>
						<Button value={field.value} />
						{otherProps.label}
					</Label>
				</FormGroup>
			)}
		/>
	);
};

export default CheckboxInput;
