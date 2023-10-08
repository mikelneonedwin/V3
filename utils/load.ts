interface StatData {
    name: string,
    work: Record<number, {
        files?: string[],
        link: string,
        description: string,
        repo?: string,
        frameworks?: string[],
        tools?: string[],
        languages?: string[]
    }>,
    admin?: boolean,
    id: number
}

interface LeaderBoard {
    projects: number,
    name: string,
    id: number
}

const state: { hasData: boolean, leaderboards: LeaderBoard[], stats: StatData[] } =   {  hasData: false,  stats: [], leaderboards: [ ] }

if(process.client) Object.assign(state, useNuxtApp().payload.data.load);

export async function load(){
    if(process.client) console.info('consulted on client');
    if(!state.hasData) {
        if(process.client) console.info ('fetched on client');
        state.leaderboards = (await $fetch('/api/leaderboards'));
        for(const id of state.leaderboards.map(a => a.id)) state.stats.push(await $fetch(`/api/stats/${id}`));
        state.hasData = true;
    }
    return state;
}