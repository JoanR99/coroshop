import * as RG from '@radix-ui/react-radio-group';
import { ReactNode } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { styled } from '../../stitches.config';

const Root = styled(RG.Root, {
	display: 'flex',
	flexDirection: 'column',
	gap: '10px',
	my: '2rem',
});

const RadioGroup = ({
	name,
	children,
	...otherProps
}: {
	name: string;
	label: string;
	required: boolean;
	defaultValue: string;
	children: ReactNode;
}) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Root
					{...field}
					onValueChange={field.onChange}
					{...otherProps}
					aria-label={otherProps.label}
				>
					{children}
				</Root>
			)}
		/>
	);
};

export default RadioGroup;
