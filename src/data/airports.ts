// Major worldwide airports database
export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export const airports: Airport[] = [
  // United States
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International', city: 'Atlanta', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA' },
  { code: 'ORD', name: "O'Hare International", city: 'Chicago', country: 'USA' },
  { code: 'DFW', name: 'Dallas/Fort Worth International', city: 'Dallas', country: 'USA' },
  { code: 'DEN', name: 'Denver International', city: 'Denver', country: 'USA' },
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'USA' },
  { code: 'SEA', name: 'Seattle-Tacoma International', city: 'Seattle', country: 'USA' },
  { code: 'LAS', name: 'Harry Reid International', city: 'Las Vegas', country: 'USA' },
  { code: 'MCO', name: 'Orlando International', city: 'Orlando', country: 'USA' },
  { code: 'EWR', name: 'Newark Liberty International', city: 'Newark', country: 'USA' },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'USA' },
  { code: 'PHX', name: 'Phoenix Sky Harbor International', city: 'Phoenix', country: 'USA' },
  { code: 'IAH', name: 'George Bush Intercontinental', city: 'Houston', country: 'USA' },
  { code: 'BOS', name: 'Boston Logan International', city: 'Boston', country: 'USA' },
  { code: 'MSP', name: 'Minneapolis-Saint Paul International', city: 'Minneapolis', country: 'USA' },
  { code: 'DTW', name: 'Detroit Metropolitan', city: 'Detroit', country: 'USA' },
  { code: 'PHL', name: 'Philadelphia International', city: 'Philadelphia', country: 'USA' },
  { code: 'LGA', name: 'LaGuardia', city: 'New York', country: 'USA' },
  { code: 'BWI', name: 'Baltimore/Washington International', city: 'Baltimore', country: 'USA' },
  { code: 'SLC', name: 'Salt Lake City International', city: 'Salt Lake City', country: 'USA' },
  { code: 'DCA', name: 'Ronald Reagan Washington National', city: 'Washington D.C.', country: 'USA' },
  { code: 'IAD', name: 'Washington Dulles International', city: 'Washington D.C.', country: 'USA' },
  { code: 'SAN', name: 'San Diego International', city: 'San Diego', country: 'USA' },
  { code: 'TPA', name: 'Tampa International', city: 'Tampa', country: 'USA' },
  { code: 'AUS', name: 'Austin-Bergstrom International', city: 'Austin', country: 'USA' },
  { code: 'HNL', name: 'Daniel K. Inouye International', city: 'Honolulu', country: 'USA' },
  { code: 'PDX', name: 'Portland International', city: 'Portland', country: 'USA' },
  { code: 'STL', name: 'St. Louis Lambert International', city: 'St. Louis', country: 'USA' },
  { code: 'BNA', name: 'Nashville International', city: 'Nashville', country: 'USA' },
  { code: 'OAK', name: 'Oakland International', city: 'Oakland', country: 'USA' },
  { code: 'SJC', name: 'San Jose International', city: 'San Jose', country: 'USA' },
  { code: 'RDU', name: 'Raleigh-Durham International', city: 'Raleigh', country: 'USA' },
  { code: 'CLE', name: 'Cleveland Hopkins International', city: 'Cleveland', country: 'USA' },
  { code: 'SMF', name: 'Sacramento International', city: 'Sacramento', country: 'USA' },
  { code: 'MCI', name: 'Kansas City International', city: 'Kansas City', country: 'USA' },
  { code: 'IND', name: 'Indianapolis International', city: 'Indianapolis', country: 'USA' },
  { code: 'PIT', name: 'Pittsburgh International', city: 'Pittsburgh', country: 'USA' },
  { code: 'CMH', name: 'John Glenn Columbus International', city: 'Columbus', country: 'USA' },
  { code: 'CVG', name: 'Cincinnati/Northern Kentucky International', city: 'Cincinnati', country: 'USA' },
  
  // Canada
  { code: 'YYZ', name: 'Toronto Pearson International', city: 'Toronto', country: 'Canada' },
  { code: 'YVR', name: 'Vancouver International', city: 'Vancouver', country: 'Canada' },
  { code: 'YUL', name: 'Montréal-Trudeau International', city: 'Montreal', country: 'Canada' },
  { code: 'YYC', name: 'Calgary International', city: 'Calgary', country: 'Canada' },
  { code: 'YEG', name: 'Edmonton International', city: 'Edmonton', country: 'Canada' },
  { code: 'YOW', name: 'Ottawa Macdonald-Cartier International', city: 'Ottawa', country: 'Canada' },
  
  // Europe
  { code: 'LHR', name: 'Heathrow', city: 'London', country: 'UK' },
  { code: 'LGW', name: 'Gatwick', city: 'London', country: 'UK' },
  { code: 'STN', name: 'Stansted', city: 'London', country: 'UK' },
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
  { code: 'ORY', name: 'Orly', city: 'Paris', country: 'France' },
  { code: 'AMS', name: 'Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'FRA', name: 'Frankfurt', city: 'Frankfurt', country: 'Germany' },
  { code: 'MUC', name: 'Munich', city: 'Munich', country: 'Germany' },
  { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlin', country: 'Germany' },
  { code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas', city: 'Madrid', country: 'Spain' },
  { code: 'BCN', name: 'Barcelona-El Prat', city: 'Barcelona', country: 'Spain' },
  { code: 'FCO', name: 'Leonardo da Vinci-Fiumicino', city: 'Rome', country: 'Italy' },
  { code: 'MXP', name: 'Milan Malpensa', city: 'Milan', country: 'Italy' },
  { code: 'VCE', name: 'Venice Marco Polo', city: 'Venice', country: 'Italy' },
  { code: 'ZRH', name: 'Zurich', city: 'Zurich', country: 'Switzerland' },
  { code: 'GVA', name: 'Geneva', city: 'Geneva', country: 'Switzerland' },
  { code: 'VIE', name: 'Vienna International', city: 'Vienna', country: 'Austria' },
  { code: 'CPH', name: 'Copenhagen', city: 'Copenhagen', country: 'Denmark' },
  { code: 'OSL', name: 'Oslo Gardermoen', city: 'Oslo', country: 'Norway' },
  { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm', country: 'Sweden' },
  { code: 'HEL', name: 'Helsinki-Vantaa', city: 'Helsinki', country: 'Finland' },
  { code: 'DUB', name: 'Dublin', city: 'Dublin', country: 'Ireland' },
  { code: 'LIS', name: 'Lisbon Portela', city: 'Lisbon', country: 'Portugal' },
  { code: 'ATH', name: 'Athens International', city: 'Athens', country: 'Greece' },
  { code: 'IST', name: 'Istanbul', city: 'Istanbul', country: 'Turkey' },
  { code: 'PRG', name: 'Václav Havel Prague', city: 'Prague', country: 'Czech Republic' },
  { code: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Budapest', country: 'Hungary' },
  { code: 'WAW', name: 'Warsaw Chopin', city: 'Warsaw', country: 'Poland' },
  { code: 'BRU', name: 'Brussels', city: 'Brussels', country: 'Belgium' },
  
  // Asia
  { code: 'NRT', name: 'Narita International', city: 'Tokyo', country: 'Japan' },
  { code: 'HND', name: 'Haneda', city: 'Tokyo', country: 'Japan' },
  { code: 'KIX', name: 'Kansai International', city: 'Osaka', country: 'Japan' },
  { code: 'ICN', name: 'Incheon International', city: 'Seoul', country: 'South Korea' },
  { code: 'PEK', name: 'Beijing Capital International', city: 'Beijing', country: 'China' },
  { code: 'PKX', name: 'Beijing Daxing International', city: 'Beijing', country: 'China' },
  { code: 'PVG', name: 'Shanghai Pudong International', city: 'Shanghai', country: 'China' },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'China' },
  { code: 'TPE', name: 'Taiwan Taoyuan International', city: 'Taipei', country: 'Taiwan' },
  { code: 'SIN', name: 'Changi', city: 'Singapore', country: 'Singapore' },
  { code: 'BKK', name: 'Suvarnabhumi', city: 'Bangkok', country: 'Thailand' },
  { code: 'KUL', name: 'Kuala Lumpur International', city: 'Kuala Lumpur', country: 'Malaysia' },
  { code: 'CGK', name: 'Soekarno-Hatta International', city: 'Jakarta', country: 'Indonesia' },
  { code: 'DPS', name: 'Ngurah Rai International', city: 'Bali', country: 'Indonesia' },
  { code: 'MNL', name: 'Ninoy Aquino International', city: 'Manila', country: 'Philippines' },
  { code: 'HAN', name: 'Noi Bai International', city: 'Hanoi', country: 'Vietnam' },
  { code: 'SGN', name: 'Tan Son Nhat International', city: 'Ho Chi Minh City', country: 'Vietnam' },
  { code: 'DEL', name: 'Indira Gandhi International', city: 'New Delhi', country: 'India' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', city: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Kempegowda International', city: 'Bangalore', country: 'India' },
  
  // Middle East
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE' },
  { code: 'AUH', name: 'Abu Dhabi International', city: 'Abu Dhabi', country: 'UAE' },
  { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar' },
  { code: 'TLV', name: 'Ben Gurion', city: 'Tel Aviv', country: 'Israel' },
  { code: 'AMM', name: 'Queen Alia International', city: 'Amman', country: 'Jordan' },
  { code: 'CAI', name: 'Cairo International', city: 'Cairo', country: 'Egypt' },
  
  // Oceania
  { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia' },
  { code: 'MEL', name: 'Melbourne', city: 'Melbourne', country: 'Australia' },
  { code: 'BNE', name: 'Brisbane', city: 'Brisbane', country: 'Australia' },
  { code: 'PER', name: 'Perth', city: 'Perth', country: 'Australia' },
  { code: 'AKL', name: 'Auckland', city: 'Auckland', country: 'New Zealand' },
  { code: 'CHC', name: 'Christchurch International', city: 'Christchurch', country: 'New Zealand' },
  
  // Latin America
  { code: 'MEX', name: 'Mexico City International', city: 'Mexico City', country: 'Mexico' },
  { code: 'CUN', name: 'Cancún International', city: 'Cancún', country: 'Mexico' },
  { code: 'GDL', name: 'Guadalajara International', city: 'Guadalajara', country: 'Mexico' },
  { code: 'SJD', name: 'Los Cabos International', city: 'San José del Cabo', country: 'Mexico' },
  { code: 'GRU', name: 'São Paulo-Guarulhos International', city: 'São Paulo', country: 'Brazil' },
  { code: 'GIG', name: 'Rio de Janeiro-Galeão International', city: 'Rio de Janeiro', country: 'Brazil' },
  { code: 'EZE', name: 'Ministro Pistarini International', city: 'Buenos Aires', country: 'Argentina' },
  { code: 'SCL', name: 'Arturo Merino Benítez International', city: 'Santiago', country: 'Chile' },
  { code: 'LIM', name: 'Jorge Chávez International', city: 'Lima', country: 'Peru' },
  { code: 'BOG', name: 'El Dorado International', city: 'Bogotá', country: 'Colombia' },
  { code: 'PTY', name: 'Tocumen International', city: 'Panama City', country: 'Panama' },
  { code: 'SJO', name: 'Juan Santamaría International', city: 'San José', country: 'Costa Rica' },
  
  // Caribbean
  { code: 'SJU', name: 'Luis Muñoz Marín International', city: 'San Juan', country: 'Puerto Rico' },
  { code: 'NAS', name: 'Lynden Pindling International', city: 'Nassau', country: 'Bahamas' },
  { code: 'MBJ', name: 'Sangster International', city: 'Montego Bay', country: 'Jamaica' },
  { code: 'PUJ', name: 'Punta Cana International', city: 'Punta Cana', country: 'Dominican Republic' },
  
  // Africa
  { code: 'JNB', name: "O.R. Tambo International", city: 'Johannesburg', country: 'South Africa' },
  { code: 'CPT', name: 'Cape Town International', city: 'Cape Town', country: 'South Africa' },
  { code: 'NBO', name: 'Jomo Kenyatta International', city: 'Nairobi', country: 'Kenya' },
  { code: 'ADD', name: 'Bole International', city: 'Addis Ababa', country: 'Ethiopia' },
  { code: 'CMN', name: 'Mohammed V International', city: 'Casablanca', country: 'Morocco' },
  { code: 'LOS', name: 'Murtala Muhammed International', city: 'Lagos', country: 'Nigeria' },
];

// Search function that matches code, city, or airport name
export function searchAirports(query: string): Airport[] {
  if (!query || query.length < 1) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return airports
    .filter(airport => 
      airport.code.toLowerCase().includes(searchTerm) ||
      airport.city.toLowerCase().includes(searchTerm) ||
      airport.name.toLowerCase().includes(searchTerm) ||
      airport.country.toLowerCase().includes(searchTerm)
    )
    .slice(0, 8); // Limit to 8 results for UI
}
