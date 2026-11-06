// All listings, hosts, prices and reviews below are SAMPLE / PLACEHOLDER content.
export const BRAND = 'DemoStay';
export const img = (n) => `/images/${n}.jpg`;
export const USD_RATE = 135; // NPR per USD (sample rate)

// Stay plans: nightly, weekly, monthly and yearly rates.
// Longer plans are discounted from the nightly price. To set exact rates for one
// listing, add  rates: { week: 40000, month: 120000, year: 1200000 }  to it.
export const PLANS = [
  { id: 'night', label: 'Nightly', unit: 'night', plural: 'nights', days: 1, off: 0, step: 100 },
  { id: 'week', label: 'Weekly', unit: 'week', plural: 'weeks', days: 7, off: 0.1, step: 500 },
  { id: 'month', label: 'Monthly', unit: 'month', plural: 'months', days: 30, off: 0.35, step: 1000 },
  { id: 'year', label: 'Yearly', unit: 'year', plural: 'years', days: 365, off: 0.55, step: 10000 },
];
export const rateFor = (l, id) => {
  const plan = PLANS.find((p) => p.id === id) || PLANS[0];
  if (l.rates && l.rates[id]) return l.rates[id];
  const round = id === 'year' ? 1000 : 100;
  return Math.round((l.price * plan.days * (1 - plan.off)) / round) * round;
};

// ---------- Neighbourhoods ----------
export const AREAS = [
  { id: 'lakeside', name: 'Lakeside', img: 'lakeside', pos: '50% 45%', blurb: 'Cafés, boats and the main lake promenade', x: 48, y: 34 },
  { id: 'damside', name: 'Damside', img: 'damside', pos: '50% 50%', blurb: 'Quiet southern shore, minutes from Davis Falls', x: 46, y: 54 },
  { id: 'chhorepatan', name: 'Chhorepatan', img: 'chhorepatan', pos: '50% 50%', blurb: 'Lively evening streets with mountain views', x: 61, y: 46 },
  { id: 'sarangkot', name: 'Sarangkot', img: 'sarangkot', pos: '50% 55%', blurb: 'The hilltop sunrise viewpoint above the lake', x: 28, y: 18 },
  { id: 'hemja', name: 'Hemja', img: 'hemja', pos: '50% 40%', blurb: 'Green terraces and space for the whole family', x: 13, y: 27 },
];

// ---------- Categories (pill row) ----------
export const CATEGORIES = [
  { id: 'lake', label: 'Lake view', icon: 'wave' },
  { id: 'mountain', label: 'Mountain view', icon: 'mountain' },
  { id: 'rooftop', label: 'Rooftop', icon: 'sun' },
  { id: 'loft', label: 'Lofts', icon: 'home' },
  { id: 'garden', label: 'Garden', icon: 'leaf' },
  { id: 'family', label: 'Family size', icon: 'users' },
  { id: 'studio', label: 'Studios', icon: 'bed' },
  { id: 'long', label: 'Long stays', icon: 'calendar' },
];

export const AMENITIES = [
  { name: 'Fast wifi', icon: 'wifi' },
  { name: 'Dedicated workspace', icon: 'desk' },
  { name: 'Full kitchen', icon: 'kitchen' },
  { name: 'Balcony', icon: 'sun' },
  { name: 'Rooftop terrace', icon: 'sun' },
  { name: 'Free parking', icon: 'car' },
  { name: 'Lift', icon: 'lift' },
  { name: 'Washing machine', icon: 'wash' },
  { name: 'Heating', icon: 'flame' },
  { name: 'Bathtub', icon: 'bath' },
  { name: 'Garden access', icon: 'leaf' },
  { name: 'Breakfast included', icon: 'coffee' },
  { name: 'Smart TV', icon: 'tv' },
  { name: 'Backup power', icon: 'bolt' },
];
export const AMENITY_ICON = Object.fromEntries(AMENITIES.map((a) => [a.name, a.icon]));

