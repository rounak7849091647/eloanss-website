/* ELOANSS — site content & product catalogue */

const site = {
  name: "ELOANSS",
  tagline: "Your Trusted Partner for Loans, Insurance & Investments",
  domain: "eloanss.com",
  phone: "+91 90308 14455",
  phoneHref: "+919030814455",
  // WhatsApp deep-link target. Set to the main line — change if WhatsApp is a different number.
  whatsapp: "919030814455",
  email: "care@eloanss.com",
  // Rendered into HTML text, so the ampersand is escaped here.
  address: "#8-3-903/F/7&amp;10, Ratna Complex, Flat No: 404, Opp. R.S. Brothers, Y R Guda, Ameerpet, Hyderabad – 500038",
  rating: "4.8",
  reviews: "12,400+",
  customers: "50,000+",
  partners: "45+",
  disbursed: "₹1,200 Cr+",
};

/* --- Loan catalogue ------------------------------------------------------- */
const loans = [
  {
    slug: "personal-loan", name: "Personal Loan", icon: "user",
    tagline: "Instant funds for weddings, travel, medical needs or any personal goal — no collateral required.",
    rate: "10.25% – 24%", amount: "₹50,000 – ₹40 Lakh", tenure: "12 – 60 months",
    emi: { amount: [50000, 4000000, 800000], rate: [10.25, 24, 13], tenure: [1, 5, 4] },
    intro: "A personal loan gives you quick, unsecured access to money for whatever life throws your way — a wedding, a medical emergency, home renovation, or consolidating existing debt. ELOANSS compares personal loan offers across 45+ banks and NBFCs so you get the lowest interest rate and the highest approval chance, with minimal paperwork.",
    benefits: [
      ["No collateral needed", "Fully unsecured — you don't have to pledge any asset or property."],
      ["Fast disbursal", "Eligible applicants can receive funds in as little as 24–72 hours."],
      ["Flexible tenure", "Repay comfortably over 12 to 60 months to suit your budget."],
      ["Multi-lender comparison", "We show you offers from many lenders side by side, free of cost."],
    ],
    eligibility: ["Salaried or self-employed, aged 21–60 years", "Minimum monthly income of ₹20,000 (varies by lender & city)", "Work experience of at least 1 year / business vintage of 2+ years", "Credit score of 700+ preferred for best rates"],
    documents: ["PAN & Aadhaar card", "Latest 3 months' salary slips", "Last 6 months' bank statements", "Passport-size photographs", "Employment / business proof", "Address proof"],
    features: ["Loan amounts up to ₹40 Lakh", "Balance transfer of existing high-cost loans", "Pre-approved offers for select customers", "Part-prepayment & foreclosure options", "Transparent processing fees, no hidden charges"],
    crossSell: ["term-insurance", "health-insurance"],
    faqs: [
      ["How much personal loan can I get?", "It depends on your income, credit score, existing obligations and the lender's policy. Most applicants qualify for a loan of 10–24× their net monthly salary, up to ₹40 Lakh."],
      ["Does applying affect my credit score?", "Checking your eligibility with ELOANSS is a soft enquiry and does not affect your score. A hard enquiry happens only when you formally apply with a chosen lender."],
      ["How fast can I get the money?", "For complete applications with clean documents, disbursal typically happens within 24–72 hours of final approval."],
      ["Can I foreclose my loan early?", "Yes. Most lenders allow foreclosure after a few EMIs. Foreclosure charges, if any, vary by lender — we highlight these before you commit."],
      ["What interest rate will I get?", "Rates start from 10.25% p.a. and depend on your credit profile, income and the lender. ELOANSS negotiates and compares to get you the best available rate."],
      ["Is a guarantor required?", "Generally no. Personal loans are unsecured and usually do not require a guarantor, though some lenders may ask for one in specific cases."],
    ],
  },
  {
    slug: "business-loan", name: "Business Loan", icon: "briefcase",
    tagline: "Fuel growth, manage working capital or expand operations with collateral-free business finance.",
    rate: "11% – 26%", amount: "₹1 Lakh – ₹2 Crore", tenure: "12 – 60 months",
    emi: { amount: [100000, 20000000, 2500000], rate: [11, 26, 15], tenure: [1, 5, 4] },
    intro: "Whether you're buying inventory, upgrading equipment, hiring, or bridging a cash-flow gap, a business loan keeps your enterprise moving. ELOANSS connects MSMEs, traders, manufacturers and professionals with the right lenders — offering both unsecured and secured options with competitive rates and quick turnaround.",
    benefits: [
      ["Collateral-free options", "Unsecured working-capital loans available for eligible businesses."],
      ["High loan amounts", "Access up to ₹2 Crore based on turnover and financials."],
      ["Minimal disruption", "Fast approvals so you never miss a business opportunity."],
      ["Custom structures", "Term loans, working capital and overdraft matched to your cash cycle."],
    ],
    eligibility: ["Business vintage of at least 2–3 years", "Minimum annual turnover as per lender norms", "Applicant aged 25–65 years", "Positive banking track record & filed ITRs"],
    documents: ["PAN & Aadhaar of proprietor / partners / directors", "Business registration / GST certificate", "Last 12 months' bank statements", "Last 2 years' ITR & financial statements", "Ownership / address proof of business"],
    features: ["Unsecured & secured business loans", "Working capital & term loan structures", "Overdraft and line-of-credit facilities", "Loans for MSMEs, traders & professionals", "GST-based and banking-based programs"],
    crossSell: ["property-insurance", "term-insurance"],
    faqs: [
      ["Do I need collateral for a business loan?", "Not necessarily. Many lenders offer unsecured business loans based on turnover and banking history. Secured loans can unlock larger amounts and lower rates."],
      ["What business types qualify?", "Proprietorships, partnerships, LLPs, private limited companies, traders, manufacturers and self-employed professionals can all apply, subject to vintage and turnover."],
      ["How is my eligibility calculated?", "Lenders assess your turnover, profitability, banking patterns, credit score and existing obligations to determine the amount and rate."],
      ["Can startups get a business loan?", "Early-stage businesses may find it harder to get unsecured loans. ELOANSS can suggest secured options or lenders with startup-friendly programs."],
      ["How long is the repayment period?", "Typically 12 to 60 months. Working-capital facilities may be renewable annually."],
    ],
  },
  {
    slug: "home-loan", name: "Home Loan / Mortgage Loan", icon: "home",
    tagline: "Own your dream home or unlock funds against property with long-tenure, low-rate financing.",
    rate: "8.35% – 11.5%", amount: "₹5 Lakh – ₹5 Crore", tenure: "Up to 30 years",
    emi: { amount: [500000, 50000000, 5000000], rate: [8.35, 11.5, 8.9], tenure: [5, 30, 20] },
    intro: "A home loan makes owning property affordable with long tenures and some of the lowest interest rates in the market. ELOANSS helps you compare home loans and loan-against-property (mortgage) offers, handle documentation, and secure the best rate — whether you're buying, constructing, renovating, or transferring an existing loan.",
    benefits: [
      ["Lowest interest rates", "Home loans carry the most competitive rates of any loan type."],
      ["Long repayment tenure", "Spread EMIs over up to 30 years for maximum affordability."],
      ["Tax benefits", "Claim deductions on principal and interest under the Income Tax Act."],
      ["Balance transfer", "Move your existing loan to a lower rate and save lakhs in interest."],
    ],
    eligibility: ["Salaried or self-employed, aged 23–65 years", "Stable income and repayment capacity", "Property with clear, marketable title", "Healthy credit score (700+ recommended)"],
    documents: ["PAN, Aadhaar & photographs", "Income proof (salary slips / ITR)", "Last 6 months' bank statements", "Property documents & sale agreement", "Approved building plan (for construction)"],
    features: ["Home purchase, construction & renovation", "Loan Against Property (LAP)", "Balance transfer + top-up", "Up to 90% funding of property value", "Fixed & floating rate options"],
    crossSell: ["property-insurance", "life-insurance"],
    faqs: [
      ["How much home loan can I get?", "Lenders typically fund up to 75–90% of the property value, subject to your income and repayment capacity."],
      ["What is the difference between a home loan and LAP?", "A home loan is to buy/build a home. A Loan Against Property (mortgage loan) lets you borrow against an existing property for any purpose."],
      ["Should I choose fixed or floating rate?", "Floating rates move with the market and are usually lower over time; fixed rates offer predictable EMIs. We help you decide based on your profile."],
      ["Can I transfer my existing home loan?", "Yes. A balance transfer to a lower rate can significantly reduce your interest outgo, often with a top-up loan option."],
      ["What tax benefits are available?", "You can claim deductions on principal (Sec 80C) and interest (Sec 24). Consult a tax advisor for your specific case."],
      ["How long does approval take?", "Home loan approval usually takes 5–10 working days depending on property and documentation."],
    ],
  },
  {
    slug: "plot-loan", name: "Open Plot Loan", icon: "landPlot",
    tagline: "Finance the purchase of a residential plot and build your future on your own land.",
    rate: "8.75% – 12%", amount: "₹5 Lakh – ₹3 Crore", tenure: "Up to 20 years",
    emi: { amount: [500000, 30000000, 3000000], rate: [8.75, 12, 9.5], tenure: [3, 20, 15] },
    intro: "An open plot loan helps you buy a residential land parcel from a development authority or approved layout, so you can build when you're ready. ELOANSS compares plot loan offers, clarifies funding ratios and helps you understand construction timelines that some lenders require.",
    benefits: [
      ["Buy land now, build later", "Secure your plot at today's price and construct at your pace."],
      ["Attractive rates", "Competitive interest rates close to home-loan levels."],
      ["Composite loan option", "Combine plot purchase + construction in a single facility."],
      ["Flexible tenure", "Repay over a tenure of up to 20 years."],
    ],
    eligibility: ["Salaried or self-employed, aged 23–65 years", "Plot within municipal / development authority limits", "Clear title and approved layout", "Adequate income and credit profile"],
    documents: ["PAN, Aadhaar & photographs", "Income proof (salary slips / ITR)", "Bank statements (6 months)", "Plot title & layout approval documents", "Encumbrance certificate"],
    features: ["Funding for approved residential plots", "Composite plot + construction loans", "Up to 70–80% of plot value", "Tenure up to 20 years", "Balance transfer available"],
    crossSell: ["property-insurance", "term-insurance"],
    faqs: [
      ["How much of the plot cost is funded?", "Lenders typically finance 70–80% of the plot value; the rest is your down payment."],
      ["Do I have to construct within a time limit?", "Many lenders require construction to begin within 2–5 years. We'll clarify the specific lender's condition before you apply."],
      ["Are tax benefits available on a plot loan?", "Tax benefits usually apply only once construction is complete and it becomes a home loan. Consult a tax advisor."],
      ["Can I buy agricultural land with this loan?", "No. Open plot loans are for residential plots within approved layouts, not agricultural land."],
      ["Can I get a composite loan?", "Yes, a composite loan covers both the plot purchase and subsequent construction under one account."],
    ],
  },
  {
    slug: "new-car-loan", name: "New Car Loan", icon: "car",
    tagline: "Drive home your new car with up to 100% on-road funding and quick approvals.",
    rate: "8.5% – 12%", amount: "₹1 Lakh – ₹1.5 Crore", tenure: "12 – 84 months",
    emi: { amount: [100000, 15000000, 900000], rate: [8.5, 12, 9.5], tenure: [1, 7, 5] },
    intro: "A new car loan puts your dream car within reach with high funding, low rates and long tenures. ELOANSS compares new car loan offers across banks and NBFCs, helping you secure attractive on-road financing with fast, hassle-free approval.",
    benefits: [
      ["Up to 100% funding", "Finance up to the full on-road price with eligible lenders."],
      ["Low interest rates", "Secured against the vehicle, so rates stay competitive."],
      ["Flexible tenure", "Repay over 1 to 7 years to keep EMIs comfortable."],
      ["Quick approval", "Fast processing so you can drive out sooner."],
    ],
    eligibility: ["Salaried or self-employed, aged 21–65 years", "Minimum income as per lender norms", "Stable employment / business", "Good credit history"],
    documents: ["PAN, Aadhaar & photographs", "Income proof (salary slips / ITR)", "Bank statements (3–6 months)", "Vehicle quotation / proforma invoice", "Address proof"],
    features: ["Funding up to 100% on-road price", "Loans for all car brands & models", "Tenure up to 84 months", "Attractive rates for premium cars", "Balance transfer & top-up options"],
    crossSell: ["vehicle-insurance", "term-insurance"],
    faqs: [
      ["How much of the car price can I finance?", "Depending on the lender and your profile, you can finance up to 90–100% of the on-road price."],
      ["What tenure can I choose?", "New car loans usually range from 12 to 84 months. Longer tenures reduce EMI but increase total interest."],
      ["Is car insurance mandatory?", "Yes. Comprehensive motor insurance is required and can be bundled — ask us for a free quote."],
      ["Can I prepay my car loan?", "Yes, most lenders allow prepayment/foreclosure after a few EMIs. Charges vary by lender."],
      ["Do I need a guarantor?", "Usually not, as the car serves as collateral. Some lenders may ask for one based on profile."],
    ],
  },
  {
    slug: "used-car-loan", name: "Used Car Loan", icon: "carUsed",
    tagline: "Buy a quality pre-owned car with affordable financing and flexible repayment.",
    rate: "11% – 18%", amount: "₹75,000 – ₹75 Lakh", tenure: "12 – 60 months",
    emi: { amount: [75000, 7500000, 600000], rate: [11, 18, 13.5], tenure: [1, 5, 4] },
    intro: "A used car loan lets you own a reliable pre-owned vehicle without straining your savings. ELOANSS helps you compare used car loan offers, understand valuation-based funding, and get approved quickly — whether buying from a dealer or a private seller.",
    benefits: [
      ["Own a car for less", "Get more car for your budget with pre-owned financing."],
      ["Valuation-based funding", "Loan amount based on the car's assessed market value."],
      ["Fast approvals", "Quick processing for dealer and private-sale purchases."],
      ["Flexible tenure", "Repay over 1 to 5 years to suit your budget."],
    ],
    eligibility: ["Salaried or self-employed, aged 21–65 years", "Vehicle age within lender's limit (usually up to 10 years at loan maturity)", "Stable income", "Satisfactory credit profile"],
    documents: ["PAN, Aadhaar & photographs", "Income proof", "Bank statements (3–6 months)", "Vehicle RC & valuation report", "Insurance copy"],
    features: ["Funding up to 80–90% of valuation", "Dealer & private-sale purchases", "Tenure up to 60 months", "Loans for all makes & models", "Refinance of existing used-car loans"],
    crossSell: ["vehicle-insurance"],
    faqs: [
      ["How is the loan amount decided?", "It's based on the used car's assessed market value (via valuation), typically funding 80–90% of that value."],
      ["What is the maximum age of car allowed?", "Most lenders require the car's age plus the loan tenure to be within 10–12 years."],
      ["Can I buy from a private seller?", "Yes. Both dealer and private-sale purchases can be financed, subject to proper documentation and transfer."],
      ["Is the interest rate higher than a new car loan?", "Slightly, since used vehicles carry more risk. ELOANSS still compares lenders to get you the best available rate."],
    ],
  },
  {
    slug: "two-wheeler-loan", name: "Two-Wheeler Loan", icon: "bike",
    tagline: "Ride your favourite bike or scooter home with easy EMIs and instant approvals.",
    rate: "9.5% – 26%", amount: "₹20,000 – ₹5 Lakh", tenure: "12 – 48 months",
    emi: { amount: [20000, 500000, 120000], rate: [9.5, 26, 14], tenure: [1, 4, 3] },
    intro: "A two-wheeler loan makes owning a bike or scooter simple and affordable, with high funding and quick approvals. ELOANSS compares two-wheeler loan offers so you get low EMIs and a smooth on-road experience for commuter bikes, premium motorcycles and electric scooters alike.",
    benefits: [
      ["Up to 100% funding", "Finance the full on-road price with eligible lenders."],
      ["Instant approvals", "Get approved quickly, often at the showroom."],
      ["Low EMIs", "Affordable monthly instalments over up to 48 months."],
      ["EV-friendly", "Special schemes for electric two-wheelers."],
    ],
    eligibility: ["Salaried or self-employed, aged 18–65 years", "Minimum income as per lender", "Valid address & identity proof", "Reasonable credit profile"],
    documents: ["PAN & Aadhaar", "Income proof (where required)", "Bank statement", "Vehicle quotation", "Photographs"],
    features: ["Funding up to 100% on-road price", "Loans for petrol & electric two-wheelers", "Tenure up to 48 months", "Minimal documentation", "Quick showroom approvals"],
    crossSell: ["vehicle-insurance"],
    faqs: [
      ["Can I finance the entire cost of the bike?", "Yes, eligible applicants can get up to 100% on-road funding with select lenders."],
      ["How fast is approval?", "Two-wheeler loans are often approved within hours, sometimes right at the dealership."],
      ["Are electric scooters covered?", "Absolutely. Many lenders offer special EV financing schemes for electric two-wheelers."],
      ["What is the minimum age to apply?", "You must be at least 18 years old and meet the lender's income and documentation norms."],
    ],
  },
  {
    slug: "commercial-vehicle-loan", name: "Commercial Vehicle Loan", icon: "truck",
    tagline: "Finance vans, pickups, tempos and light commercial vehicles to grow your transport business.",
    rate: "9% – 18%", amount: "₹1 Lakh – ₹50 Lakh", tenure: "12 – 60 months",
    emi: { amount: [100000, 5000000, 1200000], rate: [9, 18, 12], tenure: [1, 5, 4] },
    intro: "A commercial vehicle loan helps transporters, fleet owners and first-time buyers finance vans, pickups, tempos and light commercial vehicles. ELOANSS partners with lenders that understand the transport business, offering high funding, flexible tenures and quick disbursal.",
    benefits: [
      ["High funding", "Finance up to 90–100% of the vehicle's on-road cost."],
      ["Business-focused lenders", "Partners who understand transport cash flows."],
      ["Flexible repayment", "Tenures aligned to your earning cycle."],
      ["First-time buyer schemes", "Options for new operators, not just fleet owners."],
    ],
    eligibility: ["Individuals, proprietors, partnerships & companies", "Aged 21–65 years", "Transport / business experience preferred", "Valid commercial driving licence (for owner-drivers)"],
    documents: ["PAN & Aadhaar", "Income / business proof", "Bank statements", "Vehicle quotation / invoice", "Existing fleet RC (if any)"],
    features: ["Funding for LCVs, vans, pickups & tempos", "New & used commercial vehicles", "First-time & fleet operator programs", "Tenure up to 60 months", "Refinance & top-up options"],
    crossSell: ["heavy-vehicle-insurance", "vehicle-insurance"],
    faqs: [
      ["Who can apply for a commercial vehicle loan?", "Individuals, proprietors, partnership firms and companies engaged in or entering the transport business can apply."],
      ["Can first-time buyers get funding?", "Yes. Several lenders have first-time buyer schemes, though terms may differ from those for established fleet owners."],
      ["Are used commercial vehicles financed?", "Yes, subject to the vehicle's age, condition and valuation."],
      ["What tenure is available?", "Typically 12 to 60 months, aligned with the vehicle's earning potential."],
    ],
  },
  {
    slug: "heavy-commercial-vehicle-loan", name: "Heavy Commercial Vehicle Loan", icon: "truckHeavy",
    tagline: "Finance trucks, trailers, buses and construction equipment for large-scale operations.",
    rate: "9% – 16%", amount: "₹5 Lakh – ₹2 Crore", tenure: "12 – 60 months",
    emi: { amount: [500000, 20000000, 3500000], rate: [9, 16, 11.5], tenure: [1, 5, 4] },
    intro: "A heavy commercial vehicle loan funds trucks, trailers, tippers, buses and construction equipment for fleet operators and large transporters. ELOANSS connects you with specialist lenders offering high-value funding, competitive rates and structures matched to heavy-transport economics.",
    benefits: [
      ["High-value funding", "Loans up to ₹2 Crore for heavy vehicles & equipment."],
      ["Specialist lenders", "Partners experienced in heavy-transport finance."],
      ["Fleet expansion", "Structured finance to scale your fleet efficiently."],
      ["Attractive rates", "Competitive pricing for strong operators."],
    ],
    eligibility: ["Proprietors, partnerships, companies & fleet operators", "Aged 21–65 years", "Transport business track record", "Adequate financials & banking history"],
    documents: ["PAN & Aadhaar of owners / directors", "Business & income proof", "Bank statements (12 months)", "ITR & financials (2 years)", "Vehicle / equipment quotation"],
    features: ["Funding for trucks, trailers, tippers & buses", "Construction equipment finance", "New & used heavy vehicles", "Fleet & refinance programs", "Tenure up to 60 months"],
    crossSell: ["heavy-vehicle-insurance"],
    faqs: [
      ["What vehicles are covered?", "Trucks, trailers, tippers, tankers, buses and construction equipment such as excavators and cranes."],
      ["How much can I borrow?", "Depending on the asset and your financials, funding can go up to ₹2 Crore or more for strong operators."],
      ["Can I refinance existing vehicles?", "Yes. Refinance and top-up options let you unlock cash from vehicles you already own."],
      ["Is a business track record mandatory?", "An established transport track record improves terms, though some lenders consider new operators with adequate security."],
    ],
  },
  {
    slug: "project-loan", name: "Project Loan", icon: "building",
    tagline: "Long-term capital to set up, expand or modernise your industrial or infrastructure project.",
    rate: "10% – 16%", amount: "₹25 Lakh – ₹25 Crore+", tenure: "Up to 10 years",
    emi: { amount: [2500000, 250000000, 30000000], rate: [10, 16, 12], tenure: [3, 10, 7] },
    intro: "A project loan provides long-term funding to set up a new unit, expand capacity or modernise machinery for manufacturing, infrastructure and other capital-intensive projects. ELOANSS helps businesses structure project finance, prepare bankable proposals and connect with lenders offering the right terms.",
    benefits: [
      ["Large-ticket funding", "Finance capital-intensive projects from ₹25 Lakh to ₹25 Crore+."],
      ["Long tenure", "Repayment aligned to project cash flows, up to 10 years."],
      ["Structured finance", "Term loans, working capital and moratorium options."],
      ["Advisory support", "Help preparing a lender-ready project report."],
    ],
    eligibility: ["Companies, LLPs & partnership firms", "Viable, well-documented project plan", "Promoter contribution / margin money", "Sound financials & repayment ability"],
    documents: ["Detailed Project Report (DPR)", "Company KYC & registration", "Financials & projections", "Bank statements & existing loan details", "Collateral / security documents"],
    features: ["Greenfield & expansion projects", "Machinery & capacity modernisation", "Moratorium during construction phase", "Term loan + working capital packages", "Advisory on project structuring"],
    crossSell: ["property-insurance"],
    faqs: [
      ["What can a project loan be used for?", "Setting up a new manufacturing unit, expanding capacity, buying machinery, or modernising an existing facility."],
      ["Is a project report mandatory?", "Yes. A detailed, bankable project report with financial projections is essential. We can guide you in preparing it."],
      ["How much promoter contribution is needed?", "Lenders usually expect a margin (promoter contribution) of 20–35% of the project cost, depending on the sector and risk."],
      ["Is there a moratorium period?", "Many project loans offer a moratorium during construction/implementation, after which regular repayment begins."],
    ],
  },
  {
    slug: "overdraft-loan", name: "OD / Overdraft Loan", icon: "wallet",
    tagline: "A flexible credit line where you borrow only what you need and pay interest only on usage.",
    rate: "10% – 20%", amount: "₹1 Lakh – ₹5 Crore", tenure: "Renewable annually",
    emi: { amount: [100000, 50000000, 2000000], rate: [10, 20, 13], tenure: [1, 3, 1] },
    intro: "An overdraft facility gives your business a flexible credit line: you withdraw funds as needed up to a sanctioned limit and pay interest only on the amount used. ELOANSS helps you set up secured or unsecured overdrafts to manage working capital and seasonal cash-flow swings.",
    benefits: [
      ["Pay only for what you use", "Interest is charged on the utilised amount, not the full limit."],
      ["Instant liquidity", "Withdraw and repay flexibly to manage cash flow."],
      ["Renewable limit", "Facility renews annually based on performance."],
      ["Secured or unsecured", "Options against property, FD, or on a clean basis."],
    ],
    eligibility: ["Businesses, self-employed & professionals", "Aged 21–65 years", "Stable banking & income track record", "Collateral for secured OD (property / FD)"],
    documents: ["PAN & Aadhaar", "Business proof / GST", "Bank statements (12 months)", "ITR & financials", "Collateral documents (for secured OD)"],
    features: ["Overdraft against property or deposits", "Dropline & regular OD options", "Interest only on utilisation", "Annual renewal", "Working-capital cash management"],
    crossSell: ["property-insurance", "term-insurance"],
    faqs: [
      ["How is overdraft interest calculated?", "Interest applies only to the amount you actually use and for the days you use it — not the entire sanctioned limit."],
      ["What is a dropline overdraft?", "A dropline OD's limit reduces gradually each month, unlike a regular OD where the limit stays constant during the tenure."],
      ["Do I need collateral?", "Secured overdrafts require collateral like property or fixed deposits. Some lenders offer smaller unsecured limits based on banking history."],
      ["How often is the OD renewed?", "Overdraft limits are typically reviewed and renewed annually based on your usage and business performance."],
    ],
  },
  {
    slug: "gold-loan", name: "Gold Loan", icon: "gold",
    tagline: "Unlock instant cash against your gold jewellery at low rates — with your gold kept safe.",
    rate: "8.5% – 18%", amount: "₹10,000 – ₹1 Crore", tenure: "3 – 36 months",
    emi: { amount: [10000, 10000000, 300000], rate: [8.5, 18, 12], tenure: [1, 3, 2] },
    intro: "A gold loan is one of the fastest ways to raise money — pledge your gold jewellery or coins and get instant funds while your gold stays securely stored. ELOANSS compares gold loan offers for the best per-gram rate, lowest interest, and flexible repayment, ideal for short-term or emergency needs.",
    benefits: [
      ["Instant disbursal", "Get cash within an hour of valuation in many cases."],
      ["Low interest rates", "Secured by gold, so rates are among the lowest available."],
      ["No income proof needed", "Approval is based on your gold, not your salary or CIBIL."],
      ["Flexible repayment", "Choose EMI, bullet, or interest-only repayment options."],
    ],
    eligibility: ["Any individual aged 18+ owning eligible gold", "Gold jewellery / coins of 18–24 carat purity", "Valid KYC documents", "No minimum income or credit score requirement"],
    documents: ["PAN & Aadhaar (KYC)", "Address proof", "Passport-size photograph", "Gold ornaments / coins to pledge"],
    features: ["Loan per gram at best market rates", "High purity-based valuation", "Multiple repayment structures", "Secure, insured gold storage", "Quick top-up on existing gold loans"],
    crossSell: ["health-insurance"],
    faqs: [
      ["How is the gold loan amount decided?", "It's based on the weight and purity of your gold and the lender's loan-to-value ratio (regulated up to 75% of gold value)."],
      ["Is my gold safe?", "Yes. Pledged gold is sealed, insured and stored in secure vaults, and returned intact once you repay."],
      ["Do I need a good credit score?", "No. Because the loan is secured by gold, income proof and credit score are usually not required."],
      ["What repayment options are available?", "You can choose regular EMIs, interest-only payments with principal at the end, or a bullet repayment of the full amount at maturity."],
      ["How quickly can I get the money?", "Gold loans are among the fastest — funds are often disbursed within an hour of valuation."],
    ],
  },
];

