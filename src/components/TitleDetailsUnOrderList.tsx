import { FunctionComponent } from 'react';
import styles from './TitleDetailsUnOrderList.module.css';
import 'bootstrap/dist/css/bootstrap.css';

type Details = {
  title: string;
  describe: string;
};

type TitleDetailsUnOrderListProps = {
  details?: Details;
};

const TitleDetailsUnOrderList: FunctionComponent<TitleDetailsUnOrderListProps> = (props) => {
  return (
    <section className={[styles.PageDescription].join(' ')}>
      <div className={styles.container}>
        {props.details?.title !== '' ? (
          <div className={[styles.pageTitle, styles.open].join(' ')}>{props.details?.title}</div>
        ) : ''}
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: props.details?.describe ?? '' }}
        ></div>
      </div>
    </section>
  );
};

export default TitleDetailsUnOrderList;
