/** User-supplied client feedback, lightly edited for clarity from WhatsApp messages. */
export type ClientStory = {
  name: string;
  role: string;
  location?: string;
  quote: string;
};

export const CLIENT_STORIES = [
  {
    name: "Oanh",
    role: "Client",
    location: "Vietnam",
    quote:
      "The house is beautiful, and we’re very satisfied with the way you work. Your team is cheerful and enthusiastic. Thank you!",
  },
  {
    name: "Mai",
    role: "Client",
    location: "Vietnam",
    quote: "Keep up the good work! I’ll also recommend you to my friends.",
  },
  {
    name: "Capt. Amit Choudhury",
    role: "Client",
    quote:
      "You did an excellent job. The documentation and other formalities were handled smoothly and in a timely manner, helping both parties. Your team was courteous and professional. I would definitely recommend your services to other property owners. Best wishes for your future endeavours.",
  },
] as const satisfies readonly ClientStory[];