/* --- Insurance catalogue -------------------------------------------------- */
const insurance = [
  { slug: "life-insurance", name: "Life Insurance", icon: "heart",
    tagline: "Secure your family's financial future with the right life cover.",
    intro: "Life insurance ensures your loved ones are financially protected if something happens to you. ELOANSS helps you compare life insurance plans — from pure protection to savings-linked policies — and pick cover that matches your family's needs and budget.",
    points: ["Financial protection for your family", "Savings & investment-linked plan options", "Tax benefits on premiums paid", "Flexible sum assured & policy terms"],
    faqs: [
      ["How much life cover do I need?", "A common rule is 10–15× your annual income, adjusted for liabilities, dependents and goals. We help you calculate the right amount."],
      ["What's the difference between life and term insurance?", "Term insurance is pure protection with no maturity payout. Life insurance often bundles protection with savings/investment components."],
      ["Are premiums tax-deductible?", "Premiums are generally eligible for deduction under Section 80C, subject to prevailing tax laws."],
    ] },
  { slug: "health-insurance", name: "Health Insurance", icon: "heartPulse",
    tagline: "Protect your savings from rising medical costs with comprehensive health cover.",
    intro: "Health insurance covers hospitalisation and medical expenses so a health emergency doesn't drain your savings. ELOANSS compares individual, family floater and senior-citizen plans across insurers to get you the best coverage at the right premium.",
    points: ["Cashless treatment at network hospitals", "Family floater & individual plans", "Coverage for pre & post hospitalisation", "Tax benefits under Section 80D"],
    faqs: [
      ["What is a family floater plan?", "A single policy that covers your whole family under one shared sum insured, usually more economical than separate policies."],
      ["What is cashless hospitalisation?", "At network hospitals, the insurer settles bills directly, so you don't pay upfront (subject to policy terms and approvals)."],
      ["Does health insurance cover pre-existing diseases?", "Yes, after a waiting period that varies by insurer and condition. We help you compare these waiting periods."],
    ] },
  { slug: "term-insurance", name: "Term Insurance", icon: "shield",
    tagline: "High life cover at low premiums — pure protection for your family.",
    intro: "Term insurance offers a large sum assured at an affordable premium, paying out to your family if you're no longer around. It's the most cost-effective way to protect dependents. ELOANSS compares term plans across insurers for the best cover, features and claim settlement record.",
    points: ["High cover at low premium", "Protection for your family's future", "Optional riders (critical illness, accident)", "Tax benefits under Section 80C"],
    faqs: [
      ["Why is term insurance so affordable?", "Because it's pure risk cover with no savings component, premiums are low for a very high sum assured."],
      ["Until what age should I be covered?", "Ideally until you have dependents or liabilities — commonly up to age 60–65 or until retirement."],
      ["What are riders?", "Add-ons like critical illness or accidental death cover that enhance your base term plan for a small extra premium."],
    ] },
  { slug: "travel-insurance", name: "Travel Insurance", icon: "plane",
    tagline: "Travel worry-free with cover for medical emergencies, delays and lost baggage.",
    intro: "Travel insurance protects you against medical emergencies, trip cancellations, flight delays, and lost baggage while travelling in India or abroad. ELOANSS helps you compare single-trip and multi-trip plans for the coverage you need at the best price.",
    points: ["Overseas & domestic medical cover", "Trip cancellation & delay protection", "Lost baggage & passport assistance", "Single-trip & annual multi-trip plans"],
    faqs: [
      ["Is travel insurance mandatory?", "Many countries (e.g. Schengen nations) require it for a visa. Even where optional, it's strongly recommended."],
      ["Does it cover medical emergencies abroad?", "Yes, most plans cover emergency medical treatment and hospitalisation overseas up to the sum insured."],
      ["Can I insure multiple trips a year?", "Yes. An annual multi-trip plan covers several journeys in a year and is cost-effective for frequent travellers."],
    ] },
  { slug: "property-insurance", name: "Property Insurance", icon: "building2",
    tagline: "Safeguard your home, office or business premises against fire, theft and disasters.",
    intro: "Property insurance protects your home, office, shop or factory against fire, theft, natural disasters and other risks. ELOANSS helps you compare home and commercial property insurance so your most valuable assets are properly covered.",
    points: ["Cover for fire, theft & natural calamities", "Home, office & commercial premises", "Contents & structure protection", "Optional cover for equipment & stock"],
    faqs: [
      ["What does property insurance cover?", "Typically the structure and/or contents against fire, burglary, natural disasters and specified perils, based on the plan you choose."],
      ["Is it required for a home loan?", "Lenders often require property insurance on mortgaged property. It's also simply wise protection for your asset."],
      ["Can I insure business stock and equipment?", "Yes. Commercial property policies can cover stock, machinery and equipment in addition to the premises."],
    ] },
  { slug: "vehicle-insurance", name: "Vehicle Insurance", icon: "car",
    tagline: "Comprehensive motor cover for your car or two-wheeler, with easy claims.",
    intro: "Vehicle insurance protects your car or two-wheeler against accidents, theft and third-party liability, as mandated by law. ELOANSS compares comprehensive and third-party motor plans to get you the best premium, add-ons and claim experience.",
    points: ["Mandatory third-party liability cover", "Comprehensive own-damage protection", "Zero-depreciation & roadside add-ons", "Cashless repairs at network garages"],
    faqs: [
      ["Is vehicle insurance compulsory?", "Yes. At minimum, third-party motor insurance is legally mandatory to drive on Indian roads."],
      ["What is zero-depreciation cover?", "An add-on that pays the full cost of replaced parts without deducting for depreciation, reducing your out-of-pocket claim expense."],
      ["What's the difference between comprehensive and third-party?", "Third-party covers only damage/injury to others. Comprehensive also covers damage to your own vehicle, theft and more."],
    ] },
  { slug: "heavy-vehicle-insurance", name: "Heavy Vehicle Insurance", icon: "truckHeavy",
    tagline: "Protect your trucks, buses and commercial fleet with specialised motor cover.",
    intro: "Heavy vehicle insurance covers trucks, buses, tippers and commercial fleets against accidents, third-party liability and own damage. ELOANSS works with insurers experienced in commercial motor cover to protect your vehicles, drivers and business.",
    points: ["Cover for trucks, buses & fleets", "Third-party & comprehensive options", "Driver & passenger protection", "Fleet policies for multiple vehicles"],
    faqs: [
      ["Can I insure my whole fleet on one policy?", "Yes. Fleet policies let you cover multiple commercial vehicles under a single arrangement, simplifying management."],
      ["Does it cover goods carried?", "Vehicle insurance covers the vehicle and liability; goods-in-transit is a separate cover we can also arrange."],
      ["Is driver cover included?", "Personal accident cover for drivers/owners can be included. We help you configure the right add-ons."],
    ] },
];

