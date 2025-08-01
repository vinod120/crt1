import { Input } from "antd";
import { debounce } from "lodash";
import { memo, useCallback, useState } from "react";
import { CiSearch } from "react-icons/ci";
const SidebarSearch = memo(({ searchText, setSearchText }: any) => {
  const [inputValue, setInputValue] = useState(searchText);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchText(value);
    }, 500),
    [setSearchText]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <div style={{ width: "95%", margin: "10px auto" }}>
      <Input
        type="search"
        placeholder="Search..."
        name="asset search explorer"
        autoComplete="off"
        id="asset-search-explorer"
        value={inputValue}
        allowClear
        size="large"
        prefix={<CiSearch size={20} />}
        onChange={handleSearchChange}
      />
    </div>
  );
});

export default SidebarSearch;
