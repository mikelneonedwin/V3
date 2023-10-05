import { ref, remove } from "firebase/database"
import { db } from "~/firebase"

export default defineEventHandler(async event => {
    const users = await getUser(getCookie(event, '_v3_id')!);
    return await remove(ref(db, `V3/${users.val()!.key}/uploads/${getRouterParam(event, 'day')}`));
})