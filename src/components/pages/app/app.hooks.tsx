import { Accessor, createEffect, createSignal } from "solid-js";

import { fileApi } from "@utils/api";
import { useUnit } from "effector-solid";

import { getExtension } from "@utils/path.utils";

import { appRoute } from ".";

interface GAFolder extends GitHubFile { type: "dir"; }
interface GAFile extends GitHubFile { type: "file"; }
type FilterOptions = {
  name?: string;
  types?: Array<"file" | "dir">;
  extensions?: Array<string>;
  exclude?: Array<string>;
};

export function useFoldersAndFiles(options?: FilterOptions): {
  folders: Accessor<Array<GAFolder>>;
  files: Accessor<Array<GAFile>>;
	dataState: Accessor<boolean>;
} {
	const [ folders, setFolders ] = createSignal<Array<GAFolder>>([]);
	const [ files, setFiles ] = createSignal<Array<GAFile>>([]);
	// const [ parts, setParts ] = createSignal(initialParts);
	const [ dataState, setDataState ] = createSignal(false);

	const params = useUnit(appRoute.$params);

	createEffect(async () => {
		setDataState(false);
		const data: Array<GitHubFile> = await fileApi
			.get(params().folder ? params().folder.join("/") : "")
			.json();

		setFolders([]);
		setFiles([]);
		data.forEach(item => {
			if (options?.types && !options.types.includes(item.type)) return;
			if (options?.name && !item.name.includes(options.name)) return;
			if (options?.exclude && options.exclude.includes(item.name)) return;

			if (item.type === "dir" && !item.name.startsWith("."))
				setFolders(state => [ item as GAFolder, ...state ]);

			if (item.type === "file" && !item.name.startsWith(".")) {
				if (options?.extensions && !options.extensions.includes(getExtension(item.name))) return;
				setFiles(state => [ item as GAFile, ...state ]);
			}
		});
		setDataState(true);
	});


	return { folders, files, dataState };
}
