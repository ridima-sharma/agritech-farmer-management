export const FARMING_RESOURCES = [
  {
    id: "res-01",
    title: "NPK Soil Nutrition & Balanced Fertilization Guide",
    category: "Soil & Fertilizers",
    icon: "🧪",
    readTime: "4 min read",
    badge: "Essential Practice",
    summary: "Optimize Nitrogen (N), Phosphorus (P), and Potassium (K) application according to soil testing results rather than blanket dosage.",
    keyPoints: [
      "Standard ideal ratio for cereal crops (Wheat, Paddy, Maize) is 4:2:1 (N:P:K).",
      "For pulses and oilseeds, prioritize Phosphorus and Potassium (1:2:1 or 1:2:2 ratio) as legumes fix their own nitrogen.",
      "Switch to Neem-coated Urea to slow down nitrogen release, prevent volatilization, and improve nutrient uptake by 15-20%.",
      "Apply secondary micronutrients (Zinc, Boron, Sulfur) based on Soil Health Card to prevent hidden crop deficiencies."
    ],
    fullGuide: `
### Understanding Balanced Soil Nutrition

Soil fertility declines over successive harvest cycles when nutrient extraction exceeds replenishment. Blanket application of urea leads to excessive vegetative growth, lodging, and increased susceptibility to insect pests.

#### Recommended Action Steps:
1. **Soil Sampling Frequency**: Test topsoil (0-15 cm) every 2 years before sowing the main season crop.
2. **Basal Dose Application**: Apply 100% of Phosphorus and Potassium, along with 33% of Nitrogen, during final land preparation before seed placement.
3. **Split Nitrogen Dosing**: Top-dress the remaining Nitrogen in two equal splits: at tillering/crown root initiation (21 days) and panicle initiation (45-50 days).
4. **Organic Matter Supplementation**: Inward incorporate 5-8 tonnes of well-rotted Farm Yard Manure (FYM) or Vermicompost per acre annually to improve cation exchange capacity and water retention.
    `,
    officialLink: "https://soilhealth.dac.gov.in/",
  },
  {
    id: "res-02",
    title: "Micro-Irrigation (Drip & Sprinkler) Setup & Water Conservation",
    category: "Modern Irrigation",
    icon: "💧",
    readTime: "5 min read",
    badge: "Subsidy Available",
    summary: "Save 40% to 60% irrigation water while boosting fertilizer efficiency up to 30% through fertigation in row crops and orchards.",
    keyPoints: [
      "Subsidies up to 55% for small/marginal farmers and 45% for other farmers under PMKSY (Per Drop More Crop).",
      "Inline dripper spacing: 30-40 cm for vegetables, 50-60 cm for sugarcane and cotton.",
      "Pressure regulation: maintain 1.0 - 1.5 kg/cm² operating pressure at the end of the lateral line.",
      "Acid treatment with 0.5% hydrochloric acid once a season dissolves calcium and salt clogging inside emitters."
    ],
    fullGuide: `
### Why Precision Micro-Irrigation Is Essential

Traditional flood irrigation causes up to 60% water loss through evaporation, deep percolation, and runoff. Drip systems deliver water and water-soluble fertilizers directly to the active root zone.

#### Key Implementation Steps:
1. **Head Unit Installation**: Install gravel/sand filter for canal water or disc/screen filter (120 mesh) for borewell water to prevent nozzle blockages.
2. **Venturi Injector Setup**: Connect a Venturi fertilizer injector between the filter and mainline for automated fertigation.
3. **Flushing Routine**: Open end caps of all sub-mains and laterals bi-weekly for 2-3 minutes to flush out suspended silt particles.
4. **Government Application**: Apply online on state agriculture horticulture portals with 7/12 land records, Aadhaar, and electricity bill to claim PMKSY subsidy.
    `,
    officialLink: "https://pmksy.gov.in/",
  },
  {
    id: "res-03",
    title: "Integrated Pest Management (IPM) & Organic Spray Formulas",
    category: "Crop Protection",
    icon: "🐛",
    readTime: "6 min read",
    badge: "Eco-Friendly",
    summary: "Control sucking pests, pod borers, and fungal blights while protecting beneficial predators like ladybugs, honeybees, and spiders.",
    keyPoints: [
      "Install Yellow Sticky Traps (10/acre) for whiteflies/aphids and Blue Traps for thrips.",
      "Deploy pheromone lures (5-6 traps/acre) to monitor pink bollworm and Helicoverpa moth outbreaks early.",
      "Neem Seed Kernel Extract (NSKE 5%) or 10,000 PPM Neem Oil (2-3 ml/liter) acts as an excellent anti-feedant.",
      "Spray bio-fungicide Trichoderma harzianum (5g/liter) during humid spells to combat root rot and wilt."
    ],
    fullGuide: `
### Step-by-Step Integrated Pest Management Strategy

IPM combines cultural, biological, and chemical methods to keep pest populations below the Economic Injury Level (EIL) rather than attempting eradication with expensive chemical cocktails.

#### Preventive Cultural Practices:
- **Intercropping & Border Crops**: Sow 2 rows of Maize or Sorghum around cotton fields as a barrier trap crop.
- **Bird Perches**: Install 15-20 T-shaped wooden bird perches per acre to attract insectivorous birds like black drongos.
- **Pheromone Traps**: Check trap catches every alternate day. If catches exceed 8 moths/trap for 3 consecutive days, trigger targeted bio-spray.
- **Safe Spraying Protocol**: Wear mask, spray during early morning or late afternoon, and avoid spraying against wind direction.
    `,
    officialLink: "https://ppqs.gov.in/",
  },
  {
    id: "res-04",
    title: "PM-KISAN Samman Nidhi & PM Fasal Bima Yojana (PMFBY)",
    category: "Government Schemes",
    icon: "🏛️",
    readTime: "4 min read",
    badge: "Direct Benefit",
    summary: "Key details, eligibility criteria, Aadhaar e-KYC steps, and insurance claim guidelines for central farmer support schemes.",
    keyPoints: [
      "PM-KISAN provides ₹6,000 annual income support in 3 equal installments of ₹2,000 directly via DBT.",
      "PMFBY premium: Farmer pays only 2% for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops.",
      "Crop loss intimation deadline: Report localized damage (cyclone, hailstorm, inundation) within 72 hours via the Crop Insurance App.",
      "Mandatory e-KYC can be completed via OTP on the PM-KISAN portal or through CSC centers with facial recognition."
    ],
    fullGuide: `
### Maximizing Benefits from Central Agricultural Schemes

#### 1. Pradhan Mantri Kisan Samman Nidhi (PM-KISAN):
- **Eligibility**: All landholding farmer families with cultivable land in their names.
- **Required Documents**: Land registry (Khata/Khasra), Aadhaar card linked with active bank account (NPCI DBT enabled).
- **Status Check**: Verify beneficiary status and PFMS payment bank approval on pmkisan.gov.in using your mobile number.

#### 2. Pradhan Mantri Fasal Bima Yojana (PMFBY):
- **Coverage**: Pre-sowing/planting risk, standing crop yield losses, mid-season adversity, and post-harvest localized losses.
- **Emergency Helpline**: Call toll-free 14447 or 1800-180-1551 within 72 hours of unseasonal rain or hailstorm damage.
    `,
    officialLink: "https://pmkisan.gov.in/",
  },
  {
    id: "res-05",
    title: "Scientific Post-Harvest Drying, Grading & Storage Techniques",
    category: "Post-Harvest Management",
    icon: "🌾",
    readTime: "5 min read",
    badge: "Loss Reduction",
    summary: "Prevent up to 15% post-harvest grain losses caused by fungal mold, weevils, and moisture damage in farm storage.",
    keyPoints: [
      "Sun-dry harvested grains on clean tarpaulins until moisture falls below 12% for cereals and 9% for oilseeds.",
      "Test grain dryness: A dry grain crackles sharply when pressed between teeth without yielding soft flour.",
      "Store grains in multi-layer hermetic bags (PICS bags) that create an oxygen-depleted environment suffocating storage insects.",
      "Keep grain bags on wooden pallets (dunnage) 1 foot away from warehouse walls to stop moisture seepage."
    ],
    fullGuide: `
### Safeguarding Your Hard-Earned Harvest

Improper farm storage leads to heavy distress selling right after harvest when mandi rates are at their lowest seasonal trough.

#### Storage Best Practices:
1. **Cleaning and Winnowing**: Remove chaff, broken kernels, and weed seeds before bagging, as dust pockets harbor insect eggs.
2. **Hermetic Storage Solutions**: Purdue Improved Crop Storage (PICS) bags or metal silos maintain grain quality for over 12 months without chemical fumigation.
3. **Natural Repellents**: Mix dried neem leaves (2 kg per 100 kg grain) or activated wood ash to naturally deter pulse beetles and granary weevils.
4. **e-NAM Integration**: Register lots on the National Agriculture Market (e-NAM) portal for transparent multi-buyer electronic auctions.
    `,
    officialLink: "https://enam.gov.in/",
  },
  {
    id: "res-06",
    title: "Organic Composting, Jeevamrut & Zero Budget Natural Farming",
    category: "Sustainable Farming",
    icon: "🌱",
    readTime: "4 min read",
    badge: "Low Cost",
    summary: "Prepare low-cost fermented microbial inoculants using desi cow dung, urine, jaggery, and pulse flour to restore native soil biology.",
    keyPoints: [
      "Jeevamrut formula: 10kg desi cow dung + 10L cow urine + 2kg jaggery + 2kg besan + handful of virgin forest soil in 200L water.",
      "Ferment for 48-72 hours in shade, stirring clockwise twice daily with a wooden staff.",
      "Apply 200 liters per acre through irrigation water or as a 10% foliar spray every 21 days.",
      "Mulching (Achhadana) with crop residue retains soil moisture, suppresses weeds, and moderates soil temperatures."
    ],
    fullGuide: `
### Revitalizing Soil Microbes with Bio-Formulations

Natural bio-inoculants do not feed the plant directly; instead, they inoculate the soil with billions of beneficial rhizosphere bacteria and mycorrhizal fungi that solubilize locked-up soil phosphorus and minerals.

#### Application Schedule:
- **Seed Treatment (Bijamrit)**: Coat seeds before sowing to protect against soil-borne pathogens and promote vigorous radicle emergence.
- **First Application**: 14 days after germination along with light irrigation.
- **Second Application**: At vegetative peak prior to flowering.
- **Cost Savings**: Reduces chemical input expenditure by ₹4,000 - ₹7,000 per acre while improving soil earthworm counts.
    `,
    officialLink: "https://agricoop.nic.in/",
  },
];

export const KISAN_HELPLINES = [
  {
    name: "Kisan Call Center (Central Govt)",
    number: "1800-180-1551",
    timings: "06:00 AM - 10:00 PM (Daily)",
    desc: "Toll-free advisory in 22 local languages by agronomists.",
    badge: "Toll Free",
  },
  {
    name: "Crop Insurance Helpdesk (PMFBY)",
    number: "14447",
    timings: "24/7 Helpline",
    desc: "Direct support for lodging localized crop loss claims within 72 hrs.",
    badge: "24/7 Service",
  },
  {
    name: "ICAR Krishi Vigyan Kendra (KVK)",
    number: "011-25841662",
    timings: "09:30 AM - 05:30 PM (Mon-Fri)",
    desc: "District agricultural scientist consultation and soil testing queries.",
    badge: "Expert Advice",
  },
];
