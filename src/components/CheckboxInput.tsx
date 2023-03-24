import { useFormContext, Controller } from 'react-hook-form';
import * as Checkbox from '@radix-ui/react-checkbox';
import { styled } from '../../stitches.config';

const Input = styled(Checkbox.Root, {
	border: '0.2rem solid $main_dark',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	variants: {
		size: {
			small: {
				width: '2rem',
				height: '2rem',
			},
			normal: {
				width: '2.5rem',
				height: '2.5rem',
			},
		},
	},
});

const Indicator = styled(Checkbox.Indicator, {
	backgroundColor: '$main_dark',
	borderRadius: '50%',

	variants: {
		size: {
			small: {
				width: '0.6rem',
				height: '0.6rem',
			},
			normal: {
				width: '0.8rem',
				height: '0.8rem',
			},
		},
	},
});

const FormGroup = styled('div', {
	mb: '3rem',
	display: 'flex',
	alignItems: 'center',
});

const Label = styled('label', {
	cursor: 'pointer',
	paddingLeft: '0.5rem',

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
			render={({ field }) => (
				<FormGroup>
					<Input
						{...field}
						value={undefined}
						checked={field.value}
						onCheckedChange={field.onChange}
						{...otherProps}
						size={{
							'@initial': 'small',
							'@md': 'normal',
						}}
					>
						<Indicator
							size={{
								'@initial': 'small',
								'@md': 'normal',
							}}
						/>
					</Input>
					<Label
						htmlFor={otherProps.id}
						fontSize={{
							'@initial': '2',
							'@md': '3',
						}}
					>
						{otherProps.label}
					</Label>
				</FormGroup>
			)}
		/>
	);
};

export default CheckboxInput;
