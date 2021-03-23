<script>
    import {postFetch} from "./main";

    export let loginIn;
    export let login;
    export let password;

    async function serverLogin() {
        let resp = await postFetch("/login", login, password)
        if (resp.data === "ok") {
            loginIn = true
        }
    }
</script>

<main>
    <div class="container mt-5">
        <div class="row">
            <div class="col-4">
            </div>
            <div class="col-4">

                <h1>Вход</h1>

                <form>
                    <div class="mb-3">
                        <label class="form-label" for="login">Логин <span class="text-danger">*</span></label>
                        <input bind:value={login} class="form-control" id="login" required type="text">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="password">Пароль <span class="text-danger">*</span></label>
                        <input bind:value={password} class="form-control" id="password" required type="password">
                    </div>
                </form>
                <button class="btn btn-secondary mb-5" id="send" on:click={serverLogin}>Вход</button>

            </div>
            <div class="col-4">
            </div>
        </div>
    </div>
</main>
