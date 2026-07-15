const question     = document.querySelectorAll('.question')

question.forEach(function(question) {
  const answer = question.parentElement.querySelector('.answer');
  const img    = question.parentElement.querySelector('button').firstElementChild;
  const button = img.parentElement;

  question.addEventListener('click', function() {
    if (answer.classList.contains('shown')) {
      img.src = './assets/images/icon-plus.svg';
      button.setAttribute('aria-expanded', 'false');
    } else {
      img.src = './assets/images/icon-minus.svg';
      button.setAttribute('aria-expanded', 'true');
    }
    answer.classList.toggle('shown');
  });
})