import Image from "next/image";
import styles from "./styles.module.css";
import { PropertyResponse } from "@/features/properties/domain/entities/propertyResponse";

function Card({ imageUrl, name, address, price }: Readonly<PropertyResponse>) {
  return (
    <article className={styles.containerGlobal}>
      <div className={styles.container}>
        <div className={styles.media}>
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 600px) 100vw, 600px"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.meta}>{address}</p>
          <div className={styles.priceContainer}>
            <p className={styles.perMonth}>STARTING AT</p>

            <span className={styles.price}>${price.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <button className={styles.button}>Discover More</button>
    </article>
  );
}

export default Card;
