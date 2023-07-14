
// Fetch the image names from a file (assuming a text file with one image name per line)
const slider = document.querySelector('.slider');
let slideIndex = 0;
// Get the element with the id "imageNames"
var h1Tag = document.getElementById("nam");
// console.log(h1Tag);
// Get the text content of the <h1> tag
var imageNames = h1Tag.textContent;
var imagesArray = imageNames.split(",");
console.log(imagesArray);
// fetch('imageFile.txt')
//   .then(response => response.text())
//   .then(data => {
//     const imageNames = data.split('\n');
//     imageNames.forEach(imageName => {
//       if (imageName.trim() !== '') {
//         // console.log(imageName.trim());
//         const img = document.createElement('img');
//         img.src = imageName.trim();
//         slider.appendChild(img);
//         // img.classList.add(".ae");
//       }
//     });
//     showSlide(slideIndex); // Call the showSlide function after the img elements are created
//   });
  for (var i = 0; i < imagesArray.length; i++) {
    // Create an <img> element
    var img = document.createElement("img");
    
    // Set the src attribute to the image file
    img.src = '/uploads/'+imagesArray[i].trim(); // trim() removes any leading/trailing whitespace
    
    // Append the <img> element to the slider
    slider.appendChild(img);
  }
  function showSlide(index) {
    const slides = document.querySelectorAll('.slider img');
    // console.log(slides);
    img.style.left=`${index * 100}%`;
  }
  // **************** percentage calculation ************
  var getlist=document.getElementById('get');
  // console.log(getlist);
  var setlist=document.getElementById('set');
  // console.log(setlist);
  var a=getlist.textContent;
  // console.log(a);
  var b=setlist.textContent;
  // console.log(b);
  var l=Math.round((a/b)*100);
  // console.log(l);
  percentage.innerHTML=l+'%';

  var currentIndex = 0; // Track the current image index
  var intervalId; // Store the interval ID
  const slid = document.querySelector('.main');
  // Function to slide the images
  console.log(imagesArray.length);
  function slideImages() {
    var imageWidth = slid.offsetWidth;
    console.log(imageWidth);
    console.log("jhgdjh");
    var newPosition = -currentIndex * (imageWidth/2);
    slider.style.transform = `translateX(${newPosition}px)`;
    
    currentIndex = (currentIndex + 1) %  (imagesArray.length-1); // Increment the index and loop back to 0 if it exceeds the number of images
  }
  
  // Start the interval timer with a 3-second delay
  intervalId = setInterval(slideImages, 3000);
  
  // Pause the interval when hovering over the images
  slider.addEventListener('mouseenter', function() {
    clearInterval(intervalId);
  });
  
  // Resume the interval when hovering out of the images
  slider.addEventListener('mouseleave', function() {
    intervalId = setInterval(slideImages, 3000);
  });






































  
    // const slide=document.querySelectorAll(".slider img");
    // console.log(slide);
    // var counter=0;
    // slides.forEach(
    //     (img,index)=>{
    //         img.style.left=`${index * 100}%`;
    //     }
    // )

//     setInterval(() => {
//       slideIndex++;
//       showSlide(slideIndex);
//     }, 3000);
//   })
//   .catch(error => {
//     console.error('Error fetching image file:', error);
//   });
  
  