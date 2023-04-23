import { Component, Setter, splitProps } from "solid-js";
import fileIcon from "@public/icons/file.svg?raw";
import { openFile, setName } from "@pages/viewer/viewer.store";

import { SVGRender } from "./svgRender";

type Props = {
	name: string,
	path: string,
}

export const File: Component<Props> = (props) => {
	const [ local ] = splitProps(props, [ "name", "path" ]);
	return ( 
		<div class="
			p-i0.5 gap-i0.2 dark:bg-dark bg-white text-white
			rounded-[0.5rem] grow
			cursor-pointer flex w-200px 
		"
		tabindex={1}
		onclick={() => {
			openFile(local.path);
			setName(local.name);
		}}
		>
			<SVGRender 
				class="w-10 flex justify-start items-start"
				svgString={fileIcon}
				fill={{
					dark: "#FFFFFF",
					light: "#000000",
				}}
			/>
			<div class="pt-1.5">
				<h2 class="fz-i0.8 dark:text-white text-dark m-0 font-light">
					{ local.name }
				</h2>
			</div>
		</div>
	);
};
