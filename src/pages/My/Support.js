import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../components/Layout/components/Header';
import SETTINGS from '../../setting.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
const axios = require('axios').default;

function Service({ title }) {
    document.title = title;
    let [support, setSupport] = useState();
    useEffect(() => {
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/support`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                setSupport(data.data);
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }, []);

    return (
        <div>
            <Header color="rgb(255, 82, 89)" title="CSKH" param="/my" />
            <div className="help-detile px-[15px] py-[20px]">
                <div
                    onClick={() => {
                        window.open(support.zalo, '_blank');
                    }}
                    className="px-[5px] py-[10px] rounded-md mb-[15px]"
                    style={{ boxShadow: '0 0.08rem 0.50667rem 0.10667rem #f0f1f3' }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img width="30px" height="30px" src="https://i.imgur.com/R4nzAVT.png" alt="" />
                            <p className="ml-[15px]">Zalo</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => {
                        window.open(support.telegram, '_blank');
                    }}
                    className="px-[5px] py-[10px] rounded-md mb-[15px]"
                    style={{ boxShadow: '0 0.08rem 0.50667rem 0.10667rem #f0f1f3' }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img width="35px" height="35px" src="https://i.imgur.com/lPvUMBJ.png" alt="" />
                            <p className="ml-[10px]">Telegram</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faAngleRight} />
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

export default Service;
