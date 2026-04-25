// ─────────────────────────────────────────────────────────────────────────────
// Dark Souls Remastered — boss data
//
// Display order: sorted by progressionIndex, main bosses before optional
// within the same stage.
//
//   isOptional: boolean
//     Whether the boss is on the critical main path. Only main (non-optional)
//     bosses advance the progression counter.
//
//   progressionIndex: number
//     • Main bosses:    their 0-based sequential position among all main bosses.
//                       Boss N becomes visible after bosses 0…N-1 are defeated.
//     • Optional bosses: the number of main bosses that must be defeated first.
//                       They appear alongside the appropriate stage without
//                       blocking the next main boss from unlocking.
// ─────────────────────────────────────────────────────────────────────────────

export const BASE_BOSSES = [
	{
		id: 1,
		name: "Asylum Demon",
		area: "Northern Undead Asylum",
		isOptional: false,
		progressionIndex: 0,
		guide: "Your very first encounter in the game. You'll stumble upon it in a large hall before acquiring a real weapon — sprint past it through the side door on the left. Later, return from above via a broken floor ledge and deal a plunging attack to begin the fight properly. A solid weapon and some patience will see you through.",
	},
	{
		id: 2,
		name: "Taurus Demon",
		area: "Undead Burg",
		isOptional: false,
		progressionIndex: 1,
		guide: "From the Undead Burg bonfire, push through the burg and cross the dragon bridge. Continue up the battlements. The fog gate sits atop a narrow bridge. Clear the two crossbowmen from the ladder platform first, then drop a plunging attack on the demon as it approaches. Repeat the trick as needed — it deals massive damage.",
	},
	{
		id: 3,
		name: "Bell Gargoyles",
		area: "Undead Parish",
		isOptional: false,
		progressionIndex: 2,
		guide: "From Undead Burg, continue into the Undead Parish church. Fight through the armored Balder Knights inside. Ascend the stairs to the rooftops and climb to the top of the bell tower. The fog gate awaits at the peak. A second gargoyle joins when the first reaches ~50% HP — Solaire of Astora's summon sign is right outside the fog gate to help.",
	},
	// Stage 2 optionals — unlock alongside Bell Gargoyles
	{
		id: 4,
		name: "Moonlight Butterfly",
		area: "Darkroot Garden",
		isOptional: true,
		progressionIndex: 2,
		guide: "From the Undead Parish blacksmith Andre, use the Stone Armor Set door key to enter Darkroot Garden. Navigate the forest path past the awakened stone guardians and cross the stone bridge at the far end. The butterfly hovers high above — use ranged attacks, sorceries, or pyromancies exclusively. It rarely descends to melee range.",
	},
	{
		id: 5,
		name: "Stray Demon",
		area: "Northern Undead Asylum",
		isOptional: true,
		progressionIndex: 2,
		guide: "Return to the Northern Undead Asylum by finding the crow's nest on the Firelink Shrine roof. In the asylum, return to your starting cell and drop through the broken floor. The Stray Demon lurks below. It uses a devastating AoE magic slam — stay close to its legs and roll through attacks. Bring your best gear.",
	},
	{
		id: 6,
		name: "Capra Demon",
		area: "Lower Undead Burg",
		isOptional: false,
		progressionIndex: 3,
		guide: "Accessible through the locked door near the Undead Burg bonfire (needs the Residence Key from the Undead Merchant, or the Master Key). Descend into Lower Undead Burg. Warning: two attack dogs rush you the instant you enter. Immediately run left up the stairs to reset the chaos, then deal with the dogs first before facing the Demon.",
	},
	// Stage 3 optional — Darkroot Garden great door, accessible from Parish
	{
		id: 7,
		name: "Sif, the Great Grey Wolf",
		area: "Darkroot Garden",
		isOptional: true,
		progressionIndex: 3,
		guide: "Head to Darkroot Garden via the Undead Parish. Past the stone guardians, find the large circular sealed door — it costs 20,000 souls or the Crest of Artorias from Andre. Beyond it lies a misty, grave-filled forest clearing. Sif's fog gate is at the far end. Note: defeating Sif grants the Covenant of Artorias, required to reach The Four Kings.",
	},
	{
		id: 8,
		name: "Gaping Dragon",
		area: "The Depths",
		isOptional: false,
		progressionIndex: 4,
		guide: "After the Capra Demon drops the Blighttown Key, head back to the door near its fog gate and enter The Depths. Navigate the torch-lit sewers — watch out for giant rats and face-hugging basilisks that inflict Curse. The boss chamber is behind a large set of double doors at the end. Solaire and Lautrec can both be summoned outside.",
	},
	// Stage 4 optional — Catacombs accessible from Firelink area
	{
		id: 9,
		name: "Pinwheel",
		area: "The Catacombs",
		isOptional: true,
		progressionIndex: 4,
		guide: "Reach The Catacombs from Firelink Shrine by descending the graveyard stairs. Bring a Divine-infused weapon to permanently slay the respawning skeletons. Navigate the torch-lit tombs and bone traps to reach an elevator that takes you deeper. Pinwheel's fog gate is at the bottom. This is one of the game's easiest bosses — destroy it before its clone count grows.",
	},
	{
		id: 10,
		name: "Chaos Witch Quelaag",
		area: "Blighttown",
		isOptional: false,
		progressionIndex: 5,
		guide: "Descend through Blighttown from The Depths (or via Valley of Drakes with the Master Key). Stock up on Purple Moss Clumps and equip poison-resistance gear. Reach the toxic swamp floor at the bottom. Find the passage behind a large tree root leading into a cave — a hidden bonfire sits inside. Past a spider-webbed wall is the fog gate into Quelaag's domain.",
	},
	{
		id: 11,
		name: "Ceaseless Discharge",
		area: "Demon Ruins",
		isOptional: false,
		progressionIndex: 6,
		guide: "After ringing both Bells of Awakening, head through Sen's Fortress and Anor Londo to unlock Lordvessel access. In the boss chamber, pick up the armor set on the altar to trigger the fight. Bait the boss into slamming its arm on the ground near you, then punish the arm — this is the safest and fastest strategy.",
	},
	{
		id: 12,
		name: "Iron Golem",
		area: "Sen's Fortress",
		isOptional: false,
		progressionIndex: 7,
		guide: "With both Bells rung, the large iron gate near the Undead Parish opens into Sen's Fortress. Survive the pendulum blades, pitfall floors, and boulder traps. Navigate up and take the elevator to the rooftop. The Iron Golem guards the exit at the very top. Stagger it repeatedly near the roof's edge and it will topple off — an instant kill.",
	},
	// Stage 7 optional — painting is inside Anor Londo cathedral
	{
		id: 13,
		name: "Crossbreed Priscilla",
		area: "Painted World of Ariamis",
		isOptional: true,
		progressionIndex: 7,
		guide: "In Anor Londo's main cathedral, find the large painting on the ground floor and interact with it to be pulled into the Painted World of Ariamis. Complete the snowy, undead-filled painted world. Priscilla waits at the end in a circular snowfield. She is actually peaceful by default and will not aggress first — you may simply exit via the entrance ledge.",
	},
	{
		id: 14,
		name: "Dragon Slayer Ornstein & Executioner Smough",
		area: "Anor Londo",
		isOptional: false,
		progressionIndex: 8,
		guide: "The most infamous boss in the game. From the Anor Londo bonfire, carefully cross the rafters past the two silver knight archers — kill them first to save your sanity. Enter the cathedral via the front doors and proceed to the fog gate at the far end. Both bosses fight simultaneously. Summon Solaire if available — focus Ornstein first for the safer power-up, or Smough first for a more nimble super form.",
	},
	// Stage 8 optional — hidden tomb beneath the cathedral, accessible after Ornstein & Smough
	{
		id: 22,
		name: "Dark Sun Gwyndolin",
		area: "Anor Londo",
		isOptional: true,
		progressionIndex: 8,
		guide: "After defeating Ornstein and Smough, ascend to the cathedral chamber where you receive the Lordvessel. A concealed staircase descends from there into the Darkmoon Tomb — a long, narrow corridor lit by stained glass. Gwyndolin floats at the far end and retreats deeper down the hall after each wound, so chase relentlessly. He attacks almost exclusively at range with homing soul masses and magic arrows — sprint forward to close the gap and stay aggressive, as he is fragile in melee. A fast bow works equally well from afar.",
	},
	{
		id: 15,
		name: "Demon Firesage",
		area: "Demon Ruins",
		isOptional: false,
		progressionIndex: 9,
		guide: "Progress deeper into the Demon Ruins after defeating Ceaseless Discharge. Navigate past the lava pits, stone demons, and prowling centipede creatures. The Firesage is found at the end of the ruin's lower level, just before Lost Izalith. Its moveset mirrors the Asylum Demon but adds fire-infused ground slams. Stay at medium range and bait attacks before retaliating.",
	},
	{
		id: 16,
		name: "Centipede Demon",
		area: "Demon Ruins",
		isOptional: false,
		progressionIndex: 10,
		guide: "Continue past the Firesage deeper into the Demon Ruins. The Centipede Demon guards the entrance to Lost Izalith in a lava-filled arena. Equip the Orange Charred Ring to walk the lava safely. You can also cut off its tail to obtain the ring. Stay on the small stone platforms and hit the main body.",
	},
	{
		id: 17,
		name: "Bed of Chaos",
		area: "Lost Izalith",
		isOptional: false,
		progressionIndex: 11,
		guide: "Enter Lost Izalith through the Demon Ruins (after Centipede Demon) or via the Chaos Servant shortcut at Rank 2. First destroy both glowing orange growths on the sides of the arena. Then make a running jump across the crumbling floor to strike the bug in the center. The floor collapses so move quickly.",
	},
	{
		id: 18,
		name: "Gravelord Nito",
		area: "Tomb of the Giants",
		isOptional: false,
		progressionIndex: 12,
		guide: "Through The Catacombs and Pinwheel's arena, descend into the Tomb of the Giants. It is completely pitch black — equip the Skull Lantern or the Sunlight Maggot helmet. Edge carefully along the narrow cliffs among colossal skeleton enemies. Rest at the second bonfire and continue downward. Bring fire for extra damage.",
	},
	{
		id: 19,
		name: "Seath the Scaleless",
		area: "Crystal Cave",
		isOptional: false,
		progressionIndex: 13,
		guide: "From Anor Londo's first bonfire, take the left shortcut path through an elevator to The Duke's Archives. Your initial meeting with Seath is scripted — let him kill you. You'll wake imprisoned in a cell; escape and work through the archives. Take the gondola down to Crystal Cave. Cross the invisible walkways carefully. Destroy Seath's glowing crystal tail first to make him truly mortal.",
	},
	{
		id: 20,
		name: "The Four Kings",
		area: "The Abyss — New Londo Ruins",
		isOptional: false,
		progressionIndex: 14,
		guide: "First obtain the Covenant of Artorias ring (from Sif). Descend to New Londo Ruins via the Firelink elevator. Kill Ingward the mage for the Key to the Seal. Drain the ruins' floodwaters using the lever at the top. Fight through the Darkwraiths to the open tower and dive into the hole with the ring equipped. High DPS wins — dispatch each King before the next spawns.",
	},
	{
		id: 21,
		name: "Gwyn, Lord of Cinder",
		area: "Kiln of the First Flame",
		isOptional: false,
		progressionIndex: 15,
		guide: "Collect all four Lord Souls and offer them to the Lordvessel at Firelink Shrine. This unlocks the passage to the Kiln of the First Flame — a brief but harrowing area with Black Knight enemies amid crumbling ash. Gwyn awaits at the end. He is relentlessly aggressive but extremely parry-able — learning his rhythm and parrying will trivialize the fight. Defeat him to end the age.",
	},
];

