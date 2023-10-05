export default defineEventHandler(async event => {
    const id = getRouterParam(event, 'id');
    const user = await getUser(id!);
    if(!user.exists()){
        setResponseStatus(event, 404, 'User not found!')
        return {
            error: {
                msg: 'User not found!'
            }
        }
    }
    const { uploads, name } = user.val()! as { uploads: Record<string, object>, name: string };
    const resp:Record<string, object> = { };
    for(const key in uploads) if(uploads![key]) resp[key] = uploads![key];
    return { name, work: resp };
})