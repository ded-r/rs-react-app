import { useSearchParams } from "react-router";

const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const setSearchQuery = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set("query", value);
    } else {
      newSearchParams.delete("query");
    }
    setSearchParams(newSearchParams);
  };

  return [query, setSearchQuery] as const;
};

export default useSearchQuery;