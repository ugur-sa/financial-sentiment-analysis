import React from 'react';

const Error: React.FC = () => {
	return (
		<div>
			<h1>504 Gateway Timeout</h1>
			<p>Sorry, the server is taking too long to respond.</p>
			<p>Please refresh the page.</p>
		</div>
	);
};

export default Error;
