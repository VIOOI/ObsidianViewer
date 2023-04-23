import "uno.css";
import { render } from "solid-js/web";
import { createRoutesView, RouterProvider } from "atomic-router-solid";

import { App, appRoute } from "@pages/app";

import { NotFound } from "@pages/notFound";

import { Viewer, viewerRouter } from "@pages/viewer";

import { router } from "./routing";

const RouterView = createRoutesView({
	routes: [
		{ route: viewerRouter, view: Viewer },
		{ route: appRoute, view: App },
	],
	otherwise: NotFound,
});


render(() => (
	<RouterProvider router={router} >
		<RouterView />
	</RouterProvider>
), document.getElementById("root") as HTMLElement);

