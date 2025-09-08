import React from 'react'
import styles from './styles.module.css';

interface InputAtomProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly label: string;
  readonly id: string;
}

const InputAtom = ({ label, id, ...props }: InputAtomProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>{label}</label>
      <input className={styles.containerInput} type="text" id={id} {...props} />
    </div>
  )
}

export default InputAtom