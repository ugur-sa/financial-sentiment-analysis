import Link from 'next/link';
import React from 'react';

type Requests = {
	url: string;
	status: string;
};

interface Props {
	requests: Requests[];
}

const RequestsTable: React.FC<Props> = (props) => {
	// Implement your component logic here
	const requestLength = props.requests.length;
	return (
		<div className="no-scrollbar mb-4 w-fit overflow-scroll rounded-md border border-gray-300 bg-white px-8 pb-2 pt-8 shadow-xl">
			<h3 className="mb-4 pl-4 text-2xl font-semibold">Deine Requests</h3>
			<table className="table-auto">
				<thead>
					<tr className="border-b border-gray-200 hover:bg-gray-50">
						<th className="border-r border-gray-200 p-4 text-start font-normal">
							URL
						</th>
						<th className="p-4 text-start font-normal">Status</th>
					</tr>
				</thead>
				<tbody>
					{props.requests.map((request, i) => (
						<tr
							key={i}
							className={`border-spacing-8 ${i + 1 !== requestLength ? 'border-b border-gray-200' : ''} hover:bg-gray-50`}
						>
							<td className="border-r border-gray-200 p-4">
								{request.status === 'completed' ? (
									<Link
										href={`/process?url=${request.url}`}
										className="text-blue-500"
									>
										{request.url}
									</Link>
								) : (
									request.url
								)}
							</td>
							<td className="p-4">{request.status}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default RequestsTable;
