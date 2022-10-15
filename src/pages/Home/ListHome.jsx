function ListHome(drops) {
    let amount = drops.amount;
    let level = ['Vinh dự', 'Ủy ban trật tự'];
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function name() {
        return 'Mem***' + random(1000, 9999);
    }

    return (
        <ul>
            {Array(amount)
                .fill({})
                .map((data, index) => {
                    return (
                        <li className="flex justify-between px-4 py-4" key={index}>
                            <div className="flex-1 flex items-center">
                                <img className="md:max-w-[150px]" src="https://i.imgur.com/MfRrb7f.png" alt="img" />
                                <p className="text-xl ml-[5px] md:text-2xl text-[#005652]">{level[random(0, 1)]}</p>
                            </div>
                            <div className="flex-1 flex items-center">
                                <img className="md:max-w-[150px]" src="https://i.imgur.com/VE7rgl1.png" alt="img" />
                                <p className="text-xl ml-[5px] md:text-2xl text-[#0dc253] font-light">{name()}</p>
                            </div>
                            <div className="flex-2 flex items-center">
                                <p className="min-w-[25px] text-xl md:text-2xl text-[#ffa900] font-medium">
                                    +{random(10000, 1000000)}
                                </p>
                            </div>
                        </li>
                    );
                })}
        </ul>
    );
}

export default ListHome;
