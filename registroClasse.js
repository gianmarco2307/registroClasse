class registroClasse {
  constructor() {
    this.studenti = JSON.parse(localStorage.getItem("studenti")) || [];
    this.id = JSON.parse(localStorage.getItem("id")) || 0;
  }

  salvaStudenti() {
    localStorage.setItem("studenti", JSON.stringify(this.studenti));
    localStorage.setItem("id", JSON.stringify(this.id));
  }

  aggiungiStudente(nome, cognome) {
    this.id += 1;
    const nuovoStudente = {
      nome: nome,
      cognome: cognome,
      id: this.id,
      voti: [],
    };
    this.studenti.push(nuovoStudente);
    this.salvaStudenti();
  }

  aggiungiVoto(id, voto, data, commento) {
    const studente = this.cercaStudente(id);
    if (studente) {
      const nuovoVoto = {
        voto: voto,
        data: data,
        commento: commento,
      };
      studente.voti.push(nuovoVoto);
      this.salvaStudenti();
    } else {
      console.log("Studente non trovato");
    }
  }

  cercaStudente(id) {
    return this.studenti.find((studente) => studente.id === id);
  }

  rimuoviStudente(id) {
    this.studenti = this.studenti.filter((studente) => studente.id !== id);
    this.salvaStudenti();
  }

  vediStudenti() {
    return this.studenti;
  }

  vediVoti(id) {
    const studente = this.cercaStudente(id);
    return studente ? studente.voti : null;
  }

  modificaStudente(id, nuovoNome, nuovoCognome) {
    const studenteDaModificare = this.cercaStudente(id);

    if (studenteDaModificare) {
      studenteDaModificare.nome = nuovoNome;
      studenteDaModificare.cognome = nuovoCognome;
      this.salvaStudenti();
    }
  }
}

let registro = new registroClasse();
let firstTD = true;

document.addEventListener("DOMContentLoaded", (event) => {
  //l'addEventListener serve per caricare la lista al caricamento della pagina
  firstTD = true;
  aggiornaElenco();
});

function aggiornaElenco() {
  let elenco = document.querySelector("#elenco");
  elenco.innerHTML = "";
  registro.vediStudenti().forEach((studente) => {
if(firstTD == true){
  elenco.innerHTML += `
  <th>Nome</th>
  <th>Cognome</th>
  <th class="toClickNoPointer">Modifica</th>
  <th class="toClickNoPointer">Voti</th>
  <th class="toClickNoPointer">Nuovo Voto</th>
  <th class="toClickNoPointer">Elimina</th>`
  firstTD = false;
}
    elenco.innerHTML += `
    <td id='nome'>${studente.nome}</td>
    <td id='cognome'>${studente.cognome}</td>
    <td id='edit${studente.id}'  class='toClick' onclick='modificaStudente(${studente.id})'>
      <span class="material-symbols-outlined">edit</span>
    </td>
    <td class='toClick' onclick='vediVoti(${studente.id})'>
      <span class="material-symbols-outlined">calendar_month</span>
    </td>
    <td class='toClick' onclick='nuovoVoto(${studente.id})'>
    <span class="material-symbols-outlined">add</span>
    </td>
    <td class='toClick' onclick='rimuoviStudente(${studente.id})'>
      <span class="material-symbols-outlined">delete</span>
    </td>`;
    //stampo nome, cognome e icone
  });
}

function aggiungiStudente() {
  //Mi preparo un form da poi appendere
  let formSection = document.querySelector('#form');

  let br = document.createElement('br');

  //creo elemento form
  let form = document.createElement('form');
  form.id = 'nuovoStudente';

  //creo le label
  let labelNome = document.createElement('label');
  labelNome.for = 'nome';
  labelNome.textContent = 'Nome: ';
  let labelCognome = document.createElement('label');
  labelCognome.for = 'cognome';
  labelCognome.textContent = 'Cognome: ';

  //creo gli input
  let inputNome = document.createElement('input');
  inputNome.type = 'text';
  inputNome.id = 'nome';
  inputNome.name = 'nome';
  let inputCognome = document.createElement('input');
  inputCognome.type = 'text';
  inputCognome.id = 'cognome';
  inputCognome.name = 'cognome';
  let conferma = document.createElement('input');
  conferma.type = 'button';
  conferma.value = 'Invia';

  //Appendo label e input al form
  form.appendChild(labelNome);
  form.appendChild(br);
  form.appendChild(inputNome);
  form.appendChild(br);
  form.appendChild(labelCognome);
  form.appendChild(br);
  form.appendChild(inputCognome);
  form.appendChild(br);
  form.appendChild(conferma);
  form.appendChild(br);

  //Appendo il form alla section
  formSection.appendChild(form);

  //Aggiungo EventListener
  conferma.addEventListener('click', () => {
    //Mi cerco i valori inseriti nel form
    let nome = document.querySelector("#nome");
    let cognome = document.querySelector("#cognome");
    let nomeValue = nome.value;
    let cognomeValue = cognome.value;
    registro.aggiungiStudente(nomeValue, cognomeValue);
    firstTD = true;
    formSection.removeChild(form);
    aggiornaElenco();
  })

  
}

