import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import Query from 'wow-query'
import { QueryData } from 'wow-query/types/types'
import diff, { DiffResult } from 'simple-compare'

@Component
export default class OnQueryUpdated extends Vue {
  private lastActivePath = ''

  callOnQueryUpdated (newQuery: QueryData = this.$route.query, diffResult?: DiffResult) {
    if (typeof (this as any).onQueryUpdated === 'function') {
      // 对于keepAlive的路由页面，重新进入时如果query和离开时相同，不触发
      if (this.$route.fullPath === this.lastActivePath) return
      this.lastActivePath = this.$route.fullPath;
      (this as any).onQueryUpdated(new Query(newQuery), diffResult)
    }
  }

  @Watch('$route.query', { deep: true })
  onQueryChanged (newQuery: QueryData, oldQuery: QueryData) {
    // keepAlive的路由页面在离开状态下不触发
    if ((this as any)._inactive) return
    const diffResult = diff(oldQuery, newQuery)
    if (diffResult.count > 0) this.callOnQueryUpdated(newQuery, diffResult)
  }

  created () {
    this.callOnQueryUpdated()
  }
}
