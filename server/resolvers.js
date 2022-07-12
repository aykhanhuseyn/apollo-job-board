import { Job, Company, User } from './db.js';

function isUnAuthorized(condition) {
	if (condition) throw new Error('Unauthorized');
}
function doesNotFound(condition) {
	if (condition) throw new Error('Not found');
}

async function isAuthUser(user) {
	isUnAuthorized(!user);

	const userInDB = await User.findById(user.id);
	isUnAuthorized(!userInDB);
}

export const resolvers = {
	Query: {
		jobs: () => Job.findAll(),
		job: (_, { id }) => Job.findById(id),
		company: (_, { id }) => Company.findById(id),
	},

	Mutation: {
		createJob: async (_, { input }, { user }) => {
			isAuthUser(user);
			return Job.create({ ...input, companyId: user?.companyId });
		},
		updateJob: async (_, { id, input }, { user }) => {
			isAuthUser(user);

			const job = await Job.findById(id);
			doesNotFound(!job);
			isUnAuthorized(user.companyId !== job.companyId);

			return Job.update({ ...job, ...input });
		},
		deleteJob: async (_, { id }, { user }) => {
			isAuthUser(user);

			const job = await Job.findById(id);
			doesNotFound(!job);
			isUnAuthorized(user.companyId !== job.companyId);

			return Job.delete(id);
		},
	},

	Job: {
		company: ({ companyId }) => Company.findById(companyId),
	},

	Company: {
		jobs: ({ id }) => Job.findAll(({ companyId }) => companyId === id),
	},
};
