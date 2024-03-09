import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";

const Slot = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    getSlot();
  }, []);

  const getSlot = async () => {
    try {
      const response = await fetch("http://localhost:8000/parking/allSlot", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSlots(data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const handleSlotBook = (slot) => {
    if (!slot.occupied) {
      setSelectedSlot(slot);
      setIsModalOpen(true);
    } else {
      alert("This slot is already occupied. Please select another slot.");
      toast.error("This slot is already occupied. Please select another slot.");
    }
  };

  const confirmSlotBooking = () => {
    if (!selectedSlot) {
      console.error("No slot selected for booking");
      toast.error("No slot selected for booking");
      return;
    }

    const tempBookingData = {
      slotId: selectedSlot._id,
    };

    setBookingData(tempBookingData);
    setIsModalOpen(false);
  };

  const cancelSlotBooking = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <h2 className="text-5xl font-bold text-center p-[100px] mb-4">Slots</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {slots.map((slot, index) => (
          <div
            key={slot._id}
            onClick={() => handleSlotBook(slot)}
            className={`border rounded-md p-4 cursor-pointer ${
              slot.occupied ? "bg-red-400" : "bg-green-500"
            }`}
          >
            <p className="font-bold text-[50px] text-center">{slot.slotNo}</p>
          </div>
        ))}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-4">Confirm Slot Booking</p>
            <p>Are you sure you want to book slot {selectedSlot.slotNo}?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={confirmSlotBooking}
                className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md"
              >
                Yes
              </button>
              <button
                onClick={cancelSlotBooking}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {/* QR Code Modal */}
      {bookingData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-center items-center">
            <p className="text-3xl font-semibold mb-4 leading-snug">
              Booking Successful!
            </p>
            <QRCode
              value={JSON.stringify(bookingData)}
              style={{ width: "200px", height: "200px" }}
            />
            <h1>
              This QR is valid for only 20 min. Please take entry in Parking
              Slot within this time.
            </h1>
            <button
              onClick={() => setBookingData(null)}
              className="mt-4  px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slot;
