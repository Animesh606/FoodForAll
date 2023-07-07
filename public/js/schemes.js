
var cardTexts = document.querySelectorAll('.card-text');
var wordLimit = 60; // Adjust the desired word limit here

cardTexts.forEach(function(cardText) {
  var fullText = cardText.textContent.trim();
  var words = fullText.split(' ');
  var limitedText = words.slice(0, wordLimit).join(' ');
  
  cardText.textContent = limitedText+".....";
});
const canvas = document.getElementById('circle');
const context = canvas.getContext('2d');

const radius = 30;
const lineWidth = 10;
const percentage = 10;
const startAngle = -Math.PI / 2;
const endAngle = ((percentage / 100) * Math.PI * 2) + startAngle;

context.lineWidth = lineWidth;
context.strokeStyle = '#007bff';

context.beginPath();
context.arc(canvas.width / 2, canvas.height / 2, radius, startAngle, endAngle);
context.stroke();
