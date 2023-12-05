class registroClasse {
  constructor() {
    this.studenti = [];
  }

  aggiungiStudente(nome, cognome, id) {
    const nuovoStudente = {
      nome: nome,
      cognome: cognome,
      id: id,
      voti: [],
    };
    this.studenti.push(nuovoStudente);
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
    } else {
      console.log("Studente non trovato");
    }
  }

  cercaStudente(id) {
    return this.studenti.find((studente) => studente.id === id);
  }

  rimuoviStudente(id) {
    this.studenti = this.studenti.filter((studente) => studente.id !== id);
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
    }
  }

  rimuoviStudente(id) {
    this.studenti = this.studenti.filter((studente) => studente.id !== id);
  }

}

registro = new registroClasse();