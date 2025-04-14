// import { FunctionComponent } from "react";
// import HEADER from "../components/HEADER";
// import Badge from "../components/Badge";
// import Pricing1 from "../components/Pricing1";
// import styles from "./BlogPage1.module.css";
// // import HorizontalTabs from "./ HorizontalTabs";
// import BenefitImages from "./BenefitImages";
// import PlatformBenefits1 from "./PlatformBenefits1";

// const BlogPage1: FunctionComponent = () => {
//     return (
//         <div className={styles.blogPage}>
//             <HEADER tagline={true} />
//             <div className={styles.horizontalTabsParent}>
//                 {/* <HorizontalTabs /> */}
//                 <div className={styles.platformBenefits}>

//                     <PlatformBenefits1 title="Recommended Articles" padding="0px" />
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default BlogPage1;

import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import HEADER from "../components/HEADER";
import Badge from "../components/Badge";
import PlatformBenefits1 from "./PlatformBenefits1";
import styles from "./BlogPage1.module.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import BlogComponent from "./BlogComponent";

// Define TypeScript interfaces for your blog data
interface BlogContent {
  header: string;
  subHeader: string;
  content: string;
}

interface Blog {
  id: string;
  category: string;
  title: string;
  description: string;
  color: string;
  content: BlogContent[];
}

// Blog data structure based on your screenshot
const blogData: Blog[] = [
  {
    id: "machine-learning-in-action",
    category: "Machine Learning",
    title: "Machine Learning in Action",
    description: "5 Real-World Applications Driving Innovation",
    color: "#1E90FF", // Blue theme color
    content: [
      {
        header: "Machine Learning Applications",
        subHeader: "Real-World Use Cases",
        content: "Machine learning is transforming industries through various applications..."
      },
      // More content sections
    ]
  },
  {
    id: "unlocking-ai-power",
    category: "AI",
    title: "Unlocking the Power of AI",
    description: "How Businesses Are Transforming Decision-Making",
    color: "#FFA500", // Orange theme color
    content: [
      {
        header: "AI Revolution",
        subHeader: "Business Transformation",
        content: "Artificial Intelligence is revolutionizing how businesses make decisions..."
      },
      // More content sections
    ]
  },
  {
    id: "data-driven-success",
    category: "Data Analytics",
    title: "Data-Driven Success",
    description: "Key Analytics Strategies for Boosting Business Growth",
    color: "#9370DB", // Purple theme color
    content: [
      {
        header: "Analytics Strategies",
        subHeader: "Business Growth",
        content: "Leveraging data analytics is key to driving business growth in modern markets..."
      },
      // More content sections
    ]
  }
];

const BlogPage1: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(blogData);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();

  // Update filtered blogs when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBlogs(blogData);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = blogData.filter(blog => 
      blog.title.toLowerCase().includes(lowerCaseQuery) ||
      blog.category.toLowerCase().includes(lowerCaseQuery) ||
      blog.description.toLowerCase().includes(lowerCaseQuery) ||
      // Also search in content if needed
      blog.content.some(section => 
        section.header.toLowerCase().includes(lowerCaseQuery) ||
        section.content.toLowerCase().includes(lowerCaseQuery)
      )
    );
    
    setFilteredBlogs(filtered);
  }, [searchQuery]);

  // Handle viewing a specific blog
  const viewBlog = (blog: Blog): void => {
    setSelectedBlog(blog);
    // Optional: Update URL without full navigation
    window.history.pushState({}, "", `/blog/${blog.id}`);
  };

  // Handle back button
  const handleBackToBlogList = (): void => {
    setSelectedBlog(null);
    window.history.pushState({}, "", "/blog");
  };

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  // Clear search
  const clearSearch = (): void => {
    setSearchQuery("");
  };

  return (
    <div className={styles.blogPage}>
      <HEADER tagline={true} />
      <div className={styles.horizontalTabsParent}>
        {selectedBlog ? (
          // Show selected blog content
          <div className={styles.blogContent}>
            <div className={styles.backButton} onClick={handleBackToBlogList}>
              <img 
                src={isDarkTheme ? "/back-arrow.svg" : "/back-arrow-light.svg"} 
                alt="Back" 
              />
              <span>Back to blogs</span>
            </div>
            <BlogComponent 
              blogData={selectedBlog.content}
              title={selectedBlog.title}
              desc={selectedBlog.description}
            />
          </div>
        ) : (
          // Show blog listing with search
          <div className={styles.blogListing}>
            <div className={styles.blogHeader}>
              <h1 className={styles.blogTitle}>Insights and Innovations</h1>
              <p className={styles.blogDescription}>
                Discover the latest trends, strategies, and innovations across various industries. 
                From expert opinions to in-depth articles and case studies, explore valuable 
                insights that can help you stay informed, adapt to changes, and drive success 
                in today's competitive landscape.
              </p>
            </div>
            
            {/* Search input */}
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <img 
                  src="/search-icon.svg" 
                  alt="Search" 
                  className={styles.searchIcon} 
                />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <button 
                    className={styles.clearSearchBtn}
                    onClick={clearSearch}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            
            {/* Blog cards */}
            <div className={styles.blogCards}>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map(blog => (
                  <div 
                    key={blog.id} 
                    className={styles.blogCard}
                    style={{ 
                      background: `linear-gradient(135deg, #222639 0%, #222639 60%, ${blog.color} 100%)` 
                    }}
                    onClick={() => viewBlog(blog)}
                  >
                    <div className={styles.cardCategory}>{blog.category}</div>
                    <h2 className={styles.cardTitle}>{blog.title}</h2>
                    <p className={styles.cardDescription}>{blog.description}</p>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>
                  <p>No articles found matching "{searchQuery}"</p>
                  <button onClick={clearSearch} className={styles.resetButton}>
                    Reset Search
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className={styles.platformBenefits}>
          <PlatformBenefits1 title="Recommended Articles" padding="0px" />
        </div>
      </div>
    </div>
  );
};

export default BlogPage1;