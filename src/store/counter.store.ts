import { newStore } from '@utils/StoreHelpers';
import create from 'zustand';

// ========== Types ==========
interface TState {
	count: number;
	message?: string;
}
interface TComputed {
	doubledCount: number;
	messageWithCount: string;
}
interface TActions {
	increaseCount: (inc?: number) => void;
	decreaseCount: (dec?: number) => void;
}

// ========== Store ==========
export const useCounterStore = create<TStore<TState, TComputed, TActions>>(
	(set, get) =>
		newStore({
			get,
			set,
			initialState: {
				count: 0,
				message: '',
			},
			computed: {
				get doubledCount() {
					return get().state.count * 2;
				},
				get messageWithCount() {
					return get().state?.message ?? `${get().state.count}`;
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
