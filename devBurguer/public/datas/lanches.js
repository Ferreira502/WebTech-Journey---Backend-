function rolarParaBebidas() {
  const bebidasSection = document.getElementById("bebidas");
  if (bebidasSection) {
    bebidasSection.scrollIntoView({ behavior: "smooth" });
  }
}

function verificarStatusLoja() {
  const agora = new Date();
  const hora = agora.getHours();
  const statusLoja = document.getElementById("status-loja");

  const aberto = hora >= 18 && hora <= 22;

  if (aberto) {
    statusLoja.textContent = "🟢 Aberto";
    statusLoja.style.color = "white";
    statusLoja.style.backgroundColor = "green";
  } else {
    statusLoja.textContent = "🔴 Fechado";
    statusLoja.style.color = "white";
    statusLoja.style.backgroundColor = "red";
  }
}


verificarStatusLoja();
