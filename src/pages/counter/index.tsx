import { useCounterStore } from '~/store/counter.store';

export default function Page() {
	const counterStore = useCounterStore();

	const onCounterChange: TOnChange<HTMLInputElement> = (e) => {
		counterStore.setState({
			count: Number(e.currentTarget.value),
		});
	};
	const onIncreaseCountClick: TOnClick<HTMLButtonElement> = () => {
		counterStore.actions.increaseCount();
	};
	const onDecreaseCountClick: TOnClick<HTMLButtonElement> = () => {
		counterStore.actions.decreaseCount();
	};

	return (
		<div>
			<div>
				<label htmlFor="count">
					Count
					<input
						id="count"
						type="number"
						value={counterStore.state.count}
						onChange={onCounterChange}
					/>
				</label>
			</div>

			<div>
				<span>Doubled Count : {counterStore.computed.doubledCount}</span>
			</div>

			<button type="button" onClick={onDecreaseCountClick}>
				Decrease Count
			</button>
			<button type="button" onClick={onIncreaseCountClick}>
				Increase Count
			</button>
		</div>
	);
}
