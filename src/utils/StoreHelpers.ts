import { merge } from 'lodash-es';
import create, { StoreApi } from 'zustand';

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

type TCreateStoreCb<
	TState extends Object,
	TComputed extends Object = {},
	TActions extends Object = {},
	TStoreShape = TStore<TState, TComputed, TActions>,
> = (
	set: StoreApi<TStoreShape>['setState'],
	get: StoreApi<TStoreShape>['getState'],
) => {
	initialState: TState;
	computed?: TComputed;
	actions?: TActions;
};
export function createStore<
	TState extends Object,
	TComputed extends Object = {},
	TActions extends Object = {},
>(cb: TCreateStoreCb<TState, TComputed, TActions>) {
	return create<TStore<TState, TComputed, TActions>>((set, get) => {
		const { initialState, computed, actions } = cb(set, get);

		return {
			initialState,
			state: initialState,
			computed: computed ?? ({} as TComputed),
			actions: actions ?? ({} as TActions),
			$reset: () => set({}, true),
			resetState: () => set({ state: initialState }),
			setState: (newState: Partial<TState>) =>
				set((currState) => ({
					state: merge(currState.state, newState),
				})),
		};
	});
}
