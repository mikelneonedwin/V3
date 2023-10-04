import { child, get, ref, set } from 'firebase/database';
import { db } from '~/firebase'

export default defineEventHandler(async event => {
    const form = await readBody(event) as { email: string, password: string, name: string };
    return await get(child(ref(db), 'V3'))
    .then(async snapshot => {
        const users = Object.values(snapshot.val() || {}) as {email: string, id: string}[];
        if(users.some(a => a.email.toLowerCase() == form.email.toLowerCase())){
            return {
                error: { email: 'Email already exists' }
            }
        } else {
            const id = NEWID(users.map(a => a.id));
            return await set(ref(db, `V3/${form.name.replaceAll(" ", "-")}-${id}`), { ...form, id } )
            .then(() => {
                setCookie(event, '_v3_id', id);
                return { success: true }
            })
            .catch(err => { throw err });
        }
    })
    .catch(err => {
        console.error(err);
        return {
            error: { server: true }
        }
    })  
})

function NEWID(ids: string[]):string {
    function generateID():string {
        let id = ''
        while(id.length < 6){
            const i = Math.floor(Math.random() * 9);
            if(i == 0) continue;
            id += String(i);
        }
        return id
    }
    let res = generateID();
    while(ids.includes(res)) res = generateID();
    return res;
}