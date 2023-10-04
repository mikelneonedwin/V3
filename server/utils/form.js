export function processForm(data) {
    const files = data.filter(a => a.filename);
    const entries = data.filter(a => !a.filename);
    return { 
        data: entries.map((a) => ({
            ...a,
            data: a.data.toString('utf-8')
        })), 
        files:files.map((a) => ({
            ...a,
            data: `data:${a.type};base64,${a.data.toString('base64')}`
        })
    )}
}