<script>
    import Menu from "./Menu.svelte";
    import Home from "./Home.svelte";
    import Roles from "./Roles.svelte";
    import Functions from "./Functions.svelte";
    import Permissions from "./Permissions.svelte";

    let selectedPage = "home"
</script>

<main>
    <Menu bind:selectedPage="{selectedPage}"/>

    {#if selectedPage === "home"}
        <Home/>
    {/if}

    {#if selectedPage === "roles"}
        <Roles/>
    {/if}

    {#if selectedPage === "functions"}
        <Functions/>
    {/if}

    {#if selectedPage === "permissions"}
        <Permissions/>
    {/if}
</main>
