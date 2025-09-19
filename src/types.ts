export type Tourist = {
  id: string;
  name: string;
  passportId: string;
  lastSeen: string;
  location: [number, number];
  riskScore: number;
};

export type Alert = {
  id: string;
  type: "panic" | "anomaly" | "geofence";
  touristId: string;
  touristName: string;
  location: [number, number];
  createdAt: string;
};

export type TouristProfile = {
  id: string;
  name: string;
  passportId: string;
  nationality: string;
  signedId: string; // demo signed token
  isValid: boolean;
  lastLocation: [number, number];
};


