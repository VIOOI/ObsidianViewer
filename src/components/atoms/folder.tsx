import { Component, splitProps } from "solid-js";
import folderIcon from "@public/icons/folder.svg?raw";
import { useUnit } from "effector-solid";
import { appRoute } from "@pages/app";

import { SVGRender } from "./svgRender";

type Props = {
	name: string,
	path: string,
}

export const Folder: Component<Props> = (props) => {
	const [ local ] = splitProps(props, [ "name", "path" ]);

	const params = useUnit(appRoute.$params);
	// console.log(params()["folder"]);
	const folders = () => params()["folder"] ? params().folder : [];

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === " " || event.key === "Enter") {
			appRoute.open({ folder: [ ...folders(), decodeURIComponent(local.name) ] }); 
		}
	}
	return ( 
		<div class="
			p-i0.5 gap-i0.02 grow
			bg-white dark:bg-dark text-dark
			rounded-[0.5rem]
			cursor-pointer
			flex min-w-200px 
			"
		tabindex={1}
		onclick={() => {
			appRoute.open({ folder: [ ...folders(), decodeURIComponent(local.name) ] }); 
		}}
		onkeydown={handleKeyDown}
		onfocus={handleKeyDown}
		>
			<SVGRender 
				class="w-10 flex justify-start items-start"
				svgString={folderIcon}
				fill={{
					dark: "#FFFFFF",
					light: "#000000",
				}}
			/>
			<div class="p-t-i0.2">
				<h2 class="fz-i0.8 dark:text-white text-dark m-0 font-light">
					{ local.name }
				</h2>
			</div>
		</div>
	);
};
