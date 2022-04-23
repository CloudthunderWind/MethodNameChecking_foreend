<template>
    <div class="bg">
        <div class="center-block login-size">
            <card bg-color="#f5f7fa" class="login-card">
                <template v-slot:title>
                    <div class="login-title">注册</div>
                </template>
                <template v-slot:body>
                    <div class="login-form">
                        <div class="login-form-item">
                            <cb-input :prefix="userIcon" type="form-input"
                                      v-model="userName"
                                      placeholder="请输入用户名"/>
                        </div>
                        <div class="login-form-item">
                            <cb-input :prefix="userKey" type="form-input"
                                      v-model="password"
                                      placeholder="请输入密码"/>
                        </div>
                        <div class="login-form-item">
                            <cb-input :prefix="userKey" type="form-input"
                                      v-model="password_confirm"
                                      placeholder="请确认密码"/>
                        </div>
                        <div class="login-form-item">
                            <button class="form-button"
                                    @click="register">注册
                            </button>
                        </div>
                        <router-link to="../login" class="to-link">已有账号？点此登录</router-link>
                    </div>
                </template>
            </card>
        </div>
    </div>
</template>

<script>
    import Card from "../components/ui/card";
    import CbInput from "../components/ui/cbInput";

    export default {
        name: "register",
        components: {
            CbInput, Card
        },
        data() {
            return {
                userIcon: require("../../public/userIcon.svg"),
                userKey: require("../../public/key.svg"),
                userName: "",
                password: "",
                password_confirm: ""
            };
        },
        mounted() {
            document.title = "注册";
        },
        methods: {
            register() {
                if (this.password === this.password_confirm) {
                    //TODO 注册操作
                    this.$message.success("注册成功");
                    this.$router.push({
                        name: "login"
                    });
                } else {
                    this.$message.error("两次输入的密码不一致！");
                }
            }
        }
    };
</script>

<style scoped>
    @import "../../src/assets/styles/wrapper.css";
    @import "../../src/assets/styles/login.css";

</style>