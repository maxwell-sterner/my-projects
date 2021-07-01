


function searchFunc() {

  let input, filter, ul, li, a, i, txtCont;
  input = document.getElementById('searchBar');
  filter = input.value.toUpperCase();
  container = document.getElementById("flex-container");
  box = container.getElementsByClassName("box");

  for (i = 0; i < box.length; i++) {
    p = box[i].getElementsByClassName("t")[0];
    txtCont = p.textContent || p.innerText;
    if (txtCont.toUpperCase().indexOf(filter) > -1) {
      box[i].style.display = "";
    } else {
      box[i].style.display = "none";
    }
  }
}