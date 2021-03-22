<script>
    export let selectedPage;
</script>


<main>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand">access_manager</a>
            <div class="navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" on:click={() => selectedPage = "home"}>Главная</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" on:click={() => selectedPage = "roles"}>Роли</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" on:click={() => selectedPage = "functions"}>Функции</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" on:click={() => selectedPage = "permissions"}>Разрешения</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/redoc/index.html" target="_blank">Документация</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</main>

<style>
    a {
        cursor: pointer;
    }
</style>
