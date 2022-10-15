import Header from '../../components/Layout/components/Header';

function Guide({ title }) {
    document.title = title;
    return (
        <div>
            <Header color="rgb(255, 82, 89)" title="Hướng dẫn" param="/my" />
            <div className="help-detile px-[15px] py-[20px]">
                <p className="text-[13px] mb-[2px]">
                    - Xin chào cộng tác viên tham gia việc làm cùng hệ thống nền tảng bán hàng Shopee
                </p>
                <p className="text-[13px] mb-[2px]">
                    - Để ngăn chặn các hoạt động rửa tiền bất hợp pháp rửa tiền theo khoản 1, điều 3 nghị định số
                    74/2005/NĐ-CP ngày 07/06/2005 người dùng phải hoàn thành nhiệm vụ và rút tiền trong cùng một ngày.
                    Sau khi xác nhận rút tiền thành công, thời gian từ 1-5 phút, khoảng thời gian cao điểm không quá 30
                    phút và thời gian nhận do bên các ngân hàng.
                </p>
                <p className="text-[13px] mb-[10px]">
                    - Tham gia công việc cộng tác viên cùng hệ thống nền tảng bán hàng Shopee bằng hình thức nhận đơn
                    hàng và hoàn thành nhiệm vụ :
                </p>
                <div className="text-[13px] mb-[2px]">
                    <p className="mb-[2px]">1. Đăng ký tài khoản.</p>
                    <p className="mb-[2px]">2. Nhận thưởng từ hệ thống và nhận đơn hàng.</p>
                    <p className="mb-[2px]">3. Nạp tiền khi số dư tài khoản không đủ hoàn thiện đơn hàng.</p>
                    <p className="mb-[2px]">4. Hoàn thành nhiệm vụ của đơn hàng.</p>
                    <p className="mb-[2px]">5. Rút tiền gốc và lợi nhuận hoa hồng về tài khoản ngân hàng của bạn.</p>
                </div>
            </div>
        </div>
    );
}

export default Guide;
