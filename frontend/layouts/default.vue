<template>
    <div>
    <div>
        <b-navbar toggleable type="light" variant="light">
            <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
            <b-navbar-brand>Personal Finances</b-navbar-brand>
            <b-collapse is-nav id="nav_text_collapse">
                <b-navbar-nav>
                    <b-nav-item href="/dashboard">Home</b-nav-item>
                    <b-nav-item href="/users/register">Registro</b-nav-item>
                    <b-nav-item href="/users/login">Login</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
    <div class="container">
            <nuxt/>
    </div>
    </div>
</template>