// ---------- Listings ----------
// price = NPR per night. blocked = [startOffset, endOffset] in days from today (nights unavailable).
export const LISTINGS = [
  {
    id: 'annapurna-view-apartment',
    title: 'Annapurna View Apartment',
    area: 'Lakeside',
    type: 'Entire apartment',
    price: 11500, cleaning: 1800, rating: 4.93, reviews: 128, badge: 'Guest favourite',
    bedrooms: 2, beds: 3, baths: 2, guests: 4, size: 1150, floor: '7th floor, lift access',
    cats: ['lake', 'mountain', 'family'],
    amenities: ['Fast wifi', 'Full kitchen', 'Balcony', 'Lift', 'Free parking', 'Washing machine', 'Heating', 'Bathtub', 'Smart TV', 'Backup power', 'Dedicated workspace'],
    images: ['annapurna-view-apartment', 'living-room', 'master-bedroom', 'modern-kitchen', 'private-balcony', 'spa-bathroom', 'premium-finishes', 'virtual-tour'],
    pos: ['50% 55%', '50% 50%', '50% 55%', '50% 55%', '50% 50%', '50% 50%', '50% 50%', '50% 50%'],
    map: [51, 31], host: { name: 'Sita', years: 6, superhost: true, response: '100%', time: 'within an hour' },
    blocked: [[6, 9], [21, 24]],
    highlights: [['mountain', 'Annapurna panorama', 'Floor-to-ceiling windows frame the lake and the snow peaks.'], ['key', 'Self check-in', 'Keypad entry, any time after 2 PM.'], ['award', 'Guest favourite', 'One of the most loved apartments on DemoStay.']],
    description: 'A bright two-bedroom apartment on the seventh floor, designed around the view. The living room opens onto a private balcony with Phewa Lake in front and the Annapurna range behind it. Warm timber floors, a full kitchen with a stone island and a spa-style bathroom make it equally good for a family week or a long remote-work stay.',
  },
  {
    id: 'phewa-lake-studio',
    title: 'Phewa Lake Studio',
    area: 'Chhorepatan',
    type: 'Entire studio',
    price: 6200, cleaning: 1000, rating: 4.88, reviews: 74, badge: null,
    bedrooms: 1, beds: 1, baths: 1, guests: 2, size: 520, floor: '4th floor, lift access',
    cats: ['lake', 'mountain', 'studio', 'long'],
    amenities: ['Fast wifi', 'Dedicated workspace', 'Balcony', 'Lift', 'Heating', 'Smart TV', 'Backup power', 'Full kitchen'],
    images: ['phewa-lake-studio', 'private-balcony', 'spa-bathroom', 'nearby-park'],
    pos: ['50% 55%', '50% 50%', '50% 50%', '50% 55%'],
    map: [64, 44], host: { name: 'Bikash', years: 3, superhost: false, response: '96%', time: 'within a few hours' },
    blocked: [[3, 5], [14, 18]],
    highlights: [['wave', 'Lake in every window', 'Wake up to Phewa Lake from the bed.'], ['desk', 'Made for working', 'Desk, fast wifi and backup power.'], ['pin', 'Walk to the shore', 'The lakeside path is a five-minute stroll.']],
    description: 'A calm, light-filled studio with a wall of glass facing Phewa Lake. A compact kitchenette, a proper desk and reliable wifi make it a favourite for couples and solo travellers staying a week or more. The shoreline path starts just down the road.',
  },
  {
    id: 'lakeside-loft',
    title: 'Lakeside Loft',
    area: 'Lakeside',
    type: 'Entire loft',
    price: 7800, cleaning: 1200, rating: 4.91, reviews: 96, badge: 'Guest favourite',
    bedrooms: 1, beds: 1, baths: 1, guests: 2, size: 640, floor: '3rd floor',
    cats: ['loft', 'mountain', 'long'],
    amenities: ['Fast wifi', 'Full kitchen', 'Heating', 'Smart TV', 'Dedicated workspace', 'Washing machine'],
    images: ['lakeside-loft', 'lakeside', 'premium-finishes', 'modern-kitchen'],
    pos: ['50% 50%', '50% 45%', '50% 50%', '50% 55%'],
    map: [44, 37], host: { name: 'Maya', years: 4, superhost: true, response: '100%', time: 'within an hour' },
    blocked: [[10, 13], [26, 30]],
    highlights: [['home', 'Exposed-brick loft', 'A mezzanine bed under old timber beams.'], ['mountain', 'Evening skyline', 'Big windows catch the city lights and ridge.'], ['coffee', 'Café street below', 'Breakfast spots are steps from the door.']],
    description: 'A characterful loft above the Lakeside strip. Exposed brick, dark timber and a mezzanine bedroom give it a cosy feel, while the tall steel-framed windows look out over the valley. Ideal for couples who want to be in the middle of things and still sleep well.',
  },
  {
    id: 'garden-flat-near-davis-falls',
    title: 'Garden Flat near Davis Falls',
    area: 'Damside',
    type: 'Entire apartment',
    price: 8900, cleaning: 1400, rating: 4.86, reviews: 61, badge: null,
    bedrooms: 2, beds: 2, baths: 1, guests: 4, size: 980, floor: 'Ground floor, garden access',
    cats: ['garden', 'family', 'long'],
    amenities: ['Fast wifi', 'Full kitchen', 'Garden access', 'Free parking', 'Washing machine', 'Heating', 'Breakfast included'],
    images: ['garden-flat-near-davis-falls', 'living-room', 'modern-kitchen', 'master-bedroom'],
    pos: ['50% 50%', '50% 50%', '50% 55%', '50% 55%'],
    map: [51, 58], host: { name: 'Rajan', years: 5, superhost: true, response: '98%', time: 'within an hour' },
    blocked: [[8, 12], [28, 32]],
    highlights: [['leaf', 'Garden doors', 'Glass doors open straight into a private garden.'], ['car', 'Free parking', 'A covered space for one car.'], ['coffee', 'Breakfast included', 'Local breakfast delivered each morning.']],
    description: 'A ground-floor flat with a private garden courtyard, a short walk from Davis Falls and the quiet southern shore. Two bedrooms, a big living area and a full kitchen make it easy for families and small groups to spread out.',
  },
  {
    id: 'hemja-family-residence',
    title: 'Hemja Family Residence',
    area: 'Hemja',
    type: 'Entire apartment',
    price: 14500, cleaning: 2200, rating: 4.95, reviews: 43, badge: 'Guest favourite',
    bedrooms: 3, beds: 4, baths: 3, guests: 6, size: 1680, floor: '2nd floor, lift access',
    cats: ['family', 'mountain', 'garden', 'long'],
    amenities: ['Fast wifi', 'Full kitchen', 'Balcony', 'Lift', 'Free parking', 'Washing machine', 'Heating', 'Dedicated workspace', 'Garden access', 'Backup power', 'Smart TV'],
    images: ['hemja-family-home', 'hemja', 'living-room', 'master-bedroom', 'modern-kitchen', 'spa-bathroom'],
    pos: ['50% 55%', '50% 40%', '50% 50%', '50% 55%', '50% 55%', '50% 50%'],
    map: [15, 25], host: { name: 'Anita', years: 7, superhost: true, response: '100%', time: 'within an hour' },
    blocked: [[15, 19], [34, 38]],
    highlights: [['users', 'Room for six', 'Three bedrooms and a long family dining table.'], ['leaf', 'Terrace views', 'Balcony over green rice terraces and the Himalayan skyline.'], ['car', 'Free parking', 'Space for two cars in the compound.']],
    description: 'Our largest apartment, set above the terraced fields of Hemja. Three bedrooms, a library wall, an open-plan kitchen and a long dining table are built for family trips and small groups. Mornings start with mist over the fields and a view of the peaks.',
  },
  {
    id: 'sarangkot-sunrise-suite',
    title: 'Sarangkot Sunrise Suite',
    area: 'Sarangkot',
    type: 'Entire suite',
    price: 13200, cleaning: 2000, rating: 4.97, reviews: 57, badge: 'Guest favourite',
    bedrooms: 1, beds: 1, baths: 1, guests: 3, size: 860, floor: 'Top floor, rooftop access',
    cats: ['rooftop', 'lake', 'mountain', 'studio'],
    amenities: ['Fast wifi', 'Rooftop terrace', 'Balcony', 'Heating', 'Bathtub', 'Smart TV', 'Breakfast included', 'Backup power', 'Free parking'],
    images: ['sarangkot-sunrise-suite', 'rooftop-terrace', 'private-balcony', 'master-bedroom', 'spa-bathroom'],
    pos: ['50% 55%', '50% 55%', '50% 50%', '50% 55%', '50% 50%'],
    map: [30, 21], host: { name: 'Dipesh', years: 4, superhost: true, response: '100%', time: 'within an hour' },
    blocked: [[5, 8], [19, 23]],
    highlights: [['sun', 'Private rooftop deck', 'Sun loungers, lights and a 360° mountain view.'], ['mountain', 'Sunrise from bed', 'Peaks turn pink before breakfast.'], ['coffee', 'Breakfast included', 'Served on the terrace.']],
    description: 'A top-floor suite on the Sarangkot ridge with its own rooftop deck. Catch the sunrise over the Annapurna range from the terrace, then watch the lake turn gold at dusk. A deep bathtub and a handsome bedroom make it the most romantic stay in the collection.',
  },
];

