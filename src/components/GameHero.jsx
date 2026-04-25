import { Skull } from "lucide-react";

// Cinematic hero. The image is the centerpiece — overlay tuning is owned
// per-game via the `--game-hero-overlay` token so individual games can
// adjust contrast without touching this component.

export function GameHero({ branding, hero }) {
	const { eyebrow, title, subtitle } = branding;

	return (
		<header className="game-hero">
			<img
				src={hero.image}
				alt={hero.alt}
				className="game-hero__image"
				loading="eager"
				fetchPriority="high"
			/>
			<div className="game-hero__overlay" aria-hidden="true" />
			<div className="game-hero__content">
				{eyebrow && (
					<div className="game-hero__divider" aria-hidden="true">
						<span />
						<Skull size={18} />
						<span />
					</div>
				)}
				{eyebrow && <div className="game-hero__eyebrow">{eyebrow}</div>}
				<h1 className="game-hero__title">
					{title.main}
					{title.accent && <em>{title.accent}</em>}
					{title.trail}
				</h1>
				{subtitle && <div className="game-hero__subtitle">{subtitle}</div>}
			</div>
		</header>
	);
}
