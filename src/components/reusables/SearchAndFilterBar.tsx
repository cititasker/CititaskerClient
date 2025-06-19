import Icons from "../Icons";

const SearchAndFilterBar = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Search Bar */}
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2  bg-white">
        <Icons.search />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none  text-sm"
        />
      </div>

      {/* Filter Button */}
      <button className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm bg-white hover:bg-gray-100">
        <Icons.filter />
        <span>Filter</span>
      </button>
    </div>
  );
};

export default SearchAndFilterBar;
