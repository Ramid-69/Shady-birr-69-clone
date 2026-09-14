export interface BankInfo {
  id: string;
  name: string;
  shortName: string;
  code: string;
  logoColor: string;
  textColor: string;
}

export const ETHIOPIAN_BANKS: BankInfo[] = [
  { id: 'cbe', name: 'Commercial Bank of Ethiopia', shortName: 'CBE', code: 'CBE', logoColor: '#721172', textColor: '#FFFFFF' },
  { id: 'abay', name: 'Abay Bank', shortName: 'Abay', code: 'ABAY', logoColor: '#0047AB', textColor: '#FFFFFF' },
  { id: 'addis', name: 'Addis International Bank', shortName: 'Addis', code: 'ADIB', logoColor: '#FFD700', textColor: '#003366' },
  { id: 'ahadu', name: 'Ahadu Bank', shortName: 'Ahadu', code: 'AHADU', logoColor: '#B22222', textColor: '#FFFFFF' },
  { id: 'amhara', name: 'Amhara Bank', shortName: 'Amhara', code: 'AMHARA', logoColor: '#0070BA', textColor: '#FFFFFF' },
  { id: 'awash', name: 'Awash International Bank', shortName: 'Awash', code: 'AIB', logoColor: '#FF6F00', textColor: '#FFFFFF' },
  { id: 'abyssinia', name: 'Bank of Abyssinia', shortName: 'Abyssinia', code: 'BOA', logoColor: '#DAA520', textColor: '#332200' },
  { id: 'berhan', name: 'Berhan International Bank', shortName: 'Berhan', code: 'BERHAN', logoColor: '#FF8C00', textColor: '#FFFFFF' },
  { id: 'coop', name: 'Cooperative Bank of Oromia', shortName: 'Coop', code: 'COOP', logoColor: '#C00000', textColor: '#FFFFFF' },
  { id: 'dashen', name: 'Dashen Bank', shortName: 'Dashen', code: 'DASHEN', logoColor: '#002B49', textColor: '#FFFFFF' },
  { id: 'enat', name: 'Enat Bank', shortName: 'Enat', code: 'ENAT', logoColor: '#800020', textColor: '#FFFFFF' },
  { id: 'hibret', name: 'Hibret Bank', shortName: 'Hibret', code: 'HIBRET', logoColor: '#FF9900', textColor: '#000000' },
  { id: 'lion', name: 'Lion International Bank', shortName: 'Lion', code: 'LIB', logoColor: '#D4AF37', textColor: '#000000' },
  { id: 'nib', name: 'Nib International Bank', shortName: 'Nib', code: 'NIB', logoColor: '#005F73', textColor: '#FFFFFF' },
  { id: 'oromia', name: 'Oromia Bank', shortName: 'Oromia', code: 'OIB', logoColor: '#EE2A24', textColor: '#FFFFFF' },
  { id: 'sinqee', name: 'Sinqee Bank', shortName: 'Sinqee', code: 'SINQEE', logoColor: '#2E7D32', textColor: '#FFFFFF' },
  { id: 'tsedey', name: 'Tsedey Bank', shortName: 'Tsedey', code: 'TSEDEY', logoColor: '#1565C0', textColor: '#FFFFFF' },
  { id: 'wegagen', name: 'Wegagen Bank', shortName: 'Wegagen', code: 'WEGAGEN', logoColor: '#C2185B', textColor: '#FFFFFF' },
  { id: 'zemen', name: 'Zemen Bank', shortName: 'Zemen', code: 'ZEMEN', logoColor: '#E65100', textColor: '#FFFFFF' },
  { id: 'zamzam', name: 'ZamZam Bank', shortName: 'ZamZam', code: 'ZAMZAM', logoColor: '#1B5E20', textColor: '#FFFFFF' },
  { id: 'hijra', name: 'Hijra Bank', shortName: 'Hijra', code: 'HIJRA', logoColor: '#0D47A1', textColor: '#FFFFFF' },
];
