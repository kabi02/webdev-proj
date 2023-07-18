    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
    import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDqFpJuiKUVT4cMlq9tbdJX6nsGhG5mQck",
        authDomain: "webdev-proj-bc572.firebaseapp.com",
        databaseURL: "https://webdev-proj-bc572-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "webdev-proj-bc572",
        storageBucket: "webdev-proj-bc572.appspot.com",
        messagingSenderId: "836536231601",
        appId: "1:836536231601:web:fac5cae09e806ac8c02490",
        measurementId: "G-YS60DN7JXV"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth();

    // Get the content div element
    const content = document.getElementById("content");
    const phone = document.getElementById("content-phone");

    // Listen to the authentication state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in
            content.innerHTML = `
            <div class="border-2 border-black text-center items-center">
                <h1 class="font-bold">${user.email} <i class="fa-solid fa-angle-down cursor-pointer" id="arrow"></i></h1> 
                <button id="logout" class="hidden border-2 border-black mt-5 p-2">Logout</button>
            </div>
            `;

            phone.innerHTML = `
            <div class="pt-6">
                <a class="block px-4 py-3 mb-3 leading-none text-xs text-center font-semibold rounded-xl">${user.email} </a>
                <a class="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-black hover:bg-gray-500 rounded-xl">Log Out</a>
            </div>
            `;

            // Add a logout button event listener 
            document.getElementById("logout").addEventListener("click", () => { 
                auth.signOut(); 
            }); 

            // Add an arrow icon event listener 
            document.getElementById("arrow").addEventListener("click", () => { 
                // Get the button element 
                const button = document.getElementById("logout"); 
                // Check if the button is hidden 
                if (button.classList.contains("hidden")) { 
                    button.classList.remove("hidden"); 
                    button.classList.add("block"); 
                } else { 
                    button.classList.remove("block"); 
                    button.classList.add("hidden"); 
                } 
            });

        } else {
            // User is logged out
            content.innerHTML = `
            <a class="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 text-sm sm:text-base text-gray-900 font-bold rounded-xl transition duration-200 hover:bg-gray-100" href="sign_in.html">Sign In</a>
            <a class="hidden lg:inline-block py-2 px-6 bg-black hover:bg-gray-500 text-sm sm:text-base text-white font-bold rounded-xl transition duration-200" href="sign_up.html">Sign up</a>
            `;

            phone.innerHTML = `
            <div class="pt-6">
                <a class="block px-4 py-3 mb-3 leading-none text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl" href="sign_in.html">Sign in</a>
                <a class="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-black hover:bg-gray-500 rounded-xl" href="sign_up.html">Sign Up</a>
            </div>
            `
        }
    });

