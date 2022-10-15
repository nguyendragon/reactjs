import styles from './My.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
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

function My() {
    let [user, setUser] = useState([]);
    let [mission, setMission] = useState([]);
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
                    setMission(data.mission);
                }
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }, []);

    return (
        <div className="bg-[#f6f6f6]">
            <div className="min-h-[770px]">
                <div className="fixed top-0 w-[100%] min-h-[56px] bg-[#fff] flex items-center">
                    <Link to="/my/settings">
                        <img
                            className={cx('border-my-info', { 'w-[44px] h-[44px] m-[5px] rounded-full': true })}
                            src="https://i.imgur.com/hDXTD9v.png"
                            alt=""
                        />
                    </Link>
                    <div className="flex flex-col ml-[16px]">
                        <div className="flex">
                            <p className="text-[#ff976a] font-bold">{user.username || '..........'}</p>
                            <div className="">
                                <p className="pl-[5px] font-bold text-[#fbc531]">
                                    {user.roses_user && user.roses_user.toUpperCase()}
                                </p>
                            </div>
                        </div>
                        <div className="text-xl">Mã mời: {user.id_user || '..........'}</div>
                    </div>
                </div>
                <div className="bg-[#fff] mx-auto mt-[60px] p-[10px] w-[calc(100%)]">
                    <div
                        className="my-[20px] border-l-[4px] h-[36px] flex items-center"
                        style={{ borderColor: '#ff3c61' }}
                    >
                        <p className="ml-[10px] font-bold text-[16px]">Vốn lưu động</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-xl mb-2">Số dư của tôi</p>
                        <Link className="text-[#ffaa03] font-bold text-xl" to="/my/financial-details">
                            Chi tiết tài chính
                        </Link>
                    </div>
                    <div className="font-bold text-[#ffaa03] text-4xl">{formatMoney(user.money) || '0'}VND</div>
                    <div className="mt-[10px]">
                        <p className="text-xl mb-2">Số dư hiện tại đang bị đóng băng</p>
                        <div className="font-bold text-[#ffaa03] text-4xl">{formatMoney(mission.pending)}VND</div>
                    </div>
                    <div className="flex justify-between mt-[10px]">
                        <Link to="/recharge" className="w-full py-2 pr-2">
                            <div
                                className="flex-1 p-3 text-center text-[#fff] text-3xl lg:text-4xl"
                                style={{
                                    borderRadius: '50px',
                                    background: `linear-gradient(304deg,#74c8fb,#1ba8ff)`,
                                }}
                            >
                                nạp tiền
                            </div>
                        </Link>
                        <Link to="/withdraw" className="w-full py-2 pl-2">
                            <div
                                className="flex-1 p-3 text-center font-sm text-[#ff3c61] text-3xl lg:text-4xl border border-sky-500"
                                style={{
                                    borderRadius: '50px',
                                    background: `#fff`,
                                    borderColor: '#ff3c61',
                                }}
                            >
                                rút tiền
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="w-[calc(100%)] mx-auto bg-[#fff] px-[10px] py-[20px]">
                    <div className="flex justify-between">
                        <div className="text-left">
                            <p className="text-xl text-[#005652]">Đơn hàng hôm nay</p>
                            <div className="text-3xl mt-[2px] text-[#ff976a] font-bold">
                                {formatMoney(mission.amountToday)}
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-xl text-[#005652]">Hoa hồng hôm nay</p>
                            <div className="text-3xl mt-[2px] text-[#ff976a] font-bold">
                                {formatMoney(mission.resultToday)}VND
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xl text-[#005652]">Phần thưởng hôm nay</p>
                            <div className="text-3xl mt-[2px] text-[#ff976a] font-bold">0VND</div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="text-left">
                            <p className="text-xl text-[#005652]">Tất cả đơn hàng</p>
                            <div className="text-3xl mt-[2px] text-[#ff976a] font-bold">
                                {formatMoney(mission.amount)}
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-xl text-[#005652]">Tổng hoa hồng</p>
                            <div className="text-3xl mt-[2px] text-[#ff976a] font-bold">
                                {formatMoney(mission.result)}VND
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xl text-[#005652]">Tổng phần thưởng</p>
                            <div className="text-3xl mt-[2px] text-[#ff976a] font-bold">0VND</div>
                        </div>
                    </div>
                </div>

                <div className="w-[calc(100%)] mx-auto bg-[#fff]  px-[10px] mt-[20px] pt-[10px]">
                    <div
                        className="my-[20px] border-l-[4px] h-[36px] flex items-center"
                        style={{ borderColor: '#ff3c61' }}
                    >
                        <p className="ml-[10px] font-bold text-[16px]">Thao tác nhanh</p>
                    </div>
                    <div className="flex flex-wrap justify-left">
                        <Link to="/order/index" className="w-[33%] p-[5px] mb-[25px]">
                            <img className="w-[36px] h-[36px] mx-auto" src="https://i.imgur.com/dqfvPrF.png" alt="" />
                            <p className="mt-[10px] font-medium text-center">Đơn hàng</p>
                        </Link>
                        <Link to="/my/settings" className="w-[33%] p-[5px] mb-[25px]">
                            <img className="w-[36px] h-[36px] mx-auto" src="https://i.imgur.com/DVe1A5l.png" alt="" />
                            <p className="mt-[10px] font-medium text-center">Sửa đổi</p>
                        </Link>
                        <Link to="/my/guide" className="w-[33%] p-[5px] mb-[25px]">
                            <img className="w-[36px] h-[36px] mx-auto" src="https://i.imgur.com/u8yYuax.png" alt="" />
                            <p className="mt-[10px] font-medium text-center">Hướng dẫn</p>
                        </Link>
                        <Link to="/my/service" className="w-[33%] p-[5px] mb-[25px]">
                            <img className="w-[36px] h-[36px] mx-auto" src="https://i.imgur.com/FTXlbze.png" alt="" />
                            <p className="mt-[10px] font-medium text-center">Dịch vụ</p>
                        </Link>
                        <Link to="/support" className="w-[33%] p-[5px] mb-[25px]">
                            <img className="w-[36px] h-[36px] mx-auto" src="https://i.imgur.com/jCouZkJ.png" alt="" />
                            <p className="mt-[10px] font-medium text-center">CSKH</p>
                        </Link>
                    </div>
                </div>
            </div>
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

export default My;
