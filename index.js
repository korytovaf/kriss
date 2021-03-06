(() => {
  const phones = [
    {name: "Мама", phone: "+7 (906) 513-22-78"},
    {name: "Папа", phone: "+7 (950) 518-88-81"},
    {name: "Кирилл", phone: "+7 (996) 516-30-91"},
    {name: "Маша", phone: "+7 (999) 999-99-99"},
    {name: "Матвей", phone: "+7 (888) 888-88-88"},
  ]

  const data = {
    cafe: "Кафе",
    nameCafe: "#Щастье",
    date: "29.03.2021",
    time: "10:30",
    address: "г.Иваново, пр.Ленина, д.2Б",
    year: "10 лет"
  }

  const animateHearts = () => {
    anime({
      targets: ".heart",
      translateX: () => {
        return anime.random(-400, 400)
      },
      translateY: () => {
        return anime.random(-400, 400)
      },
      rotate: 45,
      scale: () => {
        return anime.random(1, 4)
      },
      duration: 2000,
    })
  }

  const animateInvitation = () => {
    anime({
      targets: ".wrapper_glass",
      opacity: 1,
      duration: 1500,
    })
  }

  const app = document.getElementById("app");

  const container = document.createElement("div");
  container.classList.add("container");
  app.append(container);

  const header = document.createElement("header");
  header.classList.add("header");
  container.append(header);


  const pageQuestion = () => {
    const questions = document.createElement("div");
    questions.setAttribute("id", "questions")
    questions.classList.add("wrapper_glass");

    const paragraph = document.createElement("p");
    paragraph.classList.add("questions__text");
    paragraph.innerHTML = "Чтобы принять приглашение,<br>укажи свой телефон";

    const input = document.createElement("input");
    input.setAttribute("type", "tel");
    input.classList.add("questions__input");
    input.placeholder = "+7 (___) ___-__-__"
    let inputMask = new Inputmask("+7 (999) 999-99-99");
    inputMask.mask(input)

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("questions__button");
    button.textContent = "Принять приглашение";


    questions.append(paragraph);
    questions.append(input);
    questions.append(button);

    return {
      questions,
      input,
      button
    }
  }
  const invitationPage = (name, data) => {
    const invitation = document.createElement("div");
    invitation.classList.add("wrapper_glass");

    const nameGuest = document.createElement("h1");
    nameGuest.classList.add("h1");
    nameGuest.textContent = name;

    const text = document.createElement("div");
    text.classList.add("invitation__text");
    text.textContent = `Я приглашаю тебя на свой день рождения!`;

    const dateTime = document.createElement("div");
    dateTime.classList.add("invitation__date_time");

    const time = document.createElement("div");
    time.classList.add("invitation__time");
    time.textContent = `в ${data.time}`;

    const date = document.createElement("div");
    date.classList.add("invitation__date");
    date.textContent = data.date;

    dateTime.append(date);
    dateTime.append(time);

    const cafe = document.createElement("div");
    cafe.classList.add("invitation__cafe");
    cafe.textContent = `${data.cafe} "${data.nameCafe}"`;

    const address = document.createElement("div");
    address.classList.add("invitation__address");
    address.textContent = data.address;

    invitation.append(nameGuest);
    invitation.append(text);
    invitation.append(dateTime);
    invitation.append(cafe);
    invitation.append(address);

    return invitation
  }
  const errorPage = () => {
    const error = document.createElement("div");
    error.setAttribute("id", "error")
    error.classList.add("error");

    const paragraph = document.createElement("p");
    paragraph.classList.add("questions__text");
    paragraph.textContent = "Ой, похоже тебя нет в списках";
    error.append(paragraph)

    return error
  }

  const createPage = () => {
    const h1 = document.createElement("h1");
    h1.setAttribute("id", "h1")
    h1.classList.add("h1");
    h1.textContent = "Приглашение на день рождения";

    container.append(h1);

    const question = pageQuestion();
    question.button.addEventListener("click", (e) => {
      e.preventDefault()
      if (question.input.value <= 0) return
      const oldQuestions = document.getElementById("questions");
      oldQuestions.remove();
      let count = 0;
      phones.map(item => {
        if (question.input.value === item.phone) {
          count = count + 1;
          const header = document.getElementById("h1");
          header.remove();
          const invitation = invitationPage(item.name, data);
          container.append(invitation);
          animateHearts();
          animateInvitation();
        }
      })
      if (count === 0) {
        const error = errorPage();
        container.append(error);
      }
    })


    const heartContainer = document.createElement("div");
    heartContainer.classList.add("heart__container");
    container.append(heartContainer);

    for (let i = 0; i <= 40; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heartContainer.append(heart);
    }

    animateHearts();

    container.append(question.questions);
    animateInvitation();
  }

  createPage();

})();
