import { FunctionComponent } from "react";
import styles from "./UnOrderList.module.css";
import 'bootstrap/dist/css/bootstrap.css';

export type UnorderListType = {
    features?: any;
};
const UnOrderList: FunctionComponent<UnorderListType> = (props: UnorderListType) => {
    return (
        <section className={[styles.UnOrderList].join(' ')} >
            <div className={styles.listTitle}>
                {props.features.title}
            </div>
            <ul>
                {
                    props.features.items.map((listItem: any, index: number) => (
                        <div key={index} style={{padding: '0px 5px 0px 0px'}}>
                            <li className={styles.listItemtitle}>{listItem.title}</li>
                            <p className={styles.listItemDetails}>{listItem.describe}</p>
                        </div>
                    ))
                }
            </ul>
        </section>
    );
};

export default UnOrderList;
