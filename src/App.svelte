<script>
    import Menu from "./Menu.svelte";
    import Home from "./Home.svelte";
    import Roles from "./Roles.svelte";
    import Functions from "./Functions.svelte";
    import Permissions from "./Permissions.svelte";
    import Role from "./Role.svelte";
    import Login from "./Login.svelte";

    let selectedPage = "functions"

    let roleCode = ""

    // let loginIn = false // prod
    let loginIn = true // dev

    let login = "admin"

    let password = "admin"

</script>

<main>
    {#if loginIn}
        <Menu bind:selectedPage="{selectedPage}"/>

        {#if selectedPage === "home"}
            <Home/>
        {/if}

        {#if selectedPage === "roles"}
            <Roles login={login} password={password} bind:selectedPage="{selectedPage}" bind:roleCode="{roleCode}"/>
        {/if}

        {#if selectedPage === "functions"}
            <Functions login={login} password={password}/>
        {/if}

        {#if selectedPage === "permissions"}
            <Permissions login={login} password={password} bind:selectedPage="{selectedPage}" bind:roleCode="{roleCode}"/>
        {/if}

        {#if selectedPage === "role"}
            <Role login={login} password={password} roleCode="{roleCode}"/>
        {/if}
    {:else}
        <Login bind:loginIn="{loginIn}" bind:login={login} bind:password={password}/>
    {/if}
</main>
