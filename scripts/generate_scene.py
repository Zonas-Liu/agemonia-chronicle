#!/usr/bin/env python3
"""Generate one named chronicle illustration through the managed image plugin."""
from pathlib import Path
import runpy
import sys

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images" / "gen"
CDN = "https://zonas-liu.github.io/agemonia-chronicle/images"
STYLE = "Epic fantasy oil painting, realistic painterly style, detailed oil texture. "

SCENES = {
    "ch7-statue": {
        "refs": ["hero-main.jpg"],
        "prompt": STYLE + "Awe-struck low-angle wide shot inside a vast ruined sea-temple hall, dome vanishing into darkness, columns carved with seaweed and waves. A colossal sea goddess statue holds a great shield upright in one hand and lifts a silver orb high overhead with the other. The orb blossoms with deep azure light spreading like calm water through every crack, dust suspended like star-sand. The same four adventurers from the reference stand small at the base, seen from behind: blue-grey silver-haired knight with wyvern shield, purple-skinned golden-crowned warrior, bald mage in purple and gold robes with shell-topped staff, huge rock golem with glowing blue crystals on his back. Rubble around the plinth, deep ocean-blue and silver palette, serene and solemn.",
    },
    "ch7-spider": {
        "refs": ["Lunara_new.png"],
        "prompt": STYLE + "Dramatic low-angle action shot inside a spider-choked sea cave. Match the female knight in the reference exactly: blue-grey skin, short silver-white hair, long tail, dark plate armor, large dented shield bearing a golden wyvern crest. She braces low behind the raised shield against a colossal broodmother spider with exactly eight jointed legs and eight glistening eyes, barbed forelimbs crashing down, fangs tipped with venom. The impact plows two furrows beneath her boots; her tail is rigid but she refuses to retreat. Behind her, a stocky blue-green reptilian beast with exactly four softly glowing eyes crouches half-freed from torn webbing, radiating a faint soothing halo. Grey-white spider silk hangs like rotting sails and drifting mist. Cold blue cave palette cut by poisonous green bioluminescence, one warm highlight on the golden wyvern crest.",
    },
    "ch8-pillar": {
        "refs": ["hero-main.jpg"],
        "prompt": STYLE + "Epic wide establishing shot. An endless sea of blade-thorns stretches to the horizon, sword-hard poisonous green and rust-red leaves forming a wall of blades under a low overcast sky. A colossal ancient pillar of moonsilver and marble climbs into low clouds, its base glowing eerie deep blue like frozen ocean depths, silver radiance flowing along marble veins as if the pillar breathes. High on the pillar, exactly four colossal weathered stone heads face the four directions. At the pillar foot, a giant blood-red crystal half-buried in scorched twisted ground pulses with slow heartbeat-like crimson light, illuminating a clearing where several angular light-chitin demons bask. The four adventurers from the reference appear small in the foreground picking their way through the thorns. Cold blue pillar light against blood-red crystal glow over a dark green thorn sea, ominous and majestic.",
    },
    "ch8-graznak": {
        "refs": ["Lunara_new.png"],
        "prompt": STYLE + "Brutal low-angle action shot from behind the defender's shoulder. Match the female knight in the reference exactly: blue-grey skin, short silver-white hair, long tail, dark plate armor, cracked shield bearing a golden wyvern crest. Her feet dig into scorched black earth, sliding back but holding the line, blood trickling from her temple, both arms braced behind the battered shield. Towering over her, a colossal rift-lord demon, a burly giant with exactly four muscular arms: two upper arms smashing down, two lower arms reaching to grapple. Blood-red light streams from his eye sockets, casting two long red shadows; ash and embers swirl around his horns. The shield impact kicks up dust; her boots plow two deep furrows yet she does not yield. Far behind, a sphere of intense blue energy floats toward a dark swirling portal silhouette. Black-and-ember palette torn by red eye-light and one distant cold blue glow.",
    },
    "ch8-portal": {
        "refs": ["ZuvaSai_new.png"],
        "prompt": STYLE + "Wide dramatic shot inside a seamless moonsilver chamber. A colossal vertical black vortex is being wrenched shut, its dark spiral tightening ring by ring, embers and fanged shadows flashing in its depths as violent wind howls inward, dragging ash, rubble and demon remains into the shrinking maw. A demon lord with exactly four arms claws eight furrows into the moonsilver floor as he is dragged helplessly toward the vortex. In the foreground, a glowing three-by-three grid holds seven stone slabs carved with a leaf, snake, butterfly, mushroom, sun and star, now complete and ringing with ancient light; four magic circles at the cardinal points fade. Beside the nearest circle, an enormous shaggy pack-beast, a mountain of matted fur with great wet black eyes and bloodied flanks, lies collapsed in exhaustion yet still planted between the circle and the demons. Match the bald grey-blue skinned mage from the reference, layered purple and gold robes, kneeling beside the beast gripping a shell-topped staff. Ash falls like black snow. Moonsilver blue-white against void-black with ember-orange at the vortex heart, solemn triumph.",
    },
    "ch9-hydra": {
        "refs": ["hero-main.jpg"],
        "prompt": STYLE + "Dynamic wide battle tableau in a moonlit primeval forest of enormous colorful sacred trees. A colossal reptilian benaethid with one massive low-slung body and exactly six long serpentine necks, each neck ending in exactly one head, six heads total, green acidic saliva smoking on the moss. Match three adventurers from the reference: a huge rock golem with glowing blue crystal clusters swings a warhammer into the soft unscaled root of one neck, never severing the head; a blue-grey skinned silver-haired female knight braces a cracked wyvern-crested shield against another lunging head; a bald grey-blue skinned mage in layered purple and gold robes projects a powerful water jet into the wounded neck root to stop regeneration. No fourth adventurer. Broken phosphorescent trees, flying leaves, acid scars and circling winged reptiles silhouetted in the night sky. Moon-silver blue light against toxic green acid and warm multicolored foliage, desperate but heroic.",
    },
    "ch9-shrine": {
        "refs": ["Jonai_new.png"],
        "prompt": STYLE + "Intimate mysterious shot inside a moon-silver veined cavern shrine. Match the purple-skinned female warrior from the reference exactly: glowing golden eyes, golden winged crown-helmet topped with a red crystal, long blonde hair, bronze pauldrons over white feathered chest armor, scaled cuirass, flowing orange cape. Seen in three-quarter profile, she carefully places the third small glowing rune stone into the last of exactly three diamond-shaped sockets on a coiled serpent statue of the death goddess. The statue has glittering diamond eyes warming with pleasure, its stone mouth opening to release a single dark-red ring. Pale blue moon-silver veins illuminate damp carved walls, ghostly lichen and drifting mist; two already inserted rune stones glow in the other sockets. Cold moonlit blue and violet palette with a single warm blood-red accent, reverent, dangerous, intricate oil detail.",
    },
}


def main() -> None:
    if len(sys.argv) != 2 or sys.argv[1] not in SCENES:
        raise SystemExit("usage: python3 scripts/generate_scene.py <" + "|".join(SCENES) + ">")
    name = sys.argv[1]
    scene = SCENES[name]
    args = [
        "image_direct.py", "generate",
        "--description", scene["prompt"],
        "--size", "1152x640",
        "--background", "opaque",
        "--output", str(OUT / f"raw-{name}.png"),
    ]
    for ref in scene["refs"]:
        args.extend(["--reference-image", f"{CDN}/{ref}"])
    sys.argv = args
    runpy.run_path(str(ROOT / "scripts" / "image_direct.py"), run_name="__main__")


if __name__ == "__main__":
    main()
