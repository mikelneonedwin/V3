import { child, get, ref } from "firebase/database"
import { db } from "~/firebase"

export default defineEventHandler(async event => {
    return await get(child(ref(db), 'V3'))
    .then(snapshot => {
        const users = Object.values(snapshot.val() || {}) as { name: string, uploads?: Record<number, object>, id: string }[] ;
        return users.map((data) => ({
            projects: Object.values(data.uploads || {}).length,
            name: data.name,
            id: data.id
        })).sort((a,b) => b.projects - a.projects)
    })
    .catch(err => {
        console.error(err);
        throw createError({ statusCode: 500, statusMessage: 'Database Error '})
    })
})