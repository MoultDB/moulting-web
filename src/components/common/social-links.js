import {Facebook, Instagram, Mastodon, Twitter} from 'react-bootstrap-icons';
import './social-links.css';

export default function SocialLinks() {
    return <>
        <a href="https://www.facebook.com/groups/402623715250579" className="social-link" rel="noopener noreferrer" target="_blank"><Facebook/></a>
        <a href="https://twitter.com/moultdb" className="social-link" rel="noopener noreferrer" target="_blank"><Twitter/></a>
        <a href="https://www.instagram.com/moultdb/" className="social-link" rel="noopener noreferrer" target="_blank"><Instagram/></a>
        <a href="https://ecoevo.social/@moultdb" className="social-link" rel="noopener noreferrer" target="_blank"><Mastodon/></a>
    </>;
}
