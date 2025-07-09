const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2 h-96 rounded-xl bg-gray-200 animate-pulse" />
        <div className="h-96 rounded-xl bg-gray-200 animate-pulse" />
      </div>
      <div className="h-64 rounded-xl bg-gray-200 animate-pulse" />
    </div>
  );
};

export default DashboardSkeleton;