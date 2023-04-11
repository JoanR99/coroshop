import { useFormContext, Controller } from 'react-hook-form';
import { styled } from '../../stitches.config';
import * as Switch from '@radix-ui/react-switch';

const SwitchRoot = styled(Switch.Root, {
	border: '1px solid $main_dark',
	width: '42px',
	height: '25px',
	backgroundColor: 'white',
	borderRadius: '9999px',
	position: 'relative',
	boxShadow: '0 2px 10px $main_dark',
	' -webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',

	'&:focus': {
		boxShadow: '0 0 0 2px black',
	},

	"&[data-state='checked']": {
		backgroundColor: '$main_light',
	},
});

const SwitchThumb = styled(Switch.Thumb, {
	display: 'block',
	width: '21px',
	height: '21px',
	backgroundColor: '$main',
	borderRadius: '9999px',
	boxShadow: '0 2px 2px $main_dark',
	transition: 'transform 100ms',
	willChange: 'transform',

	"&[data-state='checked']": {
		transform: 'translateX(18px)',
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

const SwitchInput = ({
	name,
	...otherProps
}: {
	name: string;
	label: string;
	required: boolean;
	id: string;
}) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<FormGroup>
					<SwitchRoot
						{...field}
						value={undefined}
						checked={field.value}
						onCheckedChange={field.onChange}
						{...otherProps}
					>
						<SwitchThumb />
					</SwitchRoot>
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

export default SwitchInput;
