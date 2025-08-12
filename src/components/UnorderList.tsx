import { FunctionComponent } from 'react';
import styles from './UnOrderList.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@testing-library/jest-dom';

type FeatureItem = {
  title: string;
  describe: string;
};

type Features = {
  title: string;
  items: FeatureItem[];
};

type UnorderListProps = {
  features?: Features;
};

const UnOrderList: React.FC<UnorderListProps> = (props) => {
  return (
    <section className={[styles.UnOrderList].join(' ')} >
      <div className={styles.listTitle}>{props.features?.title}</div>
      <ul>
        {(props.features?.items ?? []).map((listItem: FeatureItem, index: number) => (
          <div key={index} style={{padding: '0px 5px 0px 0px'}}>
            <li className={styles.listItemtitle}>{listItem.title}</li>
            <p className={styles.listItemDetails}>{listItem.describe}</p>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default UnOrderList;
