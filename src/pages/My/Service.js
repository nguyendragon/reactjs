import Header from '../../components/Layout/components/Header';

function Service({ title }) {
    document.title = title;
    return (
        <div>
            <Header color="rgb(255, 82, 89)" title="Dịch vụ" param="/my" />
            <div className="help-detile px-[15px] py-[20px]">
                <p className="text-[13px] mb-[10px]">
                    - Tham gia công việc cộng tác viên cùng hệ thống nền tảng bán hàng Shopee bằng hình thức nhận đơn
                    hàng và hoàn thành nhiệm vụ :
                </p>
                <div className="text-[13px] mb-[2px]">
                    <p className="mb-[2px]">1. Đăng ký tài khoản.</p>
                    <p className="mb-[2px]">2. Nạp tiền online.</p>
                    <p className="mb-[2px]">3. Nhận đơn hàng.</p>
                    <p className="mb-[2px]">4. Hoàn đơn hàng.</p>
                    <p className="mb-[2px]">5. Rút tiền gốc và lợi nhuận hoa hồng về tài khoản ngân hàng của bạn.</p>
                </div>
            </div>
        </div>
    );
}

export default Service;