export const getListing = (id) => LISTINGS.find((l) => l.id === id);
export const byArea = (name) => LISTINGS.filter((l) => l.area === name);

// ---------- Sample reviews ----------
export const REVIEW_POOL = [
  { n: 'Anisha', o: 'Kathmandu, Nepal', d: 'October 2026', t: 'Exactly like the photos, and the view is even better in person. Check-in was effortless and the kitchen had everything we needed.' },
  { n: 'Marc', o: 'Lyon, France', d: 'October 2026', t: 'We stayed ten days and worked from the desk every morning. Wifi was reliable and the sunrise from the window never got old.' },
  { n: 'Priya', o: 'Mumbai, India', d: 'September 2026', t: 'Spotless, warm and very quiet at night. Our host left a handwritten list of cafés and walks that we followed every day.' },
  { n: 'Tom', o: 'Leeds, UK', d: 'September 2026', t: 'A brilliant base for our trek. We came back to hot water, a comfy bed and a view of the mountains. Would stay again.' },
  { n: 'Hana', o: 'Osaka, Japan', d: 'August 2026', t: 'Beautiful design and thoughtful details. The host helped arrange a boat for the lake and a taxi up for sunrise.' },
  { n: 'Luis', o: 'Madrid, Spain', d: 'August 2026', t: 'Great location, friendly host, and everything worked. The balcony was our favourite place for evening tea.' },
];
export const REVIEW_CATS = ['Cleanliness', 'Accuracy', 'Check-in', 'Communication', 'Location', 'Value'];

