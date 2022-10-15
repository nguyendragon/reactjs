import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Navbar from '../components/Navbar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    document.title = children.props.title;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-fluid')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Navbar link={children.props.link} title={children.props.title} />
        </div>
    );
}

export default DefaultLayout;
