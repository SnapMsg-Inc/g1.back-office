import { Link } from 'react-router-dom';
import styles from '../styles/utils/hashtag.module.css'

const HashtagText = ({ text, isLink }) => {
    const parts = text.split(/(#\w+)/g);

    const textWithHashtags = parts.map((part, index) => {
        if (part.startsWith('#')) 
            return isLink ? <Link to={''} key={index}> {part} </Link> : <strong key={index}> {part} </strong>
        else
            return part;
    });

    return (
        <div className={styles.text}>
            {textWithHashtags}
        </div>
    ) 
};

export default HashtagText;