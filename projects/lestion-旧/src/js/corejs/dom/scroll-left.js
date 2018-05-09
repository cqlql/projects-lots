
function handle() {
  handle = 'pageXOffset' in window ? function () {
    return pageXOffset;
  } : function () {
    return document.documentElement.scrollLeft;
  };
  return handle();
}

export default function scrollLeft() {
  return handle();
};
