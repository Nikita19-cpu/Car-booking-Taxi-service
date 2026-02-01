let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  const routeDistanceMap = {
  "Birsa-Baihar": 27,
  "Birsa-Ukwa": 35,
  "Birsa-Balaghat": 90,
  "Birsa-Gondia": 140,
  "Birsa-Nagpur": 270
};

document.getElementById("route").addEventListener("change", function () {

  let route = this.value;
  let distanceInput = document.getElementById("distance");

  if (routeDistanceMap[route]) {
    distanceInput.value = routeDistanceMap[route];
    distanceInput.readOnly = true;   // auto-fill lock
  } else {
    distanceInput.value = "";
    distanceInput.readOnly = false;  // manual entry allow
  }
});


//  function calculatePrice() {
//   let km = parseInt(document.getElementById("distance").value);

//   if (!km || km <= 0) {
//     alert("Enter valid KM");
//     return;
//   }
    
//  // Fixed rate(Below 500km)
//   const fixedRates = {
    
//     5: {price: 700, time: 6},
//     "Birsa-Baihar":{27:{price: 2000, time: 6}},
//     "Birsa-Ukwa":{ 35:{price:2500, time: 6}},
//     "Birsa-Balaghat":{ 90:{price:3200,time:8}},
//     "Birsa-Gondia":{ 140:{price:3800,time:12}},
//     "Birsa-Nagpur":{270:{price:7000,time:24}}
    
//   };

//   //case 1: fixed distance
//   if(km < 500 && fixedRates[km])  {
//     document.getElementById("priceResult").innerText =
//      '${km} KM = ₹${fixedRates[km].price} (${fixedRates[km].time} Hours)';
//     return;
//   }
   
//    // Case 2 : 500km or more (per Km logic)

//     let rate;
//     if(toll >= 1) {  // 4-5 toll ka case
//        rate = carType === "ac" ? 14:13;
//     } else {
//       rate = carType === "ac" ? 13:12;
//     }

//     let price = (km * rate) + toll;
//      document.getElementById("priceResult").innerText='${km}KM = ₹${price}(${carType.toUpperCase()} | Toll₹${toll})';
//   }
 

// //    if (km <= 0) {
// //     alert("Enter valid KM");
// //     return;
   

// //   let price = base + (km * rate);
// //   document.getElementById("priceResult").innerText =
// //     "Estimated Price: ₹" + price;
// // }

// function bookCar() {
//   let name = document.getElementById("name").value;
//   let mobile = document.getElementById("mobile").value;
//   let date = document.getElementById("date").value;
//   let car = document.getElementById("car").value;

//   if (!name || !mobile || !date) {
//     alert("Fill all details");
//     return;
//   }

//   // Check already booked
//   let exists = bookings.find(
//     b => b.car === car && b.date === date
//   );

//   if (exists) {
//     document.getElementById("statusMsg").innerText =
//       "❌ Car already booked on this date";
//     return;
//   }

//   let booking = {
//     name,
//     mobile,
//     date,
//     car
//   };

//   bookings.push(booking);
//   localStorage.setItem("bookings", JSON.stringify(bookings));

//   document.getElementById("statusMsg").innerText =
//     "✅ Booking Successful";

//   loadBookings();

//   // WhatsApp message
//   let msg = 
//    "Hello Pratik sir Car Booking/n/n" +   // gap in msg
//     "Name: " + name +
//     "\nMobile: " + mobile +
//     "\nCar: " + car +
//     "\nDate: " + date;

//   window.open("https://wa.me/918718000345?text=" + encodeURIComponent(msg));
// }

// function loadBookings() {
//   let list = document.getElementById("bookingList");
//   list.innerHTML = "";

//   bookings.forEach(b => {
//     let div = document.createElement("div");
//     div.className = "booking-item";
//     div.innerText =
//       b.car + " | " + b.date + " | " + b.name + " (" + b.mobile + ")";
//     list.appendChild(div);
//   });
// }

// loadBookings();
    

  // without wayone perday option code
// function calculatePrice() {

//   let route = document.getElementById("route").value;   // may be empty
//   let km = parseInt(document.getElementById("distance").value);
//   let carType = document.getElementById("carType").value;
//   let toll = parseInt(document.getElementById("toll").value) || 0;

//   if (!km || km <= 0) {
//     alert("Distance (KM) sahi bharo");
//     return;
//   }

