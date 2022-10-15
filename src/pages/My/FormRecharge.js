import { useParams } from 'react-router-dom';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { memo, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste } from '@fortawesome/free-solid-svg-icons';
import copy from 'copy-to-clipboard';
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
function FormRecharge() {
    const { id } = useParams();
    const idRecharge = useRef(id);
    let [recharge, setRecharge] = useState([]);
    // const [countdownDate, setCountdownDate] = useState(0);
    function formatMoney(money = 0) {
        return String(money).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    // const [state, setState] = useState({
    //     minutes: 0,
    //     seconds: 0,
    // });
    // const [countDowns, setCountDowns] = useState();

    useEffect(() => {
        checkToken();
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/recharge/${idRecharge.current}`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.status === 'ok') {
                    if (data.data.recharge.length <= 0) {
                        toast.warn('Đơn hàng hết hạn hoặc không tồn tại', { theme: 'light' });
                        setTimeout(() => {
                            window.location.href = '/recharge';
                        }, 1500);
                    } else {
                        let allData = { ...data.data.recharge[0], ...data.data.settings[0] };
                        setRecharge(allData);
                        // setCountdownDate(Number(allData.time));
                    }
                } else {
                    localStorage.removeItem('auth');
                    window.location.href = '/account/login';
                }
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });

        // let countDowns = setInterval(() => setNewTime(), 1000);
        // setCountDowns(countDowns);

        // return () => {
        //     clearInterval(countDowns);
        // };
    }, []);

    // const setNewTime = () => {
    //     if (countdownDate) {
    //         const currentTime = new Date().getTime();
    //         const distanceToDate = countdownDate - currentTime;
    //         let minutes = Math.floor((distanceToDate % (1000 * 60 * 60)) / (1000 * 60));
    //         let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);
    //         setState({ minutes, seconds });
    //         if (distanceToDate <= 0) {
    //             clearInterval(countDowns);
    //             setState({ minutes: '0', seconds: '0' });
    //         }
    //     }
    // };

    return (
        <div>
            <div className="min-h-[800px] bg-[#f6f6f6]">
                <div className="min-h-[46px] bg-[#3498db] flex justify-center items-center">
                    <p className="text-[#fff] text-[18px]">Nạp tiền</p>
                </div>
                <div className="w-[calc(100%-30px)] mx-auto">
                    <div className="flex justify-between items-center rounded-lg py-[10px] px-[15px] mt-[20px] bg-[#fff]">
                        <div className="text-center w-full">
                            <p className="font-bold text-[#2980b9] uppercase text-4xl">
                                {/* {state.minutes < 10 ? `0${state.minutes}` : state.minutes || '00'}:
                                {state.seconds < 10 ? `0${state.seconds}` : state.seconds || '00'} */}
                                10:00
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center rounded-lg py-[10px] px-[15px] mt-[20px] bg-[#fff]">
                        <div className="">
                            <p className="text-[#005652] text-2xl">Ngân hàng: </p>
                            <p className="font-bold text-[#2980b9] uppercase">
                                {recharge.type === 'bank' ? recharge.name_bank : recharge.name_momo}
                            </p>
                        </div>
                        <div
                            onClick={() => {
                                toast.success('Sao chép thành công', { theme: 'light' });
                                copy(recharge.type === 'bank' ? recharge.name_bank : recharge.name_momo);
                            }}
                            className="flex items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-full"
                        >
                            <p className="text-[#fff] p-[5px] ">
                                Sao chép <FontAwesomeIcon icon={faPaste} />
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center rounded-lg py-[10px] px-[15px] mt-[20px] bg-[#fff]">
                        <div className="">
                            <p className="text-[#005652] text-2xl">Số tài khoản: </p>
                            <p className="font-bold text-[#2980b9]">
                                {recharge.type === 'bank' ? recharge.stk_bank : recharge.stk_momo}
                            </p>
                        </div>
                        <div
                            onClick={() => {
                                toast.success('Sao chép thành công', { theme: 'light' });
                                copy(recharge.type === 'bank' ? recharge.stk_bank : recharge.stk_momo);
                            }}
                            className="flex items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-full"
                        >
                            <p className="text-[#fff] p-[5px] ">
                                Sao chép <FontAwesomeIcon icon={faPaste} />
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center rounded-lg py-[10px] px-[15px] mt-[20px] bg-[#fff]">
                        <div className="">
                            <p className="text-[#005652] text-2xl">Thông tin người hưởng thụ: </p>
                            <p className="font-bold text-[#2980b9] uppercase">
                                {recharge.type === 'bank' ? recharge.name_u_bank : recharge.name_u_momo}
                            </p>
                        </div>
                        <div
                            onClick={() => {
                                toast.success('Sao chép thành công', { theme: 'light' });
                                copy(recharge.type === 'bank' ? recharge.name_u_bank : recharge.name_u_momo);
                            }}
                            className="flex items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-full"
                        >
                            <p className="text-[#fff] p-[5px] ">
                                Sao chép <FontAwesomeIcon icon={faPaste} />
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center rounded-lg py-[10px] px-[15px] mt-[20px] bg-[#fff]">
                        <div className="">
                            <p className="text-[#005652] text-2xl">Số dư thanh toán: </p>
                            <p className="font-bold text-[#2980b9]">{formatMoney(recharge.amount)}VND</p>
                        </div>
                        <div
                            onClick={() => {
                                toast.success('Sao chép thành công', { theme: 'light' });
                                copy(recharge.amount);
                            }}
                            className="flex items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-full"
                        >
                            <p className="text-[#fff] p-[5px] ">
                                Sao chép <FontAwesomeIcon icon={faPaste} />
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center rounded-lg py-[10px] px-[15px] mt-[20px] bg-[#fff]">
                        <div className="">
                            <p className="text-[#005652] text-2xl">Nội dung chuyển khoản: </p>
                            <p className="font-bold text-[#2980b9]">{recharge.id_txn}</p>
                        </div>
                        <div
                            onClick={() => {
                                toast.success('Sao chép thành công', { theme: 'light' });
                                copy(recharge.id_txn);
                            }}
                            className="flex items-center bg-cyan-500 shadow-lg shadow-cyan-500/50 rounded-full"
                        >
                            <p className="text-[#fff] p-[5px] ">
                                Sao chép <FontAwesomeIcon icon={faPaste} />
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center rounded-lg py-[10px] px-[15px] mt-[20px] bg-[#fff]">
                        <div className="">
                            <p className="text-[#005652] text-2xl">Chú ý: </p>
                            <p className="text-[#005652] text-xl">
                                - Người tham gia vui lòng nhập đúng nội dung ghi chú chuyển khoản, nếu không sẽ không
                                thể nạp tiền thành công.
                            </p>
                            <p className="text-[#005652] text-xl">
                                - Vui lòng xác nhận lại thông tin tài khoản ngân hàng của bạn, điền và thanh toán trong
                                thời gian còn hiệu lực. Nếu hết thời gian hiệu lực, vui lòng tạo mới lại đơn nạp.
                            </p>
                        </div>
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

export default memo(FormRecharge);
