import { useFormContext, Controller } from 'react-hook-form';
import * as Checkbox from '@radix-ui/react-checkbox';
import { styled } from '../../stitches.config';

const Input = styled(Checkbox.Root, {
	width: '25px',
	height: '25px',
	border: '0.2rem solid $main_dark',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

const Indicator = styled(Checkbox.Indicator, {
	width: '0.8rem',
	height: '0.8rem',
	backgroundColor: '$main_dark',
	borderRadius: '50%',
});

const FormGroup = styled('div', {
	mb: '3rem',
	display: 'flex',
	alignItems: 'center',
});

const Label = styled('label', {
	fontSize: '1.4rem',
	cursor: 'pointer',
	paddingLeft: '0.5rem',
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
					>
						<Indicator />
					</Input>
					<Label htmlFor={otherProps.id}>{otherProps.label}</Label>
				</FormGroup>
			)}
		/>
	);
};

export default CheckboxInput;