// ---------- Experiences ----------
export const EXPERIENCES = [
  { id: 'sunrise', title: 'Sarangkot sunrise with breakfast', img: 'sarangkot', pos: '50% 60%', area: 'Sarangkot', price: 3200, dur: '4 hours', rating: 4.96, tag: 'Top rated' },
  { id: 'boat', title: 'Phewa Lake paddle and temple stop', img: 'lekhnath', pos: '50% 55%', area: 'Lakeside', price: 2400, dur: '2.5 hours', rating: 4.92, tag: 'Small group' },
  { id: 'damside', title: 'Damside shoreline walk and Davis Falls', img: 'damside', pos: '50% 50%', area: 'Damside', price: 1800, dur: '3 hours', rating: 4.85, tag: null },
  { id: 'food', title: 'Chhorepatan evening street-food walk', img: 'chhorepatan', pos: '50% 50%', area: 'Chhorepatan', price: 2600, dur: '3 hours', rating: 4.94, tag: 'Local favourite' },
  { id: 'terrace', title: 'Hemja rice-terrace morning hike', img: 'hemja', pos: '50% 45%', area: 'Hemja', price: 2100, dur: '3.5 hours', rating: 4.9, tag: null },
  { id: 'promenade', title: 'Golden-hour lake promenade and boat dock', img: 'lakeside', pos: '50% 45%', area: 'Lakeside', price: 1500, dur: '2 hours', rating: 4.87, tag: 'Great for couples' },
];

