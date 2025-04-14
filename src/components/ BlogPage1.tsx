import { FunctionComponent } from "react";

import styles from "./BlogPage1.module.css";
import HorizontalTabs from "./ HorizontalTabs";
import PlatformBenefits1 from "./PlatformBenefits1";
import HeaderComponet from "./HeaderComponent";

const BlogPage1: FunctionComponent = () => {
    return (
        <div className={styles.blogPage}>
            <HeaderComponet />

            <div className={styles.horizontalTabsParent}>
                <HorizontalTabs />
                <div className={styles.platformBenefits}>

                    <PlatformBenefits1 title="Recommended Articles" padding="0px" />
                </div>
            </div>

        </div>
    );
};

export default BlogPage1;
