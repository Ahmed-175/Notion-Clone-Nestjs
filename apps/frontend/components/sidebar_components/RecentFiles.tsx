const RecentFiles = () => {
  const RecentFiles = localStorage.getItem("recent_files");

  if (!RecentFiles) return;
  return (
    <div className=" mt-1">
      <div className="text-gray-700 text-lg">Recent notes</div>
    </div>
  );
};

export default RecentFiles;
