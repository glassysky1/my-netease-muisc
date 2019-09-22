<template>
  <div class="login-wrap">
    <BackHeader title="手机号登录" color="red" />
    <form @submit.prevent.stop="tryToLogin">
      <div class="phone-number-container">
        <label>
          <i class="iconfont icon-shouji"></i>
          <span class="country-code">+86</span>
        </label>
        <input
          type="tel"
          class="tel-input"
          pattern="^1[345789]\d{9}"
          v-model="phone"
          autofocus
          required
        />
        <button class="clean-btn">
          <i class="iconfont icon-chahao"></i>
        </button>
      </div>
      <div class="password-container">
        <label>
          <i class="iconfont icon-suo"></i>
        </label>
        <input
          type="password"
          class="password-input"
          v-model="password"
          placeholder="请输密码"
          required
        />
      </div>
      <div class="login-btn-container">
        <input class="login-btn" type="submit" value="登录" />
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapActions } from "vuex";
import BackHeader from "../../components/BackHeader";
import { getLoginStatus ,login} from "../../api/index";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  components: {
    BackHeader
  },
  methods: {
    async tryToLogin() {
      const { phone, password } = this;
      try {
        const { data: res } = await login(phone,password)
        console.log(res);
        
        localStorage.setItem("uid", res.account.id); //下娘用户的id即uid储存来
        await this.$store.dispatch("getThenSetLoginStatus");
        this.$router.replace("/my");
        Toast("登录成功");
      } catch (e) {
        console.log(e);

        Toast("账号或密码错误");
      }
    }
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.login-wrap
  padding-top 44px
  .phone-number-container, .password-container
    position relative
    border-bottom 1px solid #e4e4e4
    padding 5px 0
    margin 20px
  .tel-input, .password-input
    font-size 16px
    margin-left 10px
    border none
    outline none
  .iconfont
    font-size 18px
    color gray
  .country-code
    font-size 16px
    margin 0 10px
  .clean-btn
    position absolute
    right 5px
    border none
    background-color rgba(0, 0, 0, 0)
  .login-btn-container
    text-align center
    .login-btn
      background-color #d44439
      color #f1f1f1
      border none
      width 90%
      height 40px
      border-radius 20px
      font-size 16px
</style>