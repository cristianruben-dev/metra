import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card"
			className={cn(
				'bg-white text-card-foreground flex flex-col gap-6 rounded-xl border border-primary/10 py-6 md:p-6 shadow-sm',
				className,
			)}
			{...props}
		/>
	)
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				'@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 [.border-b]:pb-6',
				className,
			)}
			{...props}
		/>
	)
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				'leading-none font-semibold font-vollkorn font-bold text-2xl md:text-4xl',
				className,
			)}
			{...props}
		/>
	)
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	)
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-content"
			className={cn('px-6', className)}
			{...props}
		/>
	)
}

export {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
}
