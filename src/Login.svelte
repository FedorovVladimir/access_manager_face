<script>
    import {postFetch} from "./main";
    import CrabsButton from "./components/CrabsButton.svelte";
    import CrabsStar from "./components/CrabsStar.svelte";

    export let loginIn;
    export let login;
    export let password;

    let load = false
    let badLogin = false

    async function serverLogin() {
        load = true
        try {
            badLogin = false
            let resp = await postFetch("/login", login, password)
            if (resp.data === "ok") {
                loginIn = true
            }
        } catch (_) {
            badLogin = true
        }
        load = false
    }
</script>

<main>
    <div class="container mt-5">
        <div class="row">
            <div class="col-4">
            </div>
            <div class="col-4">

                <h1>Вход</h1>

                {#if badLogin}
                    <p>Неверны логин или пароль</p>
                {/if}

                <form>
                    <div class="mb-3">
                        <label class="form-label" for="login">Логин <CrabsStar/></label>
                        <input bind:value={login} class="form-control" id="login" required type="text">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="password">Пароль <CrabsStar/></label>
                        <input bind:value={password} class="form-control" id="password" required type="password">
                    </div>
                </form>
                <CrabsButton bind:load={load} text="Вход" on:click={serverLogin}/>

            </div>
            <div class="col-4">
            </div>
        </div>
    </div>
</main>
