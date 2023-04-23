import ky from "ky";

export const fileApi = ky.create({
	prefixUrl: "https://api.github.com/repos/VIOOI/Obsidian/contents/",
});

export const rawFileApi = ky.create({
	prefixUrl: "https://raw.githubusercontent.com/VIOOI/Obsidian/master/",
});
