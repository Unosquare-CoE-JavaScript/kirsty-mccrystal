class Token
{
  constructor(value=0)
  {
    this.value = value;
  }
}

class Memento
{
  constructor()
  {
    this.tokens = [];
  }
}

class TokenMachine
{
  constructor()
  {
    // todo
    this.tokens = [];
  }

  addTokenValue(value)
  {
    return this.addToken(new Token(value));
  }

  addToken(token)
  {
    // todo
    let m = new Memento();

    this.tokens.push(token);
    m.tokens = this.tokens.map(token => new Token(token.value));
    return m;
  }

  revert(m)
  {
    // todo
    if (this.tokens.length > 0) {
        this.tokens = m.tokens.map(token => new Token(token.value));
    } else {
        console.log('Can\'t revert!!')
    }
  }
}