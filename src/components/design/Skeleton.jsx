const Skeleton = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-gray-200 animate-pulse" />
        <div className="aspect-video rounded-xl bg-gray-200 animate-pulse" />
        <div className="aspect-video rounded-xl bg-gray-200 animate-pulse" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-gray-200 md:min-h-min animate-pulse" />
    </div>
  );
};

export default Skeleton;
