import Link from 'next/link';
import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import { SuccessIcon, FailedIcon } from '../ui/Icons';
import { Requests } from '@/types/types';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip';

interface Props {
	requests: Requests[];
}

const RequestsTable: React.FC<Props> = (props) => {
	// Implement your component logic here
	const requestsLength = props.requests.length;
	console.log('requestsLength', requestsLength);
	return (
		<div className="no-scrollbar mb-4 w-fit overflow-y-scroll rounded-md border border-gray-300 bg-white px-8 pb-2 pt-8 lg:max-h-96 lg:max-w-[50%]">
			<h3 className="mb-4 pl-4 text-2xl font-semibold">Ihre Requests</h3>
			{requestsLength > 0 ? (
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
								className={`border-spacing-8 ${i + 1 !== requestsLength ? 'border-b border-gray-200' : ''} hover:bg-gray-50`}
							>
								<td className="border-r border-gray-200 p-4">
									{request.status === 'completed' ? (
										<Link
											href={`/process?url=${request.url}`}
											target="_blank"
											className="text-blue-500"
										>
											{request.url}
										</Link>
									) : (
										request.url
									)}
								</td>
								<td className="">
									<div className="flex w-full justify-center">
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger>
													{request.status === 'completed' ? (
														<SuccessIcon />
													) : request.status === 'pending' ? (
														<div className="sweet-loading ml-1">
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
														<FailedIcon />
													)}
												</TooltipTrigger>
												<TooltipContent>
													{request.text !== undefined ? (
														<div className="text-center">{request.text}</div>
													) : (
														<div className="text-center">{request.status}</div>
													)}
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="flex h-40 items-center justify-center">
					<span className="text-gray-400">Keine Requests vorhanden</span>
				</div>
			)}
		</div>
	);
};

export default RequestsTable;
