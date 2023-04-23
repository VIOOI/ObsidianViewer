import { createEvent, createStore, sample } from "effector";

export const toggleTheme = createEvent();

export const $theme = createStore(true);

sample({
	clock: toggleTheme,
	source: $theme,
	fn: source => !source,
	target: $theme,
});
