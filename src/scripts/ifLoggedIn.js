    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
    import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
    import { getDatabase, ref, push, set} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
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
    const db = getDatabase();

    // Get the content div element
    const content = document.getElementById("content");
    const phone = document.getElementById("content-phone");
    const comment = document.getElementById("comment");

    // Listen to the authentication state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in
            content.innerHTML = `
            <div class="text-center items-center">
                <h1 class="font-bold">${user.email} <i class="fa-solid fa-angle-down cursor-pointer" id="arrow"></i></h1> 
                <button id="logout" class="hidden mt-5 p-2">Logout</button>
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

            comment.innerHTML = `
            <div class="bg-white px-3 rounded-md font-opensans pb-1">
                <h1 class="font-extrabold text-[24px] text-gray-800">Comments</h1>
                <div class="relative my-2">
                    <div class="absolute inset-y-0 left-0 flex pl-3 pt-2.5 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                    </div>
                    <textarea id="subject" name="message" autocomplete="off" rows="5" cols="50" class="bg-[#D9D9D9] resize-none border border-gray-300 text-[#808080] focus:text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
                    placeholder="Post a comment... "></textarea>
                    <div class="mt-2">
                    <button id="btn-comment" type="submit" class="border-none bg-black text-white text-base 
                    h-10 w-full rounded-lg hover:bg-gray-800 transition: duration-200">Submit</button>
                    </div>
                </div>

            </div>    
            `;

            // Event listener for comments
            document.getElementById("btn-comment").addEventListener("click", function () {
                const commentText = document.getElementById("subject").value.trim();
                const articleId = document.getElementById("articleId").value;

                if (commentText && articleId) {
                    const commentsRef = ref(db, "articles/" + articleId + "/comments"); // Get a reference to the "comments" node
                    const newCommentRef = push(commentsRef); // Create a new child node under "comments"
                    set(newCommentRef, {
                        userId: user.uid,
                        email: user.email,
                        comment: commentText,
                        timestamp: Date.now()
                    }).then(() => {
                        alert("Comment posted successfully!");
                        document.getElementById("subject").value = "";
                    }).catch((error) => {
                        console.error("Error posting comment:", error);
                        alert("An error occurred while posting the comment. Please try again.");
                    });
                } else {    
                    alert("Please enter a comment before submitting!");
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
            `;

            comment.innerHTML = `
            <div class="bg-white px-3 rounded-md font-opensans pb-1">
                <h1 class="font-extrabold text-[24px] text-gray-800">Comments</h1>
                <div class="relative my-2">
                    <div class="absolute inset-y-0 left-0 flex pl-3 pt-2.5 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                    </div>
                    <textarea id="subject" name="message" autocomplete="off" rows="5" cols="50" class="cursor-not-allowed bg-[#D9D9D9] resize-none border border-gray-300 text-[#808080] focus:text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
                    placeholder="You must be logged in to post a comment... " disabled></textarea>
                </div>
            </div>    
            `
        }
    });

