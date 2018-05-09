

function handle() {
  handle = 'pageYOffset' in window ? function () {
    return pageYOffset;
  } : function () {
    return document.documentElement.scrollTop;
  };
  return handle();
}

export default function scrollTop() {
  return handle();
};
