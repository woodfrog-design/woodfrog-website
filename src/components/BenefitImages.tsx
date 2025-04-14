import { FunctionComponent } from "react";
import Badge from "./Badge";
import styles from "./BenefitImages.module.css";

export type BenefitImagesType = {
    className?: string;
    image?: string;
};

const BenefitImages: FunctionComponent<BenefitImagesType> = ({
    className = "",
    image,
}) => {
    return (
        <div className={[styles.imageParent, className].join(" ")}>
            <img className={styles.imageIcon} alt="" src={image} />
            <div className={styles.frameWrapper}>
                <div className={styles.badgeParent}>
                    <Badge
                        propAlignSelf="stretch"
                        propMixBlendMode="normal"
                        text="Machine Learning"
                        propBackgroundColor="#f0f9ff"
                        propColor="#026aa2"
                        textTextDecoration="unset"
                    />
                    <div className={styles.enablingNextGenDigitalExpeParent}>
                        <div className={styles.enablingNextGenDigital}>
                            Enabling next-gen digital expericence
                        </div>
                        <div className={styles.frameContainer}>
                            <div className={styles.frameFrame}>
                                <img className={styles.frameIcon} alt="" src="/frame-5.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitImages;
