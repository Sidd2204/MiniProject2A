document.addEventListener("DOMContentLoaded", getGraph);

async function getGraph() {
  //   let graphreq = await fetch(`http://127.0.0.1:5000/getstreak/${username}`);
  //   if (!graphreq.ok) {
  //     alert("RESULT NOT OK!");
  //     return;
  //   }
  //   let streakdata = await streakreq.json();

  const graph = document.getElementById("graph");
  graph.setAttribute("src", "../static/images/stat.png");
}
