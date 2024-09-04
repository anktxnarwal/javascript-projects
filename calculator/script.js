let input = document.getElementById("input-box");
let buttons = document.querySelectorAll("button");

let string = "";
let arr = Array.from(buttons);

arr.forEach((button) => {
  button.addEventListener("click", (e) => {
    try {
      if (e.target.innerHTML == "=") {
        // Evaluate the expression and handle potential errors
        string = eval(string);
        input.value = string;
      } else if (e.target.innerHTML == "AC") {
        // Clear the input
        string = "";
        input.value = string;
      } else if (e.target.innerHTML == "DEL") {
        // Remove the last character
        string = string.substring(0, string.length - 1);
        input.value = string;
      } else {
        // Append the button value to the input string
        string += e.target.innerHTML;
        input.value = string;
      }
    } catch (error) {
      // Handle any errors that occur during evaluation
      input.value = "Error";
      string = "";
    }
  });
});
