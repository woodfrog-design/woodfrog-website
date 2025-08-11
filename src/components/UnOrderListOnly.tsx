import { FunctionComponent } from 'react';
import styles from './UnOrderListOnly.module.css';
import 'bootstrap/dist/css/bootstrap.css';

export type UnorderListOnlyType = {
  list?: string[];
};
const UnOrderListOnly: FunctionComponent<UnorderListOnlyType> = (props: UnorderListOnlyType) => {
  return (
    <section className={[styles.unlist].join(' ')}>
      <div className={styles.container}>
        <ul>
          {(props.list ?? []).map((listItem: string, index: number) => (
            <div key={index}>
              <li className={styles.listItemtitle}>{listItem}</li>
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UnOrderListOnly;
