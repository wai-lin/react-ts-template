// temp use
export interface PageContentProps {
	children?: React.ReactNode;
}

export function PageContent({ children }: PageContentProps) {
	return (
		<div
			style={{
				margin: '1rem',
				display: 'flex',
				flexGrow: '1',
				flexDirection: 'column',
				borderRadius: '0.25rem',
				borderWidth: '4px',
				borderStyle: 'dashed',
				borderColor: 'gray',
				background: 'white',
			}}
		>
			<article
				style={{
					display: 'flex',
					height: '100%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{children}
			</article>
		</div>
	);
}
