export default defineEventHandler(async event => {
    const id = getRouterParam(event, 'id')!;
    const user = await getUser(id!);
    if(!user.exists()){
        setResponseStatus(event, 404, 'User not found!')
        return { error: { msg: 'User not found!' } }
    }
    const { uploads, name, id:idd, admin } = user.val()! as { uploads: Record<string, object>, admin?: boolean, name: string, id: number };
    const resp:Record<string, object> = { };
    for(const key in uploads) if(uploads![key]) resp[key] = uploads![key];
    return { name, work: resp, id: idd, ... ( admin ? { admin } : {} )};
})