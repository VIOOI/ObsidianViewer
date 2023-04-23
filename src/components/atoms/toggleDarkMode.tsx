import { $theme, toggleTheme } from "@pages/app/app.store";
import { useUnit } from "effector-solid";
import { createEffect, createSignal, splitProps } from "solid-js";

import { SVGRender } from "./svgRender";

type ToggleDarkModeProps = {
  light: string;
  dark: string;
	class: string;
}

export const ToggleDarkMode = (props) => {
	const [ local ] = splitProps(props, [ "light", "dark", "class" ]);
	const [ isDarkMode, setIsDarkMode ] = createSignal(false);
	const [ theme, setTheme ] = useUnit([ $theme, toggleTheme ]);

	createEffect(() => {
		const body = document.body;
		if (theme()) { body.classList.add("dark"); } 
		else { body.classList.remove("dark"); }
	});

	return (
		<SVGRender
			onClick={() => setTheme()}
			svgString={theme() ? local.dark : local.light}
			class={local.class}
			fill={{
				light: "#000000",
				dark: "#FFFFFF",
			}}
		/>
	);
};

