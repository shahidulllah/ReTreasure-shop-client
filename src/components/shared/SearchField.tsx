import { MapPin, Search } from "lucide-react";
import { Button } from "../ui/button";

const SearchField = () => {
  return (
    <div className="flex items-center bg-white dark:bg-gray-700 text-black rounded-md p-1 border">
      <Search className="h-5 w-5 text-gray-500 dark:text-gray-300 mx-2" />
      <input
        className="border-none outline-none focus:-none w-40 dark:text-gray-200"
        placeholder="Search "
      />
      <MapPin className="h-5 w-5 text-gray-500 mx-2 dark:text-gray-300" />
      <input
        className="border-none outline-none w-32 dark:text-gray-200"
        placeholder="Location"
      />
      <Button className="bg-purple-700 text-white rounded-md">
        Search
      </Button>
    </div>
  );
};

export default SearchField;
