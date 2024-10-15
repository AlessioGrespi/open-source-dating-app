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

    if (session && session !== 'undefined') {
        console.log('Logged in')
        throw redirect(303, '/')
    }
}


export const actions: Actions = {
    signup: async ({ request, cookies }) => {

        const formData = await request.formData();
        console.log('Raw formData:', formData);

        // Now convert formData into an object
        const signupForm = Object.fromEntries(formData);

        console.log('Form results:', signupForm);
        console.log('email', signupForm.email)

        if (signupForm.password !== signupForm.confirmPassword) {
            throw error(400, 'password no match')
        }


        const passwordHashed = await bcrypt.hash(signupForm.password, 10)

        try {

            console.log(passwordHashed)

            const [user] = await db.insert(users).values({
                email: signupForm.email
            }).returning();

            console.log(user)
            try {
                await db.insert(passwords).values({
                    password: `${passwordHashed}`,
                    userId: user.id
                });
            } catch (error) {
                console.error('Error inserting password:', error);
            }

            
        } catch (err) {
            console.error('An error occurred:', err);
            console.log("ERROR ERROR ERROR")
            return fail(500, { message: "An error occurred" });
        }
        
        throw redirect(303, './signup/emailVerify')

    }
}


