const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-80 rounded-xl bg-gray-200 animate-pulse" />
        <div className="h-80 rounded-xl bg-gray-200 animate-pulse" />
      </div>
      <div className="h-80 rounded-xl bg-gray-200 animate-pulse" />
    </div>
  );
};

export default DashboardSkeleton;