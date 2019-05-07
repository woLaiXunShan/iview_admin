<template>
  <div class="login">
    <div class="form_box">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="请输入用户名" icon="ios-contact-outline" />
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="请输入密码" icon="ios-lock-outline" />
        </FormItem>
        <FormItem>
          <Button type="primary" style="width: 100%;" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // const params = {
          //   phone: '111',
          //   password: '111111'
          // }
          // this.fetch.login(params).then(res => {
          //   console.log(res)
          // })
          sessionStorage.login = true
          this.$Message.success('登录成功!')
          this.$router.push('/')
        } else {
          this.$Message.error('请输入正确的账号密码')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    width: 100vw;
    height: 100vh;
    background: url(../../assets/img/bg.png) no-repeat center;
    background-size: cover;
    position: relative;
  }
  .form_box{
    position: absolute;
    top: 30%;
    right: 200px;
    width: 300px;
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }
</style>
