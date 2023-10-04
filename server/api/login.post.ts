import { child, get, ref } from "firebase/database";
import { db } from "~/firebase";

export default defineEventHandler(async event => {
    const form = await readBody(event) as { email: string, password: string };
    return await get(child(ref(db), 'V3'))
    .then(async snapshot => {
        const users = Object.values(snapshot.val() || {}) as { email: string, id: string, password: string }[];
        const thisUser = users.find(a => a.email.toLowerCase() == form.email.toLowerCase());
        if(!thisUser) return { error: { email: 'Email does not exist' } }
        if(thisUser.password != form.password)  return { error: { password: 'Passwords don\'t match' } }

        setCookie(event, '_v3_id', thisUser.id);
        return { success: true }
    })
    .catch(err => {
        console.error(err);
        return { error: { server: true } }
    })
})