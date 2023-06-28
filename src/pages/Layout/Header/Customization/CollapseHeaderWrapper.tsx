const CollapseHeaderWrapper: React.FC<{
  title: string;
  subTitle: string;
  icon: React.ReactNode;
}> = ({ title, icon, subTitle }) => (
  <div className="flex items-center">
    <div className="flex items-center justify-center rounded bg-secondary p-2 text-lg text-primary">
      {icon}
    </div>

    <div className="ml-5">
      <p>{title}</p>
      <p className="text-xs opacity-40">{subTitle}</p>
    </div>
  </div>
);

export default CollapseHeaderWrapper;
