import React from "react";
import "./Cancel.css";
import { MdOutlineEventSeat } from "react-icons/md";

const Cancel = () => {
    return (<>
        <div className="cancel-wrapper">
            <div className="cancel">
                <div className="cancel-data">
                    <img src="https://imgs.search.brave.com/DSBfSKhb2zVFAokqodsgiCcGzkyQLG_7m9n4a5k1zAc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/MC8wMC9TcGlkZXIt/TWFuX05vX1dheV9I/b21lX3Bvc3Rlci5q/cGcvMjUwcHgtU3Bp/ZGVyLU1hbl9Ob19X/YXlfSG9tZV9wb3N0/ZXIuanBn"></img>
                    <div className="cancel-movie-data">
                        <h1>Kuberaa</h1>
                        AMB Cinemas, Gachibowli - Miyapur Road, Gachibowli, Hyderabad, Telangana 500032
                        <div className="preview-timings">
                            <div>2:00 PM</div>
                            <div>12-08-2025</div>
                        </div>
                        <h3>Quantity: 1</h3>
                        <div className="seat-info">
                        <MdOutlineEventSeat size={40} />
                        <span>Seat Number: A1, A2</span>
                        </div>
                        <h1>Amount: ₹1500</h1>
                    </div>
                </div>
                <div className="cancel-btn">
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    </>);
};

export default Cancel;