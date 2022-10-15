import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Layout/components/Header';
import SETTINGS from '../../setting.json';
const axios = require('axios').default;
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
function Settings(props) {
    document.title = props.title;
    useEffect(() => {
        checkToken();
    }, []);
    return (
        <div className="settings">
            <Header title="Cài đặt" color="rgb(255, 82, 89)" param="/my" />
            <div className="content min-h-[800px] bg-[#f6f6f6]">
                <div>
                    <div className="bg-[#fff] mt-[15px] px-[10px] py-[20px] flex justify-between">
                        <p className="font-semibold text-[14px]">Mật khẩu</p>
                        <Link to="/my/edit-password" className="">
                            <p className="px-[15px] inline text-[14px] text-[#0dc253] font-semibold">Sửa đổi</p>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                    </div>
                    <div className="bg-[#fff] mt-[15px] px-[10px] py-[20px] flex justify-between">
                        <p className="font-semibold text-[14px]">Mật khẩu rút tiền</p>
                        <Link to="/my/edit-password-transaction" className="">
                            <p className="px-[15px] inline text-[14px] text-[#0dc253] font-semibold">Sửa đổi</p>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                    </div>
                    <div className="bg-[#fff] mt-[15px] px-[10px] py-[20px] flex justify-between">
                        <p className="font-semibold text-[14px]">Liên kết ngân hàng</p>
                        <Link to="/my/banking" className="">
                            <p className="px-[15px] inline text-[14px] text-[#0dc253] font-semibold">Liên kết ngay</p>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                    </div>
                </div>
                <div className="bg-[red] w-[calc(100%-15px)] mx-auto py-[10px] mt-[20px] rounded-full">
                    <div
                        onClick={() => {
                            localStorage.removeItem('auth');
                            window.location.href = '/account/login';
                        }}
                    >
                        <div className="text-white text-center">Đăng xuất</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
