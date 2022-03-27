/*global GetParentResourceName*/
const fetchNui = (type, to, amount) => {
  fetch(`https://${GetParentResourceName()}/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      to: to,
      amount: amount,
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => console.log(resp));
};

export default fetchNui;
