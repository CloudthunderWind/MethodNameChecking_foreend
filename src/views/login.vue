<template>
    <div class="bg">
        <div class="center-block login-size">
            <card bg-color="#f5f7fa" class="login-card">
                <template v-slot:title>
                    <div class="login-title">登录</div>
                </template>
                <template v-slot:body>
                    <div class="login-form">
                        <div class="login-form-item">
                            <label>
                                <input class="cb-input"
                                       v-model="userName"
                                       placeholder="请输入用户名"/>
                            </label>
                        </div>
                        <div class="login-form-item">
                            <label>
                                <input class="cb-input"
                                       type="password"
                                       v-model="password"
                                       placeholder="请输入密码"/>
                            </label>
                        </div>
                        <div class="login-form-item">
                            <button class="form-button"
                                    @click="login">登录
                            </button>
                        </div>
                        <router-link to="../register" class="to-link">没有账号？点此注册</router-link>
                    </div>
                </template>
            </card>
        </div>
    </div>
</template>

<script>
    import Card from "../components/ui/card";
    import CbInput from "../components/ui/cbInput";
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "login",
        components: {CbInput, Card},
        data() {
            return {
                userIcon: require("../../public/userIcon.svg"),
                userKey: require("../../public/key.svg"),
                userName: "",
                password: ""
            };
        },
        mounted() {
            document.title = "登录";
        },
        computed: {
            ...mapGetters([
                "isLogged",
                "user_name"
            ])
        },
        methods: {
            ...mapMutations([
                "set_userStatus"
            ]),
            ...mapActions([
                "log_in"
            ]),
            login: function () {
                //TODO 调用登录接口
                let that = this;
                this.log_in({
                    username: that.userName,
                    password: that.password
                }).then(() => {
                    that.$router.push({
                        path: "/workbench"
                    });
                });
                // that.set_userStatus(true);
                // that.$message.success("你好！User");
                that.$router.push({
                    path: "/workbench"
                });
            }
        }
    };
</script>

<style scoped>
    @import "../../src/assets/styles/wrapper.css";
    @import "../../src/assets/styles/login.css";
    @import "../../src/assets/styles/cbInput.css";
</style>