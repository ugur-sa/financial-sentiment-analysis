import * as React from 'react';
import { SVGProps } from 'react';

export const SuccessIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={20}
		height={20}
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		viewBox="0 0 50 50"
		{...props}
	>
		<circle
			cx={25}
			cy={25}
			r={25}
			style={{
				fill: '#25ae88',
			}}
		/>
		<path
			d="M38 15 22 33l-10-8"
			style={{
				fill: 'none',
				stroke: '#fff',
				strokeWidth: 2,
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 10,
			}}
		/>
	</svg>
);

export const FailedIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={20}
		height={20}
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		viewBox="0 0 50 50"
		{...props}
	>
		<circle
			cx={25}
			cy={25}
			r={25}
			style={{
				fill: '#d75a4a',
			}}
		/>
		<path
			d="m16 34 9-9 9-9M16 16l9 9 9 9"
			style={{
				fill: 'none',
				stroke: '#fff',
				strokeWidth: 2,
				strokeLinecap: 'round',
				strokeMiterlimit: 10,
			}}
		/>
	</svg>
);

export const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24" // Neue Breite
		height="24" // Neue Höhe
		viewBox="0 0 48 48" // Stelle sicher, dass die viewBox dem Original-SVG entspricht
		{...props}
	>
		<path d="M24 4C12.972 4 4 12.972 4 24s8.972 20 20 20 20-8.972 20-20S35.028 4 24 4zm0 3c9.407 0 17 7.593 17 17s-7.593 17-17 17S7 33.407 7 24 14.593 7 24 7zm0 7a2 2 0 0 0 0 4 2 2 0 0 0 0-4zm-.023 6.979A1.5 1.5 0 0 0 22.5 22.5v11a1.5 1.5 0 1 0 3 0v-11a1.5 1.5 0 0 0-1.523-1.521z" />
	</svg>
);
