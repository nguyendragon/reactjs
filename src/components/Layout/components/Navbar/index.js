import home from '../../../../assets/images/home2.png';
import home2 from '../../../../assets/images/home.png';
import mission from '../../../../assets/images/mission.png';
import mission2 from '../../../../assets/images/mission2.png';
import my from '../../../../assets/images/my.png';
import my2 from '../../../../assets/images/myHL.png';
import { Link, Outlet } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';

function Navbar(props) {
    let link = props.link;
    let [homeN, setHome] = useState(link === '/' ? true : false);
    let [orderN, setOrder] = useState(link === '/order/mission' ? true : false);
    let [myN, setMy] = useState(link === '/my' ? true : false);
    useEffect(() => {
        if (link.indexOf('/order/mission') >= 0) {
            setHome(false);
            setOrder(true);
            setMy(false);
        } else if (link === '/') {
            setHome(true);
            setOrder(false);
            setMy(false);
        } else if (link === '/my') {
            setHome(false);
            setOrder(false);
            setMy(true);
        }
    }, [link]);
    return (
        <nav className="w-full navbar__footer fixed bottom-0 left-0 z-[49]">
            <div className="flex justify-center items-center bg-white border-t">
                <Link to="/" className="flex-1 flex justify-center text-center">
                    <div className="flex-1 flex justify-center text-center flex-col py-2">
                        <div className="bar-item__icon">
                            <i className="flex justify-center">
                                <img src={!homeN ? home : home2} alt="home" className="w-12 h-12 sepia-0" />
                            </i>
                        </div>
                        <div
                            className="text-xl lg:text-2xl mt-[2px]"
                            style={{ color: `rgb(${!homeN ? '187, 187, 187' : '255, 76, 91'})` }}
                        >
                            Trang Chủ
                        </div>
                    </div>
                </Link>

                <Link to="/order/mission" className="flex-1 flex justify-center text-center">
                    <div className="flex-1 flex justify-center text-center flex-col py-2">
                        <div className="bar-item__icon">
                            <i className="flex justify-center">
                                <img src={!orderN ? mission : mission2} alt="home" className="w-12 h-12" />
                            </i>
                        </div>
                        <div
                            className="text-xl lg:text-2xl mt-[2px]"
                            style={{ color: `rgb(${!orderN ? '187, 187, 187' : '255, 76, 91'})` }}
                        >
                            Nhiệm vụ
                        </div>
                    </div>
                </Link>

                <Link to="/my" className="flex-1 flex justify-center text-center">
                    <div className="flex-1 flex justify-center text-center flex-col py-2">
                        <div className="bar-item__icon">
                            <i className="flex justify-center">
                                <img src={!myN ? my : my2} alt="home" className="h-12" />
                            </i>
                        </div>
                        <div
                            className="text-xl lg:text-2xl mt-[2px]"
                            style={{ color: `rgb(${!myN ? '187, 187, 187' : '255, 76, 91'})` }}
                        >
                            Của tôi
                        </div>
                    </div>
                </Link>
            </div>
            <Outlet />
        </nav>
    );
}

export default memo(Navbar);
