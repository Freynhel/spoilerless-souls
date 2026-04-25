import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, Skull, Lock, MapPin } from "lucide-react";

export function BossRow({ boss, index, isVisible, isDefeated, onToggle }) {
	const [guideOpen, setGuideOpen] = useState(false);

	if (!isVisible) {
		return (
			<div className="boss-row locked">
				<div className="boss-main">
					<span className="boss-index">
						{String(index).padStart(2, "0")}
					</span>
					<div
						style={{
							width: 22,
							height: 22,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Lock size={15} color="var(--pf-text-dim)" />
					</div>
					<div className="boss-info">
						<div
							className="boss-name"
							style={{
								color: "var(--pf-text-dim)",
								fontStyle: "italic",
								fontSize: 18,
							}}
						>
							??? ??? ???
						</div>
						<div className="boss-area">
							<MapPin size={13} />
							<span>Unknown</span>
						</div>
					</div>
					<Lock
						size={17}
						color="var(--pf-text-dim)"
						style={{ opacity: 0.35 }}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={`boss-row ${isDefeated ? "defeated" : ""}`}>
			<div className="boss-main">
				<span className="boss-index">
					{String(index).padStart(2, "0")}
				</span>
				<div className="boss-check">
					<Checkbox
						checked={isDefeated}
						onCheckedChange={(checked) =>
							onToggle(boss.id, checked)
						}
						aria-label={`Mark ${boss.name} as defeated`}
					/>
				</div>
				<div className="boss-info">
					<div className="boss-name">{boss.name}</div>
					<div className="boss-area">
						<span>{boss.area}</span>
					</div>
				</div>
				<div className="boss-badges">
					{isDefeated && <Skull size={18} className="skull-icon" />}
					<span
						className={
							boss.isOptional
								? "badge-optional"
								: "badge-mandatory"
						}
					>
						{boss.isOptional ? "Optional" : "Main"}
					</span>
					<button
						className={`guide-btn ${guideOpen ? "open" : ""}`}
						onClick={() => setGuideOpen((v) => !v)}
						aria-expanded={guideOpen}
					>
						{guideOpen ? (
							<ChevronUp size={13} />
						) : (
							<ChevronDown size={13} />
						)}
						Guide
					</button>
				</div>
			</div>
			{guideOpen && (
				<div className="guide-body">
					<div className="guide-label">
						<MapPin
							size={14}
							style={{ display: "inline", marginRight: 6, verticalAlign: "-2px" }}
						/>
						How to reach
					</div>
					<div className="guide-text">{boss.guide}</div>
				</div>
			)}
		</div>
	);
}
