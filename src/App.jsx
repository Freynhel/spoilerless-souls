import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, Skull, Lock, MapPin, Flame, Swords } from "lucide-react";

// ─── Font: EB Garamond — the closest freely available match to the actual
//     Adobe Garamond used across the Dark Souls / Elden Ring in-game UI.
//     Agmena (Elden Ring's exact UI font) has no free web license; EB Garamond
//     is visually near-identical for display at these weights.
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap');
`;

// ─── Boss Data ────────────────────────────────────────────────────────────────

const BASE_BOSSES = [
  {
    id: 1, name: "Asylum Demon", area: "Northern Undead Asylum", optional: false,
    guide: "Your very first encounter in the game. You'll stumble upon it in a large hall before acquiring a real weapon — sprint past it through the side door on the left. Later, return from above via a broken floor ledge and deal a plunging attack to begin the fight properly. A solid weapon and some patience will see you through."
  },
  {
    id: 2, name: "Taurus Demon", area: "Undead Burg", optional: false,
    guide: "From the Undead Burg bonfire, push through the burg and cross the dragon bridge. Continue up the battlements. The fog gate sits atop a narrow bridge. Clear the two crossbowmen from the ladder platform first, then drop a plunging attack on the demon as it approaches. Repeat the trick as needed — it deals massive damage."
  },
  {
    id: 3, name: "Bell Gargoyles", area: "Undead Parish", optional: false,
    guide: "From Undead Burg, continue into the Undead Parish church. Fight through the armored Balder Knights inside. Ascend the stairs to the rooftops and climb to the top of the bell tower. The fog gate awaits at the peak. A second gargoyle joins when the first reaches ~50% HP — Solaire of Astora's summon sign is right outside the fog gate to help."
  },
  {
    id: 4, name: "Moonlight Butterfly", area: "Darkroot Garden", optional: true,
    guide: "From the Undead Parish blacksmith Andre, use the Stone Armor Set door key to enter Darkroot Garden. Navigate the forest path past the awakened stone guardians and cross the stone bridge at the far end. The butterfly hovers high above — use ranged attacks, sorceries, or pyromancies exclusively. It rarely descends to melee range."
  },
  {
    id: 5, name: "Capra Demon", area: "Lower Undead Burg", optional: false,
    guide: "Accessible through the locked door near the Undead Burg bonfire (needs the Residence Key from the Undead Merchant, or the Master Key). Descend into Lower Undead Burg. Warning: two attack dogs rush you the instant you enter. Immediately run left up the stairs to reset the chaos, then deal with the dogs first before facing the Demon."
  },
  {
    id: 6, name: "Gaping Dragon", area: "The Depths", optional: false,
    guide: "After the Capra Demon drops the Blighttown Key, head back to the door near its fog gate and enter The Depths. Navigate the torch-lit sewers — watch out for giant rats and face-hugging basilisks that inflict Curse. The boss chamber is behind a large set of double doors at the end. Solaire and Lautrec can both be summoned outside."
  },
  {
    id: 7, name: "Chaos Witch Quelaag", area: "Blighttown", optional: false,
    guide: "Descend through Blighttown from The Depths (or via Valley of Drakes with the Master Key). Stock up on Purple Moss Clumps and equip poison-resistance gear. Reach the toxic swamp floor at the bottom. Find the passage behind a large tree root leading into a cave — a hidden bonfire sits inside. Past a spider-webbed wall is the fog gate into Quelaag's domain."
  },
  {
    id: 8, name: "Ceaseless Discharge", area: "Demon Ruins", optional: false,
    guide: "After ringing both Bells of Awakening, head through Sen's Fortress and Anor Londo to unlock Lordvessel access. In the boss chamber, pick up the armor set on the altar to trigger the fight. Bait the boss into slamming its arm on the ground near you, then punish the arm — this is the safest and fastest strategy."
  },
  {
    id: 9, name: "Iron Golem", area: "Sen's Fortress", optional: false,
    guide: "With both Bells rung, the large iron gate near the Undead Parish opens into Sen's Fortress. Survive the pendulum blades, pitfall floors, and boulder traps. Navigate up and take the elevator to the rooftop. The Iron Golem guards the exit at the very top. Stagger it repeatedly near the roof's edge and it will topple off — an instant kill."
  },
  {
    id: 10, name: "Crossbreed Priscilla", area: "Painted World of Ariamis", optional: true,
    guide: "In Anor Londo's main cathedral, find the large painting on the ground floor and interact with it to be pulled into the Painted World of Ariamis. Complete the snowy, undead-filled painted world. Priscilla waits at the end in a circular snowfield. She is actually peaceful by default and will not aggress first — you may simply exit via the entrance ledge."
  },
  {
    id: 11, name: "Dragon Slayer Ornstein & Executioner Smough", area: "Anor Londo", optional: false,
    guide: "The most infamous boss in the game. From the Anor Londo bonfire, carefully cross the rafters past the two silver knight archers — kill them first to save your sanity. Enter the cathedral via the front doors and proceed to the fog gate at the far end. Both bosses fight simultaneously. Summon Solaire if available — focus Ornstein first for the safer power-up, or Smough first for a more nimble super form."
  },
  {
    id: 12, name: "Sif, the Great Grey Wolf", area: "Darkroot Garden", optional: true,
    guide: "Head to Darkroot Garden via the Undead Parish. Past the stone guardians, find the large circular sealed door — it costs 20,000 souls or the Crest of Artorias from Andre. Beyond it lies a misty, grave-filled forest clearing. Sif's fog gate is at the far end. Note: defeating Sif grants the Covenant of Artorias, required to reach The Four Kings."
  },
  {
    id: 13, name: "Stray Demon", area: "Northern Undead Asylum", optional: true,
    guide: "Return to the Northern Undead Asylum by finding the crow's nest on the Firelink Shrine roof. In the asylum, return to your starting cell and drop through the broken floor. The Stray Demon lurks below. It uses a devastating AoE magic slam — stay close to its legs and roll through attacks. Bring your best gear."
  },
  {
    id: 14, name: "Demon Firesage", area: "Demon Ruins", optional: false,
    guide: "Progress deeper into the Demon Ruins after defeating Ceaseless Discharge. Navigate past the lava pits, stone demons, and prowling centipede creatures. The Firesage is found at the end of the ruin's lower level, just before Lost Izalith. Its moveset mirrors the Asylum Demon but adds fire-infused ground slams. Stay at medium range and bait attacks before retaliating."
  },
  {
    id: 15, name: "Centipede Demon", area: "Demon Ruins", optional: false,
    guide: "Continue past the Firesage deeper into the Demon Ruins. The Centipede Demon guards the entrance to Lost Izalith in a lava-filled arena. Equip the Orange Charred Ring to walk the lava safely. You can also cut off its tail to obtain the ring. Stay on the small stone platforms and hit the main body."
  },
  {
    id: 16, name: "Bed of Chaos", area: "Lost Izalith", optional: false,
    guide: "Enter Lost Izalith through the Demon Ruins (after Centipede Demon) or via the Chaos Servant shortcut at Rank 2. First destroy both glowing orange growths on the sides of the arena. Then make a running jump across the crumbling floor to strike the bug in the center. The floor collapses so move quickly."
  },
  {
    id: 17, name: "Pinwheel", area: "The Catacombs", optional: true,
    guide: "Reach The Catacombs from Firelink Shrine by descending the graveyard stairs. Bring a Divine-infused weapon to permanently slay the respawning skeletons. Navigate the torch-lit tombs and bone traps to reach an elevator that takes you deeper. Pinwheel's fog gate is at the bottom. This is one of the game's easiest bosses — destroy it before its clone count grows."
  },
  {
    id: 18, name: "Gravelord Nito", area: "Tomb of the Giants", optional: false,
    guide: "Through The Catacombs and Pinwheel's arena, descend into the Tomb of the Giants. It is completely pitch black — equip the Skull Lantern or the Sunlight Maggot helmet. Edge carefully along the narrow cliffs among colossal skeleton enemies. Rest at the second bonfire and continue downward. Bring fire for extra damage."
  },
  {
    id: 19, name: "Seath the Scaleless", area: "Crystal Cave", optional: false,
    guide: "From Anor Londo's first bonfire, take the left shortcut path through an elevator to The Duke's Archives. Your initial meeting with Seath is scripted — let him kill you. You'll wake imprisoned in a cell; escape and work through the archives. Take the gondola down to Crystal Cave. Cross the invisible walkways carefully. Destroy Seath's glowing crystal tail first to make him truly mortal."
  },
  {
    id: 20, name: "The Four Kings", area: "The Abyss — New Londo Ruins", optional: false,
    guide: "First obtain the Covenant of Artorias ring (from Sif). Descend to New Londo Ruins via the Firelink elevator. Kill Ingward the mage for the Key to the Seal. Drain the ruins' floodwaters using the lever at the top. Fight through the Darkwraiths to the open tower and dive into the hole with the ring equipped. High DPS wins — dispatch each King before the next spawns."
  },
  {
    id: 21, name: "Gwyn, Lord of Cinder", area: "Kiln of the First Flame", optional: false,
    guide: "Collect all four Lord Souls and offer them to the Lordvessel at Firelink Shrine. This unlocks the passage to the Kiln of the First Flame — a brief but harrowing area with Black Knight enemies amid crumbling ash. Gwyn awaits at the end. He is relentlessly aggressive but extremely parry-able — learning his rhythm and parrying will trivialize the fight. Defeat him to end the age."
  },
];

const DLC_BOSSES = [
  {
    id: 1, name: "Sanctuary Guardian", area: "Sanctuary Garden", optional: false,
    guide: "Enter the DLC by travelling to Darkroot Basin (below Darkroot Garden, near the hydra lake). Interact with the golden glowing portal — it transports you to Sanctuary Garden in Oolacile. The Guardian is a massive, venomous manticore lurking right at the area's exit. It is fast, poisons, and can leap surprising distances. Block or roll its tail sweep and punish after its slam combos."
  },
  {
    id: 2, name: "Knight Artorias", area: "Royal Wood", optional: false,
    guide: "From Oolacile Sanctuary, travel through the Royal Wood forest — past the corrupted Bloatheads, golems, and humanity phantoms. Find the boss colosseum clearing and activate the elevator shortcut nearby before entering. Artorias is blindingly fast with brutal combos and can buff himself with a dark aura. Prioritize rolling and counter-attacking — never trade hits. One of the hardest boss fights in the game."
  },
  {
    id: 3, name: "Black Dragon Kalameet", area: "Royal Wood Canyon", optional: true,
    guide: "After defeating Artorias, find Hawkeye Gough in his tower in the Royal Wood (accessible via a ladder in the area). Speak with him and he will shoot Kalameet from the sky, making it accessible. Descend to the canyon below Royal Wood. Kalameet hits extraordinarily hard — especially the Calamity Eye beam, which inflicts a permanent damage-doubling curse. Stay close to its body and aim for the tail."
  },
  {
    id: 4, name: "Manus, Father of the Abyss", area: "Chasm of the Abyss", optional: false,
    guide: "After Oolacile Township, descend into the Chasm of the Abyss — a pitch-black vertical dungeon. Bring a light source. Drop carefully through branching paths lined with Humanity Phantoms that grab and drain your health. Manus waits at the very bottom. He is widely considered the hardest boss in Dark Souls: enormous health, staggering melee combos, and devastating dark magic barrages. Use the Silver Pendant (found in the DLC) to deflect his magic projectiles."
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function BossRow({ boss, index, isVisible, isDefeated, onToggle }) {
  const [guideOpen, setGuideOpen] = useState(false);

  if (!isVisible) {
    return (
      <div className="boss-row locked">
        <div className="boss-main">
          <span className="boss-index">{String(index).padStart(2, "0")}</span>
          <div style={{ width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Lock size={15} color="var(--text-dim)" />
          </div>
          <div className="boss-info">
            <div className="boss-name" style={{ color: "var(--text-dim)", fontStyle: "italic", fontSize: 18 }}>
              ??? ??? ???
            </div>
            <div className="boss-area">
              <MapPin size={13} />
              <span>Unknown</span>
            </div>
          </div>
          <Lock size={17} color="var(--text-dim)" style={{ opacity: 0.35 }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`boss-row ${isDefeated ? "defeated" : ""}`}>
      <div className="boss-main">
        <span className="boss-index">{String(index).padStart(2, "0")}</span>
        <div className="boss-check">
          <Checkbox
            checked={isDefeated}
            onCheckedChange={(checked) => onToggle(boss.id, checked)}
          />
        </div>
        <div className="boss-info">
          <div className="boss-name">{boss.name}</div>
          <div className="boss-area">
            {/* <MapPin size={18} /> */}
            <span>{boss.area}</span>
          </div>
        </div>
        <div className="boss-badges">
          {isDefeated && <Skull size={18} className="skull-icon" />}
          <span className={boss.optional ? "badge-optional" : "badge-mandatory"}>
            {boss.optional ? "Optional" : "Main"}
          </span>
          <button
            className={`guide-btn ${guideOpen ? "open" : ""}`}
            onClick={() => setGuideOpen(v => !v)}
          >
            {guideOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            Guide
          </button>
        </div>
      </div>
      {guideOpen && (
        <div className="guide-body">
          <div className="guide-label">
            <MapPin size={20} style={{ display: "inline", marginRight: 5 }} />
            How to reach
          </div>
          <div className="guide-text">{boss.guide}</div>
        </div>
      )}
    </div>
  );
}

function BossList({ bosses, defeated, onToggle }) {
  const totalDefeated = bosses.filter(b => defeated.has(b.id)).length;

  return (
    <div>
      <div className="section-label">
        <Swords size={13} />
        {totalDefeated} / {bosses.length} Defeated
      </div>
      <div className="boss-list">
        {bosses.map((boss, i) => {
          const prevBoss = bosses[i - 1];
          const isVisible = i === 0 || defeated.has(prevBoss.id);
          return (
            <BossRow
              key={boss.id}
              boss={boss}
              index={i + 1}
              isVisible={isVisible}
              isDefeated={defeated.has(boss.id)}
              onToggle={onToggle}
            />
          );
        })}
      </div>
      {totalDefeated === bosses.length && (
        <div className="completion-banner">
          <div className="completion-title">
            <Flame size={18} style={{ display: "inline", marginRight: 8 }} />
            All Bosses Defeated
          </div>
          <div className="completion-text">
            The age of fire persists by your hand, Chosen Undead.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function SpoilerlessSouls() {
  const [baseDefeated, setBaseDefeated] = useState(new Set());
  const [dlcDefeated,  setDlcDefeated]  = useState(new Set());

  const totalAll      = BASE_BOSSES.length + DLC_BOSSES.length;
  const totalDefeated = baseDefeated.size + dlcDefeated.size;
  const pct           = Math.round((totalDefeated / totalAll) * 100);

  const handleBase = (id, checked) => setBaseDefeated(prev => {
    const next = new Set(prev);
    checked ? next.add(id) : next.delete(id);
    return next;
  });
  const handleDlc = (id, checked) => setDlcDefeated(prev => {
    const next = new Set(prev);
    checked ? next.add(id) : next.delete(id);
    return next;
  });

  return (
    <>
      <style>{STYLES}</style>
      <div className="souls-root">

        <div className="header">
          <div className="header-ornament">
            <div className="ornament-line" />
            <Skull size={32} color="var(--ember)" />
            <div className="ornament-line right" />
          </div>
          <div className="game-title">SPOILER<span>LESS</span> SOULS</div>
          <div className="game-subtitle">DARK SOULS REMASTERED · BOSS CHECKLIST</div>
        </div>

        <div className="progress-section">
          <div className="progress-label">
            <span className="progress-text">Bosses Slain</span>
            <span className="progress-count">{totalDefeated} / {totalAll}</span>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="tabs-wrap">
          <Tabs defaultValue="base">
            <TabsList
              className="tab-list"
              style={{
                background: "var(--stone)", border: "1px solid var(--stone-lt)",
                borderRadius: 4, padding: 4, display: "flex", gap: 3, height: "auto",
              }}
            >
              <TabsTrigger
                value="base"
                className="tab-trigger"
                style={{
                  fontFamily: "'EB Garamond', serif", fontSize: 20,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  flex: 1, padding: "14px 24px", borderRadius: 3,
                  border: "none", cursor: "pointer", transition: "all 0.2s",
                  background: "transparent",
                }}
              >
                ⚔ Base Game
              </TabsTrigger>
              <TabsTrigger
                value="dlc"
                className="tab-trigger"
                style={{
                  fontFamily: "'EB Garamond', serif", fontSize: 20,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  flex: 1, padding: "14px 24px", borderRadius: 3,
                  border: "none", cursor: "pointer", transition: "all 0.2s",
                  background: "transparent",
                }}
              >
                ✦ Artorias of the Abyss
              </TabsTrigger>
            </TabsList>

            <TabsContent value="base">
              <BossList bosses={BASE_BOSSES} defeated={baseDefeated} onToggle={handleBase} />
            </TabsContent>

            <TabsContent value="dlc">
              <div className="dlc-header">
                <div className="dlc-title">Artorias of the Abyss</div>
                <div className="dlc-sub">Access via the golden portal in Darkroot Basin</div>
              </div>
              <BossList bosses={DLC_BOSSES} defeated={dlcDefeated} onToggle={handleDlc} />
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </>
  );
}