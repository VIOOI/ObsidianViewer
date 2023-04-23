import { marked } from "marked";

import "./viewer.marked.style.scss";

export const renderer = new marked.Renderer();

renderer.heading = (text, level) => {
	const fontSize = [ 4.5, 3.5, 2.8, 2.1, 1.6, 1.2 ];
	return `<h${level} class="header level-${level}">${text}</h${level}>`;
};

renderer.paragraph = (text) => {
	return `<p class="paragraph">${text}</p>`;
};

renderer.blockquote = (quote) => {
	return `
    <blockquote class="marked-blockquote shadow-lg">
      ${quote}
    </blockquote>
  `;
};

renderer.list = (body, ordered) => {
	const listType = ordered ? "ol" : "ul";
	const listClass = ordered ? "marked-ordered-list" : "marked-unordered-list";

	return `
    <${listType} class="${listClass}">
      ${body}
    </${listType}>
  `;
};

// Переопредели метод `listitem`
renderer.listitem = (text) => {
	return `
    <li class="marked-list-item" data-before-content="●">
      ${text}
    </li>
  `;
};

renderer.checkbox = (checked) => {
	const checkedClass = checked ? "custom-checkbox-checked" : "custom-checkbox-unchecked";

	return `
    <input 
			type="checkbox" 
			class="custom-checkbox ${checkedClass}" ${checked ? "checked" : ""} disabled 
		/>
  `;
};

export function convertMarkdownToHtml(markdown: string): string {
	return marked(markdown, { renderer });
}
