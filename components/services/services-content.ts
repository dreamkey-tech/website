/** Copy grounded in the founder interview and the user's November 2026 business brief. */
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
    imageAlt:
      "Illustrative apartment viewing with an adviser showing a couple the city view",
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
      "Illustrative rental search with a woman reviewing apartment options and a checklist",
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
      "Illustrative property consultation with an adviser and a couple reviewing a listing on a laptop",
    href: "/sell",
    linkLabel: "Start your property sale",
  },
  {
    id: "consulting",
    category: "Consulting & documentation assistance",
    title: "Make sense of your options.",
    description:
      "Explore investment and other property options around your objectives, budget and location. Our real estate consulting includes documentation assistance with the relevant transaction steps.",
    image: "/images/service/Real_Estate_Investment_Consultation.webp",
    imageAlt:
      "Illustrative investment consultation with property options displayed on a laptop",
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
    title: "Guidance on the next steps",
    copy: "We help you connect with relevant property contacts and assist with transaction documentation. The steps depend on the property and service involved.",
  },
];

export const serviceQuestions = [
  {
    question: "What property services does Dreamkey offer?",
    answer:
      "We offer buying assistance, rental services, selling assistance, real estate consulting, investment consulting and documentation assistance. Your requirements guide the options we explore through our local broker and consultant network.",
  },
  {
    question: "Where in Kolkata do you work?",
    answer:
      "We focus on selected areas in East, South and North Kolkata. Tell us if you’re considering New Town, Rajarhat, Salt Lake or another locality, so we can confirm relevant options and current coverage.",
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
