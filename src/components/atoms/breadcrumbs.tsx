import { Component, For, Setter, Show, splitProps, VoidComponent } from "solid-js";
import arrowIcon from "@public/icons/arrow-breadcrumbs.svg?raw";
import { useUnit } from "effector-solid";
import { appRoute } from "@pages/app";

import { SVGRender } from "./svgRender";


export const BreadCrumbs: VoidComponent = () => {
	const params = useUnit(appRoute.$params);
	const folders = () => params()["folder"] ? params().folder : [];

	function constructLink(parts, index) {
		const selectedParts = parts.slice(0, index + 1);
		return selectedParts.join("/");
	}

	return ( 
		<div
			class="
				absolute -top-35px left-10px
				gap-2 flex-center
				cursor-pointer
				text-1.2rem font-extrabold
				dark:text-white
				"
		>
			<For each={folders()} >{(item, index) => 
				<div class="flex"
					onClick={() => {
						appRoute.open({ folder: [ ...folders().splice(0, index() + 1) ] }); 
					}}
				>
					{ decodeURIComponent(item) } 
					<SVGRender 
						svgString={arrowIcon}
						fill={{
							dark: "#FFFFFF",
							light: "#000000",
						}}
					/>
				</div>
			}</For>
		</div>
	);
};

