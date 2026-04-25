import { GameLayout } from "@/components/GameLayout";
import { BossChecklist } from "@/components/BossChecklist";
import { getGame, DEFAULT_GAME_ID } from "@/games/registry";

export default function App() {
	// Single-game platform today. When a router lands, this becomes
	// `getGame(routeParams.game) ?? getGame(DEFAULT_GAME_ID)`.
	const game = getGame(DEFAULT_GAME_ID);

	return (
		<GameLayout game={game}>
			<BossChecklist game={game} />
		</GameLayout>
	);
}
