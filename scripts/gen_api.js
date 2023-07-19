function init_gen_api() {
  console.log('init_gen_api');
  console.log('============================');

  window.generate_api = (a, b, c) => {
    console.log(a, b, c);
  };
}
console.log('first');
if (
  document.readyState === 'complete' ||
  document.readyState === 'interactive'
) {
  init_gen_api();
} else {
  document.addEventListener('DOMContentLoaded', init_gen_api);
}
