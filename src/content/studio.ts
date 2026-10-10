export type ProjectCategory = "Residential" | "Hospitality" | "Retail";

export type Project = {
  slug: string;
  number: string;
  title: string;
  location: string;
  year: string;
  category: ProjectCategory;
  area: string;
  lede: string;
  materials: string;
  essay: string[];
  plates: string[];
};

// All content is illustrative. These are concepts, not completed commissions.
export const projects: Project[] = [
  {
    slug: "neem-courtyard", number: "01", title: "Neem Courtyard Apartment",
    location: "Indiranagar, Bengaluru", year: "2026", category: "Residential", area: "1,850 sq ft",
    lede: "A home imagined around a quiet courtyard, filtered light and the rituals of an ordinary afternoon.",
    materials: "Lime plaster · teak · local granite",
    essay: [
      "This fictional apartment study begins with a simple question: how can a compact city home make room for stillness? The proposed plan places shared spaces along the courtyard edge, allowing daylight to move through the living and dining rooms.",
      "A continuous palette of lime plaster and muted stone gives each room a common language. Reclaimed teak is proposed for the doors and joinery, bringing warmth to the quieter surfaces.",
      "Storage sits within the architecture rather than in front of it. A deep window seat, a long dining table and a reading corner suggest different ways to inhabit the same room over the course of a day.",
    ],
    plates: ["Living room facing the courtyard", "Timber shelving and reading corner", "Dining room in afternoon light"],
  },
  {
    slug: "coffee-estate", number: "02", title: "Coffee Estate Bungalow",
    location: "Chikkamagaluru, Karnataka", year: "2026", category: "Residential", area: "3,200 sq ft",
    lede: "An imagined retreat that keeps its doors open to rain, landscape and the slower rhythms of an estate.",
    materials: "Red oxide · cane · terracotta",
    essay: [
      "This conceptual renovation explores how an older bungalow might be renewed without losing the qualities that make it familiar. A generous verandah becomes the organising element, linking rooms to the surrounding landscape.",
      "Red-oxide floors, cane screens and terracotta tiles form the proposed material palette. New elements are deliberately restrained, leaving space for weathering, repair and everyday use.",
      "The study separates restful rooms from shared spaces while preserving a direct connection to the outdoors. It is an illustrative design brief, with no completed building or client attached.",
    ],
    plates: ["Verandah looking towards the estate", "Bedroom opening towards the hills", "Terracotta roof and red-oxide verandah"],
  },
  {
    slug: "rangoli-bookshop", number: "03", title: "Rangoli Bookshop",
    location: "Basavanagudi, Bengaluru", year: "2026", category: "Retail", area: "920 sq ft",
    lede: "A neighbourhood bookshop concept with a place to browse, a place to sit and a shelf for unexpected discoveries.",
    materials: "Birch plywood · Kota stone · linen",
    essay: [
      "This fictional retail study treats the bookshop as a sequence of small discoveries. Lower shelves keep the entrance open, while deeper shelving creates quieter pockets towards the back.",
      "The proposed Kota-stone floor and pale timber joinery leave the books as the main source of colour. A window bench gives readers a reason to pause without interrupting circulation.",
      "Flexible display tables allow the space to change for readings and small gatherings. The concept demonstrates a possible approach to a compact neighbourhood shop rather than a real commission.",
    ],
    plates: ["Shelving along the entrance", "Window bench and reading table", "Flexible display tables and shelving"],
  },
  {
    slug: "courtyard-cafe", number: "04", title: "The Courtyard Café",
    location: "Mysuru, Karnataka", year: "2026", category: "Hospitality", area: "1,400 sq ft",
    lede: "A café concept shaped by a shaded courtyard and the pleasure of taking a little longer over coffee.",
    materials: "Local granite · limewash · woven cane",
    essay: [
      "This hospitality concept imagines a café arranged around an existing courtyard. The service counter sits to one side, preserving a clear view from the street to the shaded seating beyond.",
      "A proposed palette of local granite, limewash and woven cane gives the interior a tactile character. Seating varies from shared tables to smaller places at the edge of the courtyard.",
      "Daylight and natural ventilation inform the brief, with covered circulation intended to make the courtyard usable in changing weather. All project details are illustrative.",
    ],
    plates: ["Courtyard seating beneath the canopy", "Granite counter and service area", "Cane seating and limewashed walls"],
  },
];

export const services = [
  { title: "Interior design", body: "A considered plan for the whole home, from the first conversation to the smallest joinery detail.", scope: ["Space planning and concept direction", "Materials, lighting and furniture", "Working drawings and coordination"] },
  { title: "Thoughtful renovation", body: "An approach to older spaces that begins with what is worth keeping, then makes room for what comes next.", scope: ["Existing-space review", "Layout and finish proposals", "Restoration and specialist coordination"] },
  { title: "Furniture & joinery", body: "Pieces imagined for a particular room and a particular way of living, rather than chosen from a catalogue.", scope: ["Custom furniture concepts", "Joinery drawings and material studies", "Fabrication coordination"] },
];

export const process = [
  { title: "Listen", text: "Begin with the place, the people and the everyday life the space should support." },
  { title: "Explore", text: "Develop a spatial direction through plans, materials and conversations." },
  { title: "Resolve", text: "Translate the idea into coordinated details, drawings and a clear scope." },
  { title: "Make", text: "Carry the design through fabrication and site work, with care for the final details." },
];
