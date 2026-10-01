"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export default function Locations() {
  const locations = [
    {
      title: "New Town & Action Area",
      description:
        "IT Corridor, wide boulevards, upcoming Metro lines & modern luxury high-rises.",
      properties: "180+",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBNLjhmeaWC5U-yzNuntEMYtvUe77_pTZj9mklAE8S5703pFZJDRENr9AaDIBIHVuMVV4ZPL3L0OXcZlk7S5p1_o1sTLpdZDM3PtKSojTkZdIkgkrogieoFIIFsZtP5JA3GpyuRL131zsbC8gagrkAEs8Q4wMJ8y8bQkohe2bufHLDtNCpMSrcuH5fIkPKKwh_dC8GdcNxejgtTtxZh1ThAdT5tRqX5Z94r5yZp56HQ-GUMe3wsnrdf",
      alt: "Modern wide boulevard in New Town Kolkata with glass skyscrapers",
    },
    {
      title: "Salt Lake (Sector I - V)",
      description:
        "Planned sector parks, tech corporate hubs, premier schools & Green Line Metro.",
      properties: "95+",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAGYPlcuqqzR-q8oR4UmDSkYCoflMdx_qS9k3e9O8v-_taJagtmXBThTVKAKHYo6JGBByt-alSBd4GhAcU6dB9jTqjKoRa1adKaQ3UhOPk8FXSmS5ED03gm3FEvmVDgdjEqWuJR8lDGQtC0-ivqFQ2Gs9VyuCeQZkhCXF2u5wGAS5yy6O6kUaIyrqDlu02RgODlCvdo_1F_VFIdelQJ_gBBD51zSbJ45TvXOTcokYo17lqToa7Us0NI",
      alt: "Lush green residential blocks in Salt Lake City Kolkata",
    },
    {
      title: "South Kolkata & Ballygunge",
      description:
        "Rich cultural heritage, vintage cafes, premier private academies & quiet avenues.",
      properties: "120+",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAbSCHb2-KABgwJtc9YOL50eYqKjXgycpjLQIfVQ4D10N_qieEnLdTEYgad-0YZxvfreZux4rWGVQw01Nf3wvE4DOX12c02PCBcQTtP8CD3WzzgEekyyuPNM1UTaUy2CP5TNz2by12FqdzRAIHWhc-ax14meAU_uCpeGJxvG_3AN9TT4yoT6wzYDA_4udzjm1vPzVp-lMBmoL46He7vZaZ0gQIUGnh1xqxs-Uf8ntHanCIPQktx_yXk",
      alt: "Quiet heritage leafy street in Ballygunge South Kolkata",
    },
    {
      title: "Rajarhat & Airport Road",
      description:
        "Fast-growing transit corridor, lifestyle retail malls & prime investment appreciation.",
      properties: "140+",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCQRa78ykkGs3gaol2VzJ10Jcc1IUZvkIC3NNEqPoYaC9adEPHh8JnprgrBY5A5iEGd8uIWhLy550SNwJGk77pWCZGe9JAcnj4e8vhpoFHp5Ku6-VOVZNTkoV3O2Z2h7tw0Dar0gor0K4PiTCRPDLuP9c9BSvxiuT7MmJtQUYmEDXQwNFkmlhi_aHSjD6ORu03Yjfds800vCcuOdi088niuDPlekIs7MFrZtWlslMd7O1D0QxM_WAwF",
      alt: "Aerial architectural view of VIP Road and Rajarhat Kolkata",
    },
  ];

  return (
    <section className="w-full py-space-2xl bg-surface">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div className="max-w-2xl">
            <div className="font-label-ui text-label-ui text-primary uppercase tracking-widest font-semibold mb-2">
              Prime Neighborhoods
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Explore Properties Across Kolkata
            </h2>
            <p className="font-body-default text-body-default text-secondary mt-1">
              Find your ideal home at Kolkata's most sought-after urban corridors
              and serene heritage avenues.
            </p>
          </div>
          <div className="font-label-ui text-body-dense text-secondary">
            Covering 68+ PIN codes across the metropolitan expanse
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="group rounded-xl overflow-hidden bg-surface-clean shadow-sm hover:shadow-xl transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-quint)] hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-[var(--ease-out-quint)]"
                  alt={loc.alt}
                  src={loc.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 text-surface-clean">
                  <span className="bg-surface-clean/20 backdrop-blur-md px-2 py-0.5 rounded font-label-ui text-label-ui">
                    {loc.properties} Properties
                  </span>
                </div>
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-title-property text-title-property text-on-surface mb-1">
                    {loc.title}
                  </h3>
                  <p className="font-body-dense text-body-dense text-secondary">
                    {loc.description}
                  </p>
                </div>
                <Link
                  className="pt-space-md inline-flex items-center gap-1 font-label-ui text-label-ui text-primary font-semibold hover:underline"
                  href="#featured-listings"
                >
                  <span className="">View Properties</span>
                  <span className="material-symbols-outlined text-[15px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
