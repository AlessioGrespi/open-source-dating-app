import type{  RequestEvent } from "@sveltejs/kit"
import { writable } from 'svelte/store';
import { sessions } from "./db/schema";
import { db } from "./db/db";
import { ilike, eq, sql, gt, count, desc } from "drizzle-orm";

export let sessionInfo

export const authenticateUser = async (event: RequestEvent) => {
		// get the cookies from the request
		const { cookies } = event

		// console.log(cookies)
		// console.log(event.locals.user)
		// get the user token from the cookie
		const sessionToken = cookies.get("session")

		console.log(sessionToken)

		//console.log("Checking user in server")

		// if the user token is not valid, return null
		// this is where you would check the user token against your database
		// to see if it is valid and return the user object

		if (!sessionToken) {
			console.log("User token not found in cookies");
			return null; // Return or handle the absence of a user token
		}

		let session

		if(sessionToken !== 'undefined'){
			session = await getSession({ sessionToken, cookies });
		}
		
		if (session) {
			// You can use the session object here
			console.log("Session found:", session);
			sessionInfo = session;
			const user = session
			return user; // Return the session object
		} else {
			console.log("Session not found");
			return null; // Handle the case where the session is not found
		}
}
	
async function getSession({ sessionToken, cookies }) {

	const date = new Date()

	
    const [session] = await db.select().from(sessions).where(eq(sessions.id, sessionToken)).orderBy(desc(sessions.expiry)).limit(1)
	
	// console.log(session)

	const sessionDate = new Date(session.expiry)

	console.log('Current Date', date, 'Session Date', sessionDate)

	if (sessionDate < date){
		console.log('session expired')
		
		date.setDate(date.getDate() + 1);
		await db.update(sessions).set({ expiry: date }).where(eq(sessions.id, sessionToken));

		// await db.delete(sessions).where(eq(sessions.id, session.id));
		// cookies.delete('session', {path: '/'})
		return null;
	}

	if (sessionDate > date){
		console.log('session still active')
	}

    return session;
}