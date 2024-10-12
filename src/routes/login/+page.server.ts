import type { Actions, PageServerLoad } from "./$types"
// import { prisma } from "$lib/server/prisma"
// import bcrypt from 'bcrypt'
import { error, fail, redirect } from "@sveltejs/kit"
import { passwords, sessions, users } from "$lib/server/db/schema"
import { eq, and, desc, gt, sql } from "drizzle-orm"
import { db } from "$lib/server/db/db"
import bcrypt from 'bcrypt';

export const load: PageServerLoad = async ({ locals, cookies }) => {

	const session = cookies.get('session')

	if (session) {
		console.log('Logged in')
		throw redirect(303, '/')
	}
}


export const actions: Actions = {
	login: async ({ request, cookies }) => {

		const loginForm = Object.fromEntries(await request.formData())

		console.log("form results:", loginForm)
		console.log('email', loginForm.email)


		try {

			console.log('try');
			const [user] = await db.select().from(users).where(eq(users.email, loginForm.email)).limit(1);
			if(!user){
				throw error(500, 'no email')
			}
			console.log(user);
			const [passwordDB] = await db.select().from(passwords).where(eq(passwords.userId, user.id));
			console.log(passwordDB);
			// const user = await prisma.user.findUniqueOrThrow({
			//     where: { email: loginForm.email}
			// });

			// const passwordDB = await prisma.password.findUniqueOrThrow({
			//     where: { userId: user.id}
			// })

			console.log("user details:", user);
			console.log("user password:", passwordDB);
			// console.log(loginForm)


			console.log(loginForm.password, passwordDB.password)
			const result = await bcrypt.compare(loginForm.password, passwordDB.password) // add whem password hasihing is added

			console.log('result ', result)
			if (!result) {
				throw error(500, "password no matchy")
			}

			var date = new Date();

			console.log("date:", date)

			try {
				const [sessionData] = await db.select().from(sessions).where(and(eq(sessions.userId, user.id), gt(sessions.expiry, sql`${new Date().toISOString()}`))).orderBy(desc(sessions.expiry)).limit(1);

				date.setDate(date.getDate() + 1);
				console.log("date + 1:", date);

				const dateToDB = date.toISOString()

				if (!sessionData) {
					console.log("Session not found, creating a new session...");

					let sessionData = await db.insert(sessions).values({
						userId: user.id,
						expiry: dateToDB
					}).returning();

					console.log("New session created:", sessionData);
				} else {
					await db.update(sessions).set({ expiry: dateToDB }).where(eq(sessions.id, `${sessionData.id}`));
					console.log('Session Updated');
				}
				cookies.set("session", sessionData.id, {
					path: "/",
					httpOnly: true,
					sameSite: "strict",
					secure: process.env.NODE_ENV === "production",
					maxAge: 60 * 60 * 24 * 7, // 1 week
				})
	
				console.log('Cookies Set')
	
				console.log("Logging in")
			} catch (error) {
				console.error("Error fetching or updating session:", error);
				// Add any additional logic to handle the error
			}

			// let sessionValidate = await prisma.session.findFirst({
			// 	where: {
			// 		userId: user.id,
			// 	},
			// 	orderBy: {
			// 		sessionExpiry: 'desc'
			// 	}
			// })

			// console.log("session validate", sessionValidate)


		} catch (err) {
			console.error('An error occurred:', err);
			console.log("ERROR ERROR ERROR")
			return fail(500, { message: "An error occurred" });
		}

		throw redirect(303, '/')
	}
}


