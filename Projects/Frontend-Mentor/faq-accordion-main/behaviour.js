const question     = document.querySelectorAll('.question')

question.forEach(function(question) {
  const answer = question.parentElement.querySelector('.answer');
  const img    = question.parentElement.querySelector('button').firstElementChild;

  question.addEventListener('click', function() {
    if (answer.classList.contains('shown')) {
      img.src = './assets/images/icon-plus.svg';
    } else {
      img.src = './assets/images/icon-minus.svg';
    }
    answer.classList.toggle('shown');
  });
})