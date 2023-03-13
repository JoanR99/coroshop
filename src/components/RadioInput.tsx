import * as RG from '@radix-ui/react-radio-group';
import { styled } from '../../stitches.config';

const InputContainer = styled('div', {
	mb: '1rem',
	display: 'flex',
	alignItems: 'center',
});

const Item = styled(RG.Item, {
	backgroundColor: 'white',
	width: '25px',
	height: '25px',
	borderRadius: '100%',
	border: '0.2rem solid $main_dark',
});

const Indicator = styled(RG.Indicator, {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	height: '100%',
	position: 'relative',

	'&::after': {
		content: '',
		display: 'block',
		width: '11px',
		height: '11px',
		borderRadius: '50%',
		backgroundColor: '$main_dark',
	},
});

const Label = styled('label', {
	color: '$main_dark',
	fontSize: '15px',
	lineHeight: 1,
	paddingLeft: '15px',
});

const RadioInput = (props: { value: string; id: string; label: string }) => (
	<InputContainer>
		<Item {...props}>
			<Indicator />
		</Item>
		<Label htmlFor={props.id}>{props.label}</Label>
	</InputContainer>
);

export default RadioInput;
