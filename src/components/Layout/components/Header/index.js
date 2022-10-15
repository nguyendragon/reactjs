import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { memo } from 'react';
const cx = classNames.bind(styles);

function Header(props) {
    let title = props.title;
    let color = props.color;
    let colorTxt = props.colorTxt || '#fff';
    let arrowLeft = props.arrowLeft || '#fff';
    let border = props.border || false;
    let fixed = props.fixed || false;
    let param = props.param;
    return (
        <div className={cx('header-top', { 'border-b-2': border }, { 'fixed w-[100%]': fixed })}>
            <div className="flex items-center h-[46px]" style={{ backgroundColor: `${color}` }}>
                <Link to={param}>
                    <FontAwesomeIcon style={{ color: `${arrowLeft}` }} className="ml-4 text-3xl" icon={faChevronLeft} />
                </Link>
                <div className="text-center w-full">
                    <p className="text-3xl font-medium" style={{ color: `${colorTxt}` }}>
                        {title}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default memo(Header);
