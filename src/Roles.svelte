<script>
    import {deleteFetch, getFetch, postFetch} from "./main";
    import CrabsButton from "./components/CrabsButton.svelte";
    import CrabsDialogYesNo from "./components/CrabsDialogYesNo.svelte";
    import CrabsIconInfo from "./components/CrabsIconInfo.svelte";
    import CrabsIconDelete from "./components/CrabsIconDelete.svelte";
    import CrabsStar from "./components/CrabsStar.svelte";

    export let login;
    export let password;
    export let selectedPage;
    export let roleCode;

    // table
    let roles = []

    // fields
    let code = ""
    let name = ""

    let deleteItemCode = ""

    let hasError = false
    let errorMessage = ""

    let loadRolesTable = false
    let loadRoleOnServer = false

    let isHiddenDeleteModalWindow = true

    async function loadRoles() {
        loadRolesTable = false
        roles = await getFetch("/roles", login, password)
        loadRolesTable = true
    }

    function validRoleForm() {
        if (code === "") {
            errorMessage = "Поле код не может быть пустым"
            hasError = true
            return false
        }
        if (name === "") {
            errorMessage = "Поле название не может быть пустым"
            hasError = true
            return false
        }
        hasError = false
        return true;
    }

    async function addRole() {
        if (!validRoleForm()) {
            return
        }

        loadRoleOnServer = true

        let role = {
            "code": code,
            "name": name
        }
        let r = await postFetch("/roles", login, password, role)
        if (r.message !== undefined) {
            hasError = true
            errorMessage = r.message
        }
        await loadRoles()
        code = ""
        name = ""
        loadRoleOnServer = false
    }

    async function deleteRole(code) {
        await deleteFetch("/roles/" + code, login, password)
        isHiddenDeleteModalWindow = true
        await loadRoles()
    }

    function openDeleteWindow(code) {
        deleteItemCode = code
        isHiddenDeleteModalWindow = false
    }

    loadRoles()
</script>

<main>
    <div class="container mt-5">
        <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8">

                <h1>Роли</h1>

                <h3 class="mt-5 mb-3">Таблица ролей</h3>

                {#if loadRolesTable}
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Код</th>
                            <th scope="col">Название</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {#each roles as r, i}
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{r.code}</td>
                                <td>{r.name}</td>
                                <td style="text-align: center">
                                    <CrabsIconInfo on:click={() => {selectedPage = "role"; roleCode = r.code}}/>
                                </td>
                                <td style="text-align: center">
                                    <CrabsIconDelete on:click="{() => openDeleteWindow(r.code)}"/>
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                    {#if roles.length === 0}
                        <p>Ролей пока нет</p>
                    {/if}
                {:else}
                    <p>Загрузка...</p>
                {/if}

                <h3 class="mt-5 mb-3">Добавить роль</h3>

                {#if hasError}
                    <div class="alert alert-dark" role="alert">
                        {errorMessage}
                    </div>
                {/if}

                <form>
                    <div class="mb-3">
                        <label class="form-label" for="code">Код <CrabsStar/></label>
                        <input bind:value={code} class="form-control" id="code" required type="text">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="name">Название <CrabsStar/></label>
                        <input bind:value={name} class="form-control" id="name" required type="text">
                    </div>
                </form>
                <CrabsButton bind:load={loadRoleOnServer} text="Создать роль" on:click={addRole}/>

            </div>
            <div class="col-2">
            </div>

            <CrabsDialogYesNo text="Вы уверены?" bind:isHidden={isHiddenDeleteModalWindow} itemCode={deleteItemCode} functionOnYes={deleteRole}/>

        </div>
    </div>
</main>
