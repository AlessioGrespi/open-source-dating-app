import { redirect } from "@sveltejs/kit"
import type { RequestHandler } from "../../$types"
// import { prisma } from "$lib/server/prisma"
import { sessions } from "$lib/server/db/schema"
import { db } from "$lib/server/db/db"
import { eq } from "drizzle-orm"
import { goto } from "$app/navigation"

export const POST: RequestHandler = async ({ cookies }) => {

    console.log('logging out')
    
    const session = cookies.get('session')

    if (session !== 'undefined'){
        await db.delete(sessions).where(eq(sessions.id, session));
    }

    console.log('Clearing session ', session)
			
    cookies.delete('session', {path: '/'})

    console.log('logged out')
    
    redirect(303, "/")
}
