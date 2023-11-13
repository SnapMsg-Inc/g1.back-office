import { Link } from 'react-router-dom';
import styles from '../styles/utils/hashtag.module.css'

const HashtagText = ({ text }) => {
    const element = {
        color: "#1ed760",
    }
        
    const parts = text.split(/(#\w+)/g);

    const textWithHashtags = parts.map((part, index) => {
        if (part.startsWith('#')) {
            return (
                <Link key={index} style={element}>
                    {part}
                </Link>
            );
        } else {
            return part;
        }
    });

    return (
        <div className={styles.text}>
            {textWithHashtags}
        </div>
    ) 
};

export default HashtagText;