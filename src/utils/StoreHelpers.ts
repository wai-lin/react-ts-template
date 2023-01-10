import { merge } from 'lodash-es';
import create, { StoreApi } from 'zustand';

type TCreateStoreCb<
	TState extends Object,
	TActions extends Object = {},
	TComputed extends Object = {},
	TStoreShape = TStore<TState, TActions, TComputed>,
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
	TActions extends Object = {},
	TComputed extends Object = {},
>(cb: TCreateStoreCb<TState, TActions, TComputed>) {
	return create<TStore<TState, TActions, TComputed>>((set, get) => {
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
