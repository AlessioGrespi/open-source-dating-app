import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
// import bcrypt from 'bcrypt'
import { error, fail, redirect } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ locals, cookies }) => {

    // const session = cookies.get('session')

    // if (session) {
    //     console.log('Logged in')
    //     // throw redirect(303, '/')
    // }
}


export const actions: Actions ={
    login: async ({ request, cookies }) => {

        const loginForm = Object.fromEntries(await request.formData())

        console.log("form results:", loginForm)

        try {
            const user = await prisma.user.findUniqueOrThrow({
                where: { email: loginForm.email}
            });

            const passwordDB = await prisma.password.findUniqueOrThrow({
                where: { userId: user.id}
            })

            console.log("user details:", user)
			console.log("user password:", passwordDB);
			// console.log(loginForm)


            // const result = await bcrypt.compare(emailform.password, passwordDB.password) // add whem password hasihing is added

			// console.log('result ', result)
			// if (!result) {
			// 	throw error(500, "error")
			// }

			var date = new Date();
			
			console.log("date:", date)

			let session = await prisma.session.findFirst({
				where: {
					userId: user.id,
					userType: user.usertype,
					sessionExpiry: { gt: date }
				},
				orderBy: {
					sessionExpiry: 'desc'
				}
			})

            console.log("session:", session)


			date.setDate(date.getDate() + 1);

			console.log("date + 1:", date)
			
			if (!session) {
				console.log("null session")

				if(user.usertype === 'APPLICANT'){
					session = await prisma.session.create({
						data: {
							userId: user.id,
							userType: user.usertype,
							firstName: user.firstName,
							surName: user.surName,
							email: user.email,
							sessionExpiry: date,
						}
					})
					console.log('Applicant Session Created')
				}

				else if(user.usertype === 'EMPLOYER' || user.usertype === 'ADMIN'){
					
					const companyData = await prisma.employee.findUnique({
						where: {
							userId: user.id
						}
					})
					
					console.log("employee found: ", companyData)

					session = await prisma.session.create({
						data: {
							userId: user.id,
							userType: user.usertype,
							firstName: user.firstName,
							surName: user.surName,
							email: user.email,
							sessionExpiry: date,
							companyName: companyData.companyName, 
							companyId: companyData.companyId,
						}
					})
					console.log('Employer Session Created:', session)
				}
			}
			else {
				await prisma.session.update({
					where: {
						id: session.id
					},
					data: {
						sessionExpiry: date
					}
				})
                console.log('Session Updated')
			}

            let sessionValidate = await prisma.session.findFirst({
				where: {
					userId: user.id,
				},
				orderBy: {
					sessionExpiry: 'desc'
				}
			})

            console.log("session validate", sessionValidate)

            cookies.set("session", session.id, {
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 7, // 1 week
			})

            console.log('Cookies Set')

            console.log("Logging in")

        } catch (err) {
			console.error('An error occurred:', err);
			console.log("ERROR ERROR ERROR")
			return fail(500, { message: "An error occurred" });
		}

        throw redirect(303, '/')
    }
}


