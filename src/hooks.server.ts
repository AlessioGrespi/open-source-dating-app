import { authenticateUser } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const session = await authenticateUser(event);

    // Set the user in locals for use in routes
    event.locals.user = session;

    // Check for protected routes
    if (event.url.pathname.startsWith('/protected')) {
		if (!session) {
			console.log('no cookie found')
            // Redirect to home page if not authenticated
            throw redirect(307, '/');
        }
    }

    // If we reach here, either the user is authenticated or the route doesn't require authentication
    const response = await resolve(event);

    return response;
};