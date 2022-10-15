import Header from '../../components/Layout/components/Header';
import styles from './My.module.scss';
import classNames from 'classnames/bind';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
const axios = require('axios').default;

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
function EditPassword({ title }) {
    let [passwordOld, setPassword] = useState();
    let [newPassword, setNewPassword] = useState();
    let [RePassword, setRePassword] = useState();

    useEffect(() => {
        checkToken();
    }, []);

    function EditPassword() {
        const headers = {
            'x-access-token': localStorage.getItem('auth'),
            'Access-Control-Allow-Origin': '*',
        };
        if (!passwordOld || !newPassword || !RePassword)
            return toast.warn('Vui lòng nhập đầy đủ thông tin', { theme: 'light' });
        if (newPassword !== RePassword) return toast.warn('Mật khẩu xác nhận không chính xác', { theme: 'light' });
        axios
            .put(
                `${SETTINGS.BASE_URL}/api/webapi/change_password`,
                { passwordOld, newPassword },
                {
                    headers,
                },
            )
            .then(function (response) {
                let data = response.data;
                if (data.data === 1) {
                    toast.success('Đổi mật khẩu thành công', { theme: 'light' });
                    setTimeout(() => {
                        window.location.href = '/my/settings';
                    }, 1500);
                }
                if (data.data === 2) toast.error('Mật khẩu không chính xác', { theme: 'light' });
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }

    document.title = title;
    return (
        <div className={cx('edit-password', { '': true })}>
            <Header title="Đổi mật khẩu" color="rgb(255, 82, 89)" param="/my/settings" />
            <div className="form-edit-password p-[20px]">
                <div className={cx('form-group', { '': true })}>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-[100%]"
                        placeholder="Mật khẩu hiện tại"
                    />
                </div>
                <div className={cx('form-group', { '': true })}>
                    <input
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-[100%]"
                        placeholder="Mật khẩu mới"
                    />
                </div>
                <div className={cx('form-group', { '': true })}>
                    <input
                        type="password"
                        onChange={(e) => setRePassword(e.target.value)}
                        className="w-[100%]"
                        placeholder="Xác nhận mật khẩu mới"
                    />
                </div>
                <div onClick={() => EditPassword()} className={cx('form-group', { 'text-center': true })}>
                    <div className={cx('btn-submit', { 'text-[#fff]': true })}>Xác nhận</div>
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

export default EditPassword;
