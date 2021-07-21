//Método que se lanza en document ready
const docReady = fn => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

// Método para comprobar si es safari
const isSafari = () => {
  const safaris = navigator.userAgent.toLowerCase().indexOf("safari/") > -1;
  const chrome = navigator.userAgent.toLowerCase().indexOf("chrome/") > -1;
  return safaris && !chrome;
};

//Interacciones de la cabecera, para buscador y para menú mobile
const headerInteraction = () => {
  if (document.getElementById("menu-toggle")) {
    document.getElementById("menu-toggle").addEventListener("click", () => {
      document.getElementById("wrapper").classList.toggle("open");
    });
    // document.querySelector("#header .close").addEventListener("click", () => {
    //   document.getElementById("wrapper").classList.toggle("open");
    // });
  }
};

//Método video interaction para cargar iframe de video al hacer click en la foto.
const videoInteraction = () => {
  document.querySelector(".video-launcher")
    ? document.querySelector(".video-launcher").addEventListener("click", e => {
        const id = e.currentTarget.dataset.id;
        const iframe = document.createElement("iframe");
        iframe.setAttribute("width", "100%");
        iframe.setAttribute("height", "100%");
        iframe.setAttribute(
          "src",
          `https://www.youtube.com/embed/${id}?controls=0&amp;autoplay=true`
        );
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        );
        iframe.setAttribute("allowFullScreen", "allowFullScreen");
        e.currentTarget.parentNode.append(iframe);
        e.currentTarget.remove();
      })
    : null;
};

//Scroll Up para cabecera
const fixedHeaderInteraction = () => {
  let lastScrollTop = 0;
  const headerHeight = document.getElementById("header").offsetHeight;
  window.addEventListener("scroll", function() {
    let st = window.scrollY;
    const wrapper = document.getElementById("wrapper");
    //Scroll classes up and down
    if (st > headerHeight) {
      wrapper.classList.add("fixed");
      if (st > lastScrollTop) {
        wrapper.classList.remove("up");
        wrapper.classList.add("down");
      } else {
        wrapper.classList.add("up");
        wrapper.classList.remove("down");
      }
      lastScrollTop = st;
    } else {
      wrapper.classList.remove("fixed");
      wrapper.classList.remove("up");
      wrapper.classList.remove("down");
    }
  });
};
/*smooth_scroll*/
const smoothScrolls = () => {
  const links = document.querySelectorAll(".smooth");
  for (const link of links) {
    link.addEventListener("click", clickSmooothHandler);
  }
  function clickSmooothHandler(e) {
    e.preventDefault();
    const href = this.dataset.href;
    const target = document.getElementById(this.dataset.target);
    const offsetTop = document.getElementById(href).offsetTop;
    if (!target) {
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });
    } else {
      const realOffsetTop = offsetTop - target.offsetTop;
      // target.style.marginTop = "-" + realOffsetTop + "px";
      target.scroll({
        top: realOffsetTop,
        behavior: "smooth"
      });
    }
  }
};

//Iniciamos métodos en document ready.
docReady(
  headerInteraction(),
  fixedHeaderInteraction(),
  // videoInteraction(),
  smoothScrolls()
);
