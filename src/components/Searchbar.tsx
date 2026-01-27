import { FunctionComponent, ChangeEvent } from 'react';
import styles from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';

export type SearchbarProps = {
  className?: string;
  onSearch: (query: string) => void;
  searchQuery: string;
};

const Searchbar: FunctionComponent<SearchbarProps> = ({
  className = '',
  onSearch,
  searchQuery,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="d-flex justify-content-center mt-5 mb-0 w-100">
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%' }}>
        <div className={styles.searchWrapper}>
          <CiSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
