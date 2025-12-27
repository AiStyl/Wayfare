'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';
import CityAutocomplete from '@/components/CityAutocomplete';

interface Activity {
  time: string;
  title: string;
  description: string;
  type: 'attraction' | 'food' | 'activity' | 'transport' | 'free-time' | 'shopping' | 'nature' | 'nightlife';
  duration: string;
  cost: string;
  tip?: string;
  bookUrl?: string;
}

interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

type TravelStyle = 'relaxed' | 'balanced' | 'intensive';
type Interest = 'culture' | 'food' | 'nature' | 'nightlife' | 'shopping' | 'history' | 'adventure' | 'photography';

// Curated destination data for popular cities
const destinationData: Record<string, { activities: Activity[]; tips: string[] }> = {
  'Tokyo': {
    activities: [
      { time: '09:00', title: 'Senso-ji Temple', description: 'Tokyo\'s oldest and most famous Buddhist temple in Asakusa', type: 'attraction', duration: '2 hours', cost: 'Free', tip: 'Go early to avoid crowds and explore Nakamise shopping street', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '12:00', title: 'Tsukiji Outer Market', description: 'Fresh sushi and street food at the famous fish market area', type: 'food', duration: '1.5 hours', cost: '$15-30', tip: 'Try tamagoyaki (Japanese omelet) and fresh sashimi' },
      { time: '14:00', title: 'teamLab Borderless', description: 'Immersive digital art museum experience', type: 'activity', duration: '3 hours', cost: '$30', tip: 'Book tickets online 2+ weeks ahead', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '18:00', title: 'Shibuya Crossing', description: 'World\'s busiest pedestrian crossing and Hachiko statue', type: 'attraction', duration: '1 hour', cost: 'Free', tip: 'Watch from Starbucks above for aerial view' },
      { time: '19:30', title: 'Izakaya Dinner in Shinjuku', description: 'Traditional Japanese pub experience with small plates', type: 'food', duration: '2 hours', cost: '$30-50', tip: 'Try yakitori, edamame, and sake', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '10:00', title: 'Meiji Shrine', description: 'Serene Shinto shrine in a forested park', type: 'attraction', duration: '1.5 hours', cost: 'Free', tip: 'Walk through the towering torii gates in Yoyogi Park' },
      { time: '13:00', title: 'Harajuku & Takeshita Street', description: 'Youth fashion and quirky shops', type: 'shopping', duration: '2 hours', cost: 'Varies', tip: 'Try a crepe from one of the many stands' },
      { time: '16:00', title: 'Shinjuku Gyoen', description: 'Beautiful garden with Japanese, French, and English sections', type: 'nature', duration: '2 hours', cost: '$5', tip: 'Perfect for cherry blossoms in spring' },
      { time: '19:00', title: 'Golden Gai', description: 'Tiny bars in narrow alleys of Shinjuku', type: 'nightlife', duration: '3 hours', cost: '$20-40', tip: 'Some bars charge a cover fee - check before entering' },
      { time: '09:00', title: 'Akihabara Electric Town', description: 'Electronics, anime, and gaming district', type: 'shopping', duration: '3 hours', cost: 'Varies', tip: 'Visit a maid cafe for the full experience' },
      { time: '14:00', title: 'Tokyo Skytree', description: 'Observation deck with panoramic city views', type: 'attraction', duration: '2 hours', cost: '$20', tip: 'Go near sunset for day and night views', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '17:00', title: 'Ramen at Ichiran', description: 'Solo booth ramen experience - Tokyo style tonkotsu', type: 'food', duration: '1 hour', cost: '$10-15', tip: 'Customize your noodle firmness and broth richness' },
    ],
    tips: ['Get a Suica/Pasmo card for easy train travel', 'Download Google Maps offline - addresses are confusing', 'Convenience stores (7-Eleven, Lawson) have great food'],
  },
  'Paris': {
    activities: [
      { time: '09:00', title: 'Eiffel Tower', description: 'Iconic iron lattice tower with city views from 3 levels', type: 'attraction', duration: '2-3 hours', cost: '$30', tip: 'Book skip-the-line tickets online', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '13:00', title: 'Café de Flore', description: 'Historic café in Saint-Germain-des-Prés', type: 'food', duration: '1.5 hours', cost: '$20-35', tip: 'Try croque monsieur and café crème' },
      { time: '15:00', title: 'Louvre Museum', description: 'World\'s largest art museum - Mona Lisa, Venus de Milo', type: 'attraction', duration: '3-4 hours', cost: '$20', tip: 'Enter through Porte des Lions for shorter queues', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '19:30', title: 'Seine River Cruise', description: 'Evening boat tour past illuminated monuments', type: 'activity', duration: '1 hour', cost: '$15-25', tip: 'Book a dinner cruise for special occasions', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '09:30', title: 'Montmartre & Sacré-Cœur', description: 'Artistic hilltop neighborhood with stunning white basilica', type: 'attraction', duration: '3 hours', cost: 'Free', tip: 'Walk up the stairs for exercise or take the funicular' },
      { time: '13:00', title: 'Le Marais Neighborhood', description: 'Trendy district with shops, falafel, Jewish history', type: 'activity', duration: '2 hours', cost: 'Free', tip: 'Best falafel at L\'As du Fallafel on Rue des Rosiers' },
      { time: '16:00', title: 'Musée d\'Orsay', description: 'Impressionist masterpieces in a former railway station', type: 'attraction', duration: '2-3 hours', cost: '$16', tip: 'Free first Sunday of month', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '20:00', title: 'Dinner in Latin Quarter', description: 'Traditional French bistro - duck confit, boeuf bourguignon', type: 'food', duration: '2 hours', cost: '$40-60', tip: 'Make reservations for popular places' },
      { time: '10:00', title: 'Palace of Versailles', description: 'Opulent royal château with Hall of Mirrors and gardens', type: 'attraction', duration: '5-6 hours', cost: '$20', tip: 'Go on weekdays - extremely crowded on weekends', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '19:00', title: 'Arc de Triomphe at Sunset', description: 'Climb for panoramic views down Champs-Élysées', type: 'attraction', duration: '1.5 hours', cost: '$15', tip: 'Amazing photo opportunity at golden hour' },
    ],
    tips: ['Learn basic French phrases - locals appreciate the effort', 'Museums are free on first Sundays', 'Tipping is included but small extra is appreciated'],
  },
  'New York': {
    activities: [
      { time: '08:00', title: 'Central Park Morning Walk', description: 'Bethesda Fountain, Bow Bridge, Strawberry Fields', type: 'nature', duration: '2 hours', cost: 'Free', tip: 'Rent a bike to cover more ground' },
      { time: '10:30', title: 'Metropolitan Museum of Art', description: 'World-class art spanning 5,000 years', type: 'attraction', duration: '3 hours', cost: '$30', tip: 'Focus on 2-3 sections - it\'s massive', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '14:00', title: 'Times Square & Broadway', description: 'Bright lights, theaters, and iconic billboards', type: 'attraction', duration: '1.5 hours', cost: 'Free', tip: 'Book Broadway tickets at TKTS booth for same-day discounts', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '16:00', title: 'High Line Park', description: 'Elevated park on former railway tracks with art installations', type: 'nature', duration: '1.5 hours', cost: 'Free', tip: 'Enter at 14th St and walk north to Hudson Yards' },
      { time: '19:00', title: 'Dinner at Chelsea Market', description: 'Food hall with tacos, lobster, and international cuisine', type: 'food', duration: '1.5 hours', cost: '$20-40', tip: 'Try Los Tacos No.1 or The Lobster Place' },
      { time: '09:00', title: 'Statue of Liberty & Ellis Island', description: 'Iconic symbol of freedom and immigration museum', type: 'attraction', duration: '4-5 hours', cost: '$24', tip: 'Book crown access months ahead', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '15:00', title: 'Brooklyn Bridge Walk', description: 'Historic 1883 bridge with stunning Manhattan skyline views', type: 'attraction', duration: '1 hour', cost: 'Free', tip: 'Walk from Brooklyn to Manhattan for best views' },
      { time: '17:00', title: 'DUMBO Brooklyn', description: 'Trendy neighborhood - iconic bridge view at Washington St', type: 'activity', duration: '2 hours', cost: 'Free', tip: 'Get pizza at Juliana\'s nearby' },
      { time: '10:00', title: '9/11 Memorial & Museum', description: 'Moving tribute with reflecting pools and artifacts', type: 'attraction', duration: '2-3 hours', cost: '$33', tip: 'Memorial is free, museum requires ticket', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '14:00', title: 'Top of the Rock or Empire State', description: 'Observation decks with Manhattan skyline views', type: 'attraction', duration: '1.5 hours', cost: '$40', tip: 'Top of the Rock has better views of Empire State', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '20:00', title: 'Jazz in Greenwich Village', description: 'Live jazz at Blue Note or Village Vanguard', type: 'nightlife', duration: '2 hours', cost: '$30-50', tip: 'Make reservations - these clubs fill up' },
    ],
    tips: ['Get an OMNY or MetroCard for subway', 'Walk when possible - many attractions are close', 'Tip 18-20% at restaurants'],
  },
  'Las Vegas': {
    activities: [
      { time: '10:00', title: 'The Strip Walking Tour', description: 'Walk the famous 4-mile stretch past iconic casino resorts', type: 'attraction', duration: '3 hours', cost: 'Free', tip: 'Start at Mandalay Bay and walk north - mostly air-conditioned inside casinos' },
      { time: '13:00', title: 'Bellagio Conservatory & Fountains', description: 'Stunning botanical gardens and iconic water show', type: 'attraction', duration: '1.5 hours', cost: 'Free', tip: 'Fountain shows every 15-30 mins, best at night' },
      { time: '15:00', title: 'High Roller Observation Wheel', description: '550-foot tall wheel with Strip views', type: 'attraction', duration: '1 hour', cost: '$25-37', tip: 'Book the happy hour pod for open bar', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '17:00', title: 'The Venetian & Grand Canal', description: 'Indoor canals with gondola rides and Italian architecture', type: 'attraction', duration: '1.5 hours', cost: 'Free to walk / $35 gondola', tip: 'Gondola rides are romantic but pricey', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '19:30', title: 'Gordon Ramsay Hell\'s Kitchen', description: 'Celebrity chef restaurant at Caesars Palace', type: 'food', duration: '2 hours', cost: '$60-100', tip: 'Make reservations 2+ weeks ahead', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '22:00', title: 'Cirque du Soleil Show', description: 'World-famous acrobatic performances - O, KA, or Mystère', type: 'activity', duration: '2 hours', cost: '$100-200', tip: '"O" at Bellagio is the most spectacular', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '09:00', title: 'Grand Canyon Day Trip', description: 'Helicopter or bus tour to the South or West Rim', type: 'activity', duration: '8-12 hours', cost: '$150-500', tip: 'Helicopter tours include stunning aerial views', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '11:00', title: 'Fremont Street Experience', description: 'Downtown\'s covered pedestrian mall with LED canopy shows', type: 'attraction', duration: '2 hours', cost: 'Free', tip: 'More affordable casinos and vintage Vegas vibe' },
      { time: '14:00', title: 'Mob Museum', description: 'Interactive museum about organized crime history', type: 'attraction', duration: '2 hours', cost: '$30', tip: 'Includes speakeasy bar in the basement', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '16:00', title: 'Pool Party at Resort', description: 'Famous Vegas pool clubs - Wet Republic, Encore Beach Club', type: 'activity', duration: '4 hours', cost: '$30-75', tip: 'Summer only - arrive early for chairs' },
      { time: '20:00', title: 'Buffet at Wynn or Bacchanal', description: 'World-class all-you-can-eat dining', type: 'food', duration: '2 hours', cost: '$60-80', tip: 'Bacchanal at Caesars is consistently top-rated' },
      { time: '23:00', title: 'Nightclub Experience', description: 'Hakkasan, Omnia, or XS - world-famous DJ venues', type: 'nightlife', duration: '3+ hours', cost: '$30-100', tip: 'Dress code enforced - no sneakers or shorts' },
    ],
    tips: ['Stay hydrated - desert climate is brutal', 'Casinos are designed to get you lost - use maps', 'Monorail and rideshare beat walking in summer heat'],
  },
  'London': {
    activities: [
      { time: '09:00', title: 'Tower of London', description: 'Historic castle, Crown Jewels, and Beefeater tours', type: 'attraction', duration: '3 hours', cost: '£30', tip: 'Arrive at opening to see Crown Jewels without crowds', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '12:30', title: 'Borough Market Lunch', description: 'London\'s oldest food market - artisan foods and street eats', type: 'food', duration: '1.5 hours', cost: '£15-25', tip: 'Try the raclette cheese and scotch eggs' },
      { time: '14:30', title: 'Tower Bridge & South Bank Walk', description: 'Iconic bridge and riverside walk to Westminster', type: 'attraction', duration: '2 hours', cost: '£12 for bridge exhibition', tip: 'Glass floor walkway offers unique views' },
      { time: '17:00', title: 'Westminster Abbey & Big Ben', description: 'Gothic church and iconic clock tower', type: 'attraction', duration: '1.5 hours', cost: '£25 for Abbey', tip: 'Big Ben chimes on the hour - time your visit', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '19:30', title: 'West End Theatre Show', description: 'World-class musicals and plays', type: 'activity', duration: '2.5 hours', cost: '£40-150', tip: 'TKTS booth in Leicester Square for same-day discounts', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '10:00', title: 'British Museum', description: 'World history collection including Rosetta Stone', type: 'attraction', duration: '3 hours', cost: 'Free', tip: 'Free entry - focus on Egyptian or Greek galleries' },
      { time: '14:00', title: 'Buckingham Palace & Changing Guard', description: 'Royal residence and famous ceremony', type: 'attraction', duration: '1.5 hours', cost: 'Free to watch / £30 for palace tour', tip: 'Ceremony at 11am - arrive 10am for good spot' },
      { time: '16:00', title: 'Hyde Park & Kensington Gardens', description: 'Royal parks with Serpentine Lake and Diana Memorial', type: 'nature', duration: '2 hours', cost: 'Free', tip: 'Rent a deck chair or pedal boat' },
      { time: '19:00', title: 'Pub Dinner in Covent Garden', description: 'Traditional British pub - fish & chips, Sunday roast', type: 'food', duration: '1.5 hours', cost: '£20-35', tip: 'Try The Lamb & Flag, one of London\'s oldest pubs' },
      { time: '10:00', title: 'Harry Potter Studio Tour', description: 'Behind-the-scenes of the film series', type: 'activity', duration: '4 hours', cost: '£50', tip: 'Book weeks ahead - always sells out', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '15:00', title: 'Camden Market', description: 'Alternative fashion, street food, and live music', type: 'shopping', duration: '2 hours', cost: 'Varies', tip: 'Great for unique souvenirs and people-watching' },
    ],
    tips: ['Get an Oyster card for tube/bus', 'Many museums are free', 'Pubs stop serving food around 9-10pm'],
  },
  'Barcelona': {
    activities: [
      { time: '09:00', title: 'La Sagrada Familia', description: 'Gaudí\'s unfinished masterpiece - stunning basilica', type: 'attraction', duration: '2 hours', cost: '€26', tip: 'Book online weeks ahead - always sells out', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '12:00', title: 'Gothic Quarter Walking', description: 'Medieval streets, hidden squares, and Roman ruins', type: 'activity', duration: '2 hours', cost: 'Free', tip: 'Get lost in the narrow streets - best discoveries happen randomly' },
      { time: '14:00', title: 'La Boqueria Market Lunch', description: 'Famous food market on La Rambla', type: 'food', duration: '1.5 hours', cost: '€15-25', tip: 'Try jamón ibérico, fresh fruit juices, and seafood' },
      { time: '16:00', title: 'Park Güell', description: 'Gaudí\'s colorful mosaic park with city views', type: 'attraction', duration: '2 hours', cost: '€10', tip: 'Book timed entry in advance', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '19:00', title: 'Tapas Dinner in El Born', description: 'Traditional Spanish small plates and wine', type: 'food', duration: '2 hours', cost: '€25-40', tip: 'Try patatas bravas, pan con tomate, and croquetas' },
      { time: '21:30', title: 'Flamenco Show', description: 'Traditional Spanish dance performance', type: 'activity', duration: '1.5 hours', cost: '€35-50', tip: 'Tablao Cordobes or Palau de la Música for authentic shows', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '10:00', title: 'Barceloneta Beach', description: 'City beach with seafood restaurants and boardwalk', type: 'nature', duration: '3 hours', cost: 'Free', tip: 'Paella lunch at beachfront restaurant' },
      { time: '14:00', title: 'Casa Batlló', description: 'Gaudí\'s dragon-inspired house on Passeig de Gràcia', type: 'attraction', duration: '1.5 hours', cost: '€35', tip: 'Evening visits include live music on the rooftop', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '16:30', title: 'Picasso Museum', description: 'Extensive collection of Picasso\'s early works', type: 'attraction', duration: '2 hours', cost: '€12', tip: 'Free on first Sunday of month - expect crowds' },
      { time: '20:00', title: 'Sunset at Bunkers del Carmel', description: 'Hidden viewpoint with 360° city views', type: 'activity', duration: '1.5 hours', cost: 'Free', tip: 'Bring wine and snacks - locals\' favorite sunset spot' },
    ],
    tips: ['Siesta is real - many shops close 2-5pm', 'Dinner starts at 9pm or later', 'Watch for pickpockets on La Rambla'],
  },
  'Rome': {
    activities: [
      { time: '08:30', title: 'Vatican Museums & Sistine Chapel', description: 'World\'s greatest art collection and Michelangelo\'s ceiling', type: 'attraction', duration: '4 hours', cost: '€20', tip: 'Book first entry slot to avoid crushing crowds', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '13:00', title: 'Lunch in Trastevere', description: 'Charming neighborhood with authentic trattorias', type: 'food', duration: '1.5 hours', cost: '€20-30', tip: 'Try cacio e pepe and supplì (fried rice balls)' },
      { time: '15:00', title: 'Colosseum & Roman Forum', description: 'Ancient amphitheater and heart of Roman Empire', type: 'attraction', duration: '3 hours', cost: '€18', tip: 'Combined ticket includes Palatine Hill', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '19:00', title: 'Trevi Fountain at Sunset', description: 'Baroque masterpiece - throw a coin for good luck', type: 'attraction', duration: '30 mins', cost: 'Free', tip: 'Visit at sunset or late night to avoid crowds' },
      { time: '20:00', title: 'Dinner near Piazza Navona', description: 'Al fresco dining with Bernini fountain views', type: 'food', duration: '2 hours', cost: '€30-50', tip: 'Walk one block from square for better value' },
      { time: '10:00', title: 'Pantheon', description: 'Best-preserved ancient Roman building with stunning dome', type: 'attraction', duration: '1 hour', cost: '€5', tip: 'Free entry on first Sunday of month' },
      { time: '11:30', title: 'Gelato at Giolitti', description: 'Historic gelateria since 1900', type: 'food', duration: '30 mins', cost: '€5', tip: 'Get a cone and walk to the Spanish Steps' },
      { time: '12:30', title: 'Spanish Steps & Shopping', description: 'Famous stairway and luxury shopping district', type: 'attraction', duration: '1.5 hours', cost: 'Free', tip: 'Via Condotti has all the designer shops' },
      { time: '15:00', title: 'Borghese Gallery', description: 'Masterpieces by Bernini, Caravaggio, Raphael', type: 'attraction', duration: '2 hours', cost: '€15', tip: 'Reservation mandatory - book weeks ahead', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '18:00', title: 'Villa Borghese Gardens', description: 'Beautiful park with lake and views', type: 'nature', duration: '1.5 hours', cost: 'Free', tip: 'Rent a rowboat on the lake' },
      { time: '21:00', title: 'Aperitivo in Campo de\' Fiori', description: 'Evening drinks with free snacks - Italian happy hour', type: 'nightlife', duration: '2 hours', cost: '€10-15', tip: 'One drink usually includes all-you-can-eat buffet' },
    ],
    tips: ['Book major sites weeks ahead', 'Dress code for churches - cover shoulders and knees', 'Avoid restaurants with photos on menus'],
  },
  'Dubai': {
    activities: [
      { time: '09:00', title: 'Burj Khalifa At The Top', description: 'World\'s tallest building - observation deck at 555m', type: 'attraction', duration: '2 hours', cost: '$45', tip: 'Book sunrise or sunset slot for best photos', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '12:00', title: 'Dubai Mall & Aquarium', description: 'World\'s largest mall with massive aquarium', type: 'shopping', duration: '3 hours', cost: 'Free / $40 aquarium', tip: 'Aquarium viewing is free from mall, tunnel costs extra' },
      { time: '16:00', title: 'Palm Jumeirah & Atlantis', description: 'Iconic palm-shaped island with luxury resort', type: 'attraction', duration: '2 hours', cost: 'Free to visit', tip: 'Monorail offers great views of the palm' },
      { time: '19:00', title: 'Dubai Fountain Show', description: 'World\'s largest choreographed fountain', type: 'attraction', duration: '30 mins', cost: 'Free', tip: 'Shows every 30 mins from 6pm - watch from Burj Khalifa Lake' },
      { time: '20:00', title: 'Dinner at Dubai Marina', description: 'Waterfront dining with skyscraper views', type: 'food', duration: '2 hours', cost: '$40-80', tip: 'Book a table with marina view' },
      { time: '07:00', title: 'Desert Safari', description: 'Dune bashing, camel rides, BBQ dinner, and entertainment', type: 'activity', duration: '6 hours', cost: '$60-100', tip: 'Book a morning safari to avoid afternoon heat', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '10:00', title: 'Old Dubai & Gold Souk', description: 'Traditional markets in Deira - gold, spices, textiles', type: 'shopping', duration: '2 hours', cost: 'Free', tip: 'Bargaining is expected - start at 50% of asking price' },
      { time: '12:30', title: 'Abra Ride on Dubai Creek', description: 'Traditional wooden boat crossing between old districts', type: 'activity', duration: '30 mins', cost: '$0.50', tip: 'Best cheap activity in Dubai - authentic experience' },
      { time: '15:00', title: 'Dubai Frame', description: 'Iconic landmark with views of old and new Dubai', type: 'attraction', duration: '1 hour', cost: '$15', tip: 'Glass floor bridge is thrilling', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '20:00', title: 'Dhow Cruise Dinner', description: 'Traditional boat dinner cruise on Dubai Creek', type: 'activity', duration: '2 hours', cost: '$60', tip: 'Marina cruises are fancier, Creek cruises more authentic', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
    ],
    tips: ['Friday is weekend - malls get crowded', 'Dress modestly in old Dubai', 'Metro is excellent and cheap'],
  },
  'Bali': {
    activities: [
      { time: '06:00', title: 'Mount Batur Sunrise Trek', description: 'Active volcano hike with stunning sunrise views', type: 'activity', duration: '6 hours', cost: '$50-80', tip: 'Start at 2am to reach summit for sunrise', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '10:00', title: 'Tegallalang Rice Terraces', description: 'Iconic stepped rice paddies in Ubud', type: 'nature', duration: '2 hours', cost: '$3 entrance', tip: 'Visit early morning for fewer crowds and cooler temperatures' },
      { time: '13:00', title: 'Ubud Lunch & Art Market', description: 'Traditional Balinese food and handicraft shopping', type: 'food', duration: '2 hours', cost: '$10-20', tip: 'Try babi guling (suckling pig) or nasi campur' },
      { time: '16:00', title: 'Sacred Monkey Forest', description: 'Temple complex in jungle with playful macaques', type: 'nature', duration: '1.5 hours', cost: '$5', tip: 'Secure all belongings - monkeys will grab anything', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '18:30', title: 'Uluwatu Temple Sunset & Kecak Dance', description: 'Clifftop temple with traditional fire dance performance', type: 'attraction', duration: '2.5 hours', cost: '$15', tip: 'Arrive 1 hour early for good seats at Kecak show', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '09:00', title: 'Tirta Empul Water Temple', description: 'Sacred spring temple for purification ritual', type: 'attraction', duration: '1.5 hours', cost: '$3', tip: 'Bring sarong (or rent one) and join the purification bath' },
      { time: '11:30', title: 'Bali Swing', description: 'Insta-famous jungle swings with valley views', type: 'activity', duration: '1.5 hours', cost: '$35', tip: 'Wanagiri Hidden Hills has multiple swings with fewer crowds', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '14:00', title: 'Seminyak Beach Club', description: 'Trendy beach club with pool, food, and sunset views', type: 'activity', duration: '4 hours', cost: '$20-50', tip: 'Potato Head or Ku De Ta for best sunset vibes' },
      { time: '19:00', title: 'Jimbaran Seafood Dinner', description: 'Fresh seafood BBQ on the beach at sunset', type: 'food', duration: '2 hours', cost: '$25-40', tip: 'Tables are on the sand - super romantic' },
      { time: '10:00', title: 'Snorkeling at Nusa Penida', description: 'Day trip to see manta rays and crystal-clear water', type: 'activity', duration: '8 hours', cost: '$80-120', tip: 'Book a tour that includes Kelingking Beach viewpoint', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
    ],
    tips: ['Hire a driver for the day ($40-50) - much easier than self-driving', 'Temples require sarong and sash', 'Rainy season is Nov-Mar but showers are brief'],
  },
  'Amsterdam': {
    activities: [
      { time: '09:00', title: 'Anne Frank House', description: 'Moving museum in the secret annex where Anne hid', type: 'attraction', duration: '1.5 hours', cost: '€16', tip: 'Book online exactly 6 weeks ahead - sells out instantly', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '11:00', title: 'Canal Boat Tour', description: 'See the city from its famous waterways', type: 'activity', duration: '1 hour', cost: '€15-20', tip: 'Open-top boats are best in good weather', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '12:30', title: 'Jordaan Neighborhood Lunch', description: 'Trendy area with cafes, boutiques, and brown cafes', type: 'food', duration: '1.5 hours', cost: '€15-25', tip: 'Try Dutch pancakes or bitterballen (fried meatballs)' },
      { time: '14:30', title: 'Rijksmuseum', description: 'Dutch masterpieces including Rembrandt\'s Night Watch', type: 'attraction', duration: '3 hours', cost: '€22.50', tip: 'Focus on Gallery of Honour for the highlights', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '18:00', title: 'Vondelpark', description: 'Amsterdam\'s largest park - perfect for people watching', type: 'nature', duration: '1 hour', cost: 'Free', tip: 'Grab a picnic from Albert Heijn supermarket' },
      { time: '20:00', title: 'Dinner in De Pijp', description: 'Multicultural neighborhood with diverse restaurants', type: 'food', duration: '2 hours', cost: '€25-40', tip: 'Albert Cuypmarkt for street food during the day' },
      { time: '10:00', title: 'Van Gogh Museum', description: 'World\'s largest collection of Van Gogh\'s work', type: 'attraction', duration: '2 hours', cost: '€22', tip: 'Audio guide is excellent and included', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '13:00', title: 'Albert Cuyp Market', description: 'Amsterdam\'s largest outdoor market', type: 'shopping', duration: '1.5 hours', cost: 'Varies', tip: 'Try fresh stroopwafel made while you wait' },
      { time: '15:00', title: 'Heineken Experience', description: 'Interactive tour of the original Heineken brewery', type: 'activity', duration: '1.5 hours', cost: '€23', tip: 'Includes two beers - pour your own at the end', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
      { time: '21:00', title: 'Red Light District Walk', description: 'Famous neighborhood - see it respectfully', type: 'activity', duration: '1 hour', cost: 'Free', tip: 'No photos of windows - it\'s illegal and disrespectful' },
    ],
    tips: ['Rent a bike - it\'s the local way to get around', 'Book major museums well in advance', 'Don\'t walk in bike lanes - cyclists won\'t stop'],
  },
};

// Generic activities for cities not in database
const genericActivities: Activity[] = [
  { time: '09:00', title: 'City Walking Tour', description: 'Explore the historic center and main landmarks', type: 'activity', duration: '3 hours', cost: 'Free-$30', tip: 'Join a free walking tour and tip at the end', bookUrl: 'https://www.viator.com/searchResults/all?text=' },
  { time: '12:30', title: 'Local Lunch', description: 'Try regional specialties at a local restaurant', type: 'food', duration: '1.5 hours', cost: '$15-30', tip: 'Ask locals for recommendations' },
  { time: '14:30', title: 'Main Museum or Attraction', description: 'Visit the city\'s most famous museum or landmark', type: 'attraction', duration: '2-3 hours', cost: '$10-25', tip: 'Book tickets online to skip lines' },
  { time: '18:00', title: 'Sunset Viewpoint', description: 'Find a rooftop or viewpoint for sunset', type: 'activity', duration: '1 hour', cost: 'Free-$15', tip: 'Check Google Maps for "viewpoint" near you' },
  { time: '19:30', title: 'Dinner Experience', description: 'Evening meal at a well-reviewed local spot', type: 'food', duration: '2 hours', cost: '$25-50', tip: 'Make reservations for popular places' },
  { time: '10:00', title: 'Neighborhood Exploration', description: 'Wander through a local neighborhood', type: 'activity', duration: '2 hours', cost: 'Free', tip: 'Get lost - best discoveries happen by accident' },
  { time: '14:00', title: 'Local Market', description: 'Browse local markets for food and crafts', type: 'shopping', duration: '2 hours', cost: 'Varies', tip: 'Great for souvenirs and local products' },
  { time: '17:00', title: 'Park or Garden', description: 'Relax in a local park or botanical garden', type: 'nature', duration: '1.5 hours', cost: 'Free-$10', tip: 'Perfect for people-watching' },
];

export default function PlannerPage() {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(3);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('balanced');
  const [interests, setInterests] = useState<Interest[]>(['culture', 'food']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<DayPlan[] | null>(null);

  const toggleInterest = (interest: Interest) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const generateItinerary = async () => {
    if (!destination) return;

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get city data or use generic
    const cityKey = Object.keys(destinationData).find(
      key => destination.toLowerCase().includes(key.toLowerCase())
    );
    
    const cityData = cityKey ? destinationData[cityKey] : null;
    const activities = cityData?.activities || genericActivities;

    // Generate day plans
    const days: DayPlan[] = [];
    const themes = ['Iconic Highlights', 'Local Favorites', 'Hidden Gems', 'Cultural Deep Dive', 'Relaxation Day', 'Adventure Day', 'Food & Markets'];
    
    // Activities per day based on travel style
    const activitiesPerDay = travelStyle === 'relaxed' ? 3 : travelStyle === 'balanced' ? 5 : 7;
    
    let activityIndex = 0;
    for (let day = 1; day <= duration; day++) {
      const dayActivities: Activity[] = [];
      
      for (let i = 0; i < activitiesPerDay && activityIndex < activities.length; i++) {
        dayActivities.push(activities[activityIndex % activities.length]);
        activityIndex++;
      }
      
      // Add free time for relaxed style
      if (travelStyle === 'relaxed' && dayActivities.length > 0) {
        dayActivities.push({
          time: '15:00',
          title: 'Free Time',
          description: 'Explore on your own or rest at your hotel',
          type: 'free-time',
          duration: '2-3 hours',
          cost: 'Free',
        });
      }

      days.push({
        day,
        theme: themes[(day - 1) % themes.length],
        activities: dayActivities,
      });
    }

    setItinerary(days);
    setIsGenerating(false);
  };

  const interestOptions: { id: Interest; label: string; icon: string }[] = [
    { id: 'culture', label: 'Culture', icon: '🎭' },
    { id: 'food', label: 'Food', icon: '🍜' },
    { id: 'nature', label: 'Nature', icon: '🌿' },
    { id: 'nightlife', label: 'Nightlife', icon: '🌙' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'history', label: 'History', icon: '🏛️' },
    { id: 'adventure', label: 'Adventure', icon: '🧗' },
    { id: 'photography', label: 'Photography', icon: '📸' },
  ];

  const activityTypeIcons: Record<string, string> = {
    'attraction': '📍',
    'food': '🍽️',
    'activity': '🎯',
    'transport': '🚇',
    'free-time': '☕',
    'nature': '🌳',
    'shopping': '🛒',
    'nightlife': '🌙',
  };

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="🗺️"
            name="TripForge"
            tagline="AI Trip Planner"
            description="Get a personalized day-by-day itinerary crafted for your travel style and interests."
          />

          {/* Planner Form */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              {/* Destination */}
              <div className="mb-6">
                <CityAutocomplete
                  label="Where are you going?"
                  value={destination}
                  onChange={(value) => setDestination(value)}
                  placeholder="Enter destination city"
                />
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-midnight-600 mb-3">
                  How many days?
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="flex-1 h-2 bg-midnight-100 rounded-lg appearance-none cursor-pointer accent-coral-500"
                  />
                  <span className="w-16 text-center font-semibold text-midnight-900 bg-midnight-50 px-3 py-2 rounded-lg">
                    {duration} {duration === 1 ? 'day' : 'days'}
                  </span>
                </div>
              </div>

              {/* Travel Style */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-midnight-600 mb-3">
                  Travel pace
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { id: 'relaxed', label: 'Relaxed', desc: '3-4 activities/day', icon: '🧘' },
                    { id: 'balanced', label: 'Balanced', desc: '5-6 activities/day', icon: '⚖️' },
                    { id: 'intensive', label: 'Packed', desc: '7+ activities/day', icon: '🏃' },
                  ] as const).map(style => (
                    <button
                      key={style.id}
                      onClick={() => setTravelStyle(style.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        travelStyle === style.id
                          ? 'border-coral-400 bg-coral-50'
                          : 'border-midnight-200 hover:border-coral-300'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{style.icon}</span>
                      <span className="font-medium text-midnight-900 block">{style.label}</span>
                      <span className="text-xs text-midnight-500">{style.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-midnight-600 mb-3">
                  Your interests (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(interest => (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                        interests.includes(interest.id)
                          ? 'bg-coral-500 text-white'
                          : 'bg-midnight-50 text-midnight-600 hover:bg-coral-50'
                      }`}
                    >
                      <span>{interest.icon}</span>
                      {interest.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateItinerary}
                disabled={!destination || isGenerating}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating your itinerary...
                  </>
                ) : (
                  <>
                    ✨ Generate Itinerary
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Itinerary */}
          {itinerary && (
            <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
              {/* Itinerary Header */}
              <div className="bg-gradient-to-r from-coral-500 to-gold-500 rounded-2xl p-6 text-white mb-6">
                <h2 className="text-2xl font-display font-semibold mb-2">
                  Your {destination} Itinerary
                </h2>
                <p className="opacity-90">
                  {duration} {duration === 1 ? 'day' : 'days'} · {travelStyle} pace · {interests.length} interests
                </p>
              </div>

              {/* Day Cards */}
              <div className="space-y-6">
                {itinerary.map(day => (
                  <div key={day.day} className="bg-white rounded-2xl border border-midnight-100 overflow-hidden">
                    {/* Day Header */}
                    <div className="px-6 py-4 bg-midnight-50 border-b border-midnight-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-midnight-900 text-lg">Day {day.day}</h3>
                          <p className="text-sm text-midnight-500">{day.theme}</p>
                        </div>
                        <span className="px-3 py-1 bg-coral-100 text-coral-700 text-sm font-medium rounded-full">
                          {day.activities.length} activities
                        </span>
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="divide-y divide-midnight-100">
                      {day.activities.map((activity, idx) => (
                        <div key={idx} className="px-6 py-4">
                          <div className="flex items-start gap-4">
                            <div className="text-center">
                              <span className="text-2xl">{activityTypeIcons[activity.type] || '📍'}</span>
                              <p className="text-xs text-midnight-400 mt-1">{activity.time}</p>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-midnight-900">{activity.title}</h4>
                              <p className="text-sm text-midnight-600 mt-1">{activity.description}</p>
                              <div className="flex flex-wrap gap-3 mt-2">
                                <span className="text-xs text-midnight-500">⏱️ {activity.duration}</span>
                                <span className="text-xs text-midnight-500">💰 {activity.cost}</span>
                              </div>
                              {activity.tip && (
                                <p className="text-sm text-teal-600 mt-2">💡 {activity.tip}</p>
                              )}
                            </div>
                            {activity.bookUrl && (
                              <a
                                href={`https://www.viator.com/searchResults/all?text=${encodeURIComponent(destination + ' ' + activity.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 text-sm bg-coral-100 hover:bg-coral-200 text-coral-700 rounded-lg transition-colors whitespace-nowrap"
                              >
                                Book →
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-midnight-100 hover:bg-midnight-200 text-midnight-700 font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  🖨️ Print Itinerary
                </button>
                <a
                  href={`https://www.viator.com/searchResults/all?text=' tours and activities')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  🎫 Book {destination} Tours & Activities
                </a>
              </div>

              {/* Affiliate Disclosure */}
              <p className="text-xs text-midnight-400 text-center mt-4">
                Booking links go to Viator. WAYFARE may earn a commission on bookings.
              </p>
            </div>
          )}

          {/* Popular Destinations */}
          {!itinerary && (
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-xl font-display font-semibold text-midnight-900 mb-6 text-center">
                Popular Destinations (Curated Itineraries)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { city: 'Tokyo', icon: '🗼', country: 'Japan' },
                  { city: 'Paris', icon: '🗼', country: 'France' },
                  { city: 'New York', icon: '🗽', country: 'USA' },
                  { city: 'Las Vegas', icon: '🎰', country: 'USA' },
                  { city: 'London', icon: '🎡', country: 'UK' },
                  { city: 'Barcelona', icon: '🏰', country: 'Spain' },
                  { city: 'Rome', icon: '🏛️', country: 'Italy' },
                  { city: 'Dubai', icon: '🏙️', country: 'UAE' },
                  { city: 'Bali', icon: '🏝️', country: 'Indonesia' },
                  { city: 'Amsterdam', icon: '🚲', country: 'Netherlands' },
                ].map(dest => (
                  <button
                    key={dest.city}
                    onClick={() => setDestination(dest.city)}
                    className={`bg-white rounded-xl border p-4 hover:shadow-card-hover transition-all text-left ${
                      destination === dest.city ? 'border-coral-400 bg-coral-50' : 'border-midnight-100 hover:border-coral-200'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{dest.icon}</span>
                    <p className="font-medium text-midnight-900">{dest.city}</p>
                    <p className="text-xs text-midnight-500">{dest.country}</p>
                  </button>
                ))}
              </div>
              <p className="text-sm text-midnight-400 text-center mt-4">
                ✨ These destinations have hand-curated activities with insider tips
              </p>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <WhyUseCard 
              points={[
                'Personalized to your interests',
                'Adjustable travel pace',
                'Local tips included',
                'Book tours directly',
              ]}
            />
            <HowAICard 
              description="TripForge creates itineraries based on curated destination data, optimized for your travel style and interests."
              capabilities={[
                'Day-by-day planning',
                'Time estimates',
                'Cost estimates',
                'Insider tips',
              ]}
            />
            <QphiQInsight 
              insight="Don't over-plan! Leave buffer time for spontaneous discoveries. The best travel moments often aren't on any itinerary."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
