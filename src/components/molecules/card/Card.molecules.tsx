import Image from "next/image";
import { Property } from "./property.interface";
import styles from "./styles.module.css";

function Card({ image, title, description, price }: Readonly<Property>) {
  return (
    <div className={styles.container}>
      <Image width={300} height={200} src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
}

export default Card;