// ---------- Help centre ----------
export const HELP_CATS = ['Getting started', 'Booking and payments', 'Your stay', 'Hosting', 'Safety', 'Terms and policies'];
export const HELP = [
  { id: 'how-it-works', cat: 'Getting started', title: 'How DemoStay works', body: ['DemoStay is a showcase of verified apartments in Pokhara. You can browse by neighbourhood, filter by what matters to you, see every price upfront, and make an offer or message the host directly from a listing page.', 'Every listing shows its real floor, size, amenities and house rules before you make an offer. If something is unclear, message the host from the listing page.', 'This is a demo website, so no real offers, messages or reservations are sent.'] },
  { id: 'ai-search', cat: 'Getting started', title: 'Using AI search', body: ['Describe what you want in your own words, for example “lake view for two, under NPR 8,000, with a workspace”. We turn that into filters you can see and change on the results page.', 'AI search understands neighbourhoods, views, guest counts, bedrooms, budgets and a handful of amenities. You can remove any interpreted filter with one click.'] },
  { id: 'dates', cat: 'Booking and payments', title: 'Choosing dates and seeing the total price', body: ['Pick check-in and check-out on the listing calendar. Unavailable nights are crossed out.', 'The total shows the nightly rate for your dates, a one-time cleaning fee set by the host, and a service fee. Prices can be shown in Nepalese rupees or US dollars from the currency control in the footer or account menu.'] },
  { id: 'payments', cat: 'Booking and payments', title: 'How payment works', body: ['In a live version, payment would be collected when the host accepts your request and released to the host after check-in. Placeholder text: replace with your real payment provider details.'] },
  { id: 'cancel', cat: 'Booking and payments', title: 'Cancellation options', body: ['Most apartments offer free cancellation up to 48 hours before check-in. After that, the first night is non-refundable. Each listing page shows the exact policy that applies.', 'Placeholder text: replace with your real cancellation terms.'] },
  { id: 'check-in', cat: 'Your stay', title: 'Check-in and check-out', body: ['Standard check-in is after 2 PM and check-out is before 11 AM. Many apartments offer self check-in with a keypad or lockbox. Your host will send directions and the entry code before arrival.'] },
  { id: 'altitude-power', cat: 'Your stay', title: 'Power, water and wifi in Pokhara', body: ['Most buildings in the collection have backup power and a water tank, and we mark them in the amenities list. Wifi speeds are tested by the host and shown on listings that have a dedicated workspace.'] },
  { id: 'start-hosting', cat: 'Hosting', title: 'Listing your apartment', body: ['Apply from the Host page with your neighbourhood, bedrooms and a few photos. We review each apartment, schedule a photo visit, and publish the listing once it meets our standards for cleanliness and accuracy.'] },
  { id: 'earnings', cat: 'Hosting', title: 'How earnings estimates are calculated', body: ['The estimator on the Host page multiplies a typical nightly rate for your neighbourhood and bedroom count by the number of nights you expect to be booked. It is an illustration based on sample numbers, not a guarantee.'] },
  { id: 'safety', cat: 'Safety', title: 'Safety information', body: ['Every apartment lists smoke alarms, a first-aid kit and an emergency contact. In Pokhara you can reach the police on 100 and an ambulance on 102. Placeholder text: add your own safety standards here.'] },
  { id: 'terms', cat: 'Terms and policies', title: 'Terms of service (sample)', body: ['These sample terms describe how guests and hosts use DemoStay. Replace this text with your own legal terms before launch.', 'By using the service you agree to follow the house rules on each listing, to respect neighbours and to treat the property with care.'] },
  { id: 'privacy', cat: 'Terms and policies', title: 'Privacy policy (sample)', body: ['This demo stores only your currency choice and saved apartments, and only in your own browser. Nothing is sent to a server. Replace this text with your real privacy policy before launch.'] },
];
