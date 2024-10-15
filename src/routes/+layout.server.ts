export const load: PageServerLoad = async ({locals}) => {
    const session = locals.user

    return {session}
};