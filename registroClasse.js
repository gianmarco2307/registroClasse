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
let formAperto = false;

document.addEventListener("DOMContentLoaded", (event) => {
  //l'addEventListener serve per caricare la lista al caricamento della pagina
  aggiornaElenco();
});

function aggiornaElenco() {
  let elenco = document.querySelector("#elenco");
  elenco.innerHTML = "";

  //creo tr per l'intestazione
  let trh = document.createElement('tr');
  //creo th
  let thNome = document.createElement('th');
  thNome.textContent = 'Nome';
  let thCognome = document.createElement('th');
  thCognome.textContent = 'Cognome';
  let thModifica = document.createElement('th');
  thModifica.className = 'toClickNoPointer';
  thModifica.textContent = 'Modifica';
  let thVoti = document.createElement('th');
  thVoti.className = 'toClickNoPointer';
  thVoti.textContent = 'Voti';
  let thNuovoVoto = document.createElement('th');
  thNuovoVoto.className = 'toClickNoPointer';
  thNuovoVoto.textContent = 'Nuovo Voto';
  let thElimina = document.createElement('th');
  thElimina.className = 'toClickNoPointer';
  thElimina.textContent = 'Elimina';
  //li appendo
  trh.appendChild(thNome);
  trh.appendChild(thCognome);
  trh.appendChild(thModifica);
  trh.appendChild(thVoti);
  trh.appendChild(thNuovoVoto);
  trh.appendChild(thElimina);
  elenco.appendChild(trh)

  //stampo l'elenco
  registro.vediStudenti().forEach((studente) => {
    //Creo una tr e i td
    let tr = document.createElement('tr');
    
    //td nome
    let tdNome = document.createElement('td');//
    tdNome.id = 'nome';
    tdNome.textContent = studente.nome;

    //td cognome
    let tdCognome = document.createElement('td');//
    tdCognome.id = 'cognome';
    tdCognome.textContent = studente.cognome;

    //td modifica
    let tdModifica = document.createElement('td');//
    tdModifica.id = 'edit' + studente.id;
    tdModifica.className = 'toClick';
    tdModifica.addEventListener('click', () => {
      modificaStudente(studente.id);
    })
    //span modifica
    let spanModifica = document.createElement('span');
    spanModifica.className = 'material-symbols-outlined';
    spanModifica.textContent = 'edit';
    tdModifica.appendChild(spanModifica);

    //td voti
    let tdVoti = document.createElement('td');//
    tdVoti.className = 'toClick';
    tdVoti.addEventListener('click', () => {
      vediVoti(studente.id);
    })
    //span modifica
    let spanVoti = document.createElement('span');
    spanVoti.className = 'material-symbols-outlined';
    spanVoti.textContent = 'calendar_month';
    tdVoti.appendChild(spanVoti);

    //td nuovo voto
    let tdNuovoVoto = document.createElement('td');//
    tdNuovoVoto.className = 'toClick';
    tdNuovoVoto.addEventListener('click', () => {
      nuovoVoto(studente.id);
    })
    //span modifica
    let spanNuovoVoto = document.createElement('span');
    spanNuovoVoto.className = 'material-symbols-outlined';
    spanNuovoVoto.textContent = 'add';
    tdNuovoVoto.appendChild(spanNuovoVoto);

    //td rimuovi
    let tdRimuovi = document.createElement('td');//
    tdRimuovi.className = 'toClick';
    tdRimuovi.addEventListener('click', () => {
      rimuoviStudente(studente.id);
    })
    //span rimuovi
    let spanRimuovi = document.createElement('span');
    spanRimuovi.className = 'material-symbols-outlined';
    spanRimuovi.textContent = 'delete';
    tdRimuovi.appendChild(spanRimuovi);

    //appendo tutto alla tr
    tr.appendChild(tdNome);
    tr.appendChild(tdCognome);
    tr.appendChild(tdModifica);
    tr.appendChild(tdVoti);
    tr.appendChild(tdNuovoVoto);
    tr.appendChild(tdRimuovi);

    //appendo la tr alla table
    elenco.appendChild(tr);
  });
}

function aggiungiStudente() {
  if (formAperto) {
    // Se il form è già aperto, non fa nulla
    return;
  }
  formAperto = true;

  //Mi preparo un form da poi appendere
  let formSection = document.querySelector('#form');
  formSection.style = 'border: 1px black solid; border-radius: 0.5em;';

  let br = document.createElement('br');

  //creo elemento form
  let form = document.createElement('form');
  form.id = 'nuovoStudente';

  //creo le label
  let labelNome = document.createElement('label');
  labelNome.for = 'nome';
  labelNome.textContent = 'Nome: ';
  labelNome.className = 'formElement';
  let labelCognome = document.createElement('label');
  labelCognome.for = 'cognome';
  labelCognome.textContent = 'Cognome: ';
  labelCognome.className = 'formElement';

  //creo gli input
  let inputNome = document.createElement('input');
  inputNome.type = 'text';
  inputNome.id = 'nome';
  inputNome.name = 'nome';
  inputNome.className = 'formElement';
  let inputCognome = document.createElement('input');
  inputCognome.type = 'text';
  inputCognome.id = 'cognome';
  inputCognome.name = 'cognome';
  inputCognome.className = 'formElement';
  let conferma = document.createElement('input');
  conferma.type = 'button';
  conferma.value = 'Invia';
  conferma.className = 'formElement';
  let annulla = document.createElement('input');
  annulla.type = 'button';
  annulla.value = 'Annulla';
  annulla.className = 'formElement';

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
  form.appendChild(annulla);

  //Appendo il form alla section
  formSection.appendChild(form);

  //Aggiungo EventListener
  conferma.addEventListener('click', () => {
    // Mi cerco i valori inseriti nel form
    let nome = document.querySelector("#nome");
    let cognome = document.querySelector("#cognome");
    let nomeValue = nome.value.trim();  // Trim per rimuovere spazi vuoti iniziali e finali
    let cognomeValue = cognome.value.trim();
  
    // Verifica se uno dei campi è vuoto
    if (!nomeValue || !cognomeValue) {
      alert("Entrambi i campi devono essere compilati.");
      return;  // Interrompe la funzione se uno dei campi è vuoto
    }
  
    registro.aggiungiStudente(nomeValue, cognomeValue);
    formSection.removeChild(form);
    aggiornaElenco();
    formAperto = false;
    formSection.style = '';
  });

  annulla.addEventListener('click', () => {
    formSection.removeChild(form);
    formAperto = false;
    formSection.style = '';
  });
  
}

