// ─────────────────────────────────────────────────────────────────────────────
// Dark Souls Remastered — game theme config
//
// Each game in the platform exports a config object of this shape. The
// runtime feeds it to <GameLayout> / <GameHero> / <BossChecklist>; CSS
// scoped to `[data-game-theme="<id>"]` does the rest of the visual work.
// ─────────────────────────────────────────────────────────────────────────────

import heroImage from "@/assets/dsremastered_wppr.jpg";
import { BASE_BOSSES, DLC_BOSSES } from "./bosses";

export const darkSoulsGame = {
	id: "dark-souls",
	name: "Dark Souls Remastered",
	storageNamespace: "spoilerless-souls",

	branding: {
		eyebrow: "Spoiler-free Boss Checklist",
		title: { main: "SPOILER", accent: "LESS", trail: " SOULS" },
		subtitle: "DARK SOULS REMASTERED",
	},

	hero: {
		image: heroImage,
		alt: "A solitary knight stands amid moss-covered cathedral ruins, embers drifting through warm bonfire light against cold stone — the Chosen Undead's first step into Lordran.",
	},

	checklist: {
		progressLabel: "Bosses Slain",
		completionTitle: "All Bosses Defeated",
		completionText: "The age of fire persists by your hand, Chosen Undead.",
		tabs: [
			{
				id: "base",
				label: "Base Game",
				bosses: BASE_BOSSES,
			},
			{
				id: "dlc",
				label: "Artorias of the Abyss",
				bosses: DLC_BOSSES,
				header: {
					title: "Artorias of the Abyss",
					subtitle: "Access via the golden portal in Darkroot Basin",
				},
			},
		],
	},
};