/* --- How it works --------------------------------------------------------- */
const steps = [
  ["Submit Enquiry", "Tell us what you need in a 2-minute form. It's free and puts you under no obligation.", "send"],
  ["Get Matched with Best Offers", "We compare offers from 45+ banks & NBFCs and present the best rates for your profile.", "search"],
  ["Document Verification", "Our experts guide you through paperwork and coordinate verification with the lender.", "fileText"],
  ["Loan Disbursed", "On approval, funds are disbursed directly to your account — fast and transparent.", "checkCircle"],
];

/* --- Testimonials --------------------------------------------------------- */
const testimonials = [
  ["Ravi Teja", "Hyderabad", "Personal Loan", "ELOANSS got me a personal loan at a rate 2% lower than my bank offered. The whole process took three days and the team handled every document. Truly stress-free.", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces"],
  ["Priya Menon", "Bengaluru", "Home Loan", "Comparing home loans felt overwhelming until ELOANSS stepped in. They negotiated a great floating rate and a balance transfer that saves me lakhs. Highly recommend.", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces"],
  ["Arjun Nair", "Chennai", "Business Loan", "As an MSME owner I needed working capital fast. ELOANSS matched me with an NBFC that understood my cash cycle. Funds came through in under a week.", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces"],
  ["Sneha Reddy", "Vijayawada", "Health Insurance", "They compared five health plans for my family and explained everything in plain language. No pushy sales — just honest, expert advice. Very trustworthy.", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces"],
  ["Mohammed Imran", "Hyderabad", "Car Loan", "Bought my new car with 100% on-road funding thanks to ELOANSS. The gold-coloured 'Apply Now' really is one click — approval was quick and transparent.", "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces"],
  ["Kavya Sharma", "Pune", "Gold Loan", "I needed emergency funds and got a gold loan the same day at a fantastic per-gram rate. My jewellery was stored securely and returned intact. Excellent service.", "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=faces"],
];

/* --- Blog ----------------------------------------------------------------- */
const posts = [
  ["how-to-improve-cibil-score", "Credit", "How to Improve Your CIBIL Score Before Applying for a Loan", "A strong credit score unlocks lower interest rates. Here are seven practical steps to boost your CIBIL score in a few months.", "Aug 28, 2026", "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=360&fit=crop"],
  ["fixed-vs-floating-home-loan", "Home Loan", "Fixed vs Floating Home Loan Rates: Which Should You Choose?", "Understand the trade-offs between fixed and floating interest rates so you can pick the option that saves you the most.", "Aug 20, 2026", "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=360&fit=crop"],
  ["personal-loan-vs-credit-card", "Personal Loan", "Personal Loan vs Credit Card: The Smarter Way to Borrow", "When you need funds, is a personal loan or a credit card the better choice? We break down cost, flexibility and risk.", "Aug 12, 2026", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=360&fit=crop"],
  ["term-insurance-guide", "Insurance", "Term Insurance 101: How Much Cover Does Your Family Really Need?", "A simple framework to calculate the right sum assured so your family is fully protected without overpaying.", "Aug 05, 2026", "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=360&fit=crop"],
  ["business-loan-checklist", "Business Loan", "The Complete Document Checklist for a Business Loan", "Get approval-ready with our comprehensive checklist of everything lenders ask for when you apply for a business loan.", "Jul 29, 2026", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=360&fit=crop"],
  ["gold-loan-vs-personal-loan", "Gold Loan", "Gold Loan vs Personal Loan: Which Is Cheaper for Quick Cash?", "Both offer fast funds, but the costs differ. Here's how to decide which is right for your short-term needs.", "Jul 22, 2026", "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&h=360&fit=crop"],
];

/* --- Partner benefits ----------------------------------------------------- */
const partnerBenefits = [
  ["High commissions", "Earn attractive payouts on every loan and insurance product you refer or close.", "coins"],
  ["45+ lender partners", "Give your clients access to our entire network of banks and NBFCs.", "layers"],
  ["Full training & support", "Onboarding, product training and a dedicated relationship manager.", "headset"],
  ["Marketing toolkit", "Ready-made creatives, brochures and a co-branded digital presence.", "award"],
  ["Real-time tracking", "A partner dashboard to track leads, applications and earnings.", "chart"],
  ["Zero investment", "Start with no franchise fee — grow your financial business risk-free.", "zap"],
];


/* ==========================================================================
   v2 homepage — navigation, goals, lenders, insurance grid, investing
   ========================================================================== */

/* Goal circles on the "What are you planning for?" road */
/* [label, href, icon, accent, photo slug in /assets/img/goals/] */
const goals = [
  ["Personal Loans", "/loans/personal-loan.html", "user", "#075E45", "personal"],
  ["Business & MSME Loans", "/loans/business-loan.html", "briefcase", "#0E7C6A", "business"],
  ["Home & Property Loans", "/loans/home-loan.html", "home", "#16845B", "home"],
  ["Vehicle Loans", "/loans/new-car-loan.html", "car", "#075E45", "vehicle"],
  ["Gold & Secured Loans", "/loans/gold-loan.html", "gold", "#C9A227", "gold"],
  ["Education / Student Loans", "/loans.html", "graduation", "#5F6B8A", "education"],
  ["Agriculture Loans", "/loans.html", "tractor", "#16845B", "agriculture"],
  ["Solar / Green Loans", "/loans.html", "sun", "#C9A227", "solar"],
  ["More Loans", "/loans.html", "layers", "#68716D", "more"],
];

/* Financial-journey hub nodes in the hero */
const journeyNodes = [
  ["Loans", "wallet"], ["Insurance", "shield"], ["Credit Cards", "creditCard"],
  ["Investments", "chart"], ["Credit Score", "gauge"], ["Wealth Creation", "leaf"],
];

/* Lending partners — placeholder names, swap for licensed logos before launch */
/* [display name, filter category, logo slug]
   Drop a licensed logo at public/assets/img/lenders/<slug>.(svg|png|webp|jpg) and the
   build picks it up automatically; until then a wordmark placeholder is rendered. */
const lenders = [
  ["HDFC Bank", "home", "hdfc-bank"],
  ["ICICI Bank", "personal", "icici-bank"],
  ["Axis Bank", "personal", "axis-bank"],
  ["SBI", "home", "sbi"],
  ["Kotak", "personal", "kotak"],
  ["IndusInd Bank", "vehicle", "indusind-bank"],
  ["Yes Bank", "business", "yes-bank"],
  ["IDFC First", "personal", "idfc-first"],
  ["Bank of Baroda", "home", "bank-of-baroda"],
  ["PNB", "home", "pnb"],
  ["Bajaj Finserv", "personal", "bajaj-finserv"],
  ["Tata Capital", "business", "tata-capital"],
  ["Muthoot Finance", "gold", "muthoot-finance"],
  ["Manappuram Finance", "gold", "manappuram-finance"],
  ["Lendingkart", "msme", "lendingkart"],
  ["Aditya Birla Capital", "business", "aditya-birla-capital"],
  ["HeroFinCorp", "vehicle", "herofincorp"],
  ["Piramal Finance", "home", "piramal-finance"],
  ["Fullerton India", "personal", "fullerton-india"],
  ["InCred", "msme", "incred"],
];
const lenderFilters = ["All", "Personal", "Business", "Home", "Vehicle", "Gold", "MSME"];

/* "Explore Our Loan Universe" tabs */
const loanUniverse = [
  ["Personal Loans", [
    ["Personal Loan", "/loans/personal-loan.html"], ["Consumer Durable Loan", "/loans/personal-loan.html"],
    ["Instant / Salary Loan", "/loans/personal-loan.html"], ["Top-up Loan", "/loans/personal-loan.html"],
    ["Medical Loan", "/loans/personal-loan.html"], ["Balance Transfer Personal Loan", "/loans/personal-loan.html"],
    ["Wedding Loan", "/loans/personal-loan.html"], ["Flexi Loan / Dropline OD", "/loans/overdraft-loan.html"],
    ["Travel Loan", "/loans/personal-loan.html"],
  ]],
  ["Business & MSME", [
    ["Business Loan", "/loans/business-loan.html"], ["Working Capital Loan", "/loans/overdraft-loan.html"],
    ["MSME / Mudra Loan", "/loans/business-loan.html"], ["Machinery Loan", "/loans/project-loan.html"],
    ["Term Loan", "/loans/business-loan.html"], ["Invoice Discounting", "/loans/business-loan.html"],
    ["Overdraft / OD Limit", "/loans/overdraft-loan.html"], ["Project Loan", "/loans/project-loan.html"],
    ["GST-based Business Loan", "/loans/business-loan.html"],
  ]],
  ["Home & Property", [
    ["Home Loan", "/loans/home-loan.html"], ["Loan Against Property", "/loans/home-loan.html"],
    ["Home Construction Loan", "/loans/home-loan.html"], ["Balance Transfer Home Loan", "/loans/home-loan.html"],
    ["Home Renovation Loan", "/loans/home-loan.html"], ["Lease Rental Discounting", "/loans/project-loan.html"],
    ["Open Plot Loan", "/loans/plot-loan.html"], ["NRI Home Loan", "/loans/home-loan.html"],
    ["Top-up Home Loan", "/loans/home-loan.html"],
  ]],
  ["Vehicle Loans", [
    ["New Car Loan", "/loans/new-car-loan.html"], ["Commercial Vehicle Loan", "/loans/commercial-vehicle-loan.html"],
    ["Used Car Loan", "/loans/used-car-loan.html"], ["Heavy Commercial Vehicle Loan", "/loans/heavy-commercial-vehicle-loan.html"],
    ["Two-Wheeler Loan", "/loans/two-wheeler-loan.html"], ["Construction Equipment Loan", "/loans/heavy-commercial-vehicle-loan.html"],
    ["Loan Against Car", "/loans/used-car-loan.html"], ["Tractor Loan", "/loans/commercial-vehicle-loan.html"],
    ["EV / Electric Vehicle Loan", "/loans/new-car-loan.html"],
  ]],
  ["Gold & Secured", [
    ["Gold Loan", "/loans/gold-loan.html"], ["Loan Against Securities", "/loans/overdraft-loan.html"],
    ["Gold Loan Balance Transfer", "/loans/gold-loan.html"], ["Loan Against FD", "/loans/overdraft-loan.html"],
    ["Loan Against Property", "/loans/home-loan.html"], ["Loan Against Insurance Policy", "/loans/overdraft-loan.html"],
    ["Loan Against Mutual Funds", "/loans/overdraft-loan.html"], ["Overdraft Against Property", "/loans/overdraft-loan.html"],
    ["Secured Business Loan", "/loans/business-loan.html"],
  ]],
  ["Education & Other", [
    ["Education Loan (India)", "/loans.html"], ["Agriculture Loan", "/loans.html"],
    ["Education Loan (Abroad)", "/loans.html"], ["Solar / Green Loan", "/loans.html"],
    ["Skill Development Loan", "/loans.html"], ["Professional Loan", "/loans/business-loan.html"],
    ["Study Abroad Financing", "/loans.html"], ["Doctor / CA Loan", "/loans/business-loan.html"],
    ["Loan for Self-employed", "/loans/business-loan.html"],
  ]],
];

/* Insurance grid — 4 headline cards + 9 compact tiles */
/* Four headline insurance cards.
   accent = icon/bullet colour, tint = icon chip background, img = corner photo. */
const insuranceMajor = [
  {
    name: "Life Insurance", icon: "heart", slug: "life-insurance",
    tagline: "Secure their future, always.",
    accent: "#D4626A", tint: "#FBEDEF",
    img: "https://images.unsplash.com/photo-1478061653917-455ba7f4a541?w=520&h=440&fit=crop",
    items: ["Term Plan", "Endowment Plan", "ULIP", "Retirement Plan", "Child Plan"],
  },
  {
    name: "Health Insurance", icon: "heartPulse", slug: "health-insurance",
    tagline: "Care for a healthier you.",
    accent: "#16845B", tint: "#E4F2EC",
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=520&h=440&fit=crop",
    items: ["Individual & Family", "Critical Illness", "Senior Citizen", "Personal Accident", "Top-up Plans"],
  },
  {
    name: "Motor Insurance", icon: "car", slug: "vehicle-insurance",
    tagline: "Drive with confidence.",
    accent: "#C9862A", tint: "#FBF1E0",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=520&h=440&fit=crop",
    items: ["Two Wheeler", "Four Wheeler", "Commercial", "Heavy Vehicle", "Pay As You Drive"],
  },
  {
    name: "Travel Insurance", icon: "plane", slug: "travel-insurance",
    tagline: "Explore the world, worry-free.",
    accent: "#0E7C6A", tint: "#E2F1EE",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=520&h=440&fit=crop",
    items: ["Single Trip", "Multi Trip", "Student Travel", "Senior Citizen", "Business Travel"],
  },
];

/* Nine supporting covers — [label, icon, target slug, accent, tint] */
const insuranceMinor = [
  ["Property / Home", "home", "property-insurance", "#D4626A", "#FBEDEF"],
  ["Shop / Office", "building", "property-insurance", "#16845B", "#E4F2EC"],
  ["Fire Insurance", "fire", "property-insurance", "#D9772E", "#FCEFE3"],
  ["Marine Insurance", "ship", "property-insurance", "#2F6DA8", "#E7F0F8"],
  ["Cyber Insurance", "lock", "property-insurance", "#7A5CC4", "#F0EBFA"],
  ["Pet Insurance", "paw", "health-insurance", "#3F9E6B", "#E8F4ED"],
  ["Mobile / Gadget", "smartphone", "property-insurance", "#C9A227", "#FAF3DC"],
  ["Professional Indemnity", "scaleIcon", "property-insurance", "#4E7C8A", "#EAF2F4"],
  ["Group / Employee", "users", "health-insurance", "#C4566E", "#FAEBEF"],
];

/* Three reassurance points beside the section headline */
const insuranceTrust = [
  ["Trusted Partners", "Top insurers in one place", "shield"],
  ["Compare Easily", "Find the best plans", "fileText"],
  ["Expert Support", "Always here for you", "headphones"],
];

/* "Why Choose ELOANSS?" pillars */
const whyPillars = [
  ["Compare Best Offers", "scale"], ["100% Secure", "lock"], ["Quick & Easy", "zap"],
  ["Expert Guidance", "headset"], ["Wide Range of Products", "layers"],
];

/* Investment tabs */
const investTabs = [
  ["Mutual Funds", "Equity, debt and hybrid funds from leading AMCs — start a SIP from ₹500 a month."],
  ["Fixed Deposit", "Corporate and bank FDs with attractive, assured rates and flexible payout options."],
  ["Digital Gold", "Buy, hold and sell 24K gold digitally from ₹100 — stored safely, redeemable anytime."],
  ["Bonds", "Government securities, corporate bonds and 54EC capital-gain bonds for stable income."],
];

/* Credit-card comparison selects */
const cardTypes = ["Rewards", "Cashback", "Travel", "Fuel", "Shopping", "Lifetime Free", "Business"];
const incomeBands = ["Below ₹3 Lakh", "₹3 – ₹6 Lakh", "₹6 – ₹12 Lakh", "₹12 – ₹25 Lakh", "Above ₹25 Lakh"];
const cardRewards = [["Travel", "plane"], ["Shopping", "shoppingBag"], ["Dining", "utensils"], ["Fuel", "fuel"], ["More", "dots"]];

/* Hero trust chips */
const heroChips = [
  ["100% Digital Process", "zap"], ["Secure & Trusted", "shield"],
  ["RBI Regulated Partners", "bank"], ["No Hidden Charges", "checkCircle"],
];

/* Partner-programme bullets on the Global Distributor panel */
const distributorPoints = ["Attractive Payouts", "Dedicated Support", "Wide Product Range", "Global Opportunities"];

/* App-download bullets */
const appPoints = ["Apply on the go", "Track your application", "Get instant updates"];

/* Footer link columns */
const footerCols = [
  ["Loans", [["Personal Loan", "/loans/personal-loan.html"], ["Business Loan", "/loans/business-loan.html"], ["Home Loan", "/loans/home-loan.html"], ["Vehicle Loan", "/loans/new-car-loan.html"], ["Gold Loan", "/loans/gold-loan.html"], ["Plot Loan", "/loans/plot-loan.html"], ["Project Loan", "/loans/project-loan.html"], ["More Loans", "/loans.html"]]],
  ["Insurance", [["Life Insurance", "/insurance/life-insurance.html"], ["Health Insurance", "/insurance/health-insurance.html"], ["Term Insurance", "/insurance/term-insurance.html"], ["Motor Insurance", "/insurance/vehicle-insurance.html"], ["Travel Insurance", "/insurance/travel-insurance.html"], ["Property Insurance", "/insurance/property-insurance.html"], ["Heavy Vehicle", "/insurance/heavy-vehicle-insurance.html"], ["All Insurance", "/insurance.html"]]],
  ["Calculators", [["EMI Calculator", "/calculators.html#emi"], ["Eligibility Calculator", "/calculators.html#eligibility"], ["Loan Comparison", "/loans.html"], ["Balance Transfer", "/loans/home-loan.html"], ["Credit Score Check", "/credit-score.html"]]],
  ["Investments", [["Mutual Funds", "/investments.html"], ["Fixed Deposit", "/investments.html"], ["Digital Gold", "/investments.html"], ["Bonds", "/investments.html"], ["Share Markets", "/share-markets.html"]]],
  ["Quick Links", [["Banks & NBFCs", "/banks.html"], ["Credit Cards", "/credit-cards.html"], ["Global Distributor", "/partner.html"], ["Resources", "/blog.html"], ["About Us", "/about.html"], ["How It Works", "/how-it-works.html"], ["Contact Us", "/contact.html"]]],
  ["Legal", [["Privacy Policy", "/privacy.html"], ["Terms & Conditions", "/terms.html"], ["Disclaimer", "/disclaimer.html"], ["Grievance Redressal", "/grievance.html"], ["Sitemap", "/sitemap.xml"]]],
];


/* ==========================================================================
   FULL PRODUCT CATALOGUE
   Every product ELOANSS facilitates, grouped for browsing.

   Each group has a default `href` (the closest detailed page). An item is
   either a plain string (uses the group default) or ["Name", "/its/own.html"]
   when a more specific page exists. `catItems()` in pages.js resolves both.
   ========================================================================== */

const loanCatalogue = [
  {
    group: "Personal Loans", icon: "user", href: "/loans/personal-loan.html",
    blurb: "Unsecured finance for life's planned and unplanned moments.",
    items: [
      "Personal Loan", "Instant Loan", "Salary Loan", "Pre-approved Personal Loan",
      "Medical / Emergency Loan", "Wedding Loan", "Travel / Vacation Loan",
      "Consumer Durable Loan", "Top-up Personal Loan", "Personal Loan Balance Transfer",
      ["Flexi Personal Loan", "/loans/overdraft-loan.html"],
      ["Dropline Overdraft Loan", "/loans/overdraft-loan.html"],
      "Festival Loan", "Debt Consolidation Loan", "Loan Against Salary",
    ],
  },
  {
    group: "Business & MSME Loans", icon: "briefcase", href: "/loans/business-loan.html",
    blurb: "Working capital, expansion and equipment finance for enterprises.",
    items: [
      "Business Loan", "MSME Loan", "SME Loan",
      ["Working Capital Loan", "/loans/overdraft-loan.html"],
      "Startup Loan",
      ["Project Loan", "/loans/project-loan.html"],
      ["Equipment Finance", "/loans/project-loan.html"],
      ["Machinery Loan", "/loans/project-loan.html"],
      "Commercial Expansion Loan", "Women Entrepreneur Loan", "Merchant / Cash-Flow Loan",
      "Invoice Financing", "Purchase Order Financing",
      ["OD / Overdraft Facility", "/loans/overdraft-loan.html"],
      "Business Loan Balance Transfer",
    ],
  },
  {
    group: "Home & Property Loans", icon: "home", href: "/loans/home-loan.html",
    blurb: "Buy, build, renovate or borrow against residential and commercial property.",
    items: [
      "Home Loan", "Home Construction Loan", "Home Renovation Loan", "Home Extension Loan",
      "Home Loan Balance Transfer",
      ["Plot / Open Plot Loan", "/loans/plot-loan.html"],
      ["Plot + Construction Loan", "/loans/plot-loan.html"],
      "Loan Against Property (LAP)", "Mortgage Loan", "Commercial Property Loan",
      "Property Purchase Loan", "Property Improvement Loan",
    ],
  },
  {
    group: "Vehicle Loans", icon: "car", href: "/loans/new-car-loan.html",
    blurb: "Two-wheelers to heavy commercial fleets, new and pre-owned.",
    items: [
      "New Car Loan",
      ["Used Car Loan", "/loans/used-car-loan.html"],
      ["Two-Wheeler Loan", "/loans/two-wheeler-loan.html"],
      "Electric Vehicle Loan",
      ["Commercial Vehicle Loan", "/loans/commercial-vehicle-loan.html"],
      ["Heavy Commercial Vehicle Loan", "/loans/heavy-commercial-vehicle-loan.html"],
      ["Light Commercial Vehicle Loan", "/loans/commercial-vehicle-loan.html"],
      ["Tractor Loan", "/loans/commercial-vehicle-loan.html"],
      ["Construction Equipment Vehicle Loan", "/loans/heavy-commercial-vehicle-loan.html"],
      ["Auto / Taxi Loan", "/loans/commercial-vehicle-loan.html"],
    ],
  },
  {
    group: "Gold & Secured Loans", icon: "gold", href: "/loans/gold-loan.html",
    blurb: "Borrow against gold, securities, deposits and policies at lower rates.",
    items: [
      "Gold Loan",
      ["Loan Against Securities", "/loans/overdraft-loan.html"],
      ["Loan Against Shares", "/loans/overdraft-loan.html"],
      ["Loan Against Mutual Funds", "/loans/overdraft-loan.html"],
      ["Loan Against Fixed Deposit", "/loans/overdraft-loan.html"],
      ["Loan Against Insurance Policy", "/loans/overdraft-loan.html"],
      ["Loan Against Bonds", "/loans/overdraft-loan.html"],
      ["Loan Against Property", "/loans/home-loan.html"],
      ["Secured Business Loan", "/loans/business-loan.html"],
    ],
  },
  {
    group: "Education, Agriculture & Green Finance", icon: "graduation", href: "/loans.html",
    blurb: "Funding for study, farming and the shift to clean energy.",
    items: [
      "Education Loan", "Student Loan", "Overseas Education Loan",
      "Agriculture Loan", "Kisan Loan", "Farm Equipment Loan", "Dairy / Fisheries Loan",
      "Solar Loan", "Green Energy Loan",
      ["EV / Green Mobility Loan", "/loans/new-car-loan.html"],
      ["Sustainable Home Improvement Loan", "/loans/home-loan.html"],
    ],
  },
  {
    group: "Specialized Loans", icon: "award", href: "/loans/business-loan.html",
    blurb: "Profession- and sector-specific facilities with tailored underwriting.",
    items: [
      ["Loan Against Pension", "/loans/personal-loan.html"],
      ["Loan Against Provident Fund (where permitted)", "/loans/personal-loan.html"],
      "Loan Against Future Receivables",
      ["Medical Equipment Loan", "/loans/project-loan.html"],
      "Professional Loan", "Doctor Loan", "Chartered Accountant / Professional Loan",
      "Franchise Loan", "School / Educational Institution Loan", "Healthcare Business Loan",
    ],
  },
  {
    group: "Credit & Debt-Related Products", icon: "creditCard", href: "/loans/personal-loan.html",
    blurb: "Restructure, consolidate or transfer what you already owe.",
    items: [
      ["Credit Card Loan / EMI Conversion", "/credit-cards.html"],
      ["Credit Card Balance Transfer", "/credit-cards.html"],
      "Debt Consolidation Loan", "Loan Restructuring / Refinancing", "Balance Transfer Loan",
      "Top-up on Existing Loan",
      ["Overdraft Facility", "/loans/overdraft-loan.html"],
      ["Line of Credit", "/loans/overdraft-loan.html"],
    ],
  },
];

const insuranceCatalogue = [
  {
    group: "Life Insurance", icon: "heart", href: "/insurance/life-insurance.html",
    blurb: "Protection, savings and retirement income for your family.",
    items: [
      ["Term Life Insurance", "/insurance/term-insurance.html"],
      ["Return of Premium Term Insurance", "/insurance/term-insurance.html"],
      "Whole Life Insurance", "Endowment Plan", "Money Back Plan",
      "ULIP — Unit Linked Insurance Plan", "Child Insurance Plan",
      "Retirement / Pension Plan", "Annuity Plan", "Guaranteed Income Plan",
      "Savings Insurance Plan", "Group Life Insurance", "Group Credit Life Insurance",
      "Micro Insurance", "Joint Life Insurance",
    ],
    extras: ["Accidental Death Benefit Rider", "Accidental Disability Rider", "Critical Illness Rider",
      "Waiver of Premium Rider", "Income Benefit Rider", "Term Rider", "Hospital Cash Rider"],
    extrasLabel: "Common riders",
  },
  {
    group: "Health Insurance", icon: "heartPulse", href: "/insurance/health-insurance.html",
    blurb: "Cover for hospitalisation, critical illness and everyday medical costs.",
    items: [
      "Individual Health Insurance", "Family Floater Health Insurance", "Senior Citizen Health Insurance",
      "Critical Illness Insurance", "Super Top-Up Health Insurance", "Top-Up Health Insurance",
      "Personal Accident Insurance", "Group Health Insurance", "Maternity Insurance",
      "Newborn Baby Insurance", "Disease-Specific Health Insurance", "Cancer Insurance",
      "Diabetes Insurance", "Heart Disease Insurance", "Hospital Cash Insurance",
      "Daily Cash Benefit Insurance", "OPD Insurance", "COVID / Travel Medical Cover (where offered)",
      "Employee Health Insurance", "International Health Insurance",
    ],
  },
  {
    group: "Motor Insurance", icon: "car", href: "/insurance/vehicle-insurance.html",
    blurb: "Two-wheelers, cars and commercial fleets — third-party to fully comprehensive.",
    items: [
      "Two-Wheeler Insurance", "Bike Insurance", "Scooter Insurance", "Electric Two-Wheeler Insurance",
      "Car Insurance", "New Car Insurance", "Used Car Insurance", "Electric Car Insurance",
      "Commercial Vehicle Insurance", "Taxi / Cab Insurance", "Auto Rickshaw Insurance",
      ["Truck Insurance", "/insurance/heavy-vehicle-insurance.html"],
      ["Bus Insurance", "/insurance/heavy-vehicle-insurance.html"],
      ["Heavy Commercial Vehicle Insurance", "/insurance/heavy-vehicle-insurance.html"],
      ["Tractor Insurance", "/insurance/heavy-vehicle-insurance.html"],
      "Goods Carrying Vehicle Insurance", "Third-Party Insurance", "Comprehensive Motor Insurance",
      "Own Damage Insurance", "Standalone Own Damage Insurance",
    ],
    extras: ["Zero Depreciation", "Engine Protection", "Roadside Assistance", "Return to Invoice",
      "Key Replacement", "Consumables Cover", "Tyre Protection", "Personal Accident Cover",
      "No-Claim Bonus Protection"],
    extrasLabel: "Popular add-ons",
  },
  {
    group: "Travel Insurance", icon: "plane", href: "/insurance/travel-insurance.html",
    blurb: "Medical, baggage and cancellation cover at home and abroad.",
    items: [
      "Domestic Travel Insurance", "International Travel Insurance", "Student Travel Insurance",
      "Senior Citizen Travel Insurance", "Family Travel Insurance", "Multi-Trip Travel Insurance",
      "Schengen Travel Insurance", "USA Travel Insurance", "Asia Travel Insurance",
      "Business Travel Insurance", "Adventure Travel Insurance", "Flight Delay / Cancellation Cover",
      "Baggage Loss Insurance", "Trip Cancellation Insurance",
    ],
  },
  {
    group: "Home & Property Insurance", icon: "home", href: "/insurance/property-insurance.html",
    blurb: "Structure and contents cover for owners, landlords and tenants.",
    items: [
      "Home Insurance", "Home Building Insurance", "Home Contents Insurance", "Home Structure Insurance",
      "Home + Contents Insurance", "Property Insurance", "Commercial Property Insurance",
      "Landlord Insurance", "Tenant / Renter Insurance", "Shop Insurance", "Office Insurance",
      "Apartment Insurance",
    ],
  },
  {
    group: "Business & Commercial Insurance", icon: "building", href: "/insurance/property-insurance.html",
    blurb: "Keep trading when premises, plant or equipment fail.",
    items: [
      "Business Insurance", "Small Business Insurance", "MSME Insurance", "Shopkeeper Insurance",
      "Office Insurance", "Commercial Property Insurance", "Business Interruption Insurance",
      "Machinery Breakdown Insurance", "Electronic Equipment Insurance", "Contractor All Risk Insurance",
      "Erection All Risk Insurance", "Engineering Insurance", "Industrial All Risk Insurance",
    ],
  },
  {
    group: "Marine Insurance", icon: "ship", href: "/insurance/property-insurance.html",
    blurb: "Cargo, hull and transit cover across sea, air and inland routes.",
    items: [
      "Marine Cargo Insurance", "Marine Hull Insurance", "Inland Transit Insurance",
      "Import Cargo Insurance", "Export Cargo Insurance", "Goods-in-Transit Insurance",
      "Marine Liability Insurance",
    ],
  },
  {
    group: "Fire & Special Perils Insurance", icon: "fire", href: "/insurance/property-insurance.html",
    blurb: "Fire, explosion and allied peril cover for homes, shops and industry.",
    items: [
      "Fire Insurance", "Fire & Special Perils Policy", "Industrial Fire Insurance",
      "Commercial Fire Insurance", "Property Damage Insurance",
      "Consequential Loss / Business Interruption Cover",
    ],
  },
  {
    group: "Cyber Insurance", icon: "lock", href: "/insurance/property-insurance.html",
    blurb: "Cover for online fraud, identity theft and data breaches.",
    items: [
      "Personal Cyber Insurance", "Cyber Fraud Insurance", "Identity Theft Protection",
      "Online Transaction Fraud Cover", "Cyber Liability Insurance", "Corporate Cyber Insurance",
      "Data Breach Insurance", "Cyber Crime Insurance",
    ],
  },
  {
    group: "Pet Insurance", icon: "paw", href: "/insurance/health-insurance.html",
    blurb: "Veterinary and liability cover for dogs, cats and other pets.",
    items: [
      "Dog Insurance", "Cat Insurance", "Pet Health Insurance", "Pet Accident Insurance",
      "Pet Surgery Cover", "Pet Hospitalization Cover", "Pet Third-Party Liability Cover",
    ],
  },
  {
    group: "Gadget & Mobile Insurance", icon: "smartphone", href: "/insurance/property-insurance.html",
    blurb: "Accidental damage, theft and screen cover for your devices.",
    items: [
      "Mobile Phone Insurance", "Laptop Insurance", "Tablet Insurance", "Smartwatch Insurance",
      "Camera Insurance", "Electronic Gadget Insurance", "Screen Damage Insurance",
      "Accidental Damage Protection", "Extended Warranty Protection",
    ],
  },
  {
    group: "Professional Insurance", icon: "scaleIcon", href: "/insurance/property-insurance.html",
    blurb: "Indemnity and liability cover for regulated professions and boards.",
    items: [
      "Professional Indemnity Insurance", "Medical Malpractice Insurance", "Doctor Professional Indemnity",
      "Lawyer Professional Indemnity", "Chartered Accountant Professional Indemnity",
      "Architect Professional Indemnity", "Consultant Professional Indemnity",
      "Errors & Omissions Insurance", "Directors & Officers Insurance",
      "Employment Practices Liability Insurance",
    ],
  },
  {
    group: "Personal Accident & Liability", icon: "shield", href: "/insurance/health-insurance.html",
    blurb: "Income protection after an accident, plus third-party liability.",
    items: [
      "Personal Accident Insurance", "Accidental Death Cover", "Permanent Disability Cover",
      "Temporary Disability Cover", "Accidental Hospitalization Cover",
      "Income Protection / Accident Income Cover", "Personal Liability Insurance",
      "Public Liability Insurance", "Product Liability Insurance",
    ],
  },
  {
    group: "Agriculture & Rural Insurance", icon: "tractor", href: "/insurance/property-insurance.html",
    blurb: "Crop, livestock and farm equipment protection for rural households.",
    items: [
      "Crop Insurance", "Weather-Based Crop Insurance", "Livestock Insurance", "Cattle Insurance",
      "Dairy Insurance", "Poultry Insurance", "Agricultural Equipment Insurance",
      ["Tractor Insurance", "/insurance/heavy-vehicle-insurance.html"],
      "Farm Machinery Insurance", "Aquaculture / Fisheries Insurance", "Rural Property Insurance",
    ],
  },
  {
    group: "Specialty Insurance", icon: "gift", href: "/insurance.html",
    blurb: "One-off events, high-value items and niche commercial risks.",
    items: [
      "Event Insurance", "Wedding Insurance", "Film Production Insurance", "Sports Insurance",
      "Hole-in-One Insurance", "Pet Event Insurance", "Drone Insurance", "Aviation Insurance",
      "Cyber Event Insurance", "Fine Art Insurance", "Jewellery Insurance",
      "Mobile Device Protection", "Key Person Insurance", "Credit Insurance",
      "Trade Credit Insurance", "Political Risk Insurance",
    ],
  },
];


/* ==========================================================================
   LENDER PROFILES — one generated page per partner at /banks/<slug>.html

   Deliberately free of lender-specific interest rates. Each page shows the
   *market* indicative range already held on the matching product in `loans`,
   clearly labelled as such, because ELOANSS cannot quote another institution's
   pricing. Descriptions stay to structural facts (bank vs NBFC, what they fund)
   rather than claims we cannot stand behind.
   ========================================================================== */

const LENDER_KIND = {
  bank: { label: "Bank", heading: "Applying to a bank",
    note: "Scheduled commercial bank regulated by the RBI." },
  nbfc: { label: "NBFC", heading: "Applying to an NBFC",
    note: "Non-Banking Financial Company registered with the RBI." },
  gold: { label: "Gold Loan NBFC", heading: "Applying to a gold loan NBFC",
    note: "RBI-registered NBFC specialising in loans against gold." },
  hfc: { label: "Housing Finance", heading: "Applying to a housing finance company",
    note: "Housing finance company regulated by the RBI / NHB." },
};

const BANK_HIGHLIGHTS = [
  ["Competitive pricing", "Banks generally price lower than NBFCs when you meet their credit criteria."],
  ["Long tenures", "Longer repayment terms, particularly on secured products like home loans."],
  ["Branch network", "In-person servicing and documentation support alongside digital channels."],
  ["Existing-customer offers", "Pre-approved limits are common if you already bank here."],
];
const NBFC_HIGHLIGHTS = [
  ["Faster turnaround", "Decisions and disbursal are typically quicker than a bank's process."],
  ["Flexible criteria", "More willing to consider self-employed profiles and thinner credit files."],
  ["Digital-first", "Most of the journey runs online with minimal paperwork."],
  ["Custom structures", "Repayment shaped around your cash flow rather than a fixed template."],
];
const GOLD_HIGHLIGHTS = [
  ["Same-day disbursal", "Valuation and payout usually complete within the same visit."],
  ["Minimal documentation", "KYC and the pledged jewellery are generally all that is required."],
  ["No credit score bar", "The loan is secured against gold, so your score matters far less."],
  ["Wide branch presence", "Dense branch coverage, including smaller towns."],
];

const lenderProfiles = {
  "hdfc-bank": { kind: "bank", products: ["home-loan", "personal-loan", "business-loan", "new-car-loan", "two-wheeler-loan"],
    intro: "One of India's largest private-sector banks, with a full retail and business lending range. A common first stop for salaried applicants with a clean credit record." },
  "icici-bank": { kind: "bank", products: ["personal-loan", "home-loan", "business-loan", "new-car-loan", "used-car-loan"],
    intro: "A large private-sector bank with a strong digital application journey across personal, home and vehicle finance." },
  "axis-bank": { kind: "bank", products: ["personal-loan", "home-loan", "new-car-loan", "business-loan"],
    intro: "Private-sector bank offering the full retail lending set, with pre-approved offers common for existing account holders." },
  "sbi": { kind: "bank", products: ["home-loan", "personal-loan", "new-car-loan", "gold-loan", "business-loan"],
    intro: "India's largest public-sector bank. Typically among the most competitively priced on home loans, with the widest branch reach in the country." },
  "kotak": { kind: "bank", products: ["personal-loan", "home-loan", "new-car-loan", "business-loan"],
    intro: "Private-sector bank covering personal, home, vehicle and business finance, with a strong digital onboarding process." },
  "indusind-bank": { kind: "bank", products: ["new-car-loan", "used-car-loan", "commercial-vehicle-loan", "personal-loan", "business-loan"],
    intro: "Private-sector bank with a particularly established vehicle and commercial-vehicle finance business." },
  "yes-bank": { kind: "bank", products: ["business-loan", "personal-loan", "home-loan", "overdraft-loan"],
    intro: "Private-sector bank active across business banking, working capital and retail lending." },
  "idfc-first": { kind: "bank", products: ["personal-loan", "home-loan", "business-loan", "new-car-loan"],
    intro: "Retail-focused private bank known for a simple, largely digital application process across personal and home finance." },
  "bank-of-baroda": { kind: "bank", products: ["home-loan", "personal-loan", "new-car-loan", "business-loan"],
    intro: "Large public-sector bank with competitive secured-loan pricing and extensive branch coverage." },
  "pnb": { kind: "bank", products: ["home-loan", "personal-loan", "business-loan", "plot-loan"],
    intro: "Public-sector bank with a long-established home and property lending business and nationwide reach." },
  "bajaj-finserv": { kind: "nbfc", products: ["personal-loan", "business-loan", "two-wheeler-loan"],
    intro: "One of India's largest NBFCs, widely used for personal loans, consumer-durable finance and unsecured business lending." },
  "tata-capital": { kind: "nbfc", products: ["personal-loan", "business-loan", "home-loan", "new-car-loan"],
    intro: "Diversified NBFC covering personal, business and home finance, with a straightforward digital journey." },
  "muthoot-finance": { kind: "gold", products: ["gold-loan"],
    intro: "India's largest gold loan NBFC. Loans are advanced against pledged gold jewellery, usually with same-day valuation and disbursal." },
  "manappuram-finance": { kind: "gold", products: ["gold-loan"],
    intro: "Established gold loan NBFC offering short-tenure loans against jewellery with minimal documentation." },
  "lendingkart": { kind: "nbfc", products: ["business-loan", "overdraft-loan"],
    intro: "Digital-first NBFC lending specifically to MSMEs, assessing businesses on banking and GST data rather than collateral." },
  "aditya-birla-capital": { kind: "nbfc", products: ["personal-loan", "business-loan", "home-loan", "overdraft-loan"],
    intro: "Diversified financial services group lending across personal, business and housing finance." },
  "herofincorp": { kind: "nbfc", products: ["two-wheeler-loan", "personal-loan", "business-loan"],
    intro: "NBFC with a strong two-wheeler finance business, alongside personal and small-business lending." },
  "piramal-finance": { kind: "hfc", products: ["home-loan", "plot-loan", "business-loan"],
    intro: "Housing and retail finance lender focused on home loans, loans against property and small-business finance, including in smaller cities." },
  "fullerton-india": { kind: "nbfc", products: ["personal-loan", "business-loan", "two-wheeler-loan"],
    intro: "Retail-focused NBFC lending to salaried and self-employed borrowers, including customers outside the major metros." },
  "incred": { kind: "nbfc", products: ["personal-loan", "business-loan"],
    intro: "Technology-led NBFC lending across personal, education and small-business finance." },
};

module.exports = { site, loans, insurance, steps, testimonials, posts, partnerBenefits,
  goals, journeyNodes, lenders, lenderFilters, loanUniverse, insuranceMajor, insuranceMinor,
  whyPillars, investTabs, cardTypes, incomeBands, cardRewards, heroChips, distributorPoints,
  appPoints, footerCols, loanCatalogue, insuranceCatalogue, insuranceTrust,
  lenderProfiles, LENDER_KIND, BANK_HIGHLIGHTS, NBFC_HIGHLIGHTS, GOLD_HIGHLIGHTS };
