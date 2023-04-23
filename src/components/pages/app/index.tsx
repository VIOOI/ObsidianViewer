import { File } from "@atoms/files";
import { Folder } from "@atoms/folder";
import { removeExtension, removeLastDirectoryFromUrl } from "@utils/path.utils";
import { createRoute } from "atomic-router";

import { Component, createEffect, createSignal, For, onMount, Show } from "solid-js";

import arrow from  "@public/icons/arrow.svg?raw";
import sun from  "@public/icons/sun.svg?raw";
import moon from  "@public/icons/moon.svg?raw";

import { closedFile } from "@pages/viewer/viewer.store";

import { useUnit } from "effector-solid";

import { SVGRender } from "@atoms/svgRender";

import { ToggleDarkMode } from "@atoms/toggleDarkMode";

import { BreadCrumbs } from "../../atoms/breadcrumbs";

import { useFoldersAndFiles } from "./app.hooks";

export const appRoute = createRoute<{ folder: Array<string> }>();

export const App: Component = () => {
	const { folders, files, dataState } = useFoldersAndFiles({
		extensions: [ "md" ],
		exclude: [ "DashBoard.md" ],
	});

	const params = useUnit(appRoute.$params);
	onMount(() => { closedFile(); });

	const isEmpty = () => folders().length == 0 && files().length == 0;


	function handleKeyDown() {
		if (event.key === " " || event.key === "Enter") {
			const tmp = params().folder; 
			tmp.pop();
			appRoute.open({ folder: tmp });
		}
	}
	function handleClick() {
		const tmp = params().folder; 
		tmp.pop();
		appRoute.open({ folder: tmp });
	}

	return (
		<div class="w-screen h-screen bg-light-500 dark:bg-neutral-900 flex-center">
			<ToggleDarkMode light={moon} dark={sun} class="fixed top-5 right-5" />
			<div class="w-80vw md:w-70vw lg:w-65vw flex flex-wrap gap-i0.5 relative">
				<SVGRender 
					class={`
						absolute -top-3px -left-35px
						gap-i0.2 flex-center
						cursor-pointer
					`}
					tabIndex={1}
					onclick={handleClick}
					onkeydown={handleKeyDown}
					onfocus={handleKeyDown}
					svgString={arrow}
					fill={{
						dark: "#FFFFFF",
						light: "#000000",
					}}
				/>
				<BreadCrumbs />
				<Show when={!dataState()}>
					<div class="w-full flex wrap w-80vw gap-i1">
						<For each={[ 1, 2, 3, 4 ]}>{() => 
							<div class="
								bg-white dark:bg-dark rounded-lg
								min-w-200px h-50px grow
							">
							</div>
						}</For>
					</div>
				</Show>
				<Show when={dataState() && isEmpty()}>
					<div class="w-full flex wrap gap-i1">
						<div class="
							rounded-lg dark:bg-dark dark:text-white
							min-w-200px h-80px grow
							flex-center text-1.4rem font-bold 
						">
						Папка пустая
						</div>
					</div>
				</Show>
				<Show when={dataState()}>
					<For each={folders()}>{item => 
						<Folder name={item.name} path={item.path} />
					}</For>
					<For each={files()}>{item => 
						<File name={removeExtension(item.name)} path={item.path} />
					}</For>
				</Show>
			</div>
		</div>
	);
};
