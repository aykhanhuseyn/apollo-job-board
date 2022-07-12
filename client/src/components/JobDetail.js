import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getJobByID } from '../graphql/queries';

function JobDetail() {
	const { jobId } = useParams();
	const [job, setJob] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		getJobByID(jobId)
			.then((data) => {
				setJob(data);
			})
			.catch((e) => {
				setError(e);
			});
	}, [jobId]);

	if (error) return <div>{error?.message ?? 'Unexpected error...'}</div>;
	if (!job) return <div>Loading...</div>;

	return (
		<div>
			<h1 className='title'>{job.title}</h1>
			<h2 className='subtitle'>
				<Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
			</h2>
			<div className='box'>{job.description}</div>
		</div>
	);
}

export default JobDetail;
