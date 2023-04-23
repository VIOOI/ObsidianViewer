import { rawFileApi } from "@utils/api";
import { chainRoute, createRoute, redirect } from "atomic-router";
import { createEffect, createEvent, createStore, sample } from "effector";

// import { viewerRouter } from ".";
export const viewerRouter = createRoute();

export const openFile = createEvent<string>();
export const closedFile = createEvent();
export const setName = createEvent<string>();

const $pathFile = createStore("");
export const $sourceFile = createStore("");
export const $nameFile = createStore("");

// $sourceFile.watch(state => console.log(state));

$sourceFile.reset(closedFile);

export const getSourceFileFx = createEffect<string, string>(async (path: string) => {
	console.log(path);
	return await rawFileApi.get(path).text(); 
});

// const loadFileRoute = chainRoute({
// 	route: viewerRouter,
// 	beforeOpen: {
// 		effect: getSourceFileFx,
// 		mapParams: ({ params }) => params.path,
// 	},
// });

sample({ clock: openFile, target: $pathFile });
sample({ clock: $pathFile, target: getSourceFileFx }); 
sample({ clock: getSourceFileFx.doneData, target: $sourceFile });
sample({ clock: setName, target: $nameFile });

redirect({
	clock: openFile,
	// fn: clock => ({ path: clock }),
	route: viewerRouter,
});
