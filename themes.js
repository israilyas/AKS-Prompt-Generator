/**
 * Aks - Theme configurations
 * Contains the presets for the 10 prompt framework sections.
 * This is a plain JavaScript file designed to run client-side without a build step.
 */

const AksThemes = {
  saree: {
    name: "Saree portrait",
    fields: {
      identity: [
        "A portrait of a 24-year-old South Asian woman with elegant features and expressive eyes",
        "A close-up shot of a graceful Pakistani bride with detailed traditional makeup",
        "A portrait of an elderly South Asian grandmother with warm wrinkles and a gentle smile",
        "A candid portrait of a young Indian woman with wind-swept hair and small silver jhumkas"
      ],
      scene: [
        "smiling warmly during a festive family gathering",
        "standing gracefully in a sunlit veranda",
        "walking slowly through a historic garden path",
        "sitting by a window looking out at the rain"
      ],
      outfit: [
        "wearing a crimson silk saree with an elaborate gold embroidered border",
        "dressed in an emerald green georgette saree featuring delicate phulkari work",
        "wearing a pastel pink organza saree with hand-painted floral motifs",
        "wearing a traditional royal blue Kanjeevaram saree with a matching designer blouse"
      ],
      pose: [
        "looking directly into the camera with quiet confidence",
        "gazing thoughtfully out of the window with a soft smile",
        "adjusting her silver jhumka with one hand",
        "holding the edge of her saree pallu while standing poised"
      ],
      camera: [
        "shot at eye-level",
        "captured from a subtle low angle",
        "three-quarter portrait view",
        "close-up portrait framing"
      ],
      lighting: [
        "illuminated by soft, diffused golden hour sunlight",
        "dramatic low-key lighting with warm side light",
        "bright and clean studio softbox lighting",
        "warm window light creating gentle shadows"
      ],
      lens: [
        "captured with an 85mm lens at f/1.4 showing creamy bokeh",
        "shot using a 50mm prime lens for realistic proportions and sharp details",
        "taken with a 105mm macro lens highlighting textile textures and jewelry details",
        "captured with a high-end DSLR camera and 85mm portrait lens"
      ],
      background: [
        "with a rustic haveli courtyard in the soft-focus background",
        "with a blooming bougainvillea wall behind her",
        "with a warm, textured studio backdrop",
        "with a blurred festive home interior lit by fairy lights"
      ],
      mood: [
        "evoking a warm, nostalgic mood",
        "conveying a serene, peaceful feeling",
        "reflecting a bold, celebratory tone",
        "creating an elegant, classic atmosphere"
      ],
      negative: [
        "Avoid extra fingers, blurry face, distorted eyes, warped hands, and low resolution.",
        "Do not include distorted textures, extra limbs, out of focus details, or artificial lighting artifacts.",
        "Avoid deformed facial features, bad proportions, double chin, and oversaturated colors.",
        "Free of extra appendages, pixelated areas, grainy noise, and unnatural poses."
      ]
    }
  },
  jersey: {
    name: "Football jersey portrait",
    fields: {
      identity: [
        "A portrait of a young South Asian boy with short hair and excited eyes",
        "A candid photo of a teenage girl with a cheerful expression and painted face details",
        "A close-up of a passionate young couple smiling together",
        "A portrait of an energetic young man with a trimmed beard and athletic build"
      ],
      scene: [
        "cheering enthusiastically for his team in the stands",
        "holding a football under his arm on a local pitch",
        "celebrating a goal under bright stadium floodlights",
        "standing proud against a chain-link fence at a community field"
      ],
      outfit: [
        "wearing a classic Messi-style Argentina jersey",
        "wearing a Ronaldo-style Portugal national jersey",
        "wearing a custom red and black club jersey with 10 on the front",
        "wearing a vibrant green national team jersey with white trim"
      ],
      pose: [
        "raising a fist in celebration with a wide smile",
        "looking confidently at the camera with arms crossed",
        "pointing proudly to the club crest on the jersey",
        "laughing candidly with a companion just out of frame"
      ],
      camera: [
        "captured from a dynamic low angle",
        "shot at eye-level with a medium close-up",
        "three-quarter action portrait framing",
        "dramatic high-angle shot looking down"
      ],
      lighting: [
        "illuminated by dramatic, bright stadium floodlights",
        "lit by the harsh, high-contrast midday sun",
        "bathed in warm, golden hour light",
        "dramatic side lighting with intense highlights and deep shadows"
      ],
      lens: [
        "shot with a fast 135mm telephoto lens for a compressed background",
        "captured on a 70-200mm f/2.8 lens for sharp action detail and smooth bokeh",
        "taken with an 85mm prime lens at f/1.8",
        "shot with a high-speed sports camera for crisp, freeze-frame clarity"
      ],
      background: [
        "with a massive, packed football stadium blurred in the background",
        "with a local green pitch and city skyline in the soft-focus distance",
        "with stadium gates and flags fluttering behind",
        "with goal posts and a net visible in the soft background"
      ],
      mood: [
        "evoking a bold and triumphant mood",
        "creating an energetic and passionate feeling",
        "conveying a joyful and celebratory tone",
        "reflecting a determined and competitive atmosphere"
      ],
      negative: [
        "Avoid extra fingers, blurry face, distorted team logos, warped text on jersey, and low quality.",
        "Do not include deformed hands, double logos, spelling errors on jersey, or pixelation.",
        "Avoid bad anatomy, extra limbs, blurry stadium details, and distorted facial features.",
        "Free of extra appendages, double heads, out of focus subject, and unnatural body stretching."
      ]
    }
  },
  hajj: {
    name: "Hajj / Umrah portrait",
    fields: {
      identity: [
        "A portrait of a serene 30-year-old pilgrim with a calm and peaceful expression",
        "A close-up shot of a humble pilgrim with tears of gratitude in their eyes",
        "A portrait of an elderly South Asian pilgrim with a white beard and peaceful gaze",
        "A candid photo of a pilgrim couple looking forward with serene expressions"
      ],
      scene: [
        "standing in quiet contemplation",
        "offering a silent prayer with raised hands",
        "walking peacefully among the crowd of pilgrims",
        "sitting quietly on a marble floor in reflection"
      ],
      outfit: [
        "wearing clean white ihram garments",
        "wearing a simple, modest white thobe",
        "dressed in a modest, simple abaya and hijab",
        "wearing a loose-fitting grey cotton kurta and simple garments"
      ],
      pose: [
        "holding hands open in prayer, head slightly bowed",
        "looking ahead with a serene, grateful smile",
        "standing quietly with hands folded in front",
        "sitting in a peaceful posture of reflection"
      ],
      camera: [
        "shot from a respectful eye-level",
        "captured from a gentle three-quarter angle",
        "medium portrait framing",
        "close-up portrait focusing on peaceful facial expressions"
      ],
      lighting: [
        "bathed in the soft, cool morning light",
        "illuminated by the warm golden hour glow of late afternoon",
        "bright, diffused natural daylight",
        "soft, indirect ambient light reflecting off white marble surfaces"
      ],
      lens: [
        "shot with an 85mm prime lens for a clean, respectful separation from the background",
        "captured using a 50mm lens for natural, un-distorted perspective",
        "taken with a high-resolution camera for soft, subtle details",
        "shot with a standard portrait lens creating a gentle background blur"
      ],
      background: [
        "with the courtyard near the Haram area visible in a soft, respectful blur",
        "with Mecca-adjacent white marble architecture in the soft-focus distance",
        "with a gentle, out-of-focus view of the open courtyard under a clear sky",
        "with simple, elegant arches of the mosque corridors softly blurred behind"
      ],
      mood: [
        "evoking a deeply calm and reverent mood",
        "conveying a peaceful, humble, and spiritual feeling",
        "reflecting a serene atmosphere of gratitude",
        "creating a quiet, introspective, and holy tone"
      ],
      negative: [
        "Avoid extra fingers, blurry face, disrespectful framing, distorted features, and low resolution.",
        "Do not include unnatural expressions, deformed hands, out-of-focus details, or busy commercial logos.",
        "Avoid bad proportions, pixelated textures, extra limbs, and dramatic cinematic lighting.",
        "Free of extra appendages, distorted architecture, bad anatomy, and oversaturated colors."
      ]
    }
  },
  eid: {
    name: "Eid family portrait",
    fields: {
      identity: [
        "A portrait of a multi-generational South Asian family, including parents, two children, and grandparents",
        "A close-up of a happy South Asian couple with their young daughter",
        "A photo of three smiling siblings of various ages standing close together",
        "A warm portrait of grandparents sitting with their grandchildren around them"
      ],
      scene: [
        "smiling together during Eid celebrations",
        "sharing sweets and laughter in a decorated living room",
        "greeting each other warmly in a sunlit courtyard",
        "sitting together on a traditional sofa looking at the camera"
      ],
      outfit: [
        "wearing coordinated pastel-colored salwar kameez and sherwanis with subtle embroidery",
        "dressed in festive Eid outfits, featuring intricate silk kurtas and colorful dupattas",
        "wearing elegant traditional clothing with matching jhumkas and waistcoats",
        "dressed in classic white and cream cotton kurtas and pajamas"
      ],
      pose: [
        "leaning in close with warm, genuine smiles",
        "standing together in a natural, happy group arrangement",
        "laughing together while sharing a traditional sweet",
        "grandparents seated in the center with children standing behind them"
      ],
      camera: [
        "shot at eye-level with a medium-wide group framing",
        "captured from a slightly elevated angle to show the group clearly",
        "medium shot capturing the family from the waist up",
        "centered, balanced portrait composition"
      ],
      lighting: [
        "illuminated by warm, soft indoor lighting and fairy lights",
        "bathed in bright, natural morning light from a large window",
        "lit by the gentle, warm glow of late afternoon sun",
        "soft, diffused ambient studio lighting for a clean look"
      ],
      lens: [
        "shot with a 35mm prime lens to capture the group and environment naturally",
        "captured on a 50mm lens for sharp details and minimal distortion",
        "taken with a high-resolution camera for crisp details on all faces",
        "shot with a professional portrait lens for a gentle background separation"
      ],
      background: [
        "with a beautifully decorated home interior featuring subtle Eid banners and lights",
        "with a warm, festive living room setting in a soft blur",
        "with a clean, elegant veranda decorated with potted plants and lanterns",
        "with a soft-focus festive backdrop of warm yellow lights"
      ],
      mood: [
        "evoking a warm, joyful, and festive mood",
        "conveying a sense of family warmth, connection, and happiness",
        "reflecting a celebratory, bright, and cheerful tone",
        "creating a cozy, loving, and nostalgic atmosphere"
      ],
      negative: [
        "Avoid extra fingers, blurry faces, distorted eyes, warped bodies, and low resolution.",
        "Do not include bad expressions, extra limbs, overlapping faces, or pixelated background details.",
        "Avoid deformed facial features, incorrect perspective, double heads, and bad color grading.",
        "Free of extra appendages, distorted clothing patterns, out of focus subjects, and unnatural poses."
      ]
    }
  }
};
