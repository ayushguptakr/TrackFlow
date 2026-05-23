const PageHeader = ({ subtitle }) => {
  if (!subtitle) return null;

  return (
    <div className="mb-6 sm:mb-8">
      <p className="text-sm leading-relaxed text-zinc-500">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
