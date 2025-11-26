import React, { useContext, useEffect } from 'react'
import MyBookingsHeader from '../components/MyBookingsHeader'
import { assets, stays } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function MyBookings() {

  const { backendUrl, token, getRoomsData } = useContext(AppContext)

  // Example bookings data using stays from assets.js
  const [bookings, setBookings] = React.useState([])

  const getUserBookings = async () => {
    try {

      const {data} = await axios.get(backendUrl + '/api/user/bookings',{headers:{token}})

      if (data.success) {
        setBookings(data.bookings)
        console.log(data.bookings);
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      
        const { data } = await axios.post(
          backendUrl + '/api/user/cancel-appointment',
          { bookingId },
          { headers: { token } }
        )

        if (data.success) {
          toast.success(data.message)
          getUserBookings() // Refresh bookings list
          getRoomsData()
        } else {
          toast.error(data.message)
        }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  // Handle Pay Now
  const handlePayNow = async (bookingId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/initiate-payment',
        { bookingId },
        { headers: { token } }
      )

      if (data.success) {
        const paymentDetails = data.paymentDetails
        
        // TEST MODE: Use custom modal to avoid Razorpay restrictions
        // Create modal overlay
        const modalOverlay = document.createElement('div')
        modalOverlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        `

        // Create modal content
        const modalContent = document.createElement('div')
        modalContent.style.cssText = `
          background: white;
          border-radius: 8px;
          padding: 30px;
          width: 400px;
          max-width: 90%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `

        modalContent.innerHTML = `
          <div style="text-align: center; margin-bottom: 25px;">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Stayzia" style="width: 60px; height: 60px; margin-bottom: 10px;">
            <h2 style="margin: 10px 0; color: #333; font-size: 22px;">Stayzia</h2>
            <p style="color: #666; font-size: 14px;">${paymentDetails.hotelName}</p>
            <p style="color: #C49C74; font-size: 24px; font-weight: bold; margin-top: 10px;">LKR ${paymentDetails.amount}</p>
          </div>
          
          <form id="paymentForm" style="display: flex; flex-direction: column; gap: 15px;">
            <div>
              <label style="display: block; margin-bottom: 5px; color: #555; font-size: 14px;">Card Number</label>
              <input 
                type="text" 
                id="cardNumber" 
                placeholder="1234 5678 9012 3456" 
                maxlength="19"
                style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; box-sizing: border-box;"
                required
              />
            </div>
            
            <div style="display: flex; gap: 15px;">
              <div style="flex: 1;">
                <label style="display: block; margin-bottom: 5px; color: #555; font-size: 14px;">Expiry Date</label>
                <input 
                  type="text" 
                  id="expiryDate" 
                  placeholder="MM/YY" 
                  maxlength="5"
                  style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; box-sizing: border-box;"
                  required
                />
              </div>
              
              <div style="flex: 1;">
                <label style="display: block; margin-bottom: 5px; color: #555; font-size: 14px;">CVV</label>
                <input 
                  type="text" 
                  id="cvv" 
                  placeholder="123" 
                  maxlength="3"
                  style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; box-sizing: border-box;"
                  required
                />
              </div>
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 5px; color: #555; font-size: 14px;">Cardholder Name</label>
              <input 
                type="text" 
                id="cardName" 
                placeholder="John Doe"
                value="${paymentDetails.customerName}"
                style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; box-sizing: border-box;"
                required
              />
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 10px;">
              <button 
                type="submit" 
                style="flex: 1; padding: 14px; background: #C49C74; color: white; border: none; border-radius: 4px; font-size: 16px; font-weight: 600; cursor: pointer;"
              >
                Pay LKR ${paymentDetails.amount}
              </button>
              <button 
                type="button" 
                id="cancelBtn"
                style="padding: 14px 20px; background: #f3f4f6; color: #333; border: none; border-radius: 4px; font-size: 16px; cursor: pointer;"
              >
                Cancel
              </button>
            </div>
          </form>
          
          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 15px;">
            🔒 Secure Payment • Test Mode
          </p>
        `

        modalOverlay.appendChild(modalContent)
        document.body.appendChild(modalOverlay)

        // Card number formatting
        const cardNumberInput = document.getElementById('cardNumber')
        cardNumberInput.addEventListener('input', (e) => {
          let value = e.target.value.replace(/\s/g, '')
          let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
          e.target.value = formattedValue
        })

        // Expiry date formatting
        const expiryInput = document.getElementById('expiryDate')
        expiryInput.addEventListener('input', (e) => {
          let value = e.target.value.replace(/\D/g, '')
          if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4)
          }
          e.target.value = value
        })

        // CVV number only
        const cvvInput = document.getElementById('cvv')
        cvvInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/\D/g, '')
        })

        // Handle form submission
        const paymentForm = document.getElementById('paymentForm')
        paymentForm.addEventListener('submit', async (e) => {
          e.preventDefault()
          
          // Simulate payment processing
          const submitBtn = e.target.querySelector('button[type="submit"]')
          submitBtn.textContent = 'Processing...'
          submitBtn.disabled = true
          
          // Simulate delay
          await new Promise(resolve => setTimeout(resolve, 1500))
          
          // Close modal
          document.body.removeChild(modalOverlay)
          
          // Show success
          toast.success('Payment successful!')
          
          // Complete payment in backend
          try {
            const { data } = await axios.post(
              backendUrl + '/api/user/complete-payment',
              { 
                bookingId: paymentDetails.bookingId,
                paymentStatus: 'success',
                razorpay_payment_id: 'test_' + Date.now()
              },
              { headers: { token } }
            )
            
            if (data.success) {
              getUserBookings()
            }
          } catch (error) {
            console.log(error)
          }
        })

        // Handle cancel
        const cancelBtn = document.getElementById('cancelBtn')
        cancelBtn.addEventListener('click', () => {
          document.body.removeChild(modalOverlay)
          toast.info('Payment cancelled')
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  // 

  const options = {
    key: "rzp_test_HJG5Rtuy8Xh2NB",
    amount: "100", //  = INR 1
    name: "Acme shop",
    description: "some description",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function(response) {
      alert(response.razorpay_payment_id);
    },
    prefill: {
      name: "Gaurav",
      contact: "9999999999",
      email: "demo@demo.com"
    },
    notes: {
      address: "some address"
    },
    theme: {
      color: "#F37254",
      hide_topbar: false
    }
  };

  const openPayModal = options => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(()=>{
    if (token) {
      getUserBookings()
    }
  },[token])

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])
  // 

  return (
    <div className="min-h-screen">
      <MyBookingsHeader/>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Column Headers */}
        <div className="hidden lg:block">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 p-4">
              <h3 className="text-lg font-bold text-gray-900">Hotels</h3>
            </div>
            <div className="lg:w-1/3 p-4">
              <h3 className="text-lg font-bold text-gray-900">Date & Timings</h3>
            </div>
            <div className="lg:w-1/4 p-4">
              <h3 className="text-lg font-bold text-gray-900">Payment</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-b-lg shadow-md">
          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg">No bookings found</p>
              <p className="text-gray-400 text-sm mt-2">Your booking history will appear here</p>
            </div>
          ) : (
            bookings.map((booking, index) => {
              // Parse the hotel data from JSON string
              const hotelData = JSON.parse(booking.hotelData)
              
              return (
                <div key={booking._id}>
                  <div className="flex flex-col lg:flex-row hover:bg-gray-50 transition-colors">
                    {/* Left Side - Image and Stay Details */}
                    <div className="lg:w-2/5 p-6 flex gap-4">
                      <img 
                        src={hotelData.image} 
                        alt={hotelData.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex flex-col justify-center">
                        <h3 className="text-xl font-semibold text-gray-900">{hotelData.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                          <p className="text-sm text-gray-600">{hotelData.location}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <img src={assets.homeIcon} alt="room" className="w-4 h-4" />
                          <p className="text-sm text-gray-600">{booking.roomType}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <img src={assets.guestsIcon} alt="guests" className="w-4 h-4" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Guests:</span> {booking.numberOfGuests}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-primary mt-3">
                          Total: LKR {booking.totalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Middle - Date & Timings */}
                    <div className="lg:w-1/3 p-6">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <img src={assets.calenderIcon} alt="calendar" className="w-5 h-5" />
                          <div>
                            <p className="text-xs text-gray-600">Check-in</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(booking.checkInDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src={assets.calenderIcon} alt="calendar" className="w-5 h-5" />
                          <div>
                            <p className="text-xs text-gray-600">Check-out</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(booking.checkOutDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{booking.numberOfNights}</span> night(s)
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Payment */}
                    <div className="lg:w-1/4 p-6 flex flex-col justify-center">
                      <div className="mt-4 space-y-2">
                        {booking.cancelled ? (
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                            <span className="font-semibold">Cancelled</span>
                          </div>
                        ) : booking.payment ? (
                          <div className="flex items-center gap-2 text-green-600 mb-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <span className="font-semibold">Paid</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-red-600">
                              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                              <span className="font-semibold">Unpaid</span>
                            </div>
                            <button 
                              onClick={() => handlePayNow(booking._id)} 
                              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all w-full"
                            >
                              Pay Now
                            </button>
                          </div>
                        )}
                        {!booking.cancelled && (
                          <button 
                            onClick={() => handleCancelBooking(booking._id)}
                            className="border border-red-500 text-red-500 px-8 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all w-full"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < bookings.length - 1 && (
                    <hr className="border-gray-200" />
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default MyBookings