function nuovoVoto(id) {
  let formSection = document.querySelector('#form');

  let br = document.createElement('br');

  //Creo il form
  let form = document.createElement('form');
  form.id = 'nuovoStudente';

  //Creo labels
  let labelVoto = document.createElement('label');
  labelVoto.for = 'voto';
  labelVoto.textContent = 'Voto: ';
  let labelData = document.createElement('label');
  labelData.for = 'data';
  labelData.textContent = 'Data: ';
  let labelCommento = document.createElement('label');
  labelCommento.for = 'commento';
  labelCommento.textContent = 'Commento: ';

  //Creo inputs
  let inputVoto = document.createElement('input');
  inputVoto.type = 'number';
  inputVoto.max = '10'
  inputVoto.id = 'voto';
  inputVoto.name = 'voto';
  let inputData = document.createElement('input');
  inputData.type = 'date';
  inputData.id = 'data';
  inputData.name = 'data';
  let inputCommento = document.createElement('input');
  inputCommento.type = 'text';
  inputCommento.id = 'commento';
  inputCommento.name = 'comomento';
  let conferma = document.createElement('input');
  conferma.type = 'button';
  conferma.value = 'Invia';

  //Appendo il tutto al form
  form.appendChild(labelVoto);
  form.appendChild(br);
  form.appendChild(inputVoto);
  form.appendChild(br);
  form.appendChild(labelData);
  form.appendChild(br);
  form.appendChild(inputData);
  form.appendChild(br);
  form.appendChild(labelCommento);
  form.appendChild(br);
  form.appendChild(inputCommento);
  form.appendChild(br);
  form.appendChild(conferma);

  //appendo il form alla section
  formSection.appendChild(form);

  //aggiungo EventListener
  conferma.addEventListener('click', () => {
    let voto = document.querySelector('#voto').value;
    let data = document.querySelector('#data').value;
    let commento = document.querySelector('#commento').value;
    registro.aggiungiVoto(id, voto, data, commento);
    firstTD = true;
    formSection.removeChild(form);
    aggiornaElenco();
  })
}

function vediVoti(id) {
  const studente = registro.cercaStudente(id);
  if (studente) {
    const voti = studente.voti;
    const td = document.querySelector(`#edit${id}`);
    const tr = td.parentElement;
    const tabellaVotiEsistente = tr.nextElementSibling;
    // Se la tabella dei voti è già aperta, la chiude
    if (tabellaVotiEsistente && tabellaVotiEsistente.classList.contains('tabella-voti')) {
      tabellaVotiEsistente.remove();
    } else {
      // Altrimenti, crea la tabella dei voti
      let tabellaVoti = document.createElement('table');
      tabellaVoti.classList.add('tabella-voti');
      voti.forEach((voto) => {
        let riga = document.createElement('tr');
        let cellaVoto = document.createElement('td');
        let cellaData = document.createElement('td');
        let cellaCommento = document.createElement('td');
        cellaVoto.textContent = voto.voto;
        cellaData.textContent = voto.data;
        cellaCommento.textContent = voto.commento;
        riga.appendChild(cellaVoto);
        riga.appendChild(cellaData);
        riga.appendChild(cellaCommento);
        tabellaVoti.appendChild(riga);
      });
      tr.insertAdjacentElement('afterend', tabellaVoti);
    }
  }
}

function rimuoviStudente(id) {
  registro.rimuoviStudente(id);
  firstTD = true;
  aggiornaElenco();
}

function modificaStudente(id) {
  const td = document.querySelector(`#edit${id}`);    //con l'id mi trovo il td in cui è stato invocato il metodo
  tr = td.parentElement;                              //risalgo quindi al genitore (<tr></tr>)
  const tdNome = tr.querySelector('#nome');
  const tdCognome = tr.querySelector('#cognome');
  
  //Creo due input, per nome e cognome
  const inputNome = document.createElement('input');
  inputNome.type = 'text';
  inputNome.value = tdNome.textContent;
  const inputCognome = document.createElement('input');
  inputCognome.type = 'text';
  inputCognome.value = tdCognome.textContent;

  //Sostituisco i td con gli input
  tdNome.replaceWith(inputNome);
  tdCognome.replaceWith(inputCognome);

  //Input di tipo submit
  const inputSubmit = document.createElement('input');
  inputSubmit.type = 'submit';
  inputSubmit.value = 'Conferma';

  //EventListener per il submit
  inputSubmit.addEventListener('click', () => {
    registro.modificaStudente(id, inputNome.value, inputCognome.value);
    firstTD = true;
    aggiornaElenco();
  })
  td.replaceWith(inputSubmit);

  console.log(id);
  
}
