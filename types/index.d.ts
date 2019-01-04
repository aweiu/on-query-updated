import Vue from 'vue';
import { QueryData } from 'wow-query/types/types';
import { DiffResult } from 'simple-compare';
export default class OnQueryUpdated extends Vue {
    private lastActivePath;
    callOnQueryUpdated(newQuery?: QueryData, diffResult?: DiffResult): void;
    onQueryChanged(newQuery: QueryData, oldQuery: QueryData): void;
    created(): void;
}
