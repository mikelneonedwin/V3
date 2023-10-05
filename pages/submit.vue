<script setup lang="ts">
    import data from '~/utils/data.json';
    const day = (new Date().getDay()) + 1;
    const form = reactive({ link: '', repo: '', desc: '', day, files: [] as Blob[] });
    const { languages, tools, frameworks } = reactive(data);
    const input = ref(null) as unknown as HTMLInputElement;

    function val({target}: Event){
        const [ file ]  = (target as HTMLInputElement).files!;
        const size = file.size / 1024 ** 2;
        if(size > 1){
            fileError.value = 'UPLOAD LIMIT IS 1MB';
            return setTimeout(() => fileError.value = false, 1500);
        }
        form.files.push(file);
    }

    const fileError = ref(false) as unknown as { value: string | boolean };
    const btn = ref('SUBMIT');

    function handleSubmit(){
        if(!form.link && !form.repo && form.files.length == 0) {
            fileError.value = "PROVIDE A LINK, REPO or FILE";
            return setTimeout(() => fileError.value = false);
        }
        const data = new FormData();
        data.append('description', form.desc);
        data.append('day', String(form.day));
        if(form.link) data.append('link', form.link);
        if(form.repo) data.append('repo', form.repo);
        if(languages.filter(a => a.selected).length) data.append('languages', JSON.stringify(languages.filter(a => a.selected).map(a => a.text)));
        if(tools.filter(a => a.selected).length) data.append('tools', JSON.stringify(tools.filter(a => a.selected).map(a => a.text)));
        if(frameworks.filter(a => a.selected).length) data.append('frameworks', JSON.stringify(frameworks.filter(a => a.selected).map(a => a.text)));
        form.files.forEach((file, index) => data.append(`file-${index}`, file, file.name));
        btn.value = "Submitting...";
        $fetch('/api/submit', {
            method: 'post',
            body: data
        })
        .then(() => btn.value = "SUBMITTED!")
        .catch(() => btn.value = "Error Occured");
    }

    const { data: daysLeft } = (await useFetch('/api/daysleft')).data.value! as { data: number[] };
</script>

<template>
    <Title>Submit Project</Title>
    <div v-if="fileError" class="fixed top-0 flex items-center justify-center z-10 left-0 h-full w-full">
        <div class="md:w-[40%] w-[90%] mx-auto bg-gray-700 text-center p-4 rounded-2xl font-bold text-white z-20">{{ fileError }}</div>
        <div class="fixed top-0 left-0 w-full h-full z-10 bg-black/50"></div>
    </div>
    <section class="md:mt-2 mb-4">
        <h1 class="text-3xl font-bold text-[#00DC82]">Submit Project</h1>
        <div class="mt-8 text-2xl font-bold">
            <h3>It's day {{ day }} of 30</h3>
            <form @submit.prevent="handleSubmit" class="mt-8 submit flex flex-col gap-4">               
                <div class="input">
                    <div>
                        <span>Live Link (Optional)</span>
                    </div>
                    <input
                        type="url"
                        v-model="form.link"
                        placeholder="https://www.example.com"
                    />
                </div>
                <div class="input">
                    <div>
                        <span>Repository Link (Optional)</span>
                    </div>
                    <input
                        type="url"
                        v-model="form.repo"
                        placeholder="https://www.example.com"
                    />
                </div>
                <div class="input">
                    <div>
                        <span>Description (Required)</span>
                    </div>
                    <textarea
                        v-model="form.desc"
                        required
                        placeholder="Describe your work"
                    ></textarea>
                </div>
                <div class="input">
                    <div>
                        <span>Uploading for day:</span>
                    </div>
                    <div class="!whitespace-nowrap !block btn w-full overflow-x-auto scroll" style="scrollbar-width: none">
                        <button type="button" @click="form.day = day" :class="{'!bg-[#00DC82]': form.day == day}" v-for="day in daysLeft" :key="day" class="text-white btn">{{ day }}</button>
                    </div>
                </div>
                <div class="input">
                    <div>
                        <span>Frameworks & Libraries</span>
                    </div>
                    <div class="btn">
                        <button type="button" :class="{'!bg-[#00DC82]': framework.selected}" @click="framework.selected = !framework.selected" v-for="framework in frameworks" :key="framework.text">{{ framework.text }}</button>
                    </div>
                </div>
                <div class="input">
                    <div>
                        <span>Tools (Hosting & Database)</span>
                    </div>
                    <div class="btn">
                        <button type="button" :class="{'!bg-[#00DC82]': framework.selected}" @click="framework.selected = !framework.selected" v-for="framework in tools" :key="framework.text">{{ framework.text }}</button>
                    </div>
                </div>
                <div class="input">
                    <div>
                        <span>Languages</span>
                    </div>
                    <div class="btn">
                        <button type="button" :class="{'!bg-[#00DC82]': framework.selected}" @click="framework.selected = !framework.selected" v-for="framework in languages" :key="framework.text">{{ framework.text }}</button>
                    </div>
                </div>

                <div>
                    <div class="grid grid-cols-2">
                        <h1 class="whitespace-pre">File (1MB MAX)</h1>
                        <div class="flex items-end justify-end">
                            <button type="button" @click="input.click()" class="material-icons rounded-full p-1.5 bg-[#00DC82]">arrow_circle_down</button>
                        </div>
                    </div>
                    <div class="mt-4 flex flex-col gap-3 lg:grid lg:grid-cols-2">
                        <div v-for="(file, index) in form.files" :key="file.name" class="flex w-full items-start">
                            <h1 class="material-icons text-7xl">description</h1>
                            <div class="flex justify-evenly flex-col gap-2.5 w-full">
                                <span class="text-lg lg:w-[90%] truncate">{{ file.name }}</span>
                                <span class="text-base text-white/70 flex items-center font-semibold">
                                    <b class="text-[#00DC82]">Size:</b> {{ (file.size / 1024 **2).toFixed(2) }}MB 
                                    <span v-if="file.type">
                                        <b class="ml-2 text-[#00DC82]">Type:</b> {{ file.type }}
                                    </span>
                                    <b class="ml-2 text-red-400" @click="form.files.splice(index, 1)">Delete</b>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <input ref="input" class="hidden" accept="*" type="file" @change="val">
                <button type="submit" class="bg-[#00DC82] pt-0.5 pb-1 rounded-xl text-xl tracking-[0.1rem]">{{ btn }}</button>
            </form>
        </div>
    </section>
</template>