import styles from '../styles/pages/header.module.css'
import ListButton from '../utils/listButton';
import sections from '../utils/data/sections.json'
import logo from '../logo.svg'

export default function Header() {
    return (
        <div className={styles.container}>
            <a href="/" className={styles.logo}>
                <img src={logo}/>
                SnapMsg
            </a>
            <ul className={styles.headerList}>
                {sections.map((section) => {
                    return <ListButton key={section.id} section={section} />;
                })}
            </ul>
        </div>
    )
} 