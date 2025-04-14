import { FunctionComponent } from "react";
import Items1 from "./Items1";
import styles from "./Testimonials.module.css";

export type TestimonialsType = {
  className?: string;
};

const Testimonials: FunctionComponent<TestimonialsType> = ({
  className = "",
}) => {
  return (
    <section className={[styles.testimonials, className].join(" ")}>
      <div className={styles.container}>
        <h1 className={styles.whatOurClients}>What Our Clients Say</h1>
        <div className={styles.slider}>
          <Items1
            subtract="/subtract.svg"
            marcusSeptimus="Marcus Septimus"
            dataScientistAtFintechTechnolog="Data Scientist at Fintech Technologies"
            weStruggledToManageLargeVolum="“We struggled to manage large volumes of transactional data and gain real-time insights. [Your Company]'s platform transformed our process, automating data integration and enabling us to predict market trends with precision. What once took days, now happens in hours."
          />
          <Items1
            subtract="/subtract-1.svg"
            propBorderRadius="16px"
            propHeight="unset"
            marcusSeptimus="Carter Korsgaard"
            dataScientistAtFintechTechnolog="VP of Data at SunPharma"
            weStruggledToManageLargeVolum="“As a healthcare company, ensuring the accuracy of our patient outcome predictions is crucial. Before working with [Your Company], our data models struggled with efficiency, and our predictions lacked the precision we needed."
          />
          <Items1
            subtract="/subtract-2.svg"
            propBorderRadius="16px"
            propHeight="unset"
            marcusSeptimus="Maria Rosser"
            dataScientistAtFintechTechnolog="CEO at Accenture "
            weStruggledToManageLargeVolum="“Woodfrog’s expertise and attention to detail truly set him apart. They have an incredible ability to transform complex ideas into simple, elegant designs that speak directly to the audience. "
          />
        </div>
      </div>
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <div className={styles.button} />
      </div>
    </section>
  );
};

export default Testimonials;
