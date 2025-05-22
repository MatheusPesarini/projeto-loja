'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { SearchProductState } from '@/lib/actions/definitions';
import { useActionState } from 'react';
import { searchProduct } from '@/lib/actions/inputSearch/search-product';

const initialState: SearchProductState = { message: '', errors: {} };

const InputSearch = React.forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
	const [state, formAction] = useActionState(searchProduct, initialState);

	return (
		<div className={cn('relative flex items-center w-full', className)}>
			<form action={formAction} className="relative">
				<input
					type={type}
					className={cn(
						'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-8 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 pr-10 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
						'focus-visible:border-ring focus-visible:ring-ring/80 focus-visible:ring-[1px]',
						'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
					)}
					ref={ref}
					{...props}
				/>
				<div className="absolute inset-y-0 right-0 flex items-center pr-2">
					<button
						type="submit"
						aria-label="Buscar"
						className="p-1 rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					>
						<Search className="h-4 w-4" />
					</button>
				</div>
			</form>
		</div>
	);
});
InputSearch.displayName = 'InputSearch';

export { InputSearch };
