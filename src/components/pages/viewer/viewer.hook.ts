import { Accessor, createEffect, createSignal, on, onCleanup } from "solid-js";
import { marked } from "marked";

import { useUnit } from "effector-solid";

import { renderer } from "./viewer.marked";
import { $nameFile, $sourceFile } from "./viewer.store";

type UseMarkdownToHtmlReturnType = [
  () => string,
  () => boolean
];

// Создаем хук useMarkdownToHtml
export function useMarkdown(): UseMarkdownToHtmlReturnType {
	const [ html, setHtml ] = createSignal("");
	const [ isReady, setIsReady ] = createSignal(false);
	const source = useUnit($sourceFile);
	const fileName = useUnit($nameFile);

	const convertMarkdown = async (): Promise<void> => {
		setIsReady(false);

		const convertedHtml = await new Promise<string>((resolve) =>
			setTimeout(() => resolve(marked(source(), { renderer })), 0),
		);

		setHtml(`
<h1 class="header level-1">${fileName()}</h1>
${convertedHtml}
		`);
		setIsReady(true);
		changeListNumbering();

	};

	createEffect(on(source, () => {
		convertMarkdown();
	}));

	return [ html, isReady ];
}

const changeListNumbering = () => {
	const englishLetters = [
		"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
		"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
	];
	const markedOrderedListItems = 
	document.querySelectorAll<HTMLElement>(".marked-ordered-list");

	markedOrderedListItems.forEach((item) => {
		const items: HTMLCollection = item.children;

		Array.from(items).forEach((listItem, index) => {
			const listItemElement = listItem as HTMLLIElement;
			listItemElement.style.listStyleType = "none";

			listItemElement.dataset.beforeContent = isInsideNestedList(item)
				? englishLetters[index]
				: (index + 1).toString();
		});
	});
};

const isInsideNestedList = (listItem: HTMLElement): boolean => {
	const parentElement = listItem.parentElement;
	return parentElement?.tagName.toLowerCase() === "li";
};
