import JobList from './JobList';
import { getJobs } from '../graphql/queries';
import { useEffect, useState } from 'react';

function JobBoard() {
	const [jobs, setJobs] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		getJobs()
			.then((data) => {
				setJobs(data);
			})
			.catch((e) => {
				setError(e);
			});
	}, []);

	if (error) return <div>{error?.message ?? 'Unexpected error...'}</div>;
	if (!jobs) return <div>Loading...</div>;

	return (
		<div>
			<h1 className='title'>Job Board</h1>
			<JobList jobs={jobs} />
		</div>
	);
}

export default JobBoard;
