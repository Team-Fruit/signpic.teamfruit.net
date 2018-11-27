<template>
<b-navbar toggleable="md" type="light" variant="light" fixed="top">
    <b-container>
        <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">SignPicture</b-navbar-brand>
        <b-collapse is-nav id="nav_text_collapse">
            <b-navbar-nav>
                <b-nav-item to="/analytics">Analytics</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-container>
</b-navbar>
</template>

<script>
export default {
  name: 'Header'
}
</script>
