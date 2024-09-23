import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/styles/globals.css";
import { Root } from "@/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Home } from "./routes/home";
import { Redirect, RedirectRouteLoader } from "./routes/redirect";
import { Error } from "./routes/error";
import { Error404 } from "./routes/404";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Root>
				<Home />
			</Root>
		),
		errorElement: <Error />,
	},
	{
		path: "/404",
		element: <Error404 />,
	},
	{
		path: "/:miniUrlId",
		element: <Redirect />,
		errorElement: <Error />,
		loader: async (props) => await RedirectRouteLoader(props, queryClient),
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
);
