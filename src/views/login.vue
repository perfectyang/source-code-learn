<template>
  <div>
    login
    <!-- <div :content="`${survey.label}: ${survey.percentage}%`" :v-show="name === '中文'" :title="isNew ? '新建权限' : '编辑权限'"></div>
    <div>{{ finish: '正常结束页'}}{{ suspend: '甄别结束页' }}</div>
    <div>{{ visible ? '收起' : '展开' }}</div>

    <div>取 消</div>
    <div :label="$t('平台')" :rules="{ required: true, message: '请输入名称', trigger: [blur, change] }" prop="platform_id"></div>
    <div :title="(isEdit ? '编辑' : '新建') + '客户'"></div>

    <div :name=`请输入${tipTitle}，添加多个请分行`>+{{handleText}}所有</div>
    <div :disabled="copyAccountInfo.modalTitle === '修改账号' ? true : false"></div>
    <div> {{'列表内容' + o }}</div>
    <div :name="`name---${name + '中止'}----中主席`">{{ {finish: '正常结束页', suspend: '正常结束页'}[key] }}</div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      survey: {
        label: 'a',
        survey: 10
      },
      client: {

      }
    }
  },
  mounted () {
    console.log('---------', this.$store)
  },
  methods: {
    $confirm () { },
    testFn () {
      let ok = true
      this.tes = `${stateNames[state - 1]}${client.name}客户“确定”   的账号？`
      this.$message.success(`${ok ? '开启' : '关闭'}防审查成功！`)
      this.$confirm(`确定重置客户“${client.name}”的密码？`, '提示', {
        confirmButtonText: '确     定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    }
  },
}
</script>

<style lang="less" scoped>
</style>