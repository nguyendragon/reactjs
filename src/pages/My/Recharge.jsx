import { faAnglesRight, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Header from '../../components/Layout/components/Header';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
function Recharge({ title }) {
    document.title = title;
    let [show, setShow] = useState(true);
    let [select, setSelect] = useState('bank');
    let [money, setMoney] = useState(0);
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
                toast.error('C?? l???i x???y ra', { theme: 'light' });
            });
    }, []);

    function RechargeHandler() {
        if (!money || money < 100000) return toast.warn('????n n???p t???i thi???u l?? 100.000VND', { theme: 'light' });

        const headers = {
            'x-access-token': localStorage.getItem('auth'),
            'Access-Control-Allow-Origin': '*',
        };
        axios
            .post(
                `${SETTINGS.BASE_URL}/api/webapi/recharge/add`,
                { money, select },
                {
                    headers,
                },
            )
            .then(function (response) {
                let data = response.data;
                if (data.status === 1) toast.success(data.message, { theme: 'light' });
                if (data.status === 2) toast.warn(data.message, { theme: 'light' });
                if (data.status) {
                    setTimeout(() => {
                        window.location.href = `/recharge/${data.id_txn}`;
                    }, 1500);
                } else {
                    localStorage.removeItem('auth');
                    window.location.href = '/account/login';
                }
            })
            .catch(function (error) {
                toast.error('C?? l???i x???y ra', { theme: 'light' });
            });
    }
    return (
        <div>
            <Header color="rgb(255, 82, 89)" title="N???p ti???n" param="/my" />
            <div className="recharge">
                {show && (
                    <div>
                        <div
                            onClick={() => setShow(false)}
                            className="flex justify-between px-[15px] py-[15px] border-b"
                        >
                            <div className="flex justify-center items-center">
                                <FontAwesomeIcon className="text-[#3498db] text-6xl" icon={faWallet} />
                                <span className="ml-[10px] text-[16px]">Ch???n ph????ng th???c n???p</span>
                            </div>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faAnglesRight} />
                            </div>
                        </div>
                        <div className="px-[15px] mt-[15px]">
                            <p className="note text-[12px] text-[#e74c3c]">
                                L??u ??: Do l?????ng th??ng tin n???p qu?? l???n n??n b???n ph???i ki???m tra k??? s??? th??? t??i kho???n tr?????c
                                khi n???p. N???n t???ng n??y thay ?????i s??? t??i kho???n theo th???i gian. N???u b???n c?? b???t k??? c??u h???i
                                n??o, vui l??ng nh???p v??o d???ch v??? kh??ch h??ng tr???c tuy???n???
                            </p>
                        </div>
                    </div>
                )}
                {show || (
                    <div>
                        <p className="my-amount text-[15px] font-semibold text-[#ffa900] bg-[#fff8e9] py-[10px] text-center">
                            S??? d?? c???a t??i: {formatMoney(user.money) || '0'}VND
                        </p>
                        <div className="text-center my-[25px]">
                            <p className="text-xl text-[#005652]">S??? nh???n ???????c</p>
                            <div className="text-[#ffaa03] text-[32px] font-bold">{formatMoney(money) || '0'}VND</div>
                            <div className="form-group px-[15px] mt-[25px]">
                                <div className="flex flex-wrap justify-between">
                                    <div
                                        onClick={() => setSelect('bank')}
                                        className="w-[48%] p-[10px] flex justify-center rounded-full"
                                        style={{
                                            border: '1px solid #ff3c61',
                                            background: `${select === 'bank' ? '#e74c3c' : ''}`,
                                        }}
                                    >
                                        <img
                                            className="w-[24px] h-[24px] mr-[5px]"
                                            src="https://i.imgur.com/joJ0lOB.png"
                                            alt=""
                                        />
                                        <p className="" style={{ color: `${select === 'bank' ? '#fff' : '#005652'}` }}>
                                            BANKING
                                        </p>
                                    </div>
                                    <div
                                        onClick={() => setSelect('momo')}
                                        className="w-[48%] p-[10px] flex justify-center rounded-full"
                                        style={{
                                            border: '1px solid #ff3c61',
                                            background: `${select === 'momo' ? '#e74c3c' : ''}`,
                                        }}
                                    >
                                        <img
                                            className="w-[24px] h-[24px] mr-[5px]"
                                            src="https://i.imgur.com/Oadl6ec.png"
                                            alt=""
                                        />
                                        <p className="" style={{ color: `${select === 'momo' ? '#fff' : '#005652'}` }}>
                                            MOMO
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group px-[15px] mt-[25px]">
                                <p className="text-left ml-[10px] py-[5px] text-[14px] font-semibold">S??? l?????ng</p>
                                <div className="flex rounded-full p-[10px]" style={{ border: '2px solid #ff3c61' }}>
                                    <span className="pl-[5px] text-[#ff3c61] font-semibold">VND</span>
                                    <input
                                        onChange={(e) => setMoney(e.target.value)}
                                        className="w-[100%] text-right pr-[5px] text-[18px]"
                                        type="tel"
                                        placeholder="Nh???p s??? ti???n"
                                        spellCheck="false"
                                        maxLength="9"
                                    />
                                </div>
                            </div>
                            <div
                                onClick={() => RechargeHandler()}
                                className="form-group w-[90%] mx-auto px-[15px] mt-[25px] bg-[linear-gradient(304deg,#74c8fb,#1ba8ff)!important] rounded-full"
                            >
                                <div className="py-[10px] text-[#fff]">X??c nh???n</div>
                            </div>
                        </div>
                    </div>
                )}

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
        </div>
    );
}

export default Recharge;
