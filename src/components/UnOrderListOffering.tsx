import { FunctionComponent } from 'react';
import styles from './UnOrderListOffering.module.css';
import 'bootstrap/dist/css/bootstrap.css';

export type UnOrderListOfferingType = {
  list?: string[];
};
const UnOrderListOffering: FunctionComponent<UnOrderListOfferingType> = (
  props: UnOrderListOfferingType,
) => {
  return (
    <section className={[styles.offerlist].join(' ')}>
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

export default UnOrderListOffering;
