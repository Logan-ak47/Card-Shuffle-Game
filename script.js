const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;

let matchedCards = 0;
let disableDeck = false;

function flipcard(e) {

    let clickedCard = e.target;
    if (clickedCard != cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
        matchCard(cardOneImg, cardTwoImg);
    }
}

function matchCard(img1, img2) {
    if (img1 === img2) {
        matchedCards++;
        cardOne.removeEventListener("click", flipcard);
        cardTwo.removeEventListener("click", flipcard);
        cardOne = cardTwo = "";
        if (matchedCards == 8) {
            setTimeout(() => {
                shuffleCards();
            }, 1000);
        }
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        return disableDeck = false;
    }, 1200);
}

function shuffleCards() {
    matchedCards = 0;
    disableDeck=false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 8, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {

        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img (${arr[i]}).png`;
        card.addEventListener("click", flipcard)
    })
}

shuffleCards();
cards.forEach(card => {

    card.addEventListener("click", flipcard);
})