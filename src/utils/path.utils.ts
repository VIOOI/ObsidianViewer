export const removeLastDirectoryFromUrl = (url: string): string => {
	const urlParts = url.split("/");

	if (urlParts.length == 2)
		return urlParts.join("/");

	urlParts.pop();
	return urlParts.join("/");
};

export function getExtension(filename: string) {
	const parts = filename.split(".");
	return parts.length > 1 ? parts[parts.length - 1] : "";
}

export function removeExtension(filename: string): string {
	const parts = filename.split(".");
	parts.pop();
	return parts.join(".");
}
