import styled, { css } from 'styled-components';
import { useFormContext, Controller } from 'react-hook-form';

interface HelperTextProps {
	readonly error: boolean;
}

const HelperText = styled.p<HelperTextProps>`
	width: 80%;
	${(props) =>
		props.error
			? css`
					background-color: lightpink;
					color: firebrick;
					font-weight: bold;
					padding: 0.5rem;
					margin-bottom: 0.5rem;
			  `
			: css`
					position: absolute;
					left: -9999px;
			  `}
`;

const FormGroup = styled.div`
	margin-bottom: 2rem;
`;

const Input = styled.input<HelperTextProps>`
	font-size: 1.5rem;
	font-family: inherit;
	color: inherit;
	padding: 1.2rem 1.6rem;
	border-radius: 0.2rem;
	background-color: rgba($color: white, $alpha: 0.5);
	border: none;
	border-bottom: solid 0.1rem #a8dadc;
	width: 80%;
	display: block;
	transition: all 0.3s;

	&:focus {
		outline: none;
		box-shadow: 0 1rem 2rem rgba($color: #1d3557, $alpha: 0.1);

		${(props) =>
			props.error
				? css`
						border-bottom: solid 0.3rem firebrick;
				  `
				: css`
						border-bottom: solid 0.3rem #55c57a;
				  `}
	}

	&::-webkit-input-placeholder {
		color: #457b9d;
	}
`;

const Label = styled.label`
	font-size: 1.2rem;
	font-weight: 700;
	margin-left: 2rem;
	margin-top: 0.7rem;
	display: block;
	transition: all 0.3s;
`;

const FormInput = ({
	name,
	...otherProps
}: {
	name: string;
	type: string;
	label: string;
	required: boolean;
	id: string;
	multiline?: boolean;
	rows?: number;
	value?: string;
	checked?: boolean;
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			defaultValue=""
			render={({ field }) => (
				<FormGroup>
					<Label htmlFor={otherProps.id}>{otherProps.label}</Label>
					<Input
						{...field}
						{...otherProps}
						placeholder={otherProps.label}
						error={!!errors[name]}
					/>
					<HelperText error={!!errors[name]}>
						{errors[name] ? (errors[name]?.message as string) : ''}
					</HelperText>
				</FormGroup>
			)}
		/>
	);
};

export default FormInput;
