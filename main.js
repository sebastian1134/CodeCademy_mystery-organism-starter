// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate () {
      let poolOne = ['T', 'C', 'G'];
      let poolTwo = ['A', 'C', 'G'];
      let poolThree = ['A', 'T', 'G'];
      let poolFour = ['A', 'T', 'C'];
      let randomNumber = Math.floor(Math.random()*15);
      if (this.dna[randomNumber] === 'A') {
        this.dna[randomNumber] = poolOne[Math.floor(Math.random()*3)];
      } else if (this.dna[randomNumber] === 'T') {
        this.dna[randomNumber] = poolTwo[Math.floor(Math.random()*3)];
      } else if (this.dna[randomNumber] === 'C') {
        this.dna[randomNumber] = poolThree[Math.floor(Math.random()*3)];
      } else if (this.dna[randomNumber] === 'G') {
        this.dna[randomNumber] = poolFour[Math.floor(Math.random()*3)];
      }
      return this.dna;
    },
    compareDNA (objct) {
      let numOfDif = [];
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === objct.dna[i]) {
            numOfDif.push(this.dna[i]);
          }
      }
      return `specimen #${this.specimenNum} and specimen #${objct.specimenNum} have ${((numOfDif.length*100)/15).toFixed(2)}% DNA in common.`;
    },
    willLikelySurvive () {
      let basesToSurvive = [];
      let actualSurvivalRate = 0;
      for (let k = 0; k < this.dna.length; k++) {
        if (this.dna[k] === 'C' || this.dna[k] === 'G' ) {
          basesToSurvive.push(this.dna[k]);
        }
      } 
      if ((basesToSurvive.length)/15 >= 0.6) {
        actualSurvivalRate = true;
      } else {
        actualSurvivalRate = false;
      }
      return actualSurvivalRate;
    },
  }
};

survavingSamples = (samples) => {
  let survivors = [];
  if (samples === undefined) {
    samples = 30;
  }
  for (let i = 0; i < 10000 ; i++) {
    if (survivors.length === samples) {
    break;
    } if (pAequorFactory(i,mockUpStrand()).willLikelySurvive() === true) {
      survivors.push(pAequorFactory(i,mockUpStrand()));
    }
  }
  return survivors;
};
console.log(survavingSamples());






