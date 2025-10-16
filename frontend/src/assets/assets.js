// Icons
import add_icon from "./add_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import badgeIcon from "./badgeIcon.svg";
import booking_icon from "./booking_icon.svg";
import bookings_icon from "./bookings_icon.svg";
import calenderIcon from "./calenderIcon.svg";
import cancel_icon from "./cancel_icon.svg";
import chats_icon from "./chats_icon.svg";
import dropdown_icon from "./dropdown_icon.svg";
import home_icon from "./home_icon.svg";
import info_icon from "./info_icon.svg";
import list_icon from "./list_icon.svg";
import locationIcon from "./locationIcon.svg";
import menu_icon from "./menu_icon.svg";
import searchIcon from "./searchIcon.svg";
import tick_icon from "./tick_icon.svg";
import upload_area from "./upload_area.svg";
import verified_icon from "./verified_icon.svg";

// PNG Images
import apartments from "./apartments.png";
import cottages from "./cottages.png";
import cross_icon from "./cross_icon.png";
import header_img from "./image header.png";
import hotel1 from "./hotel1.png";
import hotel2 from "./hotel2.png";
import hotel3 from "./hotel3.png";
import hotel4 from "./hotel4.png";
import hotel5 from "./hotel5.png";
import hotel6 from "./hotel6.png";
import hotel7 from "./hotel7.png";
import hotels from "./hotels.png";
import logo from "./logo.png";
import razorpay_logo from "./razorpay_logo.png";
import resorts from "./resorts.png";
import room1 from "./room1.png";
import room2 from "./room2.png";
import room3 from "./room3.png";
import stripe_logo from "./stripe_logo.png";
import topHotel1 from "./topHotel1.png";
import topHotel2 from "./topHotel2.png";
import topHotel3 from "./topHotel3.png";
import upload_area_png from "./upload_area.png";
import upload_icon from "./upload_icon.png";
import villas from "./villas.png";
import profile_pic from "./profile_pic.png";

export const assets = {
  // Icons
  add_icon,
  arrow_icon,
  badgeIcon,
  booking_icon,
  bookings_icon,
  calenderIcon,
  cancel_icon,
  chats_icon,
  dropdown_icon,
  home_icon,
  info_icon,
  list_icon,
  locationIcon,
  menu_icon,
  searchIcon,
  tick_icon,
  upload_area,
  verified_icon,

  // Images
  cross_icon,
  header_img,
  hotel1,
  hotel2,
  hotel3,
  hotel4,
  hotel5,
  hotel6,
  hotel7,
  hotels,
  logo,
  razorpay_logo,
  room1,
  room2,
  room3,
  stripe_logo,
  topHotel1,
  topHotel2,
  topHotel3,
  upload_area_png,
  upload_icon,
  profile_pic
};

export const cities = [
    "Kandy",
    "Galle",
    "Matara",
    "Colombo",
];

export const propertyType = [
    {
        property: 'Hotels',
        image: hotels
    },
    {
        property: 'Apartments',
        image: apartments
    },
    {
        property: 'Resorts',
        image: resorts
    },
    {
        property: 'Villas',
        image: villas
    },
    {
        property: 'Cottages',
        image: cottages
    },
]

export const stays = [
    {
        _id: 'stay1',
        name: 'Kemah Tinggi Hotel',
        image: hotel1,
        property: 'Hotels',
        about: 'A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.',
        cost: 450,
        location: 'Kandy',
        rating: 4.9
    },
    {
        _id: 'stay2',
        name: 'Kemah Tinggi Apartment',
        image: hotel1,
        property: 'Apartments',
        about: 'A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.',
        cost: 450,
        location: 'Kandy',
        rating: 4.9
    },
    {
        _id: 'stay3',
        name: 'Kemah Tinggi Resort',
        image: hotel1,
        property: 'Resorts',
        about: 'A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.',
        cost: 450,
        location: 'Kandy',
        rating: 4.9
    },
    {
        _id: 'stay4',
        name: 'Kemah Tinggi Cottage',
        image: hotel1,
        property: 'Cottages',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.',
        cost: 240,
        location: 'Kandy',
        rating: 4.9
    },
    {
        _id: 'stay5',
        name: 'Kemah Tinggi Villa',
        image: hotel1,
        property: 'Villas',
        about: 'A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.',
        cost: 450,
        location: 'Kandy',
        rating: 4.9
    },
    {
        _id: 'stay6',
        name: 'Kemah Tinggi Cottage',
        image: hotel1,
        property: 'Cottages',
        about: 'A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.',
        cost: 450,
        location: 'Kandy',
        rating: 4.9
    },
    {
        _id: 'stay7',
        name: 'Kemah Tinggi Resort',
        image: hotel1,
        property: 'Resorts',
        about: 'A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.',
        cost: 450,
        location: 'Kandy',
        rating: 4.9
    },
]