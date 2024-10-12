import type{  RequestEvent } from "@sveltejs/kit"
import { writable } from 'svelte/store';
import { sessions } from "./db/schema";
import { db } from "./db/db";
import { ilike, eq, sql, gt, count } from "drizzle-orm";

export let sessionInfo

export const authenticateUser = async (event: RequestEvent) => {
		// get the cookies from the request
		const { cookies } = event

		// console.log(cookies)
		// console.log(event.locals.user)
		// get the user token from the cookie
		const sessionToken = cookies.get("session")

		//console.log(userToken)

		//console.log("Checking user in server")

		// if the user token is not valid, return null
		// this is where you would check the user token against your database
		// to see if it is valid and return the user object

		if (!sessionToken) {
			//console.log("User token not found in cookies");
			return null; // Return or handle the absence of a user token
		}

		const session = await getSession({ sessionToken });

		if (session) {
			// You can use the session object here
			//console.log("Session found:", session);
			sessionInfo = session;
			const user = session
			return user; // Return the session object
		} else {
			//console.log("Session not found");
			return null; // Handle the case where the session is not found
		}
}
	
async function getSession({ sessionToken }) {

    const session = await db.select().from(sessions).where(eq(sessions.id, sessionToken))

    return session;
}