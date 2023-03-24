import { useFormContext, Controller } from 'react-hook-form';
import { styled } from '../../stitches.config';

const FormGroup = styled('div', {
	mb: '2rem',
});

const HelperText = styled('p', {
	width: '100%',
	mb: '0',

	'&.error': {
		fontSize: '1.2rem',
		color: 'firebrick',
		fontWeight: 'bold',
		mt: '0.5rem',
	},
});

export const Input = styled('input', {
	fontFamily: 'inherit',
	color: 'inherit',
	padding: '1.2rem 1.6rem',
	borderRadius: '0.2rem',
	backgroundColor: 'rgba($color: white, $alpha: 0.5)',
	border: 'none',
	width: '100%',
	display: 'block',
	transition: 'all 0.3s',
	borderBottom: 'solid 1px $main',

	'&:focus': {
		outline: 'none',
		boxShadow: '0 1rem 2rem rgba($color: $main_dark, $alpha: 0.1)',
		borderBottom: 'solid 1px #55c57a',

		'&.error': {
			borderBottom: 'solid 1px firebrick',
		},
	},

	'&::-webkit-input-placeholder': {
		color: '$main',
	},

	variants: {
		fontSize: {
			1: {
				fontSize: '1rem',
			},
			2: {
				fontSize: '1.25rem',
			},
			3: {
				fontSize: '1.563rem',
			},
		},
	},
});

const Label = styled('label', {
	border: 0,
	clip: 'rect(0 0 0 0)',
	height: '1px',
	margin: '-1px',
	overflow: 'hidden',
	padding: 0,
	position: 'absolute',
	width: '1px',
});

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
						className={!!errors[name] ? 'error' : ''}
						aria-label={otherProps.label}
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					/>
					<HelperText className={`${!!errors[name] ? 'error' : ''}`}>
						{errors[name] ? (errors[name]?.message as string) : ''}
					</HelperText>
				</FormGroup>
			)}
		/>
	);
};

export default FormInput;
