import { createRoute } from "atomic-router";
import { useUnit } from "effector-solid";
import { Component, Show } from "solid-js";

import { ToggleDarkMode } from "@atoms/toggleDarkMode";

import sun from  "@public/icons/sun.svg?raw";
import moon from  "@public/icons/moon.svg?raw";

import { useMarkdown } from "./viewer.hook";



export const Viewer: Component = () => {
	const [ html, isReady ] = useMarkdown();

	return ( 
		<div class="
			min-h-screen w-screen shadow-lg bg-light-500 flex justify-center p-5
			dark:bg-neutral-900 mdviewer
		">
			<ToggleDarkMode light={moon} dark={sun} class="fixed top-5 right-5" />
			<Show when={isReady()}>
				<div 
					class="
						w-95vw md:w-85vw lg:w-55vw xl:45vw 
						dark:bg-neutral-900 bg-white
						p-10 p-x-i5 rounded-xl
					"
					innerHTML={html()} > </div>
			</Show>
			<Show when={!isReady()}>
				<div class="
					w-95vw md:w-85vw lg:w-55vw xl:45vw 
					dark:bg-neutral-900 bg-white
					p-10 p-x-i5 rounded-xl
				"> 
					Идёт загрузка
				</div>
			</Show>
		</div>
	);
};
