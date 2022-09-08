import styled, { css } from 'styled-components';
import { useFormContext, Controller } from 'react-hook-form';

interface HelperTextProps {
	readonly error: boolean;
}

const HelperText = styled.p<HelperTextProps>`
	${(props) =>
		props.error
			? css`
					background-color: lightpink;
					color: firebrick;
					font-weight: bold;
					padding: 0.5rem;
					margin-bottom: 0.5rem;
			  `
			: `position: absolute;
        left: -9999px;`}
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
				<div>
					<label htmlFor={otherProps.id}>{otherProps.label}</label>
					<input {...field} {...otherProps} />
					<HelperText error={!!errors[name]}>
						{errors[name] ? (errors[name]?.message as string) : ''}
					</HelperText>
				</div>
			)}
		/>
	);
};

export default FormInput;
