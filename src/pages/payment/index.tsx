import { useParams } from "react-router-dom";
import Container from "../../components/ui/container";
import Main from "../../layout/main";
import {
  FaUserAlt,
  FaLock,
  FaBath,
  FaCheckCircle,
  FaBed,
  FaCheck,
  FaBus,
} from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { MdPool } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import Button from "../../components/ui/button";
import { useGetRoomDetailsQuery } from "../../api/private-api";
import SetTitle from "../../components/set-title";

interface IFormInputs {
  fullName: string;
  Email: string;
  mobile: number;
}

const Payment: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { _id } = useParams();
  const { data } = useGetRoomDetailsQuery(_id);

  // const { hotel, room } = data;
  // console.log(hotelFilter);

  // const { title, roomInfo, facilities, capacity, availability, thumbnails } =
  //   data?.room;

  // const { address } = data?.hotel;
  // console.log(data?.room?.roomInfo?.discountedPrice);

  const amount = 1222;

  const handlePayment = async () => {
    const data = [
      {
        email: "example1@example.com",
        phoneNumber: "123456781010",
        roomId: "617df0e86cbe590015d6d91d",
        checkIn: new Date("2023-11-15"),
        checkOut: new Date("2023-11-20"),
        adult: 2,
        children: 1,
      },
      {
        email: "example2@example.com",
        phoneNumber: "123456781010",
        roomId: "617df0e86cbe590015d6d91e",
        checkIn: new Date("2023-12-01"),
        checkOut: new Date("2023-12-05"),
        adult: 3,
        children: 2,
      },
    ];

    const res = await fetch("http://localhost:3000/payment/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    const url = await res.json();
    window.location.href = url;
  };

  return (
    <Main>
      <SetTitle title={`Pay now`} />
      <Container className="px-8">
        <div className="flex flex-col-reverse lg:flex-row justify-center py-2 items-start gap-4 mx-auto">
          <div className="w-full">
            {/* <div className=" p-6 flex items-center gap-4 bg-white border border-secondary-200 rounded-lg shadow dark:bg-secondary-800 dark:border-secondary-800 ">
              <span className="bg-primary-500 p-5 rounded-2xl">
                <FaMoon></FaMoon>
              </span>
              <div>
                <h6 className="">Collect 4 stamps with this stay</h6>
                <p>10 stamps get you 1 reward night.</p>
              </div>
            </div> */}
            {/* step 1 */}
            <div className="block p-6 bg-white border border-secondary-200 rounded-lg shadow dark:bg-secondary-800 dark:border-secondary-800 dark:hover:bg-secondary-700">
              <div className="flex items-center gap-4">
                <FaUserAlt></FaUserAlt>
                <h5 className="">Step 1: Your details</h5>
              </div>
              <hr className="mt-1 border" />
              <p className=" py-4 ">
                <small>
                  Please tell us the name of the guest staying at the hotel as
                  it appears on the ID that they’ll present at check-in. If the
                  guest has more than one last name, please enter them all.
                </small>
              </p>
              <div>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={user.name}
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    defaultValue={user.email}
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    defaultValue={user.phone}
                    disabled
                  />
                </div>
              </div>
            </div>
            {/* step 2 details */}
            <div className="block p-6 my-4 bg-white border border-secondary-200 rounded-lg shadow hover:bg-secondary-100 dark:bg-secondary-800 dark:border-secondary-800 dark:hover:bg-secondary-700">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <p>
                    <FaBed></FaBed>
                  </p>
                  <h5 className="">Step 2: Property details</h5>
                </div>
              </div>
              <hr className="mt-1 border" />
              <h6 className="py-4 flex items-center gap-4 ">
                Property highlights
              </h6>
              <div className="grid pb-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 items-center">
                <p className="flex gap2 items-center">
                  <AiFillCar />
                  Free parking
                </p>
                <p className="flex gap2 items-center">
                  <MdPool />
                  Pool
                </p>
                <p className="flex gap2 items-center">
                  <FaBus />
                  Airport transfer
                </p>
                <p className="flex gap2 items-center">
                  <FaBath />
                  Bathtub
                </p>
                <p className="flex gap2 items-center">
                  <CgGym />
                  Gym
                </p>
              </div>
              <hr />
              <p className="font-medium py-2">Facilities</p>
              <ul>
                {data?.room?.facilities &&
                  data?.room?.facilities.map((f: string) => (
                    <li key={f} className="flex gap-2 items-center">
                      <FaCheck />
                      {f}
                    </li>
                  ))}
              </ul>
            </div>
            {/* step 3 Payment Details*/}
            <div className="block p-6 my-4 bg-white border border-secondary-200 rounded-lg shadow hover:bg-secondary-100 dark:bg-secondary-800 dark:border-secondary-800 dark:hover:bg-secondary-700">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaLock></FaLock>
                  <h5 className="">Step 3: Payment details</h5>
                </div>
                <p>Your booking is safe and secure</p>
              </div>
              <hr className="mt-1 border" />
              <p className="py-4 flex items-center gap-4 ">
                <FaCheckCircle></FaCheckCircle> We never charge any card fees
              </p>
              <Button size="xl" className="w-52" onClick={handlePayment}>
                Pay Now
              </Button>
            </div>
          </div>

          {/* Room Details */}
          <div>
            {/* Accordion */}

            {/* Accordion */}
            <div className="max-w-sm h-full mb-4 bg-secondary-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                <img
                  className="rounded-lg border-2 p-2 border-white"
                  src="https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699833600&semt=ais"
                  alt="Room image"
                />
              </div>
              <div className="p-3 mb-2">
                <h6 className="font-bold">Demo Room</h6>
                <p>
                  <small>Location</small>
                </p>
                <p className="text-lg font-semibold">Price</p>
              </div>

              <div className="p-5 bg-white">
                <div className="flex justify-between items-center">
                  <p className="text-base">Check In</p>
                  <p className="text-base">Date</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-base">Check out</p>
                  <p className="text-base">Date</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-base">Adult</p>
                  <p className="text-base">00</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-base">Child</p>
                  <p className="text-base">00</p>
                </div>
              </div>
            </div>
            <div className="max-w-sm h-full mb-4 bg-secondary-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                <img
                  className="rounded-lg border-2 p-2 border-white"
                  src="https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699833600&semt=ais"
                  alt="Room image"
                />
              </div>
              <div className="p-3 mb-2">
                <h6 className="font-bold">Demo Room</h6>
                <p>
                  <small>Location</small>
                </p>
                <p className="text-lg font-semibold">Price</p>
              </div>

              <div className="p-5 bg-white">
                <div className="flex justify-between items-center">
                  <p className="text-base">Check In</p>
                  <p className="text-base">Date</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-base">Check out</p>
                  <p className="text-base">Date</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-base">Adult</p>
                  <p className="text-base">00</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-base">Child</p>
                  <p className="text-base">00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Main>
  );
};

export default Payment;
