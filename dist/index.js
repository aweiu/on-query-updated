var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import Query from 'wow-query';
import diff from 'simple-compare';
let OnQueryUpdated = class OnQueryUpdated extends Vue {
    constructor() {
        super(...arguments);
        this.lastActivePath = '';
    }
    callOnQueryUpdated(newQuery = this.$route.query, diffResult) {
        if (typeof this.onQueryUpdated === 'function') {
            // 对于keepAlive的路由页面，重新进入时如果query和离开时相同，不触发
            if (this.$route.fullPath === this.lastActivePath)
                return;
            this.lastActivePath = this.$route.fullPath;
            this.onQueryUpdated(new Query(newQuery), diffResult);
        }
    }
    onQueryChanged(newQuery, oldQuery) {
        // keepAlive的路由页面在离开状态下不触发
        if (this._inactive)
            return;
        const diffResult = diff(oldQuery, newQuery);
        if (diffResult.count > 0)
            this.callOnQueryUpdated(newQuery, diffResult);
    }
    created() {
        this.callOnQueryUpdated();
    }
};
__decorate([
    Watch('$route.query', { deep: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OnQueryUpdated.prototype, "onQueryChanged", null);
OnQueryUpdated = __decorate([
    Component
], OnQueryUpdated);
export default OnQueryUpdated;
