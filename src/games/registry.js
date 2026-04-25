// ─────────────────────────────────────────────────────────────────────────────
// Game registry
//
// source for which games the platform hosts. Adding a new game is two steps:
//   1. Drop a new folder under `src/games/<id>/` exporting a meta object.
//   2. Drop a CSS theme at `src/themes/games/<id>.css` and import it in
//      `src/index.css`.
// ─────────────────────────────────────────────────────────────────────────────

import { darkSoulsGame } from "./dark-souls/meta";

export const GAMES = {
	[darkSoulsGame.id]: darkSoulsGame,
};

export function getGame(id) {
	return GAMES[id] ?? null;
}

export const DEFAULT_GAME_ID = darkSoulsGame.id;
