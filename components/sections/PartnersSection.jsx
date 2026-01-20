export default function PartnersSection() {
  return (
    <section
      id="partners-section"
      data-nav-label="พันธมิตร"
      className="py-12"
    >
      <div className="ds-container">
        <div className="flex flex-nowrap justify-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all text-[#181411]">
          <div className="flex items-center gap-2 text-xl font-black">
            <span className="material-symbols-outlined">diamond</span> LUXE
          </div>
          <div className="flex items-center gap-2 text-xl font-black">
            <span className="material-symbols-outlined">apartment</span> URBAN
          </div>
          <div className="flex items-center gap-2 text-xl font-black">
            <span className="material-symbols-outlined">nature</span> OAK&amp;CO
          </div>
          <div className="flex items-center gap-2 text-xl font-black">
            <span className="material-symbols-outlined">grid_view</span> DESIGNPRO
          </div>
          <div className="flex items-center gap-2 text-xl font-black">
            <span className="material-symbols-outlined">brush</span> ARTISAN
          </div>
        </div>
      </div>
    </section>
  );
}
