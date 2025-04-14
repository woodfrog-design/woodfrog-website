import { FunctionComponent } from "react";
import styles from "./PageDescriptionLeftTitle.module.css";
import 'bootstrap/dist/css/bootstrap.css';

export type PageDescriptionType = {
    details?: any;
};
const PageDescriptionLeftTitle: FunctionComponent<PageDescriptionType> = (props: PageDescriptionType) => {
    return (
        <section className={[styles.PageDescriptionLeftTitle].join(' ')} >
            <hr/>
            <div className={styles.container}>
                <div className={styles.dividedContainer}>
                    <div className={styles.imageContainer}>
                        <img src="/image_17.svg" alt="image" width={200} height={200}/>
                    </div>
                    <div className={styles.textContainer}>
                        {props.details.title !== "" ? <div className={[styles.pageTitle, styles.open].join(' ')} >{props.details.title}</div>: null}
                        <div className={styles.description} dangerouslySetInnerHTML={{ __html: props.details.describe }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageDescriptionLeftTitle;
