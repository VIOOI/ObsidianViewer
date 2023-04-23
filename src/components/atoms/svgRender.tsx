import { $theme } from "@pages/app/app.store";
import { useUnit } from "effector-solid";
import { createEffect, createSignal, splitProps, VoidComponent } from "solid-js";

import type { HTMLAttributes } from "solid-js/web";

type ColorDarkOrLight = {
	dark: string,
	light: string,
};

type SvgComponentProps = {
  svgString: string;
  width?: string;
  height?: string;
  fill?: ColorDarkOrLight;
  stroke?: ColorDarkOrLight;
} & HTMLAttributes

export const SVGRender: VoidComponent<SvgComponentProps> = (props) => {
	const [ local, other ] = splitProps(props, [ "svgString", "width", "height", "fill", "stroke" ]);
	const [ element, setElement ] = createSignal<HTMLElement>();
	const theme = useUnit($theme);


	createEffect(() => {
		if (element() && local.svgString) {
			const parser = new DOMParser();
			const svgDocument = parser.parseFromString(local.svgString, "image/svg+xml");
			const svgElement = svgDocument.documentElement;

			if (local.width) svgElement.setAttribute("width", local.width);
			if (local.height) svgElement.setAttribute("height", local.height);
			if (local.fill) svgElement.setAttribute("fill", theme() ? local.fill.dark : local.fill.light);
			if (local.stroke) svgElement.setAttribute("stroke", theme() ? local.stroke.dark : local.stroke.light);

			element().innerHTML = "";
			element().appendChild(svgElement);
		}
	});

	return (
		<>
			<div {...other} ref={setElement} />
		</>
	);
};
