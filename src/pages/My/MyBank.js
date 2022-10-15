import Header from '../../components/Layout/components/Header';
import styles from './My.module.scss';
import classNames from 'classnames/bind';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
const axios = require('axios').default;

let listBank = [
    'EXIMBANK',
    'MARITIME BANK',
    'AGRIBANK',
    'VIETINBANK',
    'BAC A BANK',
    'BAO VIET BANK',
    'BIDV BANK',
    'GP BANK',
    'HD BANK',
    'HONGLEONG BANK',
    'INDOVINA BANK',
    'KIENLONGBANK',
    'MBBANK',
    'NAMA BANK',
    'NGAN HANG A CHAU',
    'Ngân hàng TMCP Đông Á',
    'Ngân hàng TMCP Việt Á',
    'NH LD VIET NGA',
    'CIMB',
    'NH TMCP QUOC DAN',
    'OCEANBANK',
    'PGBANK',
    'PHUONGDONG BANK',
    'SACOMBANK',
    'SCB',
    'SEABANK',
    'SHB BANK',
    'SHINHAN BANK VN',
    'TECHCOMBANK',
    'TIENPHONG BANK',
    'UNITED OVERSEAS BANK',
    'VIB BANK',
    'VIDPublic Bank',
    'VIETBANK',
    'VIETCOMBANK',
    'VPBANK',
    'WOORI BANK',
    'NEWBANK',
];

const cx = classNames.bind(styles);
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
function MyBank({ title }) {
    document.title = title;
    let [nameOnwerBank, setNameOnwerBank] = useState('');
    let [stk, setStk] = useState('');
    let [nameBank, setNameBank] = useState('');
    let [sdt, setSdt] = useState('');
    let [check, setCheck] = useState('');

    const handleAddBanking = () => {
        if (!nameOnwerBank || !stk || !nameBank || !sdt)
            return toast.error('Vui lòng nhập đầy đủ thông tin !', { theme: 'light' });
        const headers = {
            'x-access-token': localStorage.getItem('auth'),
            'Access-Control-Allow-Origin': '*',
        };
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/webapi/user/addbanking`,
                { nameuser: nameOnwerBank, stk, nameBank, sdt, type: 'add' },
                {
                    headers,
                },
            )
            .then(function (response) {
                let data = response.data;
                if (data.data === 1) toast.success('Thêm ngân hàng thành công !', { theme: 'light' });
                if (data.data === 2) toast.success('Sửa ngân hàng thành công !', { theme: 'light' });
                if (data.status) {
                    setTimeout(() => {
                        window.location.href = `/my/settings`;
                    }, 1500);
                }
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    };

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
                setCheck(data.data);
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }, []);

    return (
        <div className={cx('edit-password', { '': true })}>
            <Header title="Liên kết ngân hàng" color="rgb(255, 82, 89)" param="/my/settings" />
            <div className="form-edit-password p-[20px]">
                <div className={cx('form-group', { '': true })}>
                    <label className="ml-[6px] font-semibold">Tên chủ thẻ</label>
                    <input
                        value={
                            Array.isArray(check.recharge) && check.recharge.length > 0
                                ? check.recharge[0].name_u_bank
                                : nameOnwerBank
                        }
                        onChange={(e) => setNameOnwerBank(e.target.value)}
                        className="w-[100%]"
                        placeholder="Nhập tên chủ thẻ"
                    />
                </div>
                <div className={cx('form-group', { '': true })}>
                    <label className="ml-[6px] font-semibold">Số tài khoản</label>
                    <input
                        value={
                            Array.isArray(check.recharge) && check.recharge.length > 0
                                ? check.recharge[0].stk_bank
                                : stk
                        }
                        onChange={(e) => setStk(e.target.value)}
                        className="w-[100%]"
                        placeholder="Nhập số tài khoản"
                    />
                </div>
                <div className={cx('form-group', { '': true })}>
                    <label className="ml-[6px] font-semibold">Tên ngân hàng</label>
                    <select
                        onChange={(e) => setNameBank(e.target.value)}
                        className={cx('select-banking')}
                        value={
                            nameBank ||
                            (Array.isArray(check.recharge) && check.recharge.length > 0
                                ? check.recharge[0].name_bank
                                : 'EXIMBANK')
                        }
                    >
                        {listBank.map((item, index) => {
                            return (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className={cx('form-group', { '': true })}>
                    <label className="ml-[6px] font-semibold">Số điện thoại</label>
                    <input
                        value={
                            Array.isArray(check.recharge) && check.recharge.length > 0 ? check.recharge[0].phone : sdt
                        }
                        onChange={(e) => setSdt(e.target.value)}
                        className="w-[100%]"
                        placeholder="Nhập số điện thoại"
                    />
                </div>
                {Array.isArray(check.recharge) && check.recharge.length === 0 && (
                    <div onClick={() => handleAddBanking()} className={cx('form-group', { 'text-center': true })}>
                        <div className={cx('btn-submit', { 'text-[#fff]': true })}>Xác nhận</div>
                    </div>
                )}
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

export default MyBank;
