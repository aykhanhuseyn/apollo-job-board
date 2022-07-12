import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
// import { request } from 'graphql-request';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

const client = new ApolloClient({
	uri: GRAPHQL_URL,
	cache: new InMemoryCache(),
});

export async function getJobs() {
	const query = gql`
		query GetJobsListQuery {
			jobs {
				id
				title
				company {
					name
				}
			}
		}
	`;
	const {
		data: { jobs },
	} = await client.query({ query });

	return jobs;
}

export async function getJobByID(id) {
	const query = gql`
		query GetJobByIDQuery($id: ID!) {
			job(id: $id) {
				id
				title
				description
				company {
					id
					name
				}
			}
		}
	`;
	const variables = { id };
	const {
		data: { job },
	} = await client.query({ query, variables });

	return job;
}

export async function getCompanyByID(id) {
	const query = gql`
		query Company($id: ID!) {
			company(id: $id) {
				id
				name
				description
				jobs {
					id
					title
					description
				}
			}
		}
	`;
	const variables = { id };
	const result = await client.query(query, variables);

	return result.company;
}

export async function createJobMutation(input) {
	const mutation = gql`
		mutation CreateJob($input: CreateJob!) {
			createJob(input: $input) {
				id
			}
		}
	`;
	const context = {
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	};
	const variables = { input };
	const {
		data: { createJob },
	} = await client.mutate({ mutation, variables, context });
	return createJob;
}

export async function updateJobMutation(id, input) {
	const mutation = gql`
		mutation UpdateJob($jobId: ID!, $input: UpdateJob!) {
			updateJob(id: $jobId, input: $input) {
				id
			}
		}
	`;
	const variables = { id, input };
	const context = {
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	};
	const {
		data: { updateJob },
	} = await client.mutate({ mutation, variables, context });
	return updateJob;
}

export async function deleteJobMutation(id) {
	const mutation = gql`
		mutation CreateJob($id: CreateJob!) {
			createJob(id: $id) {
				id
			}
		}
	`;
	const variables = { id };
	const context = {
		headers: {
			Authorization: `Bearer ${getAccessToken()}`,
		},
	};
	const {
		data: { deleteJob },
	} = await client.mutate({ mutation, variables, context });

	return deleteJob;
}
