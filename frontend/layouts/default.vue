<template>
    <div class="default">
    <div class="navbar">
        <b-navbar toggleable type="light" variant="light">
            <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
            <b-navbar-brand>Finantly <h5>Personal Finances Manager</h5></b-navbar-brand>
            <b-collapse is-nav id="nav_text_collapse">
                <b-navbar-nav>
                    <b-nav-item href="/dashboard">Home</b-nav-item>
                    <b-nav-item href="/users/register">Registro</b-nav-item>
                    <b-nav-item href="/users/login">Login</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
    <div >
            <nuxt/>
    </div>
    </div>
</template>
<style>
.default{
    background: url("/assets/bg2.jpg");
    width: 100%;
    height: auto;
}
.navbar{
    background-color: rgba(234,215,215, 0.5);
}
.bg-light{
    background-color: rgba(255,255,255, 0) !important;
}
.navbar-brand{
    padding-left: 10px;
}
h5{
    font-size: 13px;
    color: rgba(0,0,0,0.5);
}
</style>
