import { GameHero } from "./GameHero";

// GameLayout binds a game to its visual identity by setting
// `data-game-theme` on the root, then composes hero + content slot.
// All game-specific colors / fonts / atmosphere flow from CSS tokens

export function GameLayout({ game, children }) {
	return (
		<div className="game-page" data-game-theme={game.id}>
			<GameHero branding={game.branding} hero={game.hero} />
			<main className="game-content">{children}</main>
		</div>
	);
}
