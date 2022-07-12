import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import JobList from './JobList';
import { getCompanyByID } from '../graphql/queries';

function CompanyDetail() {
	const { companyId } = useParams();
	const [company, setCompany] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		getCompanyByID(companyId)
			.then((data) => {
				setCompany(data);
			})
			.catch((e) => {
				setError(e);
			});
	}, [companyId]);

	if (error) return <div>{error?.message ?? 'Unexpected error...'}</div>;
	if (!company) return <div>Loading...</div>;

	return (
		<div>
			<h1 className='title'>{company.name}</h1>
			<div className='box'>{company.description}</div>
			<hr />
			<div className='title is-5'>Jobs at {company.name}</div>
			<JobList jobs={company.jobs} />
		</div>
	);
}

export default CompanyDetail;