//   let price = 0;

//   // Fixed route prices (Below 500 KM)
//   const fixedRoutePrices = {
//     "Birsa-Baihar": 2000,
//     "Birsa-Ukwa": 2500,
//     "Birsa-Balaghat": 3200,
//     "Birsa-Gondia": 3800,
//     "Birsa-Nagpur": 7000
//   };

//   // 👉 CASE 1: Route selected + fixed route + km < 500
//   if (route && km < 500 && fixedRoutePrices[route]) {

//     price = fixedRoutePrices[route] + toll;

//     document.getElementById("priceResult").innerText =
//       "Total Price: ₹" + price +
//       " (Fixed Route | Toll ₹" + toll + ")";
//     return;
//   }

//   // 👉 CASE 2: Distance based booking (no route OR 500+ KM)
//   let ratePerKm = (carType === "ac") ? 14 : 13;

//   price = (km * ratePerKm) + toll;

//   document.getElementById("priceResult").innerText =
//     "Total Price: ₹" + price +
//     " (" + km + " KM × ₹" + ratePerKm +
//     " | " + carType.toUpperCase() +
//     " | Toll ₹" + toll + ")";
// }


    function calculatePrice() {

  let route = document.getElementById("route").value;
  let km = parseInt(document.getElementById("distance").value);
  let carType = document.getElementById("carType").value;
  let tripType = document.getElementById("tripType").value;
  let days = parseInt(document.getElementById("days").value) || 0;
  let toll = parseInt(document.getElementById("toll").value) || 0;

  if (!km || km <= 0) {
    alert("Distance (KM) sahi bharo");
    return;
  }

  // 🔹 Rates
  let perKmRate = (carType === "ac") ? 14 : 13;
  let perDayRate = (carType === "ac") ? 1800 : 1500;

  // 🔹 Fixed routes
  const fixedRoutePrices = {
    "Birsa-Baihar": 2000,
    "Birsa-Ukwa": 2500,
    "Birsa-Balaghat": 3200,
    "Birsa-Gondia": 3800,
    "Birsa-Nagpur": 7000
  };

  let totalKm = km;

  // 🔁 Round trip
  if (tripType === "round") {
    totalKm = km * 2;
  }

  let kmPrice = 0;

  // 🔹 Fixed route (only one way & below 500 KM)
  if (route && tripType === "oneway" && km < 500 && fixedRoutePrices[route]) {
    kmPrice = fixedRoutePrices[route];
  } else {
    kmPrice = totalKm * perKmRate;
  }

  let dayPrice = days * perDayRate;
  let totalPrice = kmPrice + dayPrice + toll;

  document.getElementById("priceResult").innerText =
    "Total Price: ₹" + totalPrice +
    " | KM Charge: ₹" + kmPrice +
    " | Day Charge: ₹" + dayPrice +
    " | Toll ₹" + toll +
    " | " + tripType.toUpperCase();
}

 function bookCar() {
  let name = document.getElementById("name").value;
  let mobile = document.getElementById("mobile").value;
  let date = document.getElementById("date").value;
  let car = document.getElementById("car").value;

  if (!name || !mobile || !date) {
    alert("Fill all details");
    return;
  }

  // Check already booked
  let exists = bookings.find(
    b => b.car === car && b.date === date
  );

  if (exists) {
    document.getElementById("statusMsg").innerText =
      "❌ Car already booked on this date";
    return;
  }

  let booking = {
    name,
    mobile,
    date,
    car
  };

  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  document.getElementById("statusMsg").innerText =
    "✅ Booking Successful";

  loadBookings();

  // WhatsApp message
  let msg = 
   "Hello Pratik sir Car Booking/n/n" +   // gap in msg
    "\nName: " + name +
    "\nMobile: " + mobile +
    "\nCar: " + car +
    "\nDate: " + date;

  window.open("https://wa.me/918718000345?text=" + encodeURIComponent(msg));
}

function loadBookings() {
  let list = document.getElementById("bookingList");
  list.innerHTML = "";

  bookings.forEach(b => {
    let div = document.createElement("div");
    div.className = "booking-item";
    div.innerText =
      b.car + " | " + b.date + " | " + b.name + " (" + b.mobile + ")";
    list.appendChild(div);
  });
}

loadBookings();
 
   