function nuovoVoto(id) {
  if (formAperto) {
    // Se il form è già aperto, non fa nulla
    return;
  }
  formAperto = true;

  let formSection = document.querySelector('#form');
  formSection.style = 'border: 1px black solid; border-radius: 0.5em;';

  let br = document.createElement('br');

  //Creo il form
  let form = document.createElement('form');
  form.id = 'nuovoStudente';

  //Creo labels
  let labelVoto = document.createElement('label');
  labelVoto.for = 'voto';
  labelVoto.textContent = 'Voto: ';
  labelVoto.className = 'formElement';
  let labelData = document.createElement('label');
  labelData.for = 'data';
  labelData.textContent = 'Data: ';
  labelData.className = 'formElement';
  let labelCommento = document.createElement('label');
  labelCommento.for = 'commento';
  labelCommento.textContent = 'Commento: ';
  labelCommento.className = 'formElement';

  //Creo inputs
  let inputVoto = document.createElement('input');
  inputVoto.type = 'number';
  inputVoto.max = '10'
  inputVoto.min = '0';
  inputVoto.id = 'voto';
  inputVoto.name = 'voto';
  inputVoto.className = 'formElement';
  let inputData = document.createElement('input');
  inputData.type = 'date';
  inputData.id = 'data';
  inputData.name = 'data';
  inputData.className = 'formElement';
  let inputCommento = document.createElement('input');
  inputCommento.type = 'text';
  inputCommento.id = 'commento';
  inputCommento.name = 'comomento';
  inputCommento.className = 'formElement';
  let conferma = document.createElement('input');
  conferma.type = 'button';
  conferma.value = 'Invia';
  conferma.className = 'formElement';
  let annulla = document.createElement('input');
  annulla.type = 'button';
  annulla.value = 'Annulla';
  annulla.className = 'formElement';

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
  form.appendChild(br);
  form.appendChild(annulla);

  //appendo il form alla section
  formSection.appendChild(form);

  //aggiungo EventListener
  conferma.addEventListener('click', () => {
    let voto = document.querySelector('#voto')
    let data = document.querySelector('#data')
    let commento = document.querySelector('#commento');
    let votoValue = voto.value.trim();
    let dataValue = data.value.trim();
    let commentoValue = commento.value.trim();

    if (!votoValue || !dataValue || !commentoValue) {
      alert("Tutti i campi devono essere compilati.");
      return;  // Interrompe la funzione se uno dei campi è vuoto
    }

    registro.aggiungiVoto(id, votoValue, dataValue, commentoValue);
    formSection.removeChild(form);
    aggiornaElenco();
    formAperto = false;
    formSection.style = '';
  })

  annulla.addEventListener('click', () => {
    formSection.removeChild(form);
    formAperto = false;
    formSection.style = '';
  });
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

      let hRiga = document.createElement('tr');
      let thVoto = document.createElement('th');
      thVoto.textContent = 'Voto';
      let thData = document.createElement('th');
      thData.textContent = 'Data';
      let thCommento = document.createElement('th');
      thCommento.textContent = 'Commento';

      hRiga.appendChild(thVoto);
      hRiga.appendChild(thData);
      hRiga.appendChild(thCommento);

      tabellaVoti.appendChild(hRiga);

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
  aggiornaElenco();
}

function modificaStudente(id) {
  if (formAperto) {
    // Se il form è già aperto, non fa nulla
    return;
  }
  formAperto = true;

  const td = document.querySelector(`#edit${id}`);    //con l'id mi trovo il td in cui è stato invocato il metodo
  tr = td.parentElement;                              //risalgo quindi al genitore (<tr></tr>)
  const tdNome = tr.querySelector('#nome');
  const tdCognome = tr.querySelector('#cognome');
  
  //Creo due input, per nome e cognome
  const inputNome = document.createElement('input');
  inputNome.type = 'text';
  inputNome.value = tdNome.textContent;
  tdNome.textContent = '';
  tdNome.appendChild(inputNome);
  const inputCognome = document.createElement('input');
  inputCognome.type = 'text';
  inputCognome.value = tdCognome.textContent;
  tdCognome.textContent = '';
  tdCognome.appendChild(inputCognome);

  //Input di tipo submit
  const inputSubmit = document.createElement('input');
  let tdTC = td.textContent;
  inputSubmit.type = 'submit';
  inputSubmit.value = 'Conferma';
  td.textContent = '';
  td.appendChild(inputSubmit);

  //EventListener per il submit
  inputSubmit.addEventListener('click', () => {
    registro.modificaStudente(id, inputNome.value, inputCognome.value);
    aggiornaElenco();
    formAperto = false;
    window.location.reload();
  });

  console.log(id);
  
}
