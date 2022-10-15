import { useEffect, useState } from 'react';
import Header from '../../components/Layout/components/Header';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const axios = require('axios').default;

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
function Withdraw({ title }) {
    document.title = title;
    let navigate = useNavigate();
    let [bank, setBank] = useState();
    let [password, setPassword] = useState();
    let [money, setMoney] = useState();
    let [moneyPending, setMoneyPending] = useState();
    useEffect(() => {
        checkToken();
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/user/banking`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.data.recharge.length > 0) {
                    setBank(data.data.recharge);
                    setMoneyPending(data.data.pending);
                } else {
                    window.location.href = '/my/banking';
                }
            })
            .catch(function (error) {
                // toast.error('Có lỗi xảy ra', { theme: 'light' });
                console.log(error);
            });
    }, []);

    const upgradeMember = async () => {
        if (!password || !money) return toast.warn('Vui lòng nhập đầy đủ thông tin !', { theme: 'light' });
        const headers = {
            'x-access-token': localStorage.getItem('auth'),
            'Access-Control-Allow-Origin': '*',
        };
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/webapi/user/withdraw`,
                { password, money },
                {
                    headers,
                },
            )
            .then(async function (response) {
                let data = response.data.data;
                if (data) {
                    if (data.type === 1) {
                        setTimeout(() => {
                            navigate('/my/financial-details');
                        }, 1200);
                        return toast.success('Tạo đơn rút tiền thành công', { theme: 'light' });
                    }
                    if (data.type === 2) return toast.error('Mật khẩu rút tiền không chính xác', { theme: 'light' });
                    if (data.type === 3) return toast.error('Số dư không đủ để tạo đơn rút', { theme: 'light' });
                    if (data.type === 4)
                        return toast.warn(`Min rút tối thiểu là: ${formatMoney(data.min)}VND`, { theme: 'light' });
                    toast.error('Có lỗi xảy ra !', { theme: 'light' });
                }
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    };

    return (
        <div>
            <Header color="rgb(255, 82, 89)" title="Rút tiền" param="/my" />
            <div className="withdraw px-[15px] py-[20px] min-h-[805px] bg-[#ecf0f1]">
                <div className="bg-[#fff] p-[15px] rounded-lg">
                    <div className="py-[10px] text-[22px]">
                        Số dư tài khoản:{' '}
                        <span className="text-[#ffaa03]">
                            {Array.isArray(bank) && bank.length > 0 && formatMoney(bank[0].money)}VND
                        </span>
                    </div>
                    <div className="text-[#999] text-xl">
                        Số dư đang đóng băng: {Array.isArray(bank) && bank.length > 0 && formatMoney(moneyPending)}₫
                    </div>
                </div>
                <div className="mt-[20px] p-[15px] rounded-lg bg-[#fff]">
                    <div className="meun-item">
                        <div className="w-full flex justify-between border-b py-[10px]">
                            <span className="text-[#8799a3] text-[14px]">Số Tài Khoản</span>
                            <span className="text-[14px]">
                                {Array.isArray(bank) &&
                                    bank.length > 0 &&
                                    bank[0].username.slice(0, 3) + '****' + bank[0].username.slice(-3)}
                            </span>
                        </div>
                        <div className="w-full flex justify-between border-b py-[10px]">
                            <span className="text-[#8799a3] text-[14px]">Tài khoản ngân hàng</span>
                            <span className="text-[14px]">
                                {Array.isArray(bank) &&
                                    bank.length > 0 &&
                                    String(bank[0].stk_bank).slice(0, 7) + '****'}
                            </span>
                        </div>
                        <div className="w-full flex justify-between border-b py-[10px]">
                            <span className="text-[#8799a3] text-[14px]">Tên ngân hàng</span>
                            <span className="text-[14px] uppercase">
                                {Array.isArray(bank) && bank.length > 0 && String(bank[0].name_bank)}
                            </span>
                        </div>
                        <div className="w-full flex justify-between border-b py-[10px]">
                            <span className="text-[#8799a3] text-[14px]">Tên</span>
                            <span className="text-[14px]">
                                {Array.isArray(bank) && bank.length > 0 && String(bank[0].name_u_bank)}
                            </span>
                        </div>
                        <div className="w-full flex justify-between py-[10px]">
                            <span className="text-[#8799a3] text-[14px]">Nhập số lượng</span>
                            <input
                                onChange={(e) => setMoney(e.target.value)}
                                type="text"
                                className="w-[100%] text-right text-[14px]"
                                placeholder="Nhập số lượng rút"
                                spellCheck="false"
                                autoComplete="false"
                            />
                        </div>
                        <div className="w-full flex justify-between py-[10px]">
                            <span className="text-[#8799a3] text-[14px]">Mật khẩu rút tiền</span>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="w-[100%] text-right text-[14px]"
                                placeholder="Mật khẩu rút tiền"
                                spellCheck="false"
                                autoComplete="false"
                            />
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => upgradeMember()}
                    className="w-[100%] mt-[25px] rounded-full text-center bg-[linear-gradient(304deg,#74c8fb,#1ba8ff)!important]"
                >
                    <div className="py-[10px] text-[#fff]">Rút tiền ngay lập tức</div>
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

export default Withdraw;
