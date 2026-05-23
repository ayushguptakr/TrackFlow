const MobileOverlay = ({ onClick }) => (
  <button
    type="button"
    aria-label="Close sidebar"
    className="fixed inset-0 z-40 animate-fade-in bg-zinc-900/40 backdrop-blur-[1px] lg:hidden"
    onClick={onClick}
  />
);

export default MobileOverlay;
