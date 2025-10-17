// Icons
import add_icon from "./add_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import badgeIcon from "./badgeIcon.svg";
import booking_icon from "./booking_icon.svg";
import bookings_icon from "./bookings_icon.svg";
import calenderIcon from "./calenderIcon.svg";
import cancel_icon from "./cancel_icon.svg";
import chats_icon from "./chats_icon.svg";
import closeIcon from "./closeIcon.svg";
import closeMenu from "./closeMenu.svg";
import dashboardIcon from "./dashboardIcon.svg";
import dropdown_icon from "./dropdown_icon.svg";
import facebookIcon from "./facebookIcon.svg";
import freeBreakfastIcon from "./freeBreakfastIcon.svg";
import freeWifiIcon from "./freeWifiIcon.svg";
import guestsIcon from "./guestsIcon.svg";
import heartIcon from "./heartIcon.svg";
import homeIcon from "./homeIcon.svg";
import home_icon from "./home_icon.svg";
import info_icon from "./info_icon.svg";
import instagramIcon from "./instagramIcon.svg";
import linkendinIcon from "./linkendinIcon.svg";
import listIcon from "./listIcon.svg";
import list_icon from "./list_icon.svg";
import locationFilledIcon from "./locationFilledIcon.svg";
import locationIcon from "./locationIcon.svg";
import menuIcon from "./menuIcon.svg";
import menu_icon from "./menu_icon.svg";
import mountainIcon from "./mountainIcon.svg";
import poolIcon from "./poolIcon.svg";
import roomServiceIcon from "./roomServiceIcon.svg";
import searchIcon from "./searchIcon.svg";
import starIconFilled from "./starIconFilled.svg";
import starIconOutlined from "./starIconOutlined.svg";
import tick_icon from "./tick_icon.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";
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
import profile_pic from "./profile_pic.png";
import razorpay_logo from "./razorpay_logo.png";
import resorts from "./resorts.png";
import room1 from "./room1.png";
import room2 from "./room2.png";
import room3 from "./room3.png";
import room4 from "./room4.png";
import room5 from "./room5.png";
import room6 from "./room6.png";
import room7 from "./room7.png";
import stripe_logo from "./stripe_logo.png";
import topHotel1 from "./topHotel1.png";
import topHotel2 from "./topHotel2.png";
import topHotel3 from "./topHotel3.png";
import upload_area_png from "./upload_area.png";
import upload_icon from "./upload_icon.png";
import villas from "./villas.png";

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
  closeIcon,
  closeMenu,
  dashboardIcon,
  dropdown_icon,
  facebookIcon,
  freeBreakfastIcon,
  freeWifiIcon,
  guestsIcon,
  heartIcon,
  homeIcon,
  home_icon,
  info_icon,
  instagramIcon,
  linkendinIcon,
  listIcon,
  list_icon,
  locationFilledIcon,
  locationIcon,
  menuIcon,
  menu_icon,
  mountainIcon,
  poolIcon,
  roomServiceIcon,
  searchIcon,
  starIconFilled,
  starIconOutlined,
  tick_icon,
  totalBookingIcon,
  totalRevenueIcon,
  upload_area,
  verified_icon,

  // Images
  apartments,
  cottages,
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
  profile_pic,
  razorpay_logo,
  resorts,
  room1,
  room2,
  room3,
  room4,
  room5,
  room6,
  room7,
  stripe_logo,
  topHotel1,
  topHotel2,
  topHotel3,
  upload_area_png,
  upload_icon,
  villas,
};

export const cities = ["Kandy", "Galle", "Matara", "Colombo"];

// Facility Icon
export const facilityIcons = {
    "Free WiFi": assets.freeWifiIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Mountain View": assets.mountainIcon,
    "Pool Access": assets.poolIcon,
};

// For Room Details Page
export const roomCommonData = [
    { icon: assets.homeIcon, title: "Clean & Safe Stay", description: "A well-maintained and hygienic space just for you." },
    { icon: assets.badgeIcon, title: "Enhanced Cleaning", description: "This host follows Staybnb's strict cleaning standards." },
    { icon: assets.locationFilledIcon, title: "Excellent Location", description: "90% of guests rated the location 5 stars." },
    { icon: assets.heartIcon, title: "Smooth Check-In", description: "100% of guests gave check-in a 5-star rating." },
];

export const propertyType = [
  {
    property: "Hotels",
    image: hotels,
  },
  {
    property: "Apartments",
    image: apartments,
  },
  {
    property: "Resorts",
    image: resorts,
  },
  {
    property: "Villas",
    image: villas,
  },
  {
    property: "Cottages",
    image: cottages,
  },
];

export const stays = [
  {
    _id: "stay1",
    name: "Kemah Tinggi Hotel",
    image: hotel1,
    roomType: "Double Bed",
    property: "Hotels",
    amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
    about:
      "A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.",
    pricePerNight: "6000",
    location: "Kandy",
    rating: 4.9,
    isAvailable: true,
  },
  {
    _id: "stay2",
    name: "Kemah Tinggi Apartment",
    image: hotel2,
    roomType: "Single Bed",
    property: "Apartments",
    amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
    about:
      "A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.",
    pricePerNight: "4000",
    location: "Kandy",
    rating: 4.9,
    isAvailable: true,
  },
  {
    _id: "stay3",
    name: "Kemah Tinggi Resort",
    image: hotel3,
    roomType: "Family Suite",
    property: "Resorts",
    amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
    about:
      "A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.",
    pricePerNight: "8000",
    location: "Kandy",
    rating: 4.9,
    isAvailable: false,
  },
  {
    _id: "stay4",
    name: "Kemah Tinggi Cottage",
    image: hotel4,
    roomType: "Luxury Room",
    property: "Cottages",
    amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
    about:
      "A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.",
    pricePerNight: "13000",
    location: "Kandy",
    rating: 4.9,
    isAvailable: true,
  },
  {
    _id: "stay5",
    name: "Kemah Tinggi Villa",
    image: hotel5,
    roomType: "Luxury Room",
    property: "Villas",
    amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
    about:
      "A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.",
    pricePerNight: "14000",
    location: "Kandy",
    rating: 4.9,
    isAvailable: false,
  },
  {
    _id: "stay6",
    name: "Kemah Tinggi Cottage",
    image: hotel6,
    roomType: "Double Bed",
    property: "Cottages",
    amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
    about:
      "A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.",
    pricePerNight: "5000",
    location: "Kandy",
    rating: 4.9,
    isAvailable: true,
  },
  {
    _id: "stay7",
    name: "Kemah Tinggi Resort",
    image: hotel7,
    roomType: "Single Bed",
    property: "Resorts",
    amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
    about:
      "A hotel is a commercial establishment providing short-term, paid lodging and a variety of services for travelers, ranging from basic rooms to luxurious suites with amenities like restaurants, pools, and spas. Hotels are a significant part of the hospitality industry, offering a spectrum of services and facilities to cater to different needs, from families and business travelers to tourists.",
    pricePerNight: "3500",
    location: "Kandy",
    rating: 4.9,
    isAvailable: false,
  },
];
