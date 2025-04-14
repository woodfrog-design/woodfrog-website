import { FunctionComponent, useState } from "react";
import TabButtonBase from "../components/TabButtonBase";
import FeaturedContent from "../components/FeaturedContent";
import Footer from "../components/Footer";
import styles from "./BlogPage.module.css";
import HeaderComponet from "../components/HeaderComponent";
import PageHero from "../components/PageHero";
import Searchbar from "../components/Searchbar";

const BlogPage: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.blogPage}>
      <HeaderComponet />
      <main className={styles.body}>
        <PageHero
          title="Insights and Innovations"
          description="Discover the latest trends, strategies, and innovations across various industries. From expert opinions to in-depth articles and case studies, explore valuable insights that can help you stay informed, adapt to changes, and drive success in today's competitive landscape."
        >
          <Searchbar onSearch={handleSearch} searchQuery={searchQuery} />
        </PageHero>
        
        <div className="container">
          <div className="row m-0">
            <div className="col-12">
              <div className={styles.tabbedPane}>
                <TabButtonBase
                  text="All Domains"
                  propWidth="80px"
                  propColor="#f9f8fa"
                  propHeight="20px"
                  propDisplay="inline-block"
                  bottomBorder
                  propBackgroundColor="#117afa"
                />
              </div>
            </div>
          </div>
        </div>
        <section className={styles.featuredContentWrapper}>
          <FeaturedContent searchQuery={searchQuery} />
        </section>
      </main>
      <div className={styles.tabButtonBase}>
        <div className={styles.content}>
          <div className={styles.text}>Password</div>
        </div>
        <div className={styles.bottomBorder} />
      </div>
      <div className={styles.tabButtonBase1}>
        <div className={styles.content}>
          <div className={styles.text1}>Team</div>
        </div>
        <div className={styles.bottomBorder} />
      </div>
      <div className={styles.tabButtonBase2}>
        <div className={styles.content}>
          <div className={styles.text2}>Plan</div>
        </div>
        <div className={styles.bottomBorder} />
      </div>
      <div className={styles.tabButtonBase3}>
        <div className={styles.content}>
          <div className={styles.text3}>Billing</div>
        </div>
        <div className={styles.bottomBorder} />
      </div>
      <div className={styles.tabButtonBase4}>
        <div className={styles.content}>
          <div className={styles.text4}>Email</div>
        </div>
        <div className={styles.bottomBorder} />
      </div>
      <div className={styles.tabButtonBase5}>
        <div className={styles.content}>
          <div className={styles.text5}>Notifications</div>
        </div>
        <div className={styles.bottomBorder} />
      </div>
      <div className={styles.tabButtonBase6}>
        <div className={styles.content}>
          <div className={styles.text6}>Integrations</div>
        </div>
        <div className={styles.bottomBorder} />
      </div>
      <div className={styles.tabButtonBase7}>
        <div className={styles.content}>
          <div className={styles.text7}>API</div>
        </div>
        <div className={styles.bottomBorder} />
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;