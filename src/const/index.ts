const API = "https://angular-test-backend-yc4c5cvnnq-an.a.run.app";

const USERS = ["Sam", "Russell", "Joyse"] as const;

const CHANNELS = [
  { title: "General", value: "1" },
  { title: "Technology", value: "2" },
  { title: "LGTM", value: "3" },
] as const;

export { API, USERS, CHANNELS };
