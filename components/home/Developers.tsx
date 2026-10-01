export default function Developers() {
  const developers = [
    { name: "MANI", subtitle: "Group Kolkata" },
    { name: "PS GROUP", subtitle: "Living Redefined" },
    { name: "MERLIN", subtitle: "A Home For Every Indian" },
    { name: "AMBUJA", subtitle: "Neotia Realty" },
    { name: "FORUM", subtitle: "Estates Kolkata" },
    { name: "HILAND", subtitle: "Riverfront Living" },
  ];

  return (
    <section className="w-full py-space-xl bg-surface">
      <div className="max-w-[1320px] mx-auto px-margin-mobile md:px-margin">
        <div className="text-center max-w-xl mx-auto mb-space-lg">
          <h3 className="font-title-property text-title-property text-on-surface">
            Properties From Trusted Developers
          </h3>
          <p className="font-body-dense text-body-dense text-secondary mt-1">
            Direct tie-ups and priority allotments with Eastern India's most
            reputable real estate groups.
          </p>
        </div>
        {/* Developer Badges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-md items-center justify-center">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="bg-surface-clean rounded p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow transition-shadow"
            >
              <span className="font-title-property text-title-property text-on-surface font-bold tracking-tight">
                {dev.name}
              </span>
              <span className="font-label-ui text-[10px] tracking-widest uppercase text-secondary">
                {dev.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
