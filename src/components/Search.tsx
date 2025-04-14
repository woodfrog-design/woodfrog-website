// import { FunctionComponent } from "react";
// import styles from "./Search.module.css";

// export type SearchType = {
//   className?: string;
// };

// const Search: FunctionComponent<SearchType> = ({ className = "" }) => {
//   return (
//     <div className={[styles.search, className].join(" ")}>
//       <div className={styles.inputField}>
//         <div className={styles.inputFieldBase}>
//           <div className={styles.inputFieldBase}>
//             <div className={styles.label}>Email</div>
//             <div className={styles.input}>
//               <div className={styles.content}>
//                 <img
//                   className={styles.inputPlaceholderIcon}
//                   alt=""
//                   src="/input-placeholder.svg"
//                 />
//                 <div className={styles.text}>Search</div>
//               </div>
//               <img className={styles.helpIcon} alt="" src="/help-icon1.svg" />
//             </div>
//           </div>
//           <div className={styles.hintText}>
//             This is a hint text to help user.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;

import { FunctionComponent, useState, ChangeEvent } from "react";
import styles from "./Search.module.css";

export type SearchType = {
  className?: string;
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
};

const Search: FunctionComponent<SearchType> = ({ 
  className = "", 
  onSearch,
  initialValue = "",
  placeholder = "Search..."
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClear = (): void => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className={[styles.search, className].join(" ")}>
      <div className={styles.searchWrapper}>
        <img
          className={styles.searchIcon}
          alt=""
          src="/input-placeholder.svg"
        />
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
        />
        {searchQuery && (
          <button 
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <div className={styles.hintText}>
        Search for blog posts by keywords, topics, or content
      </div>
    </div>
  );
};

export default Search;