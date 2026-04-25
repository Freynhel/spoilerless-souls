import { useState, useEffect, useCallback, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Flame, Swords } from "lucide-react";
import { BossRow } from "./BossRow";

// ─── Storage helpers ──────────────────────────────────────────────────────────

function loadDefeated(key) {
	try {
		const raw = localStorage.getItem(key);
		return raw ? new Set(JSON.parse(raw)) : new Set();
	} catch {
		return new Set();
	}
}

function saveDefeated(key, defeated) {
	try {
		localStorage.setItem(key, JSON.stringify([...defeated]));
	} catch {
		/* private browsing / quota — progress stays in-memory */
	}
}

// ─── Progression ──────────────────────────────────────────────────────────────

function getMainBossesDefeatedCount(bosses, defeated) {
	return bosses.filter((b) => !b.isOptional && defeated.has(b.id)).length;
}

function isBossVisible(boss, bosses, defeated) {
	return (
		boss.progressionIndex <= getMainBossesDefeatedCount(bosses, defeated)
	);
}

// ─── List ─────────────────────────────────────────────────────────────────────

function BossList({ bosses, defeated, onToggle, completion }) {
	const totalDefeated = bosses.filter((b) => defeated.has(b.id)).length;

	return (
		<div>
			<div className="section-label">
				<Swords size={13} />
				{totalDefeated} / {bosses.length} Defeated
			</div>
			<div className="boss-list">
				{bosses.map((boss, i) => (
					<BossRow
						key={boss.id}
						boss={boss}
						index={i + 1}
						isVisible={isBossVisible(boss, bosses, defeated)}
						isDefeated={defeated.has(boss.id)}
						onToggle={onToggle}
					/>
				))}
			</div>
			{totalDefeated === bosses.length && completion && (
				<div className="completion-banner">
					<div className="completion-title">
						<Flame
							size={18}
							style={{ display: "inline", marginRight: 8, verticalAlign: "-3px" }}
						/>
						{completion.title}
					</div>
					<div className="completion-text">{completion.text}</div>
				</div>
			)}
		</div>
	);
}

// ─── BossChecklist (default export) ───────────────────────────────────────────

export function BossChecklist({ game }) {
	const { storageNamespace, checklist } = game;
	const tabs = checklist.tabs;

	// One Set per tab, keyed by tab id; persisted under `${ns}:${tabId}`.
	const [defeated, setDefeated] = useState(() => {
		const initial = {};
		for (const tab of tabs) {
			initial[tab.id] = loadDefeated(`${storageNamespace}:${tab.id}`);
		}
		return initial;
	});

	useEffect(() => {
		for (const tab of tabs) {
			saveDefeated(`${storageNamespace}:${tab.id}`, defeated[tab.id]);
		}
	}, [defeated, tabs, storageNamespace]);

	const handleToggle = useCallback((tabId) => (id, checked) => {
		setDefeated((prev) => {
			const next = new Set(prev[tabId]);
			checked ? next.add(id) : next.delete(id);
			return { ...prev, [tabId]: next };
		});
	}, []);

	// Memoize per-tab handlers so child rows don't re-render unnecessarily.
	const handlers = useMemo(() => {
		const map = {};
		for (const tab of tabs) map[tab.id] = handleToggle(tab.id);
		return map;
	}, [tabs, handleToggle]);

	const totals = tabs.reduce(
		(acc, tab) => {
			acc.total += tab.bosses.length;
			acc.done += defeated[tab.id]?.size ?? 0;
			return acc;
		},
		{ total: 0, done: 0 },
	);
	const pct = totals.total === 0 ? 0 : Math.round((totals.done / totals.total) * 100);

	const completion = checklist.completionTitle
		? { title: checklist.completionTitle, text: checklist.completionText }
		: null;

	return (
		<>
			<div className="progress-section">
				<div className="progress-label">
					<span className="progress-text">{checklist.progressLabel}</span>
					<span className="progress-count">
						{totals.done} / {totals.total}
					</span>
				</div>
				<div className="progress-bar-wrap">
					<div
						className="progress-bar-fill"
						style={{ width: `${pct}%` }}
					/>
				</div>
			</div>

			<div className="tabs-wrap">
				<Tabs defaultValue={tabs[0]?.id}>
					<TabsList className="tab-list">
						{tabs.map((tab) => (
							<TabsTrigger
								key={tab.id}
								value={tab.id}
								className="tab-trigger"
							>
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>

					{tabs.map((tab) => (
						<TabsContent key={tab.id} value={tab.id}>
							{tab.header && (
								<div className="dlc-header">
									<div className="dlc-title">{tab.header.title}</div>
									<div className="dlc-sub">{tab.header.subtitle}</div>
								</div>
							)}
							<BossList
								bosses={tab.bosses}
								defeated={defeated[tab.id]}
								onToggle={handlers[tab.id]}
								completion={completion}
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</>
	);
}
