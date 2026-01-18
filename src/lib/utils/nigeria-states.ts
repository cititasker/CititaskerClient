export const NIGERIA_STATES = [
  { isoCode: "AB", name: "Abia" },
  { isoCode: "FC", name: "Abuja" },
  { isoCode: "AD", name: "Adamawa" },
  { isoCode: "AK", name: "Akwa Ibom" },
  { isoCode: "AN", name: "Anambra" },
  { isoCode: "BA", name: "Bauchi" },
  { isoCode: "BY", name: "Bayelsa" },
  { isoCode: "BE", name: "Benue" },
  { isoCode: "BO", name: "Borno" },
  { isoCode: "CR", name: "Cross River" },
  { isoCode: "DE", name: "Delta" },
  { isoCode: "EB", name: "Ebonyi" },
  { isoCode: "ED", name: "Edo" },
  { isoCode: "EK", name: "Ekiti" },
  { isoCode: "EN", name: "Enugu" },
  { isoCode: "GO", name: "Gombe" },
  { isoCode: "IM", name: "Imo" },
  { isoCode: "JI", name: "Jigawa" },
  { isoCode: "KD", name: "Kaduna" },
  { isoCode: "KN", name: "Kano" },
  { isoCode: "KT", name: "Katsina" },
  { isoCode: "KE", name: "Kebbi" },
  { isoCode: "KO", name: "Kogi" },
  { isoCode: "KW", name: "Kwara" },
  { isoCode: "LA", name: "Lagos" },
  { isoCode: "NA", name: "Nasarawa" },
  { isoCode: "NI", name: "Niger" },
  { isoCode: "OG", name: "Ogun" },
  { isoCode: "ON", name: "Ondo" },
  { isoCode: "OS", name: "Osun" },
  { isoCode: "OY", name: "Oyo" },
  { isoCode: "PL", name: "Plateau" },
  { isoCode: "RI", name: "Rivers" },
  { isoCode: "SO", name: "Sokoto" },
  { isoCode: "TA", name: "Taraba" },
  { isoCode: "YO", name: "Yobe" },
  { isoCode: "ZA", name: "Zamfara" },
] as const;

export type NigeriaState = (typeof NIGERIA_STATES)[number];

export const getNigeriaStates = () => NIGERIA_STATES;

export const findStateByName = (name: string) =>
  NIGERIA_STATES.find((state) => state.name === name);

export const findStateByCode = (isoCode: string) =>
  NIGERIA_STATES.find((state) => state.isoCode === isoCode);
