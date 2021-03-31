<script>
    import {getFetch, postFetch} from "./main";
    import CrabsIconInfo from "./components/CrabsIconInfo.svelte";
    import CrabsDialogYesNo from "./components/CrabsDialogYesNo.svelte";

    export let login;
    export let password;
    export let selectedPage;
    export let roleCode;

    let roles = []

    let functions = []

    let permissions = []

    let loadRolesTable = false
    let loadFunctionsTable = false

    let isHiddenChangeModalWindow = true
    let itemCode = ""

    async function loadRoles() {
        loadRolesTable = false
        roles = await getFetch("/roles", login, password)
        loadRolesTable = true
    }

    async function loadFunctions() {
        loadFunctionsTable = false
        functions = await getFetch("/functions", login, password)
        loadFunctionsTable = true
    }

    async function changePermission(uuid) {
        await postFetch("/permissions/" + uuid + "/change", login, password)
        isHiddenChangeModalWindow = true
        await loadRoles()
    }

    function openChangePermissionWindow(code) {
        itemCode = code
        isHiddenChangeModalWindow = false
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

                {#if loadRolesTable && loadFunctionsTable}
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
                                    <CrabsIconInfo on:click={() => {selectedPage = "role"; roleCode = r.code}}/>
                                </td>
                                <td class="v-middle">{r.name}</td>
                                {#each r.permissions as p}
                                    <td class="v-middle" style="text-align: center">
                                    <span style="cursor: pointer" on:click={() => {openChangePermissionWindow(p.uuid)}}>
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
                {:else}
                    <p>Загрузка...</p>
                {/if}

            </div>
            <div class="col-1">
            </div>

            <CrabsDialogYesNo text="Вы уверены?" bind:isHidden={isHiddenChangeModalWindow} itemCode={itemCode} functionOnYes={changePermission}/>

        </div>
    </div>
</main>

<style>
    span {
        cursor: pointer;
    }
</style>
