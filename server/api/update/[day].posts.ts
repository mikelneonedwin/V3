import { ref, set } from "firebase/database";
import { db } from "~/firebase";

export default defineEventHandler(async event => {
    const day = getRouterParam(event, 'day')!;
    const form = await readBody(event);
    const userReq = await getUser(getCookie(event, '_v3_id')!);
    const user = userReq.val()!;

    const current = user.uploads![day];

    const new_ = { ...( current.files ? { files: current.files } : {} ), ...form };
    await set(ref(db, `V3/${user.key}/uploads/${day}`), new_);

    return { success: true };
})