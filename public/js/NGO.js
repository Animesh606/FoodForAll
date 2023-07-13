
// Fetch the image names from a file (assuming a text file with one image name per line)
const slider = document.querySelector('.slider');
let slideIndex = 0;
fetch('imageFile.txt')
  .then(response => response.text())
  .then(data => {
    const imageNames = data.split('\n');
    imageNames.forEach(imageName => {
      if (imageName.trim() !== '') {
        // console.log(imageName.trim());
        const img = document.createElement('img');
        img.src = imageName.trim();
        slider.appendChild(img);
        // img.classList.add(".ae");
      }
    });
    showSlide(slideIndex); // Call the showSlide function after the img elements are created
  });
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
  
  