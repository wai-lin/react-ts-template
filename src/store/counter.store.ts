import { createStore } from '@utils/StoreHelpers';

// ========== Types ==========
interface TState {
	count: number;
}
interface TComputed {
	doubledCount: number;
}
interface TActions {
	increaseCount: (inc?: number) => void;
	decreaseCount: (dec?: number) => void;
}

// ========== Store ==========
export const useCounterStore = createStore<TState, TComputed, TActions>(
	(set, get) => ({
		initialState: {
			count: 0,
		},
		computed: {
			get doubledCount() {
				return get().state.count * 2;
			},
		},
		actions: {
			increaseCount: (inc = 1) =>
				set({
					state: { count: get().state.count + inc },
				}),
			decreaseCount: (dec = 1) =>
				set({
					state: { count: get().state.count - dec },
				}),
		},
	}),
);
