export {};

declare global {
	interface TStore<TState, TActions, TComputed> {
		initialState: TState;
		state: TState;
		computed: TComputed;
		actions: TActions;
		$reset: () => void;
		resetState: () => void;
		setState: (newState: Partial<TState>) => void;
	}

	type TOnChange<El> = React.ChangeEventHandler<El>;
	type TOnClick<El> = React.MouseEventHandler<El>;
	type TOnSubmit = React.FormEventHandler<HTMLFormElement>;
}
