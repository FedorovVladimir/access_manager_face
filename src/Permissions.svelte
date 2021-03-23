<script>
    import {getFetch, postFetch} from "./main";

    export let selectedPage;
    export let roleCode;

    let roles = []

    let functions = []

    let permissions = []

    async function loadRoles() {
        roles = await getFetch("/roles")
        console.log(roles)

    }

    async function loadFunctions() {
        functions = await getFetch("/functions")
        console.log(functions)
    }

    async function changePermission(uuid) {
        await postFetch("/permissions/" + uuid + "/change")
        await loadRoles()
    }

    loadRoles()
    loadFunctions()
</script>

<main>
    <div class="mt-5">
        <div class="row">
            <div class="col-1">
            </div>
            <div class="col-10">

                <h1>Разрешения</h1>

                <h3 class="mt-5 mb-3">Таблица разрешений</h3>

                <table class="table">
                    <thead>
                    <tr>
                        <th class="v-middle" scope="col">?:)</th>
                        <th class="v-middle" scope="col">Роль</th>
                        {#each functions as f}
                            <th class="v-middle" scope="col" style="text-align: center">{f.name}</th>
                        {/each}
                    </tr>
                    </thead>
                    <tbody>
                    {#each roles as r}
                        <tr>
                            <td class="v-middle">
                                <span class="text-info" on:click={() => {selectedPage = "role"; roleCode = r.code}}>
                                    <svg class="bi bi-info-circle" fill="currentColor" height="20" viewBox="0 0 20 20"
                                         width="20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                </span>
                            </td>
                            <td class="v-middle">{r.name}</td>
                            {#each r.permissions as p}
                                <td class="v-middle" style="text-align: center">
                                    <span style="cursor: pointer" on:click={() => {changePermission(p.uuid)}}>
                                        {#if p.has}
                                            <span class="text-success">
                                                <svg class="bi bi-check2-circle" fill="currentColor" height="20"
                                                     viewBox="0 0 20 20"
                                                     width="20" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                                                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                                                </svg>
                                            </span>
                                        {:else}
                                            <span>
                                                <svg class="bi bi-dash" fill="currentColor" height="20"
                                                     viewBox="0 0 20 20"
                                                     width="20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg>
                                            </span>
                                        {/if}
                                    </span>
                                </td>
                            {/each}
                        </tr>
                    {/each}
                    </tbody>
                </table>

            </div>
            <div class="col-1">
            </div>
        </div>
    </div>
</main>

<style>
    span {
        cursor: pointer;
    }
</style>
