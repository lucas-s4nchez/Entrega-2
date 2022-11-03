const btnMenu = document.querySelector(".navbar__hamburger");
const navMenu = document.getElementById("menu");
const form = document.querySelector(".form");
const inputEmail = document.getElementById("email");
const inputMessage = document.getElementById("message");
const btnEnviar = document.getElementById("btn-submit");

const typed = new Typed(".typed", {
  stringsElement: "#typed-strings",
  backSpeed: 40,
  typeSpeed: 40,
});

const toggleMenu = ({ target }) => {
  if (
    target.matches(".navbar__hamburger") ||
    target.matches(`${".navbar__hamburger"} *`)
  ) {
    btnMenu.classList.toggle("is-active");
    navMenu.classList.toggle("navbar__active");
  }

  if (target.matches(".navbar__link")) {
    btnMenu.classList.remove("is-active");
    navMenu.classList.remove("navbar__active");
  }
};

const checkEmail = () => {
  let valid = false;
  const emailValue = inputEmail.value.trim();
  if (isEmpty(emailValue)) {
    showError(inputEmail, "El email es obligatorio");
  } else if (!isEmailValid(emailValue)) {
    // checkeamos si el email es valido o no
    showError(inputEmail, "El email no es valido");
  } else {
    showSuccess(inputEmail); // va a mostrar mi mensaje de exito
    valid = true;
  }
  return valid;
};

const checkMessage = () => {
  let valid;
  const messageInput = inputMessage.value.trim();
  if (isEmpty(messageInput)) {
    showError(inputMessage, "El mensaje es obligatorio");
  } else {
    showSuccess(inputMessage);
    valid = true;
  }
  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};
const isEmpty = (value) => value === "";
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.textContent = message;
};
const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.textContent = "";
};

const onSubmit = (e) => {
  e.preventDefault();

  // guardar el estado de los inputs en variables
  let isEmailValid = checkEmail();
  let isMessageValid = checkMessage();

  let isFormValid = isEmailValid && isMessageValid;

  if (isFormValid) {
    form.submit();
    form.reset();
  }
};

document.addEventListener("click", toggleMenu);
form.addEventListener("submit", onSubmit);
