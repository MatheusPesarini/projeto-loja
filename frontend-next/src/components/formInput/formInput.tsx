type FormInputProps = {
	label: string;
	name: string;
	type: React.HTMLInputTypeAttribute;
	placeholder?: string;
	errors?: string[];
	id?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
	label,
	name,
	type,
	placeholder,
	errors,
	id,
	className,
	...rest
}: FormInputProps) {
	const inputId = id || name;
	const errorId = `${inputId}-error`;
	const hasError = errors && errors.length > 0;

	return (
		<div className="mb-6 w-full max-w-xs">
			{' '}
			<label htmlFor={inputId} className="block text-sm font-medium mb-1 text-center">
				{label}
			</label>
			<input
				type={type}
				name={name}
				id={inputId}
				placeholder={placeholder}
				className={`text-black bg-amber-50 w-full p-2 rounded border ${
					hasError ? 'border-red-500' : 'border-gray-300'
				} ${className || ''}`}
				aria-invalid={hasError ? 'true' : 'false'}
				aria-describedby={hasError ? errorId : undefined}
				{...rest}
			/>
			{hasError && (
				<div id={errorId} className="text-red-500 mt-1 text-sm">
					{errors.map((error) => (
						<p key={error}>{error}</p>
					))}
				</div>
			)}
		</div>
	);
}
