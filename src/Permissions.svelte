<script>
    import {getFetch} from "./main";

    let permissions = []

    async function loadPermissions() {
        permissions = await getFetch("http://localhost:8080/permissions")

        console.log(permissions)
    }

    loadPermissions()
</script>

<main>
    <p>Разрешения</p>
</main>
