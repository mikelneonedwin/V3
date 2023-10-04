<script setup>
    const countdown = '03:30:00';

    function svgUrl(xname){
    const randomColors = [ "#FF5733", "#FFC300", "#85C1E9", "#58D68D", "#9B59B6", "#E74C3C", "#3498DB", "#F39C12",  "#1ABC9C", "#E74C3C", "#2ECC71", "#9B59B6", "#3498DB", "#F39C12",  "#1ABC9C" ];
    const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    function generateSquaredInitialAvatar() {
        const initials = xname ? xname.charAt(0).toUpperCase() : '?';
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="${randomColor}" />
            <text x="50" y="50" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white">${initials}</text>
        </svg>
        `;
    }
    const svgMarkup = generateSquaredInitialAvatar(); 
    return `data:image/svg+xml;base64,${btoa(svgMarkup)}`;
}

const stats = [
    {
        name: 'James Paul',
        img: svgUrl('J'),
        score: 70,
        max: 100,
        id: 1,
    },
    {
        name: 'Tom Phill',
        img: svgUrl('T'),
        score: 20,
        max: 100,
        id: 2,
    }
]
</script>

<template>
    <Title>Leaderboards - V3</Title>
    <section class="md:mt-2">
        <h1 class="text-3xl font-bold text-[#00DC82]">Leaderboards</h1>
        <div class="mt-8 flex flex-col gap-4">
            <NuxtLink :to="'/stats/' + user.id" click="navigateTo('/' + user.max)" v-for="(user, index) in stats" :key="index" class="bg-[#444654] p-2 rounded-lg">
                <div class="flex items-center gap-2 px-0.5">
                    <img :src="user.img" class="rounded-lg h-[3.5rem]">
                    <div class="flex w-full items-start flex-col gap-0">
                        <p class="font-extrabold">{{ user.name }}</p>
                        <span class="text-base">Projects: 10</span>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </section>
</template>