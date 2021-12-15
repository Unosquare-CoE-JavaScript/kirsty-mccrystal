class Event
{
  constructor()
  {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler)
  {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx)
  {
    this.handlers.delete(idx);
  }

  fire(sender, args)
  {
    this.handlers.forEach(handler =>
    {
      handler(sender, args);
    });
  }
}

class Game
{
  constructor()
  {
    this.ratEnters = new Event();
    this.ratDies = new Event();
    this.notifyRat = new Event();
  }

  fireRatEnters(sender)
  {
    this.ratEnters.fire(sender, null);
  }

  fireRatDies(sender)
  {
    this.ratDies.fire(sender, null);
  }

  fireNotifyRat(sender, whichRat)
  {
    this.notifyRat.fire(sender, whichRat)
  }
}

class Rat
{
  constructor(game)
  {
    this.game = game;
    this.attack = 1;
    game.ratEnters.subscribe(
      this.handleRatEnters.bind(this)
    );
    game.ratDies.subscribe(
      this.handleRatDies.bind(this)
    );
    game.notifyRat.subscribe(
      this.handleNotifyRat.bind(this)
    );
    game.fireRatEnters(this);
  }

  handleRatEnters(sender, args)
  {
    if (sender !== this)
    {
      this.attack++;
      this.game.fireNotifyRat(this, sender);
    }
  }

  handleRatDies(sender, args)
  {
    this.attack--;
  }

  handleNotifyRat(sender, whichRat)
  {
    if (whichRat === this)
      this.attack++;
  }

  die()
  {
    this.game.fireRatDies(this);
  }
}
