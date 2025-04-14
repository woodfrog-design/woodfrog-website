import { FunctionComponent } from "react";
import { Typography } from "antd";
import styles from "./HorizontalTabs.module.css";
import "./BlogsPage/Common.css";
import "bootstrap/dist/css/bootstrap.css";
import HeaderComponet from "./HeaderComponent";
import Footer from "./Footer"; // Added Footer import
import Badge from "./Badge";
import PlatformBenefits1 from "./PlatformBenefits1";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
const { Paragraph } = Typography;
export type BlogComponentsType = {
    className?: string;
    blogData?: any,
    title?: string,
    desc?: string
};

const BlogComponent: FunctionComponent<BlogComponentsType> = ({
    className = "",
    blogData = [],
    title = '',
    desc = ''
}) => {
    const navigate = useNavigate();
    const { isDarkTheme } = useTheme(); // Get the current theme state and toggle function
    const BackLogo = isDarkTheme ? '/back-arrow.svg' : '/back-arrow-light.svg';

    // Initialize navigate hook
    return (
        <div className={styles.blogPage}>
            <HeaderComponet />
            <div className={styles.horizontalTabsParent}>
                <div className={[styles.horizontalTabs, className].join(" ")}>
                    <div className={styles.frameParent}>
                        <div className={styles.frameGroup}>
                            <img className={styles.frameIcon} alt="" src={BackLogo}
                                onClick={() => navigate(-1)} // Navigate back on click
                                style={{ cursor: "pointer" }} // Add pointer cursor for better UX
                            />
                            <div className={styles.insurance}> {title}/</div>
                        </div>
                        <div className="mainheader">
                            {desc}
                        </div>
                    </div>
                    <div className={styles.badgeParent}>
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="unset"
                            text="Artifical Intelligence"
                            propBackgroundColor="#c1f8d7"
                            propColor="#037a48"
                            textTextDecoration="unset"
                        />
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="normal"
                            text="Machine Learning"
                            propBackgroundColor="#f0f9ff"
                            propColor="#026aa2"
                            textTextDecoration="unset"
                        />
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="normal"
                            text="Deep Learning"
                            propBackgroundColor="#fffaeb"
                            propColor="#b64708"
                            textTextDecoration="unset"
                        />
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="normal"
                            text="Natural Language Processing"
                            propBackgroundColor="#f4f3ff"
                            propColor="#5925dc"
                            textTextDecoration="unset"
                        />
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="normal"
                            text="Computer Vision"
                            propBackgroundColor="#fdf2fa"
                            propColor="#c11574"
                            textTextDecoration="unset"
                        />
                        <Badge
                            propAlignSelf="unset"
                            propMixBlendMode="normal"
                            text="Cloud"
                            propBackgroundColor="#fdf2fa"
                            propColor="#c11574"
                            textTextDecoration="unset"
                        />
                    </div>
                    <div className={styles.generativeAiAContainer}>
                        <div className="container py-4">
                            {/* Problem Statement Section */}
                            {blogData.map((d: any) => {
                                return (
                                    <>
                                        <h2 className="subtitle text-start mt-2">
                                            {d.header}
                                        </h2>
                                        <hr />
                                        <div className="row">
                                            {/* Client's Situation */}
                                            <div className="col-md-4 mb-3">
                                                <h3 className="subheader">{d.subHeader}</h3>
                                            </div>
                                            <div className="col-md-8">
                                                <Paragraph className="paragraph">{d.content}</Paragraph>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                    {<div className="outcome-black-box" id="black-box-section">
                        <div className="flex-body">
                            <h4>Access the PDF version of this case study for convenient reference and easy sharing</h4>
                            <Link to={`/pdf/${encodeURIComponent(title)}/`} className="download-pdf-btn" type=""> Download now
                                <img alt="Cutting Downtime in half with Deep Neural Networks" decoding="async" src="https://fractal.ai/wp-content/themes/fractal_new/images/icons/download-icon.svg" />
                            </Link>
                        </div>
                    </div>}
                </div>

                <div className={styles.platformBenefits}>
                    <PlatformBenefits1 title="Recommended Articles" padding="0px" />
                </div>
            </div>
            <Footer /> {/* Added Footer component */}
        </div>
    )
}

export default BlogComponent