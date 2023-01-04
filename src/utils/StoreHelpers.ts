import { merge } from 'lodash-es';
import { StoreApi } from 'zustand';

type TNewStoreConfig<
	TState extends Object,
	TComputed extends Object = {},
	TActions extends Object = {},
	Store = TStore<TState, TComputed, TActions>,
> = {
	get: StoreApi<Store>['getState'];
	set: StoreApi<Store>['setState'];
	initialState: TState;
	computed?: TComputed;
	actions?: TActions;
};

export function newStore<
	TState extends Object,
	TComputed extends Object = {},
	TActions extends Object = {},
>({
	get,
	set,
	initialState,
	computed = {} as TComputed,
	actions = {} as TActions,
}: TNewStoreConfig<TState, TComputed, TActions>): TStore<
	TState,
	TComputed,
	TActions
> {
	return {
		initialState,
		state: initialState,
		computed,
		actions,
		$reset: () => set({}, true),
		resetState: () => set({ state: initialState }),
		setState: (newState) =>
			set({
				state: merge(get().state, newState),
			}),
	};
}
