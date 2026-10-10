/** Copy grounded in the supplied founder interview; source notes in docs/services-page.md. */
export type PropertyService = {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  linkLabel: string;
};

export const propertyServices: PropertyService[] = [
  {
    id: "buying",
    category: "Buying assistance",
    title: "Find a place to buy.",
    description:
      "Your location, budget and priorities shape the search. We explore property options through our broker and consultant network to help you find a suitable match.",
    image: "/images/Buying.webp",
    imageAlt: "Illustrative Kolkata-inspired high-rise residential towers",
    href: "/buy",
    linkLabel: "Explore homes to buy",
  },
  {
    id: "renting",
    category: "Rental services",
    title: "Find your next rental.",
    description:
      "Looking for a rental or a tenant? We connect rental requirements and property information with relevant customers, brokers and consultants across our local network.",
    image: "/images/service/Thoughtful_Rental_Search_at_Home.webp",
    imageAlt:
      "Illustrative bright living room with a Kolkata-inspired city view",
    href: "/rent",
    linkLabel: "Explore rentals",
  },
  {
    id: "selling",
    category: "Selling assistance",
    title: "Give your property a new chapter.",
    description:
      "Selling starts with reaching the right people. We share property information with relevant customers, brokers and consultants to connect your property with potential buyers.",
    image: "/images/Selling.webp",
    imageAlt:
      "Illustrative apartment living room overlooking Kolkata-inspired residential towers",
    href: "/sell",
    linkLabel: "Start your property sale",
  },
  {
    id: "consulting",
    category: "Investment & real estate consulting",
    title: "Make sense of your options.",
    description:
      "Considering an investment or still defining your search? Our property investment and real estate consulting starts with your objectives, budget and preferred location.",
    image: "/images/service/Real_Estate_Investment_Consultation.webp",
    imageAlt:
      "Illustrative consultation space overlooking a Kolkata-inspired river and bridge",
    href: "/contact",
    linkLabel: "Discuss a property consultation",
  },
];

export const serviceApproach = [
  {
    title: "Your requirements first",
    copy: "Tell us whether you want to buy, rent, sell or invest, along with the location, budget and priorities that matter to you.",
  },
  {
    title: "Options through our network",
    copy: "We bring together property information from brokers and consultants, looking for options relevant to your requirements.",
  },
  {
    title: "A conversation about next steps",
    copy: "We help connect you with relevant property contacts. The next steps depend on your requirements and the service involved.",
  },
];

export const serviceQuestions = [
  {
    question: "What can Dream Key help me with?",
    answer:
      "Our core services are property renting, buying and selling assistance, property investment consulting and real estate consulting. We start by understanding what you need and exploring relevant options through our network.",
  },
  {
    question: "Where in Kolkata do you work?",
    answer:
      "Our focus is Kolkata, including selected areas in East, South and North Kolkata. Share your preferred locality so we can discuss relevant options and current availability.",
  },
  {
    question: "Can I contact you before I have a shortlist?",
    answer:
      "Yes. You can begin with your requirements rather than a particular property. Your purpose, preferred location, budget and priorities give us a starting point for the conversation.",
  },
  {
    question: "Do you collaborate with independent brokers?",
    answer:
      "Yes. We work with brokers and property consultants, share property information and collaborate on customer requirements. Contact our team to discuss working together.",
  },
];
