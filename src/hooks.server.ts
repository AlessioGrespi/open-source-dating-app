import { authenticateUser } from '$lib/server/auth';
import { redirect, error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {

	const session = await authenticateUser(event);

	// console.log(session?.sessionExpiry);

	const sessionData = session;

	event.locals.userData = sessionData

	// console.log('Checking path access');
	//console.log(sessionData);
	
	if (event.url.pathname.startsWith('/protected')) {

		// if (sessionData) {
		// 	if (!sessionData.userType) {
		// 		console.log('access blocked');
		// 		throw redirect(307, '/login');
		// 	}
		// 	else if(sessionData.userType === 'EMPLOYER' || sessionData.userType === 'EMPLOYEE')
		// 	{
		// 		throw redirect(303, '/app/employer');
		// 	}

		// } else {
		// 	throw redirect(307, '/');
		// }

		// if (event.url.pathname.startsWith('/app/employer')) {
		// 	if (sessionData.userType !== 'EMPLOYER' && sessionData.userType !== 'EMPLOYEE' && sessionData.userType !== 'ADMIN') {
		// 		console.log('access blocked');
		// 		if (sessionData.userType === 'APPLICANT') {
		// 			throw redirect(307, '/app/applicant'); // Redirect to the applicant page
		// 		} else {
		// 			throw redirect(307, '/login'); // Redirect to the login page for other cases
		// 		}
		// 	}
		// }
		
		// if (event.url.pathname.startsWith('/app/applicant')) {
		// 	if (sessionData.userType !== 'APPLICANT' && sessionData.userType !== 'ADMIN') {
		// 		console.log('access blocked');
		// 		if (sessionData.userType === 'EMPLOYEE' || sessionData.userType === 'EMPLOYER') {
		// 			throw redirect(307, '/app/employer'); // Redirect to the employer page
		// 		} else {
		// 			throw redirect(307, '/login'); // Redirect to the login page for other cases
		// 		}
		// 	}
		// }
	}

	const response = await resolve(event); // Stage 2

	return response;
};
