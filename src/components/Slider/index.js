import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import SETTINGS from '../../setting.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
const axios = require('axios').default;

function Slider() {
    let [banners, setBanners] = useState();
    useEffect(() => {
        axios
            .get(`${SETTINGS.BASE_URL}/api/webapi/list/banners`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(function (response) {
                let data = response.data;
                if (data.status === 'ok') {
                    setBanners(data.data);
                }
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
    }, []);

    if (!Array.isArray(banners)) return false;

    return (
        <Carousel
            autoPlay={true}
            showArrows={false}
            showStatus={false}
            dynamicHeight={true}
            emulateTouch={true}
            infiniteLoop={true}
            interval={2500}
            showIndicators={true}
            showThumbs={false}
            swipeable={true}
        >
            {banners.map((img) => {
                return (
                    <div key={img.link}>
                        <img src={img.link} alt="banner" />
                    </div>
                );
            })}
        </Carousel>
    );
}

export default Slider;
