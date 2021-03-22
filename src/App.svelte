<script>
    import Menu from "./Menu.svelte";
    import Home from "./Home.svelte";
    import Roles from "./Roles.svelte";
    import Functions from "./Functions.svelte";
    import Permissions from "./Permissions.svelte";
    import Role from "./Role.svelte";

    let selectedPage = "home"

    let roleCode = ""

</script>

<main>
    <Menu bind:selectedPage="{selectedPage}"/>

    {#if selectedPage === "home"}
        <Home/>
    {/if}

    {#if selectedPage === "roles"}
        <Roles bind:selectedPage="{selectedPage}" bind:roleCode="{roleCode}"/>
    {/if}

    {#if selectedPage === "role"}
        <Role roleCode="{roleCode}"/>
    {/if}

    {#if selectedPage === "functions"}
        <Functions/>
    {/if}

    {#if selectedPage === "permissions"}
        <Permissions/>
    {/if}
</main>
