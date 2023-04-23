
import { appRoute } from "@pages/app";
import { notFoundRoute } from "@pages/notFound";
import { viewerRouter } from "@pages/viewer/viewer.store";
import { createHistoryRouter, RouteInstance } from "atomic-router";
import { createBrowserHistory } from "history";

type RouteType = Array<{
	path: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	route: RouteInstance<any>,
}>

export const routes: RouteType = [
	{ path: "/viewer", route: viewerRouter },
	{ path: "/:folder*", route: appRoute },
];

export const history = createBrowserHistory();

export const router = createHistoryRouter({
	routes,
	notFoundRoute: notFoundRoute,
});

router.setHistory(history);
