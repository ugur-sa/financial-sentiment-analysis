import Link from 'next/link';
import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import { SuccessIcon, FailedIcon } from '../ui/Icons';
import { Requests } from '@/types/types';

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
							<td className="">
								{request.status === 'completed' ? (
									<div className="flex w-full justify-center">
										<SuccessIcon />
									</div>
								) : request.status === 'pending' ? (
									<div className="sweet-loading ml-1 flex w-full justify-center">
										<FadeLoader
											color={'#0079d5'}
											aria-label="Loading Spinner"
											data-testid="loader"
											height={15}
											width={5}
											margin={-1}
										/>
									</div>
								) : (
									<div className="flex w-full justify-center">
										<FailedIcon />
									</div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default RequestsTable;
