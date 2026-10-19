// table.js: your State Table, in code.
//
// Copy your paper table in here row for row. Nothing else in the starter needs to
// change for a new state to work: sense.js applies these rules, fake-sense.js uses
// the names, piece.js reads the result.
//
// signals: the numbers your sensing writes, each 0 to 1. Each partner owns one.
// states:  checked top to bottom; the first row whose rule is true wins.
//          hold is in seconds: how long a rule has to stay true before the state
//          changes. Without it the piece flickers between two words.
//          Keep "nobody" last; its rule detects when no face is present.

window.TABLE = {
  signals: ['present', 'mouthFrownLeft', 'mouthFrownRight', 'stillness'],

  states: [
    {
      name: 'sadness',
      when: s => s.mouthFrownLeft > 0.1 || s.mouthFrownRight > 0.1,
      hold: 1,
    },
    { name: 'focus',   when: s => s.stillness > 0.8,  hold: 5 },
    { name: 'nobody',  when: s => s.present < 0.2,    hold: 2 },
  ],
};
