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
    id: number
}

interface LeaderBoard {
    projects: number,
    name: string,
    id: number
}

const state: { hasData: boolean, leaderboards: LeaderBoard[], stats: StatData[] } =   {  hasData: false,  stats: [], leaderboards: [ ] }

export async function load(){
    if(!state.hasData) {
        state.leaderboards = (await $fetch('/api/leaderboards'));
        for(const id of state.leaderboards.map(a => a.id)) state.stats.push(await $fetch(`/api/stats/${id}`));
        state.hasData = true;
    }
    return state;
}