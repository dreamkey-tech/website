import React from 'react';

export default function TrustAssurance() {
  const pillars = [
    {
      icon: "verified",
      title: "100% Verified Titles",
      desc: "30-year ancestral title verification, search reports, and mandatory WBRERA compliance certificates on every residential unit."
    },
    {
      icon: "person_pin",
      title: "Expert Advisory",
      desc: "Dedicated Kolkata corridor property specialists with intimate knowledge of Alipore, Ballygunge, and New Town capital growth."
    },
    {
      icon: "handshake",
      title: "Transparent Terms",
      desc: "Zero buyer brokerage on all direct builder developments with upfront developer pricing and schedule integrity."
    },
    {
      icon: "gavel",
      title: "End-to-End Legal",
      desc: "In-house registry counsel, municipal assessment assistance, mutation filing, and preferential rate banking loan approvals."
    }
  ];

  return (
    <section className="w-full bg-[#061225] text-inverse-on-surface py-12 md:py-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map(pillar => (
            <div key={pillar.title} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-highest/10 flex items-center justify-center shrink-0 text-tertiary-fixed-dim">
                <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-title-property text-title-property font-semibold text-inverse-on-surface">{pillar.title}</h4>
                <p className="font-body-dense text-body-dense text-surface-container-high/80 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
