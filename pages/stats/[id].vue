<script setup>
    const { id } = useRoute().params;
    const { data: user } = await useFetch(`/api/stats/${id}`);
    const Day = ref(Object.keys(user.value.work)[0] || null);
    const screenx = computed(() => user.value.work[Day.value]);
</script>

<template>
    <Title>Stats for "{{ user.name }}"</Title>
    <section v-if="Day" class="md:mt-2 mb-4">
        <div>
            <h1 class="text-3xl font-bold text-[#00DC82]">{{ user.name }}</h1>
            <div class="mt-8">
                <div class="flex items-start">
                    <h2 class="text-2xl font-bold mr-2">Projects:</h2>
                    <div class="w-full whitespace-nowrap overflow-x-auto scroll px-4">
                        <button @click="Day = day" v-for="day in Object.keys(user.work)" :class="{'!bg-[#00DC82]': day == Day }" class="mr-2 font-bold btnx" :key="day">Day {{ day }}</button>
                    </div>
                </div>
                <div class="flex mt-4 flex-col gap-4">
                    <div>
                        <h3 class="font-semibold text-green-500">Description:</h3>
                        <p>{{ screenx.description }}</p>
                    </div>
                    <div v-if="screenx.link">
                        <h3 class="font-semibold text-green-500">Live Link:</h3>
                        <a :href="screenx.repo" target="_blank"><p>{{ screenx.link }}</p></a>
                    </div>
                    <div v-if="screenx.repo">
                        <h3 class="font-semibold text-green-500">Repository:</h3>
                        <a :href="screenx.repo" target="_blank"><p>{{ screenx.repo }}</p></a>
                    </div>
                    <div v-if="screenx.languages">
                        <h3 class="font-semibold text-green-500">Languages:</h3>
                        <p>{{ screenx.languages.join(', ') }}</p>
                    </div>
                    <div v-if="screenx.tools">
                        <h3 class="font-semibold text-green-500">Tools (Database & Hosting):</h3>
                        <p>{{ screenx.tools.join(', ') }}</p>
                    </div>
                    <div v-if="screenx.frameworks">
                        <h3 class="font-semibold text-green-500">Frameworks:</h3>
                        <p>{{ screenx.frameworks.join(', ') }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="screenx.files" class="mt-4">
            <h2 class="text-2xl font-bold mr-2">Uploads for Day {{ Day }}</h2>
            <div class="grid mt-2 grid-cols-1 gap-2">
                <a target="_blank" v-for="(file,index) in screenx.files" :key="file" :href="file" class="w-full truncate text-white/70 text-sm">{{index + 1}}. {{file}}</a>
            </div>
        </div>
    </section>
    <section v-else class="font-bold md:text-center text-red-500 text-4xl mt-8 md:mt-0 md:text-7xl">THIS USER IS YET TO UPLOAD A PROJECT</section>
</template>