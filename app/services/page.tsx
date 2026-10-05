import React from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      title: "Residential Properties",
      description: "Find properties that match your lifestyle, preferences, and budget. We assist with exploring residential opportunities, including flats, apartments, houses, and other residential properties.",
      icon: "home"
    },
    {
      title: "Commercial Properties",
      description: "Explore commercial real-estate opportunities for business and professional needs. We help clients discover suitable shops, offices, commercial spaces, and other business properties.",
      icon: "storefront"
    },
    {
      title: "Property Buying Assistance",
      description: "Looking to purchase a property? We help you explore available options, understand property details, compare suitable opportunities, and coordinate with relevant parties throughout your property search.",
      icon: "real_estate_agent"
    },
    {
      title: "Property Selling Assistance",
      description: "We assist property owners in presenting their properties to potential buyers, coordinating enquiries, and facilitating communication throughout the selling process.",
      icon: "sell"
    },
    {
      title: "Rental & Leasing Services",
      description: "Whether you are searching for a place to live or space for your business, we help connect tenants with relevant rental and leasing opportunities. We also assist owners in reaching prospective tenants.",
      icon: "key"
    },
    {
      title: "Property Owner Services",
      description: "We work with property owners to understand their requirements, showcase their properties, coordinate enquiries, and connect with prospective buyers or tenants.",
      icon: "manage_accounts"
    },
    {
      title: "Real Estate Investment Assistance",
      description: "Explore property opportunities based on your objectives, budget, location preferences, and investment horizon. We help you assess available options, while investment decisions remain subject to independent due diligence and professional advice.",
      icon: "trending_up"
    },
    {
      title: "Broker & Channel Partner Collaboration",
      description: "We welcome professional collaboration with brokers and channel partners to share relevant property opportunities, coordinate client requirements, and build mutually beneficial business relationships.",
      icon: "handshake"
    },
    {
      title: "Property Marketing & Promotion",
      description: "We help present property listings through relevant marketing channels and clear property information to improve visibility among prospective buyers and tenants.",
      icon: "campaign"
    },
    {
      title: "Personalized Property Consultation",
      description: "Every property requirement is different. We offer personalized assistance to help you define your requirements, explore available opportunities, and navigate the property search process with greater clarity.",
      icon: "support_agent"
    }
  ];

  const reasons = [
    {
      title: "Client-Focused Approach",
      desc: "We prioritize your requirements and preferences.",
      icon: "person"
    },
    {
      title: "Personalized Assistance",
      desc: "Property suggestions aligned with your needs and budget.",
      icon: "assignment_ind"
    },
    {
      title: "Professional Communication",
      desc: "Clear coordination between clients, owners, and partners.",
      icon: "forum"
    },
    {
      title: "Multiple Property Options",
      desc: "Assistance across residential and commercial property requirements.",
      icon: "maps_home_work"
    },
    {
      title: "Relationship-Driven Service",
      desc: "We value trust, communication, and long-term professional relationships.",
      icon: "diversity_3"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-charcoal-pure text-surface py-20 md:py-32 px-margin-mobile md:px-margin overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-charcoal-pure to-charcoal-pure pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <span className="font-label-ui text-label-ui uppercase tracking-[0.2em] text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
            Our Services
          </span>
          <h1 className="font-display text-[40px] leading-[1.1] md:text-[56px] lg:text-[72px] font-bold text-surface-clean tracking-tight">
            Real Estate Solutions <br className="hidden md:block"/> Built Around You
          </h1>
          <p className="font-body-large text-body-large text-secondary-fixed-dim max-w-2xl mt-4">
            At DreamKey Reality, we simplify the property journey by connecting buyers, sellers, tenants, property owners, and investors with suitable real-estate opportunities.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="w-full py-24 px-margin-mobile md:px-margin bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-[32px] md:text-[40px] font-bold text-on-surface mb-4">Comprehensive Real Estate Services</h2>
            <p className="font-body-default text-body-default text-secondary">
              We focus on understanding your requirements, providing personalized assistance, and building long-term relationships through professional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div key={index} className="group flex flex-col gap-4 bg-surface-clean border border-border-subtle p-8 rounded-3xl shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 pointer-events-none" />
                <div className="w-14 h-14 bg-surface-container-low border border-border-subtle rounded-2xl flex items-center justify-center text-primary mb-2 shadow-inner group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-colors duration-300 relative z-10">
                  <span className="material-symbols-outlined text-[28px]">{service.icon}</span>
                </div>
                <h3 className="font-title-property text-[20px] font-bold text-on-surface relative z-10">{service.title}</h3>
                <p className="font-body-default text-[15px] text-secondary leading-relaxed relative z-10">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-24 px-margin-mobile md:px-margin bg-charcoal-pure text-surface relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="font-label-ui text-label-ui uppercase tracking-[0.2em] text-primary font-bold">Why Choose DreamKey Reality?</span>
            <h2 className="font-display text-[32px] md:text-[40px] font-bold text-surface-clean leading-tight">
              A Partner You Can Trust
            </h2>
            <p className="font-body-default text-body-default text-secondary-fixed-dim">
              We go beyond transactions. We build lasting relationships based on transparency, expertise, and a genuine commitment to your success in the real estate market.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {reasons.map((reason, index) => (
              <div key={index} className="bg-surface-clean/5 backdrop-blur-md border border-secondary/20 p-6 rounded-2xl hover:bg-surface-clean/10 transition-colors">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-[20px]">{reason.icon}</span>
                </div>
                <h4 className="font-title-property font-semibold text-surface-clean mb-2">{reason.title}</h4>
                <p className="font-body-default text-sm text-secondary-fixed-dim leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 px-margin-mobile md:px-margin bg-surface-container-lowest">
        <div className="max-w-5xl mx-auto bg-surface-clean rounded-[40px] border border-border-subtle p-10 md:p-16 shadow-[0_8px_40px_rgb(0,0,0,0.06)] text-center flex flex-col items-center gap-8 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
          
          <h2 className="font-display text-[32px] md:text-[48px] font-bold text-on-surface tracking-tight relative z-10">
            Let's Find Your Next Opportunity
          </h2>
          <p className="font-body-large text-body-large text-secondary max-w-2xl relative z-10 leading-relaxed">
            Whether you want to buy, sell, rent, lease, or explore property investment opportunities, DreamKey Reality is here to help you take the next step.
            <br/><br/>
            <span className="font-semibold text-primary tracking-wide">DreamKey Reality — Real Estate. Simplified. Trusted. Built Around You.</span>
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 relative z-10 w-full sm:w-auto">
            <Link href="/#contact" className="w-full sm:w-auto px-8 py-3.5 bg-primary text-on-primary rounded-xl font-semibold tracking-wide hover:bg-primary-container hover:-translate-y-1 transition-all duration-300 shadow-md flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">call</span>
              Contact Us
            </Link>
            <Link href="/buy" className="w-full sm:w-auto px-8 py-3.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">search</span>
              Explore Properties
            </Link>
            <Link href="/#sell" className="w-full sm:w-auto px-8 py-3.5 bg-surface border border-border-subtle text-on-surface hover:border-primary hover:text-primary rounded-xl font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">add_business</span>
              List Your Property
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