export const DLC_BOSSES = [
	{
		id: 1,
		name: "Sanctuary Guardian",
		area: "Sanctuary Garden",
		isOptional: false,
		progressionIndex: 0,
		guide: "Enter the DLC by travelling to Darkroot Basin (below Darkroot Garden, near the hydra lake). Interact with the golden glowing portal — it transports you to Sanctuary Garden in Oolacile. The Guardian is a massive, venomous manticore lurking right at the area's exit. It is fast, poisons, and can leap surprising distances. Block or roll its tail sweep and punish after its slam combos.",
	},
	{
		id: 2,
		name: "Knight Artorias",
		area: "Royal Wood",
		isOptional: false,
		progressionIndex: 1,
		guide: "From Oolacile Sanctuary, travel through the Royal Wood forest — past the corrupted Bloatheads, golems, and humanity phantoms. Find the boss colosseum clearing and activate the elevator shortcut nearby before entering. Artorias is blindingly fast with brutal combos and can buff himself with a dark aura. Prioritize rolling and counter-attacking — never trade hits. One of the hardest boss fights in the game.",
	},
	// Stage 1 optional — Hawkeye Gough is reachable after Artorias's area
	{
		id: 3,
		name: "Black Dragon Kalameet",
		area: "Royal Wood Canyon",
		isOptional: true,
		progressionIndex: 1,
		guide: "After defeating Artorias, find Hawkeye Gough in his tower in the Royal Wood (accessible via a ladder in the area). Speak with him and he will shoot Kalameet from the sky, making it accessible. Descend to the canyon below Royal Wood. Kalameet hits extraordinarily hard — especially the Calamity Eye beam, which inflicts a permanent damage-doubling curse. Stay close to its body and aim for the tail.",
	},
	{
		id: 4,
		name: "Manus, Father of the Abyss",
		area: "Chasm of the Abyss",
		isOptional: false,
		progressionIndex: 2,
		guide: "After Oolacile Township, descend into the Chasm of the Abyss — a pitch-black vertical dungeon. Bring a light source. Drop carefully through branching paths lined with Humanity Phantoms that grab and drain your health. Manus waits at the very bottom. He is widely considered the hardest boss in Dark Souls: enormous health, staggering melee combos, and devastating dark magic barrages. Use the Silver Pendant (found in the DLC) to deflect his magic projectiles.",
	},
];
