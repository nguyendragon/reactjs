import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Mission from '../../components/Mission';

import Slider from '../../components/Slider';
import { Link } from 'react-router-dom';
import ListHome from './ListHome';
import { useEffect, useState } from 'react';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

const cx = classNames.bind(styles);

function formatMoney(money = 0) {
    return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
const checkToken = () => {
    let accessToken = localStorage.getItem('auth');
    if (!accessToken) {
        localStorage.removeItem('auth');
        window.location.href = '/account/login';
    } else {
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/me`, {
                headers: {
                    'x-access-token': accessToken,
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.status === 'error') {
                    localStorage.removeItem('auth');
                    window.location.href = '/account/login';
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};
function Home() {
    let [user, setUser] = useState([]);

    useEffect(() => {
        checkToken();
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/userInfo`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.status === 'ok') {
                    setUser(data.data[0]);
                }
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }, []);
    return (
        <div id={cx('Home')}>
            <div className={cx('header-home')}>
                <div className={cx('header-style-info')}>
                    <div className={cx('h2')}>Tổng tài sản</div>
                    <div className={cx('h1')}>{formatMoney(user.money || '0')}VND</div>
                </div>
            </div>
            <section className="p-4	lg:py-4 lg:px-12">
                <Slider />
            </section>
            <main className="px-4 py-4 lg:px-10 lg:py-6">
                <div className="flex justify-between">
                    <Link to="/recharge" className="w-full py-2 pr-2">
                        <div
                            className="flex-1 p-5 text-center text-[#fff] text-3xl lg:text-4xl"
                            style={{
                                borderRadius: '4px',
                                background: `linear-gradient(to right, #00CDAC, #02AAB0)`,
                            }}
                        >
                            nạp tiền
                        </div>
                    </Link>
                    <Link to="/withdraw" className="w-full py-2 pl-2">
                        <div
                            className="flex-1 p-5 text-center text-[#fff] text-3xl lg:text-4xl"
                            style={{
                                borderRadius: '6px',
                                background: `linear-gradient(to right, #ec008c, #fc6767)`,
                            }}
                        >
                            rút tiền
                        </div>
                    </Link>
                </div>
                <div className={cx('title-style')}>khu vực nhiệm vụ</div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
                    <Mission />
                </div>
                <div className="bg-[#fff] rounded-[.16rem] my-12">
                    <div className="overflow-x-hidden overflow-y-scroll h-[300px] box-home-shadow px-4">
                        <ListHome amount={16} />
                    </div>
                </div>
            </main>
            <footer className="px-4 py-4 lg:px-10 lg:py-6 mb-[80px]">
                <div className="flex justify-center items-center">
                    <div className="h-[1px] bg-[#999] w-[100%]"></div>
                    <span className="text-lg text-[#999] absolute bg-[#fff] px-5">Những đơn vị vận chuyển</span>
                    <div className="h-[1px] bg-[#999] w-[100%]"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="flex justify-center items-center mb-[25px]">
                        <img className="md:max-w-[150px]" src="https://i.imgur.com/UbktWUo.png" alt="" />
                    </div>
                    <div className="flex justify-center items-center mb-[25px]">
                        <img className="md:max-w-[150px]" src="https://i.imgur.com/LnNl2hT.png" alt="" />
                    </div>
                    <div className="flex justify-center items-center mb-[25px]">
                        <img className="md:max-w-[150px]" src="https://i.imgur.com/id5Fi6S.png" alt="" />
                    </div>
                    <div className="flex justify-center items-center mb-[25px]">
                        <img className="md:max-w-[150px]" src="https://i.imgur.com/ZWHNvR6.png" alt="" />
                    </div>
                    <div className="flex justify-center items-center mb-[25px]">
                        <img className="md:max-w-[150px]" src="https://i.imgur.com/DwTntlN.png" alt="" />
                    </div>
                    <div className="flex justify-center items-center mb-[25px]">
                        <img className="md:max-w-[150px]" src="https://i.imgur.com/yIl53h9.png" alt="" />
                    </div>
                </div>
            </footer>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default Home;
