<script setup>
    const { data: user } = await useFetch(`/api/stats/${useCookie('_v3_id').value}`);
    const Day = ref(Object.keys(user.value.work)[0] || null);
    const screenx = computed(() => user.value.work[Day.value]);

    function handleSubmit(){
        const { value:day } = Day;
        const { link, repo, description } = screenx.value;
        state.value = 'refresh';
        $fetch(`/api/update/${day}`, {
            method: 'post',
            body: {
                link, repo, description,
                ...( frameworks.value.value ? { frameworks: frameworks.value.value.split(', ') } : { } ),
                ...( tools.value.value ? { tools: tools.value.value.split(', ') } : { } ),
                ...( languages.value.value ? { languages: languages.value.value.split(', ') } : { } ),
            }
        })
        .then(() => {
            state.value = 'check_circle';
            setTimeout(() => state.value = 'save', 2000);
        })
        .catch(() => state.value = 'warning')
    }

    const frameworks = ref(null);
    const tools = ref(null);
    const languages = ref(null);
    const state = ref('save');
    const form = ref(null);
    const del = ref('delete');

    function deleteDay(){
        del.value = 'refresh';
        $fetch(`/api/delete/${Day.value}`)
        .then(() => {
            del.value = 'check_circle';
            setTimeout(() => location.reload(), 1000);
        })
        .catch(() => del.value = 'warning');
    }
</script>

<template>
    <Title>Dashboard - V3</Title>
    <section>
        <form ref="form" @submit.prevent="handleSubmit" class="mt-8 submit flex flex-col gap-4">
            <h1 class="text-3xl font-bold text-[#00DC82]">Hey there, {{ user.name.split(' ')[0] }} 👋</h1>
            <div class="mt-8 md:grid md:grid-cols-2 items-start md:gap-4">
                <div class="flex items-start">
                    <h2 class="text-2xl font-bold mr-2">Projects:</h2>
                    <div class="w-full whitespace-nowrap overflow-x-auto scroll px-4">
                        <button type="button" @click="Day = day" v-for="day in Object.keys(user.work)" :class="{'!bg-[#00DC82]': day == Day }" class="mr-2 font-bold btnx" :key="day">Day {{ day }}</button>
                    </div>
                </div>
                <div class="flex mt-2 -translate-y-1 md:mt-0 items-center gap-3">
                    <h2 class="text-2xl font-bold">Action: </h2>
                    <button type="button" class="material-icons bg-[#00DC82] p-2 rounded-lg" @click="deleteDay">{{del}}</button>
                    <button type="submit" class="material-icons bg-[#00DC82] p-2 rounded-lg">{{state}}</button>
                </div>
            </div>
            <div class="mt-8">
                <div class="input">
                    <div>
                        <span>Live Link</span>
                    </div>
                    <input
                        type="url"
                        required
                        placeholder="https://www.example.com"
                        v-model="screenx.link"
                    >
                </div>
                <div class="input">
                    <div>
                        <span>Repo Link</span>
                    </div>
                    <input
                        class="w-full"
                        type="url"
                        placeholder="Leave empty to delete this field"
                        v-model="screenx.repo"
                    >
                </div>
                <div class="input">
                    <div>
                        <span>Description</span>
                    </div>
                    <textarea
                        v-model="screenx.description"
                        required
                        placeholder="Describe your work"
                    ></textarea>
                </div>
                <div class="input">
                    <div>
                        <span>Frameworks & Libraries</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Seperate with commas"
                        ref="frameworks"
                        :value="screenx.frameworks.join(', ')"
                    >
                </div>
                <div class="input">
                    <div>
                        <span>Tools (Hosting & Database)</span>
                    </div>
                    <input
                        type="text"
                        ref="tools"
                        placeholder="Seperate with commas"
                        :value="screenx.tools.join(', ')"
                    >
                </div>
                <div class="input">
                    <div>
                        <span>Languages</span>
                    </div>
                    <input
                        type="text"
                        ref="languages"
                        placeholder="Seperate with commas"
                        :value="screenx.languages.join(', ')"
                    >
                </div>
            </div>
        </form>
    </section>
</template>