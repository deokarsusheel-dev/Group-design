export interface CityParams {
  windSpeed: number;
  seismicZone: string;
  seismicFactor: number;
  maxTemp: number;
  minTemp: number;
}

export const CITY_DATA: Record<string, CityParams> = {
  Mumbai: { windSpeed: 44, seismicZone: "III", seismicFactor: 0.16, maxTemp: 40, minTemp: 16 },
  Delhi: { windSpeed: 47, seismicZone: "IV", seismicFactor: 0.24, maxTemp: 47, minTemp: 2 },
  Chennai: { windSpeed: 50, seismicZone: "III", seismicFactor: 0.16, maxTemp: 43, minTemp: 18 },
  Bangalore: { windSpeed: 33, seismicZone: "II", seismicFactor: 0.10, maxTemp: 38, minTemp: 14 },
  Kolkata: { windSpeed: 50, seismicZone: "III", seismicFactor: 0.16, maxTemp: 43, minTemp: 8 },
